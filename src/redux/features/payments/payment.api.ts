import {baseApi} from "@/redux/baseApi";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPayments: builder.query({
      query: (payload) => ({url: "/payment/all-payments", method: "GET", params: payload}),
      providesTags: ["PAYMENTS"],
    }),
    getPaymentsStatus: builder.query({
      query: () => ({url: "/stats/payment", method: "GET"}),
      providesTags: ["PAYMENTS"],
    }),
    userPayments: builder.query({
      query: () => ({url: "/payment/my-payments", method: "GET"}),
      providesTags: ["PAYMENTS"],
    }),
    nextTimePayment: builder.mutation({
      query: (payload) => ({url: `/payment/init-payment/${payload}`, method: "POST"}),
      invalidatesTags: ["PAYMENTS", "PARCEL"],
    }),
  }),
});

export const {useGetPaymentsQuery, useGetPaymentsStatusQuery, useUserPaymentsQuery, useNextTimePaymentMutation} = paymentApi;
