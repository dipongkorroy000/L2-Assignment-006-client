import {baseApi} from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({query: (payload) => ({url: "/user/all-users", method: "GET", params: payload}), providesTags: ["USERS"]}),
    getUserStats: builder.query({query: (payload) => ({url: "/stats/user", method: "GET", params: payload}), providesTags: ["USERS"]}),
    userRoleUpdate: builder.mutation({
      query: (payload) => ({url: "/user/updateUserRole", method: "PATCH", data: payload}),
      transformResponse: (res) => res,
      invalidatesTags: ["USERS"],
    }),
    deleteUser: builder.mutation({
      query: (payload) => ({url: "/user/delete", method: "DELETE", data: payload}),
      transformResponse: (res) => res,
      invalidatesTags: ["USERS"],
    }),
  }),
});

export const {useGetUsersQuery, useGetUserStatsQuery, useUserRoleUpdateMutation, useDeleteUserMutation} = authApi;
