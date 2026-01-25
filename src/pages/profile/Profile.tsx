/* eslint-disable @typescript-eslint/no-explicit-any */
import {authApi, useGetProfileQuery, useLogoutMutation, useUpdateProfileMutation} from "@/redux/features/auth/auth.api";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Form, FormField, FormItem, FormLabel, FormControl, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {ShieldCheck, ShieldAlert, Pencil, User} from "lucide-react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useState} from "react";
import {useNavigate} from "react-router";
import {useAppDispatch} from "@/redux/store";
import {toast} from "sonner";
import {Spinner} from "@/components/ui/spinner";

const profileSchema = z.object({
  fullName: z.string().min(2),
  phone: z.string().min(11),
  address: z.string().min(5),
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
      fullName: profile?.data?.name || "",
      phone: profile?.data?.phone || "",
      address: profile?.data?.address || "",
    },
  });

  const {name, email, role, isVerified} = profile?.data || {};

  const onSubmit = async (values: ProfileFormValues) => {
    const toastId = toast.loading("Updating...");
    try {
      const res = await updateProfile({
        email,
        phone: values.phone,
        address: values.address,
      }).unwrap();

      if (res.success) {
        toast.success("Updated successfully", {id: toastId});
        setEditMode(false);
      }
    } catch (err: any) {
      toast.error(err?.message ? err.message : "Update failed");
    }
  };

  const handleLogout = async () => {
    await logout(undefined);
    dispatch(authApi.util.resetApiState());
    navigate("/");
  };

  if (isLoading) return <Spinner />;

  return (
    <section className="container mx-auto max-w-2xl px-4 min-h-screen md:py-20 py-10">
      <Card className="shadow-md">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold">Profile Settings</CardTitle>
          {!editMode && (
            <Button variant="ghost" size="icon" onClick={() => setEditMode(true)}>
              <Pencil className="w-5 h-5" />
            </Button>
          )}
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Avatar + Name */}
          <div className="flex items-center gap-4">
            {/* <img src="/avatar.png" alt="User Avatar" className="w-14 h-14 rounded-full object-cover" /> */}
            <User />
            <div>
              <h2 className="text-lg font-semibold">{name}</h2>
              <p className="text-sm text-muted-foreground">{email}</p>
            </div>
          </div>

          {/* Email Section */}
          <div className="border rounded-lg p-4 space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">My Email Address</h3>
            <div className="flex justify-between items-center">
              <div>
                <p>{email}</p>
                <p className="text-xs text-muted-foreground">1 month ago</p>
              </div>
            </div>
          </div>

          {/* Form or Display */}
          {editMode ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">
                {["fullName", "phone", "address"].map((field) => (
                  <FormField
                    key={field}
                    control={form.control}
                    name={field as keyof ProfileFormValues}
                    render={({field}) => (
                      <FormItem>
                        <FormLabel className="capitalize">{field.name.replace(/([A-Z])/g, " $1")}</FormLabel>
                        <FormControl>
                          <Input placeholder="Your First Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}

                <div className="flex gap-2">
                  <Button type="submit" disabled={isUpdating} className="text-white">
                    {isUpdating ? "Saving..." : "Save"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setEditMode(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          ) : (
            <div className="grid grid-cols-2 gap-4 text-sm">
              <p>
                <span className="font-medium">Full Name:</span> {name}
              </p>
              <p>
                <span className="font-medium">Contact Number:</span> {profile?.data?.phone || "Not provided"}
              </p>
              <p>
                <span className="font-medium">Address:</span> {profile?.data?.address || "Not provided"}
              </p>
            </div>
          )}

          {/* Verification + Role + Logout */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="capitalize">
                {role}
              </Badge>
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
            {!editMode && (
              <Button onClick={handleLogout} className="cursor-pointer bg-red-500 text-white hover:bg-red-600">
                Logout
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default Profile;
