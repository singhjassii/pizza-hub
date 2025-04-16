"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArchiveRestore,
  DownloadCloudIcon,
  RefreshCw,
  Search,
  Trash2,
  X,
} from "lucide-react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useOptimistic, useState } from "react";
import { useFormStatus } from "react-dom";
import { useMediaQuery } from "react-responsive";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "../../../Icons/indexIcon";
import SubmitSuccessfulConfirmation from "../Form/SubmitSuccessfulConfirmation";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

export function DataTable({
  data,
  columns,
  filterKey,
  filterWithIn,
  bin,
  currentPage,
  currentLimit,
  currentSearched,
  softDeleteRows,
  restoreDeletedRows,
  permanentDeleteRows,
  binUrl,
  colConfig,
}) {
  const { pending } = useFormStatus();
  const router = useRouter();
  const pathname = usePathname();
  const isMobileScreen = useMediaQuery({ query: "(max-width: 768px)" });
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  //
  // const [actionTaking, setActionTaking] = useState(false);
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: currentPage - 1, // initial page index
    pageSize: currentLimit, // default page size
  });
  const [
    showSubmitSuccessfulConfirmation,
    setShowSubmitSuccessfulConfirmation,
  ] = useState(false);
  useEffect(() => {
    if (showSubmitSuccessfulConfirmation) {
      const timer = setTimeout(() => {
        setShowSubmitSuccessfulConfirmation(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSubmitSuccessfulConfirmation]);

  const renderFieldMisc = (key, cell) => {
    switch (key) {
      default:
        return flexRender(cell.column.columnDef.cell, cell.getContext());
    }
  };
  //
  const [optimisticRows, setOptimisticRows] = useOptimistic(
    data?.rows,
    (currentRows, deletedRows) => {
      return currentRows.filter((row) => !deletedRows.includes(row.id));
    }
  );
  const [optimisticCount, setOptimisticCount] = useOptimistic(
    data?.count,
    (currentCount, deletedRowsLength) => {
      return currentCount - deletedRowsLength;
    }
  );
  // mutationFunctions

  const softDelete = async (ids) => {
    try {
      setOptimisticRows(ids);
      setOptimisticCount(ids.length);
      // table.toggleAllPageRowsSelected();
      await softDeleteRows(ids);
    } catch (error) {
      throw new Error(`error occured while multiple soft delete ${error}`);
    }
  };
  const permanentDelete = async () => {
    const ids = deleteConfirmationModal;
    try {
      setOptimisticRows(ids);
      setOptimisticCount(ids.length);
      setDeleteConfirmationModal(false);
      await permanentDeleteRows(ids);
    } catch (error) {
      throw new Error(
        `error occured while multiple permanent deletes ${error}`
      );
    }
  };
  const restore = async (ids) => {
    try {
      setOptimisticRows(ids);
      setOptimisticCount(ids.length);
      await restoreDeletedRows(ids);
    } catch (error) {
      throw new Error(`error occured while multiple restores ${error}`);
    }
  };
  const table = useReactTable({
    data: optimisticRows,
    columns: columns(
      bin,
      isMobileScreen,
      softDelete,
      setDeleteConfirmationModal,
      restore
    ),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
    onPaginationChange: setPagination,
    manualPagination: true,
    autoResetPageIndex: false, // turn off auto reset of pageIndex
    rowCount: optimisticCount,
  });
  const exportCSVHandler = () => {
    const csvRows = [];
    // Add the headers
    csvRows.push(colConfig.map((item) => item.label).join(","));
    // Add the rows
    table.getSelectedRowModel().rows.forEach(({ original }) => {
      const dataRow = colConfig.map((col) => {
        if (col.func) {
          return col.func(original[col.name]);
        }
        return original[col.name];
      });
      csvRows.push(dataRow.map((field) => field).join(","));
    });

    // Create a Blob from the CSV string
    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    // Create a link element to trigger the download
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Clean up and remove the link
    document.body.removeChild(link);
  };
  return (
    <>
      {showSubmitSuccessfulConfirmation && (
        <div className="mt-4 mb-2">
          <SubmitSuccessfulConfirmation
            message={showSubmitSuccessfulConfirmation}
          />
        </div>
      )}
      {deleteConfirmationModal && (
        <div className="overlay-sidebar flex justify-center items-center">
          <DeleteConfirmationModal
            setDeleteConfirmationModal={setDeleteConfirmationModal}
            deleteRole={permanentDelete}
            deleteConfirmationModal={deleteConfirmationModal}
          />
        </div>
      )}
      {data && (
        <div>
          <div className={`flex items-center  justify-between `}>
            <div className={`flex w-full lg:w-fit items-center py-4 gap-3 `}>
              <Input
                placeholder={`Filter ${filterWithIn}...`}
                value={
                  (currentSearched ||
                    table.getColumn(filterKey)?.getFilterValue()) ??
                  ""
                }
                onChange={(event) =>
                  table.getColumn(filterKey)?.setFilterValue(event.target.value)
                }
                disabled={currentSearched && true}
                className="dark:text-white"
              />
              {table.getColumn(filterKey)?.getFilterValue() &&
                !currentSearched && (
                  <Button
                    variant="outline"
                    className="ml-auto dark:bg-main-bg-color dark:text-white"
                    onClick={() => {
                      router.push(
                        `?search=${table.getColumn(filterKey)?.getFilterValue()}`
                      );
                    }}
                  >
                    <span className="text-[18px] text-black dark:text-white">
                      <Search size={18} />
                    </span>
                  </Button>
                )}

              {currentSearched && (
                <Button
                  variant="outline"
                  className="ml-auto dark:bg-main-bg-color dark:text-white  lg:block"
                  onClick={() => {
                    table.getColumn(filterKey)?.setFilterValue("");
                    router.push(pathname);
                  }}
                >
                  <span className="text-[18px] text-black dark:text-white">
                    <X size={18} />
                  </span>
                </Button>
              )}

              {(table.getIsSomePageRowsSelected() ||
                table.getIsAllPageRowsSelected()) && (
                <form
                  action={
                    bin
                      ? restore.bind(
                          null,
                          table
                            .getSelectedRowModel()
                            .rows.map(({ original: { id } }) => id)
                        )
                      : softDelete.bind(
                          null,
                          table
                            .getSelectedRowModel()
                            .rows.map(({ original: { id } }) => id)
                        )
                  }
                >
                  <Button
                    variant="outline"
                    className="ml-auto dark:bg-main-bg-color dark:text-white"
                  >
                    <span className="text-[18px] mr-2 text-black dark:text-white">
                      {!bin ? (
                        <Trash2 size={18} />
                      ) : (
                        <ArchiveRestore size={18} />
                      )}
                    </span>
                    {!bin ? "Add to Bin" : "Restore"}
                  </Button>
                </form>
              )}
              {(table.getIsSomePageRowsSelected() ||
                table.getIsAllPageRowsSelected()) &&
                colConfig && (
                  <Button
                    variant="outline"
                    className="ml-auto dark:bg-main-bg-color dark:text-white"
                    onClick={exportCSVHandler}
                  >
                    <span className="text-[18px] mr-2 text-black dark:text-white">
                      <DownloadCloudIcon size={18} />
                    </span>
                    Export CSV
                  </Button>
                )}
              {bin &&
                (table.getIsSomePageRowsSelected() ||
                  table.getIsAllPageRowsSelected()) && (
                  <Button
                    variant="outline"
                    className="ml-auto dark:bg-main-bg-color dark:text-white"
                    onClick={() =>
                      setDeleteConfirmationModal(
                        table
                          .getSelectedRowModel()
                          .rows.map(({ original: { id } }) => id)
                      )
                    }
                  >
                    <span className="text-[18px] mr-2 text-black dark:text-white">
                      <Trash2 size={18} />
                    </span>
                    Delete Forever
                  </Button>
                )}
            </div>

            <div className={`flex items-center justify-between gap-3 `}>
              <Button
                variant="outline"
                className="ml-auto dark:bg-main-bg-color dark:text-white"
                onClick={() => {
                  setPagination({
                    pageIndex: 0, // initial page index
                    pageSize: 10, // default page size
                  });
                }}
              >
                <span
                  className={`text-[18px] text-black dark:text-white ${pending && "animate-spin"}`}
                >
                  <RefreshCw size={18} />
                </span>
              </Button>
              {!bin && (
                <Link href={`/dashboard${binUrl}`}>
                  <Button
                    variant="outline"
                    className="ml-auto dark:bg-main-bg-color dark:text-white"
                  >
                    <span className="text-[18px] mr-2 text-black dark:text-white">
                      <Trash2 size={18} />
                    </span>
                    Bin
                  </Button>
                </Link>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="ml-auto dark:bg-main-bg-color  dark:text-white"
                  >
                    Columns
                    <div className="ml-2">
                      <ChevronDownIcon size="10px" />
                    </div>
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
          </div>
          {!isMobileScreen && (
            <div className="rounded-md overflow-hidden border">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id} className="">
                            {header.isPlaceholder
                              ? null
                              : header.id === "actions"
                                ? "Actions"
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody className="">
                  {table.getRowModel()?.rows?.length ? (
                    table.getRowModel()?.rows?.map((row, mainRowIndex) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                        className=""
                      >
                        {row.getVisibleCells().map((cell, index) => {
                          const test = row
                            .getVisibleCells()
                            .some(
                              (cell) =>
                                cell.id.slice(cell.id.indexOf("_") + 1) ===
                                "select"
                            );

                          return (
                            <TableCell key={cell.id}>
                              <div
                                className={`${index !== 0 && test && "ml-4"} w-full `}
                              >
                                {renderFieldMisc(
                                  cell.id.slice(cell.id.indexOf("_") + 1),
                                  cell,
                                  mainRowIndex
                                )}
                              </div>
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={100} className="h-24 text-center">
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
          {isMobileScreen && (
            <div className="flex flex-col gap-5">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => {
                  return (
                    <div
                      key={row.id}
                      className="rounded-md border flex flex-col"
                    >
                      <div className="text-field-text-color flex flex-row justify-between">
                        <div className="gap-3 flex flex-col w-full">
                          {row
                            .getVisibleCells()
                            .slice(1)
                            .map((cell, index) => {
                              return (
                                <div
                                  key={cell.id}
                                  className="flex flex-row items-center w-full justify-between last:border-none border-b p-5"
                                >
                                  <p className="font-semibold w-[40%]">
                                    {flexRender(
                                      table.getHeaderGroups()[0].headers[
                                        index + 1
                                      ].column.columnDef.header,
                                      table
                                        .getHeaderGroups()[0]
                                        .headers[index + 1].getContext()
                                    )}
                                  </p>
                                  <p className="w-[10%]">:</p>
                                  <div className="w-[40%] overflow-hidden text-ellipsis">
                                    {renderFieldMisc(
                                      cell.id.slice(cell.id.indexOf("_") + 1),
                                      cell
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={100} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </div>
          )}
          <div className="flex items-center justify-between px-2 py-2 flex-col md:flex-row">
            <div className="flex-1 text-sm text-muted-foreground dark:text-white">
              {table.getFilteredSelectedRowModel().rows.length}
              &nbsp; of&nbsp;
              {table.getFilteredRowModel().rows.length}
              &nbsp;row(s) selected out of&nbsp;
              {table.getRowCount()}
              &nbsp;entries.
            </div>
            <div className="flex items-center space-x-6 lg:space-x-8 flex-col md:flex-row">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium dark:text-white">
                  Rows per page
                </p>
                <Select
                  value={`${table.getState().pagination.pageSize}`}
                  onValueChange={(value) => {
                    table.setPageSize(Number(value));
                    router.push(`?limit=${value}`);
                  }}
                >
                  <SelectTrigger className="h-8 w-[70px]">
                    <SelectValue
                      placeholder={table.getState().pagination.pageSize}
                    />
                  </SelectTrigger>
                  <SelectContent side="top">
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                      <SelectItem key={pageSize} value={`${pageSize}`}>
                        {pageSize}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex w-[100px] items-center justify-center dark:text-white text-sm font-medium py-2 md:py-0">
                Page&nbsp;
                {table.getState().pagination.pageIndex + 1}
                &nbsp;of&nbsp;
                {table.getPageCount()}
              </div>
              <div className="flex items-center space-x-2 ">
                <Link
                  href={currentSearched ? `1?search=${currentSearched}` : `1`}
                  className={`${!table.getCanPreviousPage() && "pointer-events-none"}`}
                >
                  <Button
                    variant="outline"
                    className="hidden h-8 w-8 p-0 lg:flex"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                  >
                    <span className="sr-only">Go to first page</span>
                    <DoubleArrowLeftIcon className="h-4 w-4" />
                  </Button>
                </Link>
                <Link
                  href={
                    currentSearched
                      ? `${currentPage - 1}?search=${currentSearched}`
                      : `${currentPage - 1}`
                  }
                  className={`${!table.getCanPreviousPage() && "pointer-events-none"}`}
                >
                  <Button
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    <span className="sr-only">Go to previous page</span>
                    <ChevronLeftIcon className="h-4 w-4" />
                  </Button>
                </Link>
                <Link
                  href={
                    currentSearched
                      ? `${currentPage + 1}?search=${currentSearched}`
                      : `${currentPage + 1}`
                  }
                  className={`${!table.getCanNextPage() && "pointer-events-none"}`}
                >
                  <Button
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    <span className="sr-only">Go to next page</span>
                    <ChevronRightIcon className="h-4 w-4" />
                  </Button>
                </Link>
                <Link
                  href={
                    currentSearched
                      ? `${table.getPageCount()}?search=${currentSearched}`
                      : `${table.getPageCount()}`
                  }
                  className={`${!table.getCanNextPage() && "pointer-events-none"}`}
                >
                  <Button
                    variant="outline"
                    className="hidden h-8 w-8 p-0 lg:flex"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                  >
                    <span className="sr-only">Go to last page</span>
                    <DoubleArrowRightIcon className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
