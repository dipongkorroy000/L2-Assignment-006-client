/* eslint-disable @typescript-eslint/no-explicit-any */
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {cn} from "@/lib/utils";
import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router";
import {toast} from "sonner";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import PasswordShowHide from "@/components/ui/PasswordShowHide";
import {useRegisterMutation} from "@/redux/features/auth/auth.api";

const registerSchema = z
  .object({
    name: z.string().min(3, {error: "Name is too short"}).max(50),
    email: z.email(),
    password: z.string().min(8, {error: "Password minimum 8 character"}),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {message: "Passwords don't match", path: ["confirmPassword"]});

export function RegisterForm({className, ...props}: React.HTMLAttributes<HTMLDivElement>) {
  const [register] = useRegisterMutation();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {name: "", email: "", password: "", confirmPassword: ""},
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    const payload = {name: data.name, email: data.email, password: data.password};
    const toastLoading = toast.loading("loading...");

    try {
      const res = await register(payload).unwrap();
      if (res.email) {
        toast.success("Register successfully", {id: toastLoading});
        navigate("/verification", {state: res.email});
      }
    } catch (error: any) {
      toast.error(error.data.message || error.data, {id: toastLoading});
      console.log(error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      <div className="text-center">
        <h1 className="text-2xl font-bold">Register</h1>
      </div>
      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} value={field.value || ""} required />
                  </FormControl>
                  <FormDescription className="sr-only">This is your public display name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} value={field.value || ""} required />
                  </FormControl>
                  <FormDescription className="sr-only">This is your email</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordShowHide {...field}></PasswordShowHide>
                  </FormControl>
                  <FormDescription className="sr-only">This is your password</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordShowHide {...field}></PasswordShowHide>
                  </FormControl>
                  <FormDescription className="sr-only">This is your Password.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full text-white">
              Register
            </Button>
          </form>
        </Form>
      </div>
      <div className="text-center text-sm">
        Have an account?{" "}
        <Link to="/login" replace className="hover:underline underline-offset-4 text-blue-600">
          Login
        </Link>
      </div>
    </div>
  );
}
