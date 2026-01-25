import {useCancelParcelOTPSendMutation, useCancelParcelOTPVerifyMutation, useUserParcelsQuery} from "@/redux/features/parcel/parcel.api";
import type {GetParcel} from "@/types/types";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {Ban} from "lucide-react";
import {PackageCheck} from "lucide-react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {InputOTP, InputOTPGroup, InputOTPSlot} from "@/components/ui/input-otp";
import z from "zod";
import {toast} from "sonner";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter} from "@/components/ui/dialog";
import {useNextTimePaymentMutation} from "@/redux/features/payments/payment.api";
import LoadingBtn from "@/components/LoadingBtn";

const FormSchema = z.object({
  pin: z.string().min(6, {message: "Your one-time password must be 6 characters."}),
});

const MyParcels = () => {
  const [nextTimePayment] = useNextTimePaymentMutation();

  const [openModal, setOpenModal] = useState(false);
  const [trackingId, setTrackingId] = useState<string | null>(null);

  const [cancelParcelOTPSend] = useCancelParcelOTPSendMutation();
  const [cancelParcelOTPVerify] = useCancelParcelOTPVerifyMutation();
  const {data, isLoading} = useUserParcelsQuery(undefined);
  const parcels = data?.data || [];

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {pin: ""},
  });

  const handleCancelParcel = async (id: string) => {
    await setTrackingId(id);
    const toastId = toast.loading("Loading...");

    const res = await cancelParcelOTPSend({trackingId: id}).unwrap();

    if (res.success) toast.success("OTP send your email", {id: toastId});

    setOpenModal(true);
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const toastId = toast.loading("Verifying OTP");
    const payload = {trackingId: trackingId, otp: data.pin};

    try {
      const res = await cancelParcelOTPVerify(payload).unwrap();

      if (res.success) toast.success("OTP Verified", {id: toastId});

      setOpenModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePayment = async (trackingId: string) => {
    const res = await nextTimePayment(trackingId);

    if (res.data.success) window.open(res.data.data.paymentUrl);
  };

  if (isLoading) return <LoadingBtn></LoadingBtn>;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
        {parcels.map((parcel: GetParcel) => (
          <Card key={parcel._id}>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                {parcel.title} ({parcel.type})
              </CardTitle>
              <p className="text-sm text-muted-foreground">Tracking ID: {parcel.trackingId}</p>
            </CardHeader>

            <CardContent className="space-y-2 text-sm">
              <p>
                <strong>Receiver Phone:</strong> {parcel.receiverNumber}
              </p>
              {parcel?.receiverEmail && (
                <p>
                  <strong>Receiver Email:</strong> {parcel?.receiverEmail}
                </p>
              )}

              <p>
                <strong>Location:</strong> {parcel.division}, {parcel.city}, {parcel.area}
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
                      onClick={() => handleCancelParcel(parcel.trackingId)}
                      className="cursor-pointer"
                      variant={"outline"}
                      type="button"
                      disabled={parcel.statusLog.length > 1}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
                {parcel.payment !== "COMPLETE" && (
                  <Button onClick={() => handlePayment(parcel.trackingId)} className="cursor-pointer mt-3" variant={"outline"} type="button">
                    Payment
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* open modal when click cancel button */}
      <div>
        <>
          <Dialog open={openModal} onOpenChange={setOpenModal}>
            <DialogContent className="max-w-md mx-auto">
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold">Enter OTP to Cancel Parcel</DialogTitle>
              </DialogHeader>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="pin"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>One-Time Password</FormLabel>
                        <FormControl>
                          <InputOTP maxLength={6} {...field}>
                            {[...Array(6)].map((_, i) => (
                              <InputOTPGroup key={i}>
                                <InputOTPSlot index={i} />
                              </InputOTPGroup>
                            ))}
                          </InputOTP>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" variant="secondary">
                    Submit
                  </Button>
                </form>
              </Form>

              <DialogFooter className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setOpenModal(false)} type="button">
                  Cancel
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      </div>
    </div>
  );
};

export default MyParcels;
