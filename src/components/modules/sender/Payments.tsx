import {useUserPaymentsQuery} from "@/redux/features/payments/payment.api";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import type {Payment} from "@/types/types";
import LoadingBtn from "@/components/LoadingBtn";

const Payments = () => {
  const {data, isLoading} = useUserPaymentsQuery(undefined);
  const payments = data?.data || [];

  if (isLoading) return <LoadingBtn></LoadingBtn>;
  return (
    <section className="container mx-auto my-10">
      <h2 className="text-xl font-semibold mb-4">My Payments</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Transaction ID</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Invoice</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment: Payment, index: number) => (
            <TableRow key={index}>
              <TableCell>{payment.transactionId}</TableCell>
              <TableCell>৳ {payment.amount}</TableCell>
              <TableCell>{payment.status}</TableCell>
              <TableCell>
                {new Date(payment.createdAt).toLocaleDateString("en-BD", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </TableCell>
              <TableCell>
                {payment.status === "PAID" && (
                  <a href={payment.invoiceUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    View Invoice
                  </a>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default Payments;
