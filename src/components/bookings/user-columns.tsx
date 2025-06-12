"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Calendar, User, Wrench, CheckCircle, Star } from "lucide-react"
import type { BookingOrder } from "@/lib/types"
import { DataTableColumnHeader } from "../datatable/data-table-column-header"
import { getStatusBadge } from "./utils"

interface ColumnsProps {
  onCloseOrder: (order: BookingOrder) => void
  onSubmitReview: (order: BookingOrder) => void
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

const capitalizeServiceType = (service: string) => {
  return service.charAt(0).toUpperCase() + service.slice(1)
}

export const userColumns = ({ onCloseOrder, onSubmitReview }: ColumnsProps): ColumnDef<BookingOrder>[] => [
  {
    accessorKey: "_id",
    header: ({ column }) => <DataTableColumnHeader column={column} title='Order ID' />,
    cell: ({ row }) => {
      const id = row.getValue("_id") as string
      return <div className="font-mono text-sm">#{id.slice(-8)}</div>
    },
  },
  {
    accessorKey: "artisanUsername",
    header: ({ column }) => <DataTableColumnHeader column={column} title='Artisan' />,
    cell: ({ row }) => {
      const artisan = row.getValue("artisanUsername") as string
      return (
        <div className="flex items-center space-x-2">
          <User className="h-4 w-4 text-gray-400" />
          <span className="font-medium">{artisan}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "service_type",
    header: ({ column }) => <DataTableColumnHeader column={column} title='Service' />,
    cell: ({ row }) => {
      const service = row.getValue("service_type") as string
      return (
        <div className="flex items-center space-x-2">
          <Wrench className="h-4 w-4 text-gray-400" />
          <span>{capitalizeServiceType(service)}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "booking_date",
    header: ({ column }) => <DataTableColumnHeader column={column} title='Booking Date' />,
    cell: ({ row }) => {
      const date = row.getValue("booking_date") as string
      return (
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span className="text-sm">{formatDate(date)}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "state",
    header: ({ column }) => <DataTableColumnHeader column={column} title='Status' />,
    cell: ({ row }) => {
      const state = row.getValue("state") as number
      return getStatusBadge(state)
    },
  },
  {
    id: "actions",
    header: ({ column }) => <DataTableColumnHeader column={column} title='Actions' />,
    cell: ({ row }) => {
      const order = row.original
      const canClose = order.state === 0
      const canReview = order.state === 1

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem
              onClick={() => onCloseOrder(order)}
              disabled={!canClose}
              className="flex items-center space-x-2"
            >
              <CheckCircle className="h-4 w-4" />
              <span>Close Order</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onSubmitReview(order)}
              disabled={!canReview}
              className="flex items-center space-x-2"
            >
              <Star className="h-4 w-4" />
              <span>Submit Review</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
