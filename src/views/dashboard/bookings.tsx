import { useState, useEffect } from "react";
import { DataTable } from "@/components/datatable/data-table";
import { userColumns } from "@/components/bookings/user-columns";
import { artisanColumns } from "@/components/bookings/artisan-columns";
import { CloseOrderModal } from "@/components/bookings/close-order-modal";
import { ReviewModal } from "@/components/bookings/review-modal";
import { bookingApi } from "@/services/booking-api";
import type { BookingOrder } from "@/lib/types";
import { useAuth } from "@/contexts/use-auth";

interface BookingOrderResponse {
  orders: BookingOrder[];
  totalOrders: number;
  currentPage: number;
  totalPages: number;
  success: boolean;
}

const Bookings = () => {
  const { user } = useAuth();
  const [bookingOrders, setBookingOrders] = useState<BookingOrderResponse>({
    orders: [],
    totalOrders: 0,
    currentPage: 1,
    totalPages: 1,
    success: false,
  });
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<BookingOrder | null>(null);
  const [closeModalOpen, setCloseModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const data = (await bookingApi.getBookingOrders(
          1
        )) as BookingOrderResponse;
        setBookingOrders(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setBookingOrders({
          orders: [],
          totalOrders: 0,
          currentPage: 1,
          totalPages: 1,
          success: false,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const handleCloseOrder = (order: BookingOrder) => {
    setSelectedOrder(order);
    setCloseModalOpen(true);
  };

  const handleSubmitReview = (order: BookingOrder) => {
    setSelectedOrder(order);
    setReviewModalOpen(true);
  };

  const handleOrderClosed = (orderId: string) => {
    setBookingOrders((prev) => ({
      ...prev,
      orders: prev.orders.map((order) =>
        order._id === orderId ? { ...order, state: 1 } : order
      ),
    }));
    setCloseModalOpen(false);
    setSelectedOrder(null);
  };

  const handleReviewSubmitted = () => {
    setReviewModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Bookings</h1>
        <p className="mt-2 text-sm text-gray-600">
          View and manage{" "}
          {user?.role === "Artisan"
            ? "your service requests"
            : user?.role === "User"
            ? " your bookings"
            : "bookings"}
        </p>
      </div>

      {user?.role === "Artisan" && (
        <DataTable
          columns={artisanColumns()}
          data={bookingOrders.orders}
          isLoading={loading}
          filterBy="service_type"
        />
      )}

      {user?.role === "User" && (
        <>
          <DataTable
            columns={userColumns({
              onCloseOrder: handleCloseOrder,
              onSubmitReview: handleSubmitReview,
            })}
            data={bookingOrders.orders}
            isLoading={loading}
            filterBy="service_type"
          />

          <CloseOrderModal
            open={closeModalOpen}
            onOpenChange={setCloseModalOpen}
            order={selectedOrder}
            onOrderClosed={handleOrderClosed}
          />

          <ReviewModal
            open={reviewModalOpen}
            onOpenChange={setReviewModalOpen}
            order={selectedOrder}
            onReviewSubmitted={handleReviewSubmitted}
          />
        </>
      )}

      {user?.role === "Admin" && (
        <DataTable
          columns={artisanColumns()}
          data={bookingOrders.orders}
          isLoading={loading}
          filterBy="service_type"
        />
      )}
    </div>
  );
};

export default Bookings;
