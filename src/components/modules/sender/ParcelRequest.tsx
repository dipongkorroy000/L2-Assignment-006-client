/* eslint-disable @typescript-eslint/no-explicit-any */
import {Form, FormField, FormItem, FormLabel, FormControl, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect, useState} from "react";
import {z} from "zod";
import divisions from "@/assets/division.json";
import districts from "@/assets/districts.json";
import upazilas from "@/assets/upazilas.json";
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
  upazila: z.string(),
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
      upazila: "",
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

  const [selectedDivision, setSelectedDivision] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");

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
                      <SelectValue placeholder="Select Parcel Type" />
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
                <FormLabel>Receiver Email (optional | If the receiver has an account, enter email.)</FormLabel>

                <FormControl>
                  <Input placeholder="Receiver Email" {...field} />
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

          {/* Division Select */}
          <FormField
            control={form.control}
            name="division"
            render={({field}) => (
              <FormItem className="w-full">
                <FormLabel>Division</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value); // store division name
                      setSelectedDivision(value); // store division name for filtering
                      setSelectedDistrict("");
                      form.setValue("city", "");
                      form.setValue("area", "");
                    }}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Division" />
                    </SelectTrigger>
                    <SelectContent>
                      {divisions.map((division) => (
                        <SelectItem key={division.id} value={division.name}>
                          {division.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* District Select */}
          <FormField
            control={form.control}
            name="city"
            render={({field}) => {
              const filteredDistricts = districts.filter((dist) => dist.division_id === divisions.find((d) => d.name === selectedDivision)?.id);
              return (
                <FormItem className="w-full">
                  <FormLabel>District</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value); // store district name
                        setSelectedDistrict(value); // store district name for filtering upazilas
                        form.setValue("area", "");
                      }}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select District" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredDistricts.map((dist) => (
                          <SelectItem key={dist.id} value={dist.name}>
                            {dist.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          {/* Upazila Select */}
          <FormField
            control={form.control}
            name="upazila"
            render={({field}) => {
              const filteredUpazilas = upazilas.filter((upa) => upa.district_id === districts.find((d) => d.name === selectedDistrict)?.id);
              return (
                <FormItem className="w-full">
                  <FormLabel>Upazila</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Upazila" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredUpazilas.map((upa) => (
                          <SelectItem key={upa.id} value={upa.name}>
                            {upa.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="area"
            render={({field}) => (
              <FormItem>
                <FormLabel>Area</FormLabel>
                <FormControl>
                  <Input placeholder="Enter receiver area..." {...field} />
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
