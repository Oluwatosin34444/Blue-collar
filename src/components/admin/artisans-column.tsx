"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Artisan } from "@/lib/types";
import { DataTableColumnHeader } from "../datatable/data-table-column-header";
import { Wrench } from "lucide-react";

const capitalizeServiceType = (service: string) => {
  return service.charAt(0).toUpperCase() + service.slice(1);
};

export const artisansColumns = (): ColumnDef<Artisan>[] => [
  {
    accessorKey: "_id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="S/N" />,
    cell: ({ row }) => <div>{row.index + 1}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "Name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const firstName = row.original.firstName;
      const lastName = row.original.lastName;
      return (
        <div className="flex items-center space-x-2">
          <span className="font-medium">{firstName + " " + lastName}</span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-2">
          <span className="font-medium">{row.getValue("email")}</span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-2">
          <span className="font-medium">{row.getValue("username")}</span>
        </div>
      );    
    },
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-2">
          <span className="font-medium">{row.getValue("location")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "service",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Service" />
    ),
    cell: ({ row }) => {
      const service = row.getValue("service") as string;

      return (
        <div className="flex items-center space-x-2">
          <Wrench className="h-4 w-4 text-gray-400" />
          <span>{capitalizeServiceType(service)}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
    cell: ({ row }) => {
      const phone = row.getValue("phone") as string;
      return (
        <div className="flex items-center space-x-2">
          <span className="text-sm">{phone}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "rating",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rating" />
    ),
    cell: ({ row }) => {
      const rating = row.getValue("rating") as number;
      return <span className="text-sm">{rating}</span>;
    },
  },
];
