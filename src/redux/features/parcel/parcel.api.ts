import {baseApi} from "@/redux/baseApi";

export const parcelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getParcels: builder.query({
      query: (payload) => ({url: "/parcel/all-parcel", method: "GET", params: payload}),
      transformResponse: (res) => res.data,
      providesTags: ["PARCEL"],
    }),
    requestParcel: builder.mutation({
      query: (payload) => ({url: "/parcel/create-parcel", method: "POST", data: payload}),
      invalidatesTags: ["PARCEL"],
    }),

    getParcelsStats: builder.query({query: () => ({url: "/stats/parcel", method: "GET"}), providesTags: ["PARCEL"]}),
    updateParcelStatusLog: builder.mutation({
      query: ({trackingId, payload}) => ({url: `/parcel/${trackingId}`, method: "PATCH", data: payload}),
      invalidatesTags: ["PARCEL"],
    }),
    userParcels: builder.query({query: () => ({url: `/parcel/myParcels`, method: "GET"}), providesTags: ["PARCEL"]}),

    cancelParcelOTPSend: builder.mutation({
      query: (payload) => ({url: "/otp/parcel-otp-send", method: "POST", data: payload}),
      invalidatesTags: ["PARCEL"],
    }),
    cancelParcelOTPVerify: builder.mutation({
      query: (payload) => ({url: "otp/parcel-otp-verify", method: "POST", data: payload}),
      invalidatesTags: ["PARCEL"],
    }),
    anyOneFindParcel: builder.query({query: (trackingId) => ({url: `/parcel/anyOne/${trackingId}`, method: "GET"})}),

    incomingParcels: builder.query({query: () => ({url: "/parcel/receiver", method: "GET"}), providesTags: ["PARCEL"]}),

    confirmParcel: builder.mutation({query: (payload) => ({url: "/parcel/confirm", method: "PATCH", data: payload}), invalidatesTags: ["PARCEL"]}),
  }),
});

export const {
  useGetParcelsQuery,
  useRequestParcelMutation,
  useGetParcelsStatsQuery,
  useUpdateParcelStatusLogMutation,
  useUserParcelsQuery,
  useCancelParcelOTPSendMutation,
  useCancelParcelOTPVerifyMutation,
  useAnyOneFindParcelQuery,
  useIncomingParcelsQuery,
  useConfirmParcelMutation,
} = parcelApi;
