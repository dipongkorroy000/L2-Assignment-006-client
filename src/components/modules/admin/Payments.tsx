import {useGetPaymentsQuery} from "@/redux/features/payments/payment.api";
import {useState} from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import type {TPayment} from "@/types/types";
import {Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious} from "@/components/ui/pagination";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import LoadingBtn from "@/components/LoadingBtn";

const statusArray: string[] = ["PAID", "UNPAID", "CANCEL", "FAILED", "REFUNDED"];

const Payments = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [status, setStatus] = useState<string | null>(null);
  const [transactionId, setTransactionId] = useState<string | null>(null);

  const {data, isLoading} = useGetPaymentsQuery({transactionId, status, page: currentPage});
  const payments = data?.data?.data || [];

  const totalPage = data?.data?.meta.totalPage;

  if (isLoading) return <LoadingBtn></LoadingBtn>;
  return (
    <div className="container mx-auto my-10">
      <h2 className="text-xl font-semibold mb-4">All Payments</h2>

      <div className="flex gap-3">
        {/* Role Filter */}
        <Select onValueChange={(value) => setStatus(value === "All" ? null : value)} defaultValue={status || undefined}>
          <SelectTrigger className="min-w-[180px]">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Payment</SelectItem>
            {statusArray.map((state) => (
              <SelectItem key={state} value={state}>
                {state}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* TransactionId Filter */}
        <Input
          type="text"
          placeholder="Filter by TransactionId"
          value={transactionId || ""}
          onChange={(e) => {
            setTransactionId(e.target.value);
            setCurrentPage(1);
          }}
          className="w-fit"
        />

        {/* Clear Button */}
        <Button
          onClick={() => {
            setCurrentPage(1);
            setStatus(null);
            setCurrentPage(1);
            setTransactionId(null);
          }}
          variant="secondary"
          className="cursor-pointer"
        >
          Clear
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Transaction ID</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
            <TableHead>Invoice</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments?.map((payment: TPayment, index: number) => (
            <TableRow key={index}>
              <TableCell>{payment.transactionId}</TableCell>
              <TableCell>${payment.amount}</TableCell>
              <TableCell>{payment.status}</TableCell>
              <TableCell>
                {new Date(payment.createdAt).toLocaleDateString("en-BD", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </TableCell>
              <TableCell>
                {new Date(payment.updatedAt).toLocaleDateString("en-BD", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </TableCell>
              <TableCell>
                <a href={payment.invoiceUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  View Invoice
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-5">
        {totalPage > 1 && (
          <div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                {Array.from({length: totalPage}, (_, index) => index + 1).map((page) => (
                  <PaginationItem key={page} onClick={() => setCurrentPage(page)}>
                    <PaginationLink isActive={currentPage === page}>{page}</PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className={currentPage === totalPage ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payments;
