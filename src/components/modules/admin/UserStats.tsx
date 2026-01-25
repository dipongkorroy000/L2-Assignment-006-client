/* eslint-disable @typescript-eslint/no-explicit-any */
import {useDeleteUserMutation, useGetUserStatsQuery, useUserRoleUpdateMutation} from "@/redux/features/users/users.api";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Users, UserPlus, ShieldCheck, Ban, UserX, UserCog} from "lucide-react";

import {useForm} from "react-hook-form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Select, SelectTrigger, SelectValue, SelectContent, SelectItem} from "@/components/ui/select";
import {TARoles} from "@/constants/role";
import {toast} from "sonner";
import LoadingBtn from "@/components/LoadingBtn";

const UserStats = () => {
  const {data, isLoading} = useGetUserStatsQuery(undefined);
  const [userRoleUpdate] = useUserRoleUpdateMutation();
  const [deleteUser] = useDeleteUserMutation();
  const stats = data?.data;

  const {
    register: registerRole,
    handleSubmit: handleSubmitRole,
    setValue: setRoleValue,
    formState: {errors: roleErrors},
  } = useForm<{email: string; role: string}>();

  const {
    register: registerDelete,
    handleSubmit: handleSubmitDelete,
    formState: {errors: deleteErrors},
  } = useForm<{email: string}>();

  const onUpdateRole = async (values: {email: string; role: string}) => {
    const toastId = toast.loading("Updating...");

    try {
      const res = await userRoleUpdate(values).unwrap();
      if (res.success) toast.success(res.message, {id: toastId});
      // ------
    } catch (error: any) {
      toast.error(error.data.message, {id: toastId});
    }
  };

  const onDeleteUser = async (values: {email: string}) => {
    const toastId = toast.loading("Updating...");
    try {
      const res = await deleteUser(values).unwrap();

      if (res.success) toast.success(res.message, {id: toastId});
    } catch (error: any) {
      toast.error(error.data.message, {id: toastId});
    }
  };

  if (isLoading) return <LoadingBtn></LoadingBtn>;
  if (!stats) return <h2 className="my-10 text-center">No stats available</h2>;

  return (
    <section className="">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-10">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users size={20} /> Total Users
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">{stats.totalUsers}</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus size={20} /> New Users (Last Week)
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">{stats.newUsersInLastWeek}</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus size={20} /> New Users (Last Month)
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">{stats.newUsersInLastMonth}</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck size={20} /> Active Users
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">{stats.totalActiveUsers}</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserX size={20} /> Inactive Users
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">{stats.totalInActiveUsers}</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ban size={20} /> Blocked Users
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">{stats.totalBlockedUsers}</CardContent>
        </Card>

        {stats.usersByRole?.map((roleStat: {count: number; _id: string}) => (
          <Card key={roleStat._id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCog size={20} /> {roleStat._id}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">{roleStat.count}</CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-10">
        {/* Update Role Form */}
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Update Role by Email</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitRole(onUpdateRole)} className="space-y-4">
              <Input type="email" placeholder="User Email" {...registerRole("email", {required: "Email is required"})} />
              {roleErrors.email && <p className="text-sm text-red-500">{roleErrors.email.message}</p>}

              <Select onValueChange={(value) => setRoleValue("role", value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  {TARoles.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button type="submit" variant={"secondary"} className="w-full cursor-pointer">
                Update Role
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Delete User Form */}
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Delete User by Email</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitDelete(onDeleteUser)} className="space-y-4">
              <Input type="email" placeholder="User Email" {...registerDelete("email", {required: "Email is required"})} />
              {deleteErrors.email && <p className="text-sm text-red-500">{deleteErrors.email.message}</p>}

              <Button type="submit" variant="destructive" className="w-full cursor-pointer">
                Delete User
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default UserStats;
