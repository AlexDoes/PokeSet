"use client";

import * as React from "react";
import { useState } from "react";
import {
  // ColumnDef,
  // ColumnFiltersState,
  // SortingState,
  // VisibilityState,
  // SortingFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Navigate, useNavigate } from "react-router-dom";
import { MailIcon } from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";

export function DataTable({ columns, data }) {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [loading, setLoading] = useState(true);
  const skeletonRows = Array(25).fill(null);
  const [pageIndex, setPageIndex] = useState(0);

  React.useEffect(() => {
    if (data instanceof Promise) {
      data.then((resolvedData) => {
        setTableData(resolvedData);
        setLoading(false);
      });
    } else {
      setTableData(data);
      setLoading(false);
    }
  }, [data]);

  const [globalFilter, setGlobalFilter] = useState("");
  const textFilter = (row, columnId, filterValue) => {
    const value = row.getValue(columnId)?.toString().toLowerCase();
    return value?.includes(filterValue.toLowerCase());
  };

  const table = useReactTable({
    globalFilterFn: textFilter,
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        // pageIndex,
        pageSize: 25,
      },
    },
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
      pageIndex,
      pageSize: 25,
    },
  });

  return (
    <div className="p-2">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter cards"
          value={table.getState().globalFilter ?? ""}
          onInput={(e) => setGlobalFilter(e.currentTarget.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border-2 h-full w-full overflow-x-hidden overflow-hidden p-2 relative">
        <BorderBeam duration={45} colorTo="#ADD8E6" colorFrom="#5ced73" />
        <Table className="table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="overflow-hidden">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="overflow-x-hidden overflow-hidden overflow-y-hidden">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  onClick={() => navigate(`/cards/${row.original.id}`)}
                  className="cursor-pointer hover:text-cyan-200 overflow-x-hidden overflow-hidden"
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                >
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
            ) : loading ? (
              skeletonRows.map((_, index) => (
                <TableRow key={`skeleton-${index}`}>
                  <TableCell className="w-fit">
                    <div className="h-4  bg-gradient-to-r from-slate-700 to-gray-500 animate-pulse rounded" />
                  </TableCell>
                  <TableCell className="w-fit">
                    <div className="h-4  bg-gradient-to-r from-slate-700 to-gray-500 animate-pulse rounded" />
                  </TableCell>
                  <TableCell className="w-fit">
                    <div className="h-4  bg-gradient-to-r from-slate-700 to-gray-500 animate-pulse rounded" />
                  </TableCell>
                  <TableCell className="w-fit">
                    <div className="h-4  bg-gradient-to-r from-slate-700 to-gray-500 animate-pulse rounded ml-auto" />
                  </TableCell>
                  <TableCell className="w-fit">
                    <div className="h-4  bg-gradient-to-r from-slate-700 to-gray-500 animate-pulse rounded ml-auto" />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <>
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No cards with that parameter
                    <br />
                    <Button
                      onClick={() => {
                        setGlobalFilter("");
                      }}
                      className="h-6 w-fit bg-cyan-300 hover:bg-cyan-500 my-2"
                    >
                      Clear filter
                    </Button>
                    <div className="text-[12px] font-extralight bottom-0 border-2 w-fit justify-self-center place-self-end p-2 mt-2 rounded-md bg-muted flex gap-1">
                      Believe the card you are looking for is not in the
                      database?
                      <a
                        href="mailto:alexswong191@gmail.com?subject=Missing%20Card%20-%20PokèSet"
                        className="text-cyan-300 hover:text-cyan-600 flex items-center justify-center gap-1"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Send me an email <MailIcon size={16} />
                      </a>
                    </div>
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Displaying {table.getRowModel().rows.length * (pageIndex + 1)} of{" "}
          {table.getFilteredRowModel().rows.length} Cards
        </div>
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
    </div>
  );
}
