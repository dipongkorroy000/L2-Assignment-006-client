import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import LoadingBtn from "@/components/LoadingBtn";
import {useGetParcelsStatsQuery} from "@/redux/features/parcel/parcel.api";
import {useGetUserStatsQuery} from "@/redux/features/users/users.api";

const DashboardHome = () => {
  const {data, isLoading} = useGetUserStatsQuery(undefined);
  const {data: parcelStats, isLoading: loading} = useGetParcelsStatsQuery(undefined);

  if (isLoading || loading) return <LoadingBtn />;

  const userStats = data?.data;
  const parcelData = parcelStats?.data;

  return (
    <section className="container mx-auto py-10 space-y-6">
      {/* User Stats */}
      <Card>
        <CardHeader>
          <CardTitle>User Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Metric</TableHead>
                <TableHead>Count</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Total Users</TableCell>
                <TableCell>{userStats?.totalUsers}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Active Users</TableCell>
                <TableCell>{userStats?.totalActiveUsers}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Inactive Users</TableCell>
                <TableCell>{userStats?.totalInactiveUsers}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Blocked Users</TableCell>
                <TableCell>{userStats?.totalBlockedUsers}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>New Users (Last Month)</TableCell>
                <TableCell>{userStats?.newUsersInLastMonth}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>New Users (Last Week)</TableCell>
                <TableCell>{userStats?.newUsersInLastWeek}</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="mt-6">
            <h4 className="font-semibold mb-2">Users by Role</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role</TableHead>
                  <TableHead>Count</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userStats?.usersByRole?.map((role: {_id: number; count: number}) => (
                  <TableRow key={role._id}>
                    <TableCell>{role._id}</TableCell>
                    <TableCell>{role.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Parcel Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Parcel Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Metric</TableHead>
                <TableHead>Count</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Total Parcels</TableCell>
                <TableCell>{parcelData?.totalParcel}</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="mt-6">
            <h4 className="font-semibold mb-2">Status Log Counts</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Status</TableHead>
                  <TableHead>Count</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {parcelData?.statusLogEachStatusCount?.map((item: {status: string; count: number}, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>{item.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold mb-2">Parcel by Status</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Status</TableHead>
                  <TableHead>Count</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {parcelData?.totalParcelByStatus?.map((item: {_id: number; count: number}, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{item._id}</TableCell>
                    <TableCell>{item.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default DashboardHome;
