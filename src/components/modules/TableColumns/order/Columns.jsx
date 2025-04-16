"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  ArchiveRestore,
  ArrowUpDownIcon,
  MoreHorizontal,
  Trash2,
} from "lucide-react";

const columns = (bin, isMobileScreen, softDelete, permanentDelete, restore) => {
  return [
    {
      id: "select",
      header: ({ table }) =>
        !isMobileScreen && (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
      cell: ({ row }) =>
        !isMobileScreen && (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "customerName",
      header: ({ column }) => {
        return !isMobileScreen ? (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Customer Name
            <ArrowUpDownIcon className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          "Customer Name"
        );
      },
    },
    {
      accessorKey: "customerNumber",
      header: ({ column }) => {
        return !isMobileScreen ? (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Customer Number
            <ArrowUpDownIcon className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          "Customer Number"
        );
      },
    },
    {
      accessorKey: "address",
      header: ({ column }) => {
        return !isMobileScreen ? (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Address
            <ArrowUpDownIcon className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          "Address"
        );
      },
    },
    {
      accessorKey: "orderList",
      header: ({ column }) => {
        return !isMobileScreen ? (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Order List
            <ArrowUpDownIcon className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          "Order List"
        );
      },
    },
    {
      accessorKey: "totalBill",
      header: ({ column }) => {
        return !isMobileScreen ? (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Total Bill
            <ArrowUpDownIcon className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          "Total Bill"
        );
      },
      cell: ({ cell }) => {
        return (
          <p>
            &#8377;
            {`${cell.getValue()}`}
          </p>
        );
      },
    },

    {
      accessorKey: !isMobileScreen ? null : "Actions",
      id: "actions",
      cell: ({ row }) => {
        const { id } = row.original;

        return !isMobileScreen ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              {bin && (
                <form action={restore.bind(null, [id])}>
                  <DropdownMenuItem className="flex items-center p-0">
                    <button
                      type="submit"
                      className="flex items-center w-full px-2 py-1.5"
                    >
                      <span className="text-[18px] mr-2 text-black dark:text-white">
                        <ArchiveRestore size={18} />
                      </span>
                      Restore
                    </button>
                  </DropdownMenuItem>
                </form>
              )}

              <form
                action={
                  bin
                    ? () => permanentDelete([id])
                    : softDelete.bind(null, [id])
                }
              >
                <DropdownMenuItem className="flex items-center p-0">
                  <button
                    type="submit"
                    className="flex items-center w-full px-2 py-1.5"
                  >
                    <span className="text-[18px] mr-2 text-black dark:text-white">
                      <Trash2 size={18} />
                    </span>
                    {bin ? "Delete Forever" : "Delete"}
                  </button>
                </DropdownMenuItem>
              </form>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="w-full flex flex-row flex-grow flex-wrap gap-2">
            <div className="flex-grow">
              <form action={softDelete.bind(null, [id])}>
                <Button
                  variant="outline"
                  className="ml-auto dark:bg-main-bg-color w-full flex-grow dark:text-white"
                >
                  <span className="text-[18px] mr-2 text-black dark:text-white">
                    <Trash2 size={18} />
                  </span>
                  Delete
                </Button>
              </form>
            </div>
          </div>
        );
      },
    },
  ];
};
export default columns;
