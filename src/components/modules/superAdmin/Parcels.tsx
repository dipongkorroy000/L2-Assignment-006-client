import {useGetParcelsQuery} from "@/redux/features/parcel/parcel.api";
import {Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious} from "@/components/ui/pagination";
import {Select, SelectTrigger, SelectValue, SelectContent, SelectItem} from "@/components/ui/select";
import divisions from "@/assets/division.json";

import {useReactTable, getCoreRowModel, getSortedRowModel, flexRender, type SortingState} from "@tanstack/react-table";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {useState, useMemo} from "react";
import {type ColumnDef} from "@tanstack/react-table";
import type {TParcel} from "@/types/types";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {parcelStatus, Payment_Status} from "@/constants/ParcelStatus";
import LoadingBtn from "@/components/LoadingBtn";

type StatusLog = {
  status: string;
  updatedBy: string;
  timestamp: string;
};

type Parcel = {
  trackingId: string;
  title: string;
  type: "Document" | "Package";
  weight: number;
  division: string;
  city: string;
  area: string;
  status: string;
  payment: "COMPLETE" | "CANCEL";
  statusLog: StatusLog[];
  receiverNumber: string;
  createdAt: Date;
  senderId: {email: string};
};

const Parcels = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [transactionId, setTransactionId] = useState<string | null>(null);
  const [division, setDivision] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [payment, setPayment] = useState<string | null>(null);

  const {data: rawParcels, isLoading} = useGetParcelsQuery({page: currentPage, division, trackingId: transactionId, status, payment});
  const totalPage = rawParcels?.meta.totalPage;

  const [sorting, setSorting] = useState<SortingState>([]);

  const columns: ColumnDef<TParcel>[] = [
    {header: "Tracking ID", accessorKey: "trackingId"},
    {header: "Title", accessorKey: "title"},
    {header: "Type", accessorKey: "type"},
    {header: "Weight", accessorKey: "weight"},
    {header: "Division", accessorKey: "division"},
    {header: "City", accessorKey: "city"},
    {header: "Area", accessorKey: "area"},
    {header: "Receiver", accessorKey: "receiverNumber"},
    {header: "Sender", accessorKey: "senderEmail"},
    {header: "Status", accessorKey: "status"},
    {header: "Payment", accessorKey: "payment"},
    {
      header: "Created At",
      accessorKey: "createdAt",
      cell: ({row}) => {
        const date = new Date(row.getValue("createdAt"));
        return date.toLocaleDateString("en-BD", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      },
    },
  ];

  const data = useMemo(() => {
    return (
      rawParcels?.data.map((p: Parcel) => ({
        trackingId: p.trackingId,
        title: p.title,
        type: p.type,
        weight: p.weight,
        division: p.division,
        city: p.city,
        area: p.area,
        receiverNumber: p.receiverNumber,
        senderEmail: p.senderId?.email || "N/A",
        status: p.status,
        payment: p.payment,
        createdAt: p.createdAt,
      })) || []
    );
  }, [rawParcels]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {sorting},
  });

  if (isLoading) return <LoadingBtn></LoadingBtn>;

  return (
    <div className="container mx-auto md:space-y-5 space-y-3 md:mt-5 mt-2">
      <div className="min-w-sm flex gap-2">
        <Input
          type="text"
          placeholder="Filter by TransactionId"
          value={transactionId || ""}
          onChange={(e) => {
            setTransactionId(e.target.value);
            setCurrentPage(1);
          }}
        />

        <Select onValueChange={(value) => setDivision(value === "All" ? null : value)} defaultValue={division || undefined}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filter by division" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Divisions</SelectItem>
            {divisions?.map((div) => (
              <SelectItem key={div.id} value={div.name}>
                {div.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

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
            setDivision(null);
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

      <div>
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

export default Parcels;
