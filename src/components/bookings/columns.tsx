"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Calendar, User, Wrench, CheckCircle, Star } from "lucide-react"
import type { BookingOrder } from "@/lib/types"

interface ColumnsProps {
  onCloseOrder: (order: BookingOrder) => void
  onSubmitReview: (order: BookingOrder) => void
}

const getStatusBadge = (state: number) => {
  switch (state) {
    case 0:
      return (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
          Pending
        </Badge>
      )
    case 1:
      return (
        <Badge variant="default" className="bg-blue-100 text-blue-800">
          In Progress
        </Badge>
      )
    case 2:
      return (
        <Badge variant="default" className="bg-green-100 text-green-800">
          Completed
        </Badge>
      )
    default:
      return <Badge variant="outline">Unknown</Badge>
  }
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

export const columns = ({ onCloseOrder, onSubmitReview }: ColumnsProps): ColumnDef<BookingOrder>[] => [
  {
    accessorKey: "_id",
    header: "Order ID",
    cell: ({ row }) => {
      const id = row.getValue("_id") as string
      return <div className="font-mono text-sm">#{id.slice(-8)}</div>
    },
  },
  {
    accessorKey: "booked_by",
    header: "Customer",
    cell: ({ row }) => {
      const customer = row.getValue("booked_by") as string
      return (
        <div className="flex items-center space-x-2">
          <User className="h-4 w-4 text-gray-400" />
          <span className="font-medium">{customer}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "service_type",
    header: "Service",
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
    header: "Booking Date",
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
    header: "Status",
    cell: ({ row }) => {
      const state = row.getValue("state") as number
      return getStatusBadge(state)
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const order = row.original
      const canClose = order.state === 1 // Can only close if in progress
      const canReview = order.state === 2 // Can only review if completed

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
