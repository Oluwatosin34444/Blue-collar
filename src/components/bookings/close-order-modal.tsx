"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertTriangle } from "lucide-react"
import type { BookingOrder } from "@/lib/types"

interface CloseOrderModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  order: BookingOrder | null
  onOrderClosed: (orderId: string) => void
}

export function CloseOrderModal({ open, onOpenChange, order, onOrderClosed }: CloseOrderModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleCloseOrder = async () => {
    if (!order) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    onOrderClosed(order._id)
    setIsLoading(false)
  }

  if (!order) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <DialogTitle>Close Order</DialogTitle>
              <DialogDescription className="text-sm text-gray-500">Order #{order._id.slice(-8)}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4">
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">Service Details</span>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <span className="font-medium">Service:</span> {order.service_type}
              </p>
              <p>
                <span className="font-medium">Customer:</span> {order.booked_by}
              </p>
              <p>
                <span className="font-medium">Date:</span> {new Date(order.booking_date).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-700">
              Are you sure the artisan has completed this service and you want to close this order? This action will
              mark the order as completed and allow the customer to submit a review.
            </p>
          </div>
        </div>

        <DialogFooter className="flex space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleCloseOrder} disabled={isLoading} className="bg-green-600 hover:bg-green-700">
            {isLoading ? "Closing..." : "Close Order"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
