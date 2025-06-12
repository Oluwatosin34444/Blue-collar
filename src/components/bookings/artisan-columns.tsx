"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Calendar, User, Wrench } from "lucide-react";
import type { BookingOrder } from "@/lib/types";
import { DataTableColumnHeader } from "../datatable/data-table-column-header";
import { getStatusBadge } from "./utils";

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const capitalizeServiceType = (service: string) => {
  return service.charAt(0).toUpperCase() + service.slice(1);
};

export const artisanColumns = (): ColumnDef<BookingOrder>[] => [
  {
    accessorKey: "_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order ID" />
    ),
    cell: ({ row }) => {
      const id = row.getValue("_id") as string;
      return <div className="font-mono text-sm">#{id.slice(-8)}</div>;
    },
  },
  {
    accessorKey: "booked_by",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer" />
    ),
    cell: ({ row }) => {
      const customer = row.getValue("booked_by") as string;
      return (
        <div className="flex items-center space-x-2">
          <User className="h-4 w-4 text-gray-400" />
          <span className="font-medium">{customer}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "service_type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Service" />
    ),
    cell: ({ row }) => {
      const service = row.getValue("service_type") as string;
      return (
        <div className="flex items-center space-x-2">
          <Wrench className="h-4 w-4 text-gray-400" />
          <span>{capitalizeServiceType(service)}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "booking_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Booking Date" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("booking_date") as string;
      return (
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span className="text-sm">{formatDate(date)}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "state",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const state = row.getValue("state") as number;
      return getStatusBadge(state);
    },
  },
];
