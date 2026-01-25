/* eslint-disable @typescript-eslint/no-explicit-any */
import LoadingBtn from "@/components/LoadingBtn";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {useGetProfileQuery} from "@/redux/features/auth/auth.api";
import {useConfirmParcelMutation, useIncomingParcelsQuery} from "@/redux/features/parcel/parcel.api";
import {useNextTimePaymentMutation} from "@/redux/features/payments/payment.api";
import type {GetParcel} from "@/types/types";
import {Ban, PackageCheck} from "lucide-react";
import {toast} from "sonner";

const MyParcels = () => {
  const [nextTimePayment] = useNextTimePaymentMutation();
  const {data: userData, isLoading: profileLoad} = useGetProfileQuery(undefined);
  const {data, isLoading} = useIncomingParcelsQuery(undefined);
  const [confirmParcel] = useConfirmParcelMutation();
  const profile = userData?.data;
  const parcels = data?.data;
  const email = profile?.email;

  const handelPicked = async (trackingId: string) => {
    const toastId = toast.loading("Loading...");
    const payload = {trackingId, email};

    try {
      const res = await confirmParcel(payload).unwrap();

      if (res.success) toast.success("Picked confirmed", {id: toastId});
    } catch (error: any) {
      toast.error(error.data.message, {id: toastId});
    }
  };

  const handlePayment = async (trackingId: string) => {
    const res = await nextTimePayment(trackingId);

    if (res.data.success) window.open(res.data?.data.paymentUrl);
  };

  if (isLoading || profileLoad) return <LoadingBtn></LoadingBtn>;

  return (
    <div>
      <h2>Receiver parcels</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
        {parcels?.map((parcel: GetParcel) => (
          <Card key={parcel._id}>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                {parcel.title} ({parcel.type})
              </CardTitle>
              <p className="text-sm text-muted-foreground">Tracking ID: {parcel.trackingId}</p>
            </CardHeader>

            <CardContent className="space-y-2 text-sm">
              <p>
                <strong>Sender Name:</strong> {parcel.senderId?.name}
              </p>
              {parcel?.receiverEmail && (
                <p>
                  <strong>Sender Email:</strong> {parcel?.senderId.email}
                </p>
              )}

              <p>
                <strong>Picked Address:</strong> {parcel.division}, {parcel.city}, {parcel.area}
              </p>
              <p>
                <strong>Payment:</strong> {parcel.payment}
              </p>
              <p>
                <strong>Status:</strong> {parcel.status}
              </p>

              <div className="mt-4">
                <strong>Status Log:</strong>
                <ul className="list-disc list-inside text-xs mt-1">
                  {parcel.statusLog.map((log, index: number) => (
                    <li key={index}>
                      {log.status} — {log.location} ({log.updatedBy}) at {new Date(log.timestamp).toLocaleString("en-BD")}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                {parcel.status === "CANCEL" && <Ban />}
                {parcel.status === "PICKED" && <PackageCheck />}
                <div>
                  {parcel.status === "REQUESTED" && (
                    <Button
                      onClick={() => handelPicked(parcel.trackingId)}
                      className="cursor-pointer"
                      variant={"outline"}
                      type="button"
                      disabled={parcel?.statusLog[parcel?.statusLog.length - 1]?.status !== "DELIVERED"}
                    >
                      Picked
                    </Button>
                  )}

                  {parcel.payment !== "COMPLETE" && (
                    <Button onClick={() => handlePayment(parcel.trackingId)} className="cursor-pointer mt-3" variant={"outline"} type="button">
                      Payment
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyParcels;
