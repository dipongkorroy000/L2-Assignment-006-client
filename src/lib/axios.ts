import config from "@/config/envVars";
import axios, {type AxiosRequestConfig} from "axios";

export const axiosInstance = axios.create({baseURL: config.baseUrl, withCredentials: true});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // console.log("Axios", config);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

let isRefreshing = false;

let pendingQueue: {
  resolve: (value: unknown) => void;
  reject: (value: unknown) => void;
}[] = [];

const processQueue = (error: unknown) => {
  pendingQueue.forEach((promise) => {
    if (error) promise.reject(error);
    else promise.resolve(null);
  });

  pendingQueue = [];
};

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const originalRequest = error.config as AxiosRequestConfig & {_retry: boolean};

    if (error.response.status === 400 && error.response.data.message === "jwt expired" && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => pendingQueue.push({resolve, reject}))
          .then(() => axiosInstance(originalRequest))
          .catch((error) => Promise.reject(error));
      }

      isRefreshing = true;
      try {
        await axiosInstance.post("/auth/refresh-token");

        processQueue(null);

        return axiosInstance(originalRequest);
      } catch (error) {
        processQueue(error);

        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    //* For Everything
    return Promise.reject(error);
  }
);
