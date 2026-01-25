import {useGetPaymentsStatusQuery} from "@/redux/features/payments/payment.api";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {DollarSign, ReceiptText, BarChart} from "lucide-react";
import LoadingBtn from "@/components/LoadingBtn";

const PaymentStats = () => {
  const {data, isLoading} = useGetPaymentsStatusQuery(undefined);
  const stats = data?.data;

  if (isLoading) return <LoadingBtn></LoadingBtn>;
  if (!stats) return <p className="py-10 text-center">No stats available</p>;

  const totalPayment = stats.totalPayment;
  const totalRevenue = stats.totalRevenue[0]?.totalRevenue || 0;
  const avgAmount = stats.avgTotalAmount[0]?.avgPaymentAmount || 0;
  const totalPaymentByStatus = stats.totalPaymentByStatus;

  return (
    <section className="container mx-auto my-10 space-y-8">
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ReceiptText size={20} /> Total Payments
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">{totalPayment}</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign size={20} /> Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">৳ {totalRevenue}</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart size={20} /> Avg Payment
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">৳ {avgAmount}</CardContent>
        </Card>
      </div>

      {/* Table */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Paid Payment Breakdown</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {totalPaymentByStatus.map((stat: {_id: string; count: number}, index: number) => (
              <TableRow key={index}>
                <TableCell>{stat._id}</TableCell>
                <TableCell>{stat.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default PaymentStats;
