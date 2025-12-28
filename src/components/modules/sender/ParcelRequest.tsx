/* eslint-disable @typescript-eslint/no-explicit-any */
import {Form, FormField, FormItem, FormLabel, FormControl, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect, useState} from "react";
import {z} from "zod";
import divisions from "@/assets/division.json";
import {Select, SelectTrigger, SelectValue, SelectContent, SelectItem} from "@/components/ui/select";
import {useGetProfileQuery} from "@/redux/features/auth/auth.api";
import {useRequestParcelMutation} from "@/redux/features/parcel/parcel.api";
import {toast} from "sonner";
import {useNavigate} from "react-router";

const parcelSchema = z.object({
  senderId: z.string(),
  receiverEmail: z.string().optional(),
  receiverNumber: z.string().min(11, "Receiver number must be at least 11 digits"),
  title: z.string().min(2, "Parcel title is required"),
  type: z.string().min(2, "Parcel type is required"),
  weight: z.number({error: "Weight must be a number"}).min(1, "Weight must be at least 1 kg"),
  division: z.string().min(2, "Division is required"),
  city: z.string().min(2, "City is required"),
  area: z.string().min(2, "Area is required"),
});
type ParcelFormValues = z.infer<typeof parcelSchema>;

const ParcelRequest = () => {
  const navigate = useNavigate();
  const {data: profile} = useGetProfileQuery(undefined);
  const [parcelRequest] = useRequestParcelMutation();

  const form = useForm<ParcelFormValues>({
    resolver: zodResolver(parcelSchema),
    defaultValues: {
      senderId: profile?.data._id,
      receiverEmail: "",
      receiverNumber: "",
      title: "",
      type: "",
      weight: 1,
      division: "",
      city: "",
      area: "",
    },
  });

  useEffect(() => {
    if (profile?.data?._id) form.setValue("senderId", profile.data._id);
  }, [profile]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (values: ParcelFormValues) => {
    setIsSubmitting(true);
    try {
      const payload = {...values};
      if (!payload.receiverEmail) delete payload.receiverEmail;

      const res = await parcelRequest(payload).unwrap();

      if (res.success) {
        toast.success(res.message);
        window.open(res.data);

        navigate("/sender/my-parcels");
      }
    } catch (err: any) {
      toast.error(err.data.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="container max-w-xl mx-auto my-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
          <FormField
            control={form.control}
            name="title"
            render={({field}) => (
              <FormItem>
                <FormLabel>Parcel Title</FormLabel>
                <FormControl>
                  <Input placeholder="Describe the parcel..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({field}) => (
              <FormItem>
                <FormLabel>Parcel Type</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="document">Document</SelectItem>
                      <SelectItem value="package">Package</SelectItem>
                      <SelectItem value="fragile">Fragile</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="receiverEmail"
            render={({field}) => (
              <FormItem>
                <FormLabel>Receiver Email</FormLabel>

                <FormControl>
                  <Input placeholder="Receiver Email" {...field} required={true} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="receiverNumber"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Receiver Number</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="01XXXXXXXXX" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="weight"
            render={({field}) => (
              <FormItem>
                <FormLabel>Weight (kg)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="1"
                    placeholder="e.g. 2"
                    {...field}
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="division"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Division</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select division" />
                    </SelectTrigger>
                    <SelectContent>
                      {divisions.map((div) => (
                        <SelectItem key={div.id} value={div.name}>
                          {div.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({field}) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Describe the parcel..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="area"
            render={({field}) => (
              <FormItem>
                <FormLabel>Area</FormLabel>
                <FormControl>
                  <Input placeholder="Describe the parcel..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting} className="w-full" variant="outline">
            {isSubmitting ? "Submitting..." : "Submit Parcel Request"}
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default ParcelRequest;
