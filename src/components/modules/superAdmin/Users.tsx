import {useGetUsersQuery} from "@/redux/features/users/users.api";
import {useReactTable, getCoreRowModel, getSortedRowModel, flexRender, type SortingState} from "@tanstack/react-table";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {type ColumnDef} from "@tanstack/react-table";
import {useState} from "react";
import {Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious} from "@/components/ui/pagination";
import {Select, SelectTrigger, SelectValue, SelectContent, SelectItem} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import type {TUser} from "@/types/types";

const userRoles: string[] = ["SENDER", "RECEIVER", "ADMIN", "SUPER_ADMIN"];

const columns: ColumnDef<TUser>[] = [
  {header: "Email", accessorKey: "email"},
  {header: "Phone", accessorKey: "phone"},
  {header: "Address", accessorKey: "address"},
  {header: "Role", accessorKey: "role"},
  {header: "Status", accessorKey: "isActive"},
  {
    header: "Verified",
    accessorKey: "isVerified",
    cell: ({row}) => (row.getValue("isVerified") ? "✅" : "❌"),
  },
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

const Users = () => {
  const [phone, setPhone] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const {data, isLoading} = useGetUsersQuery({page: currentPage, email, role, phone});
  const users = data?.data || [];

  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {sorting},
  });

  const totalPage = data?.meta.totalPage;

  if (isLoading) return <p className="my-10 text-center">Loading....</p>;

  return (
    <div className="container mx-auto my-10">
      <h2 className="text-xl font-semibold mb-4">All Users</h2>

      <div className="flex gap-2 mb-5">
        {/* Role Filter */}
        <Select onValueChange={(value) => setRole(value === "All" ? null : value)} defaultValue={role || undefined}>
          <SelectTrigger className="min-w-[180px]">
            <SelectValue placeholder="Filter by Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All USERS</SelectItem>
            {userRoles.map((singleRole) => (
              <SelectItem key={singleRole} value={singleRole}>
                {singleRole}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Email Filter */}
        <Input
          type="email"
          placeholder="Filter by Email"
          value={email || ""}
          onChange={(e) => {
            setEmail(e.target.value);
            setCurrentPage(1);
          }}
          className=""
        />

        {/* Phone Filter */}
        <Input
          type="tel"
          placeholder="Filter by Phone"
          value={phone || ""}
          onChange={(e) => {
            setPhone(e.target.value);
            setCurrentPage(1);
          }}
          className=""
        />

        {/* Clear Button */}
        <Button
          onClick={() => {
            setCurrentPage(1);
            setEmail(null);
            setRole(null);
            setPhone(null);
          }}
          variant="secondary"
          className="cursor-pointer"
        >
          Clear
        </Button>
      </div>

      {/* table */}
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

export default Users;
