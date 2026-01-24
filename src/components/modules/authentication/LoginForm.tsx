/* eslint-disable @typescript-eslint/no-explicit-any */
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import PasswordShowHide from "@/components/ui/PasswordShowHide";
import {cn} from "@/lib/utils";
import {useLoginMutation} from "@/redux/features/auth/auth.api";
import type {ILogin} from "@/types/types";
import {type FieldValues, type SubmitHandler, useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router";
import {toast} from "sonner";
import z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import config from "@/config/envVars";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export function LoginForm({className, ...props}: React.HTMLAttributes<HTMLDivElement>) {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {email: "", password: ""},
  });
  const [login] = useLoginMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await login(data as ILogin).unwrap();
      if (res.success) {
        toast.success("Logged in successfully");
        navigate("/");
      }
    } catch (error: any) {
      if (error.data?.message) toast.error(error.data.message);
    }
  };

  // Generic demo login handler
  const handleDemoLogin = async (demoData: ILogin, label: string) => {
    try {
      const res = await login(demoData).unwrap();
      if (res.success) {
        toast.success(`Logged in as ${label}`);
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error.data?.message || "Login failed");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
      </div>
      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john@example.com" {...field} value={field.value || ""} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordShowHide {...field}></PasswordShowHide>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <Button type="submit" className="w-full text-white">
              Login
            </Button>

            {/* Demo Buttons */}
            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => handleDemoLogin({email: config.superAdmin, password: config.adminPass}, "Demo Admin")}
              >
                Login as Demo Admin
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => handleDemoLogin({email: "dipongkorroy00000@gmail.com", password: config.adminPass}, "Demo Sender")}
              >
                Login as Demo Sender
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => handleDemoLogin({email: "diproy0990@gmail.com", password: config.adminPass}, "Demo Receiver")}
              >
                Login as Demo Receiver
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/register" replace className="hover:underline underline-offset-4 text-blue-600">
          Sign up
        </Link>
      </div>
    </div>
  );
}
