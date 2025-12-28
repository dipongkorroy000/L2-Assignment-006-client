/* eslint-disable @typescript-eslint/no-explicit-any */
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {useGetParcelsQuery, useGetParcelsStatsQuery, useUpdateParcelStatusLogMutation} from "@/redux/features/parcel/parcel.api";
import {useState, useMemo} from "react";
import {type ColumnDef} from "@tanstack/react-table";
import {useReactTable, getCoreRowModel, getSortedRowModel, flexRender, type SortingState} from "@tanstack/react-table";
import type {TParcel} from "@/types/types";
import {Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious} from "@/components/ui/pagination";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Select, SelectTrigger, SelectValue, SelectContent, SelectItem} from "@/components/ui/select";
import {deliveryStatusOptions, parcelStatus, Payment_Status} from "@/constants/ParcelStatus";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {ReceiptText} from "lucide-react";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {toast} from "sonner";

const parcelUpdateSchema = z.object({
  trackingId: z.string(),
  status: z.string(),
  location: z.string(),
  note: z.string(),
});

const ParcelStats = () => {
  // stats query
  const {data: parcelStats, isLoading} = useGetParcelsStatsQuery(undefined);
  const [updateParcelStatusLog] = useUpdateParcelStatusLogMutation(undefined);
  const stats = parcelStats?.data;
  const statusLogEachStatusCount = stats?.statusLogEachStatusCount; // [{}]
  const totalParcel = stats?.totalParcel || 0; // number
  const totalParcelByStatus = stats?.totalParcelByStatus || [];

  // parcels query
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [payment, setPayment] = useState<string | null>(null);

  const {data: rawParcels, isLoading: parcelLoading} = useGetParcelsQuery({
    page: currentPage,
    trackingId: transactionId,
    status,
    payment,
  });

  const totalPage = rawParcels?.meta.totalPage;

  const [sorting, setSorting] = useState<SortingState>([]);

  const data = useMemo(() => {
    return (
      rawParcels?.data.map((p: {trackingId: string; status: string; payment: string; statusLog: any}) => ({
        trackingId: p.trackingId,
        status: p.status,
        payment: p.payment,
        statusLog: p.statusLog.length > 0 ? p.statusLog[p.statusLog.length - 1].status : "N/A",
      })) || []
    );
  }, [rawParcels]);

  const columns: ColumnDef<TParcel>[] = [
    {header: "Tracking ID", accessorKey: "trackingId"},
    {header: "User Status", accessorKey: "status"},
    {header: "Payment", accessorKey: "payment"},
    {header: "Delivery Status", accessorKey: "statusLog"},
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {sorting},
  });

  const form = useForm({
    resolver: zodResolver(parcelUpdateSchema),
    defaultValues: {
      note: "",
      status: "",
      location: "",
    },
  });

  const onSubmit = async (values: {trackingId: string; note: string; location: string; status: string}) => {
    const {trackingId, ...rest} = values;

    const updatedDoc = {trackingId, payload: rest};
    const toastId = toast.loading("Updating...");
    try {
      const res = await updateParcelStatusLog(updatedDoc).unwrap();

      if (res.success) return toast.success(res.message, {id: toastId});
    } catch (error: any) {
      toast.error(error.data.message, {id: toastId});
    }
  };

  if (isLoading || parcelLoading) return <p className="my-10 text-center">Loading....</p>;

  return (
    <div>
      <div>
        <div>
          <Card className="min-w-sm m-5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ReceiptText size={20} /> Total Payments
              </CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">{totalParcel}</CardContent>
          </Card>
        </div>

        <div className="flex flex-wrap gap-5">
          <div className="flex gap-10 w-full m-5">
            <Table className="border">
              <TableHeader>
                <TableRow>
                  <TableHead>Delivery Status</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {statusLogEachStatusCount.map((i: {status: string; count: number}, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{i.status}</TableCell>
                    <TableCell>{i.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Table className="border">
              <TableHeader>
                <TableRow>
                  <TableHead>Parcel Status</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {totalParcelByStatus.map((i: {_id: string; count: number}, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{i._id}</TableCell>
                    <TableCell>{i.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <div className="mt-5 mb-3 flex gap-5">
        <Input
          type="text"
          placeholder="Filter by TransactionId"
          value={transactionId || ""}
          onChange={(e) => {
            setTransactionId(e.target.value);
            setCurrentPage(1);
          }}
        />

        <Select onValueChange={(value) => setStatus(value === "All" ? null : value)} defaultValue={status || undefined}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Status</SelectItem>
            {parcelStatus?.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => setPayment(value === "All" ? null : value)} defaultValue={payment || undefined}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filter by payment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Type Payment</SelectItem>
            {Payment_Status?.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Clear Button */}
        <Button
          onClick={() => {
            setCurrentPage(1);
            setStatus(null);
            setPayment(null);
            setTransactionId(null);
          }}
          variant="secondary"
          className="cursor-pointer"
        >
          Clear
        </Button>
      </div>

      <div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} onClick={header.column.getToggleSortingHandler()} className="cursor-pointer">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getIsSorted() === "asc" ? " 🔼" : header.column.getIsSorted() === "desc" ? " 🔽" : ""}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="my-10 w-3/5 mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <FormField
              control={form.control}
              name="trackingId"
              render={({field}) => (
                <FormItem className="w-full">
                  <FormLabel>Delivery Status</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!rawParcels?.data} required={true}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select division" />
                      </SelectTrigger>
                      <SelectContent>
                        {rawParcels?.data.map((status: {trackingId: string}) => (
                          <SelectItem key={status.trackingId} value={status.trackingId}>
                            {status.trackingId}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({field}) => (
                <FormItem className="w-full">
                  <FormLabel>Delivery Status</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value} required={true}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select division" />
                      </SelectTrigger>
                      <SelectContent>
                        {deliveryStatusOptions.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="note"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                    <Input placeholder="Describe the parcel..." {...field} required={true} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Describe the parcel..." {...field} required={true} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" variant={"outline"} className="cursor-pointer">
              Update
            </Button>
          </form>
        </Form>
      </div>

      {/* pagination */}
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

export default ParcelStats;
