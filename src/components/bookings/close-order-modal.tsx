"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle } from "lucide-react";
import type { BookingOrder } from "@/lib/types";
import { bookingApi } from "@/services/booking-api";
import { toast } from "sonner";
import type { AxiosError } from "axios";

interface CloseOrderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: BookingOrder | null;
  onOrderClosed: (orderId: string) => void;
}

export function CloseOrderModal({
  open,
  onOpenChange,
  order,
  onOrderClosed,
}: CloseOrderModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseOrder = async () => {
    if (!order) return;
    setIsLoading(true);
    try {
      const response = await bookingApi.closeBookingOrder(order._id, {
        state: 1,
        artisanUsername: order.artisanUsername,
      });
      toast.success(`Order ${response.message}`);
      onOrderClosed(order._id);
      onOpenChange(false);
    } catch (error: unknown) {
      console.error("Error closing order:", error);
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as AxiosError<{ message: string }>;
        toast.error(axiosError.response?.data.message || "Failed to close order");
      } else {
        toast.error("Failed to close order");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!order) return null;

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
              <DialogDescription className="text-sm text-gray-500">
                Order #{order._id.slice(-8)}
              </DialogDescription>
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
                <span className="font-medium">Service:</span>{" "}
                {order.service_type}
              </p>
              <p>
                <span className="font-medium">Artisan:</span> {order.artisanUsername}
              </p>
              <p>
                <span className="font-medium">Date:</span>{" "}
                {new Date(order.booking_date).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-700">
              Are you sure the artisan has completed this service and you want
              to close this order? This action will mark the order as completed
              and allow you to submit a review.
            </p>
          </div>
        </div>

        <DialogFooter className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCloseOrder}
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700"
          >
            {isLoading ?  (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                Closing order...
              </div>
            ) : (
              "Close Order"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
