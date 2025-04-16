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
  ClipboardEdit,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import Link from "next/link";

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
      accessorKey: "name",
      header: ({ column }) => {
        return !isMobileScreen ? (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDownIcon className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          "Name"
        );
      },
    },
    {
      accessorKey: "description",
      header: ({ column }) => {
        return !isMobileScreen ? (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Description
            <ArrowUpDownIcon className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          "Description"
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
              {bin ? (
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
              ) : (
                <Link href={`/dashboard/edit-category/${id}`}>
                  <DropdownMenuItem className="flex items-center">
                    <span className="mr-2 text-black dark:text-white">
                      <ClipboardEdit size={18} />
                    </span>
                    Edit
                  </DropdownMenuItem>
                </Link>
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
            <Link href={`/dashboard/edit-category/${id}`} className="flex-grow">
              <Button
                variant="outline"
                className="dark:bg-main-bg-color dark:text-white w-full"
              >
                <span className="mr-2 text-black dark:text-white">
                  <ClipboardEdit size={18} />
                </span>
                Edit
              </Button>
            </Link>
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
