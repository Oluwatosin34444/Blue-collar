import { useState, useEffect } from "react";
import { DataTable } from "@/components/datatable/data-table";
import { userColumns } from "@/components/bookings/user-columns";
import { artisanColumns } from "@/components/bookings/artisan-columns";
import { adminColumns } from "@/components/bookings/admin-columns";
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
  const [bookingOrders, setBookingOrders] = useState<BookingOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<BookingOrder | null>(null);
  const [closeModalOpen, setCloseModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  useEffect(() => {
    if (user?.role === "User" || user?.role === "Admin") {
      const fetchBookings = async () => {
        setLoading(true);
        try {
          let allBookings: BookingOrder[] = [];
          let totalPages = 1;

          const firstPageData = (await bookingApi.getBookingOrders(
            1
          )) as BookingOrderResponse;
          totalPages = firstPageData.totalPages;
          allBookings = [...firstPageData.orders];

          const pagePromises = [];
          for (let page = 2; page <= totalPages; page++) {
            pagePromises.push(bookingApi.getBookingOrders(page));
          }

          const responses = await Promise.all(pagePromises);
          responses.forEach((response: BookingOrderResponse) => {
            allBookings = [...allBookings, ...response.orders];
          });

          setBookingOrders(allBookings);
        } catch (error) {
          console.error("Error fetching bookings:", error);
          setBookingOrders([]);
        } finally {
          setLoading(false);
        }
      };
      fetchBookings();
    } else {
      const fetchBookings = async () => {
        setLoading(true);
        try {
          let allBookings: BookingOrder[] = [];
          let totalPages = 1;

          const firstPageData = (await bookingApi.getBookingOrdersArtisan(
            1,
            user?.username || ""
          )) as BookingOrderResponse;
          totalPages = firstPageData.totalPages;
          allBookings = [...firstPageData.orders];

          const pagePromises = [];
          for (let page = 2; page <= totalPages; page++) {
            pagePromises.push(
              bookingApi.getBookingOrdersArtisan(page, user?.username || "")
            );
          }

          const responses = await Promise.all(pagePromises);
          responses.forEach((response: BookingOrderResponse) => {
            allBookings = [...allBookings, ...response.orders];
          });

          setBookingOrders(allBookings);
        } catch (error) {
          console.error("Error fetching bookings:", error);
          setBookingOrders([]);
        } finally {
          setLoading(false);
        }
      };
      fetchBookings();
    }
  }, [user?.role, user?.username]);

  const handleCloseOrder = (order: BookingOrder) => {
    setSelectedOrder(order);
    setCloseModalOpen(true);
  };

  const handleSubmitReview = (order: BookingOrder) => {
    setSelectedOrder(order);
    setReviewModalOpen(true);
  };

  const handleOrderClosed = (orderId: string) => {
    setBookingOrders((prev) =>
      prev.map((order) =>
        order._id === orderId ? { ...order, state: 1 } : order
      )
    );
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
          data={bookingOrders}
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
            data={bookingOrders}
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
          columns={adminColumns()}
          data={bookingOrders}
          isLoading={loading}
          filterBy="service_type"
        />
      )}
    </div>
  );
};

export default Bookings;
