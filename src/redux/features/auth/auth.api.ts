import {baseApi} from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({url: "/user/register", method: "POST", data: userInfo}),
      transformResponse: (res) => res.data,
    }),
    login: builder.mutation({query: (payload) => ({url: "/auth/login", method: "POST", data: payload})}),
    sendOTP: builder.mutation({query: (payload) => ({url: "/verification/otp-send", method: "POST", data: payload})}),
    verifyOTP: builder.mutation({
      query: (payload) => ({url: "/verification/otp-verify", method: "POST", data: payload}),
      invalidatesTags: ["USER"],
    }),
    getProfile: builder.query({query: () => ({url: "/user/profile"}), providesTags: ["USER"]}),
    updateProfile: builder.mutation({
      query: ({email, ...data}) => ({url: "/user", method: "PATCH", params: {email}, data}),
      invalidatesTags: ["USER"],
    }),
    logout: builder.mutation({query: () => ({url: "/auth/logout", method: "POST"}), invalidatesTags: ["USER"]}),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useSendOTPMutation,
  useVerifyOTPMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useLogoutMutation,
} = authApi;
