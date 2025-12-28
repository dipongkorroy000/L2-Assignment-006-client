import {authApi, useGetProfileQuery, useLogoutMutation, useUpdateProfileMutation} from "@/redux/features/auth/auth.api";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Form, FormField, FormItem, FormLabel, FormControl, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {ShieldCheck, ShieldAlert} from "lucide-react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useState} from "react";
import {useNavigate} from "react-router";
import {useAppDispatch} from "@/redux/store";
import {toast} from "sonner";

const profileSchema = z.object({
  phone: z.string().min(11, "Contact number must be at least 11 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const Profile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {data: profile, isLoading} = useGetProfileQuery(undefined);
  const [logout] = useLogoutMutation();
  const [updateProfile, {isLoading: isUpdating}] = useUpdateProfileMutation();
  const [editMode, setEditMode] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      phone: profile?.data?.phone || "",
      address: profile?.data?.address || "",
    },
  });

  const {name, email, role, isVerified} = profile?.data || {};

  const onSubmit = async (values: ProfileFormValues) => {
    const toastId = toast.loading("loading...");
    try {
      const res = await updateProfile({email, phone: values.phone, address: values.address}).unwrap();

      if (res.success) {
        toast.success("Updated successfully", {id: toastId});
        setEditMode(false);
      }
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleLogout = async () => {
    await logout(undefined);

    dispatch(authApi.util.resetApiState());
    navigate("/");
  };

  if (isLoading) return <p className="my-10 text-center">Loading...</p>;

  return (
    <section className="container mx-auto max-md:px-6 my-10">
      <Card className="max-w-md mx-auto shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">👤 User Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <span className="font-medium">Name:</span> {name}
          </div>
          <div>
            <span className="font-medium">Email:</span> {email}
          </div>
          <div>
            <span className="font-medium">Role:</span>{" "}
            <Badge variant="outline" className="capitalize">
              {role}
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-medium">Verified:</span>
            {isVerified ? (
              <ShieldCheck className="text-green-600" />
            ) : (
              <>
                <ShieldAlert className="text-yellow-600" />
                <Button variant="destructive" size="sm" onClick={() => navigate("/verification", {state: email})}>
                  Verify Now
                </Button>
              </>
            )}
          </div>

          {editMode ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Contact Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your mobile number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-2">
                  <Button type="submit" disabled={isUpdating}>
                    {isUpdating ? "Saving..." : "Save"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setEditMode(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          ) : (
            <>
              <div>
                <span className="font-medium">Contact Number:</span> {profile?.data?.phone || "Not provided"}
              </div>
              <div>
                <span className="font-medium">Address:</span> {profile?.data?.address || "Not provided"}
              </div>
              <Button onClick={() => setEditMode(true)} className="w-full mt-4 cursor-pointer" variant="ghost">
                Edit
              </Button>
            </>
          )}
          {!editMode && (
            <Button variant="outline" className="w-full mt-2 cursor-pointer" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default Profile;
