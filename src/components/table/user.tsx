"use client";

import * as React from "react";
import {
  ColumnDef,
  SortingState,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { supabase } from "@/backend/client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

import { flexRender } from "@tanstack/react-table";
// Define the type for instructors.
export type Instructor = {
  d_instructorid: number;
  first_name: string;
  last_name: string;
  gender: "Male" | "Female";
  email: string;
  phone: string;
  address: string;
  status: "active" | "inactive";
  created_on: string;
  date_of_birth: string;
  guardian_id: number;
};

export function UserTable() {
  const [data, setData] = React.useState<Instructor[]>([]);
  const [guardianEmails, setGuardianEmails] = React.useState<
    Record<number, string>
  >({});
  const [sorting, setSorting] = React.useState<SortingState>([]);

  // Fetch instructors from the "mentees" table.
  React.useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from("mentees").select("*");
      if (error) {
        console.error("Error fetching users:", error);
      } else {
        setData(data || []);
      }
    };
    fetchUsers();
  }, []);

  // Fetch guardian emails from the "guardians" table.
  React.useEffect(() => {
    const fetchEmails = async () => {
      const { data, error } = await supabase
        .from("guardian")
        .select("guardian_id, email");
      if (error) {
        console.error("Error fetching guardian emails:", error);
        return;
      }
      const emails = data?.reduce(
        (acc, curr) => {
          acc[curr.guardian_id] = curr.email;
          return acc;
        },
        {} as Record<number, string>
      );
      setGuardianEmails(emails || {});
    };
    fetchEmails();
  }, []);

  // Define table columns.
  const columns: ColumnDef<Instructor>[] = [
    {
      accessorKey: "first_name",
      header: "First Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("first_name")}</div>
      ),
    },
    {
      accessorKey: "last_name",
      header: "Last Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("last_name")}</div>
      ),
    },
    {
      accessorKey: "guardian_id",
      header: "Guardian Email",
      cell: ({ row }) => {
        const guardianId = row.getValue<number>("guardian_id");
        return (
          <div className="lowercase">{guardianEmails[guardianId] || "N/A"}</div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("status")}</div>
      ),
    },
  ];

  // Initialize the table with react-table.
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by first name..."
          value={
            (table.getColumn("first_name")?.getFilterValue() as string) || ""
          }
          onChange={(event) =>
            table.getColumn("first_name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table.getAllColumns().map((column) => (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div
                        className="flex items-center"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getIsSorted() && (
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        )}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <Skeleton className="h-8 w-1/3" />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between py-4">
        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
      </div>
    </div>
  );
}
