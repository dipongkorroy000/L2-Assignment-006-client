import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Table, TableHeader, TableRow, TableHead, TableBody, TableCell} from "@/components/ui/table";
import {useNavigate} from "react-router";
import LoadingBtn from "@/components/LoadingBtn";
import {useGetSenderStatsQuery} from "@/redux/features/parcel/parcel.api";

const UserDashboard = () => {
  const navigate = useNavigate();
  const {data, isLoading} = useGetSenderStatsQuery(undefined);

  if (isLoading) return <LoadingBtn />;

  const stats = data?.data;

  // console.log(stats);

  //   export enum Status {
  //   requested = "REQUESTED",
  //   picked = "PICKED",
  //   cancel = "CANCEL",
  // }

  return (
    <section className="container mx-auto py-10 space-y-6">
      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Delivery Summary</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <h4 className="text-xl font-bold">{stats?.totalParcels ?? 0}</h4>
            <p>Total Parcels</p>
          </div>
          <div>
            <h4 className="text-xl font-bold">{stats?.parcelsByStatus?.find((s: {_id: string}) => s._id === "REQUESTED")?.count ?? 0}</h4>
            <p>REQUESTED</p>
          </div>
          <div>
            <h4 className="text-xl font-bold">{stats?.parcelsByPayment?.find((p: {_id: string}) => p._id === "COMPLETE")?.count ?? 0}</h4>
            <p>Paid</p>
          </div>
          <div>
            <h4 className="text-xl font-bold">{stats?.parcelsByStatus?.find((s: {_id: string}) => s._id === "PICKED")?.count ?? 0}</h4>
            <p>PICKED</p>
          </div>
        </CardContent>
      </Card>

      {/* Recent Parcels */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Parcel Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tracking ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stats?.recentParcels?.map((parcel: {_id: string; trackingId: string; title: string; status: string; payment: string; createdAt: Date}) => (
                <TableRow key={parcel._id}>
                  <TableCell>{parcel.trackingId}</TableCell>
                  <TableCell>{parcel.title}</TableCell>
                  <TableCell>{parcel.status}</TableCell>
                  <TableCell>{parcel.payment}</TableCell>
                  <TableCell>{new Date(parcel.createdAt).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Action */}
      <div className="text-center">
        <Button onClick={() => navigate("/sender/parcel-request")} className="text-white">Request New Delivery</Button>
      </div>
    </section>
  );
};

export default UserDashboard;
