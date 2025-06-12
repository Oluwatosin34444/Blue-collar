import { useAuth } from "@/contexts/use-auth";
import { StatCard } from "@/components/stats-card";
import { bookingApi } from "@/services/booking-api";
import { useEffect, useState } from "react";
import type { BookingOrder } from "@/lib/types";

interface BookingOrderResponse {
  orders: BookingOrder[];
  totalOrders: number;
  currentPage: number;
  totalPages: number;
  success: boolean;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [bookingOrders, setBookingOrders] = useState<BookingOrderResponse>({
    orders: [],
    totalOrders: 0,
    currentPage: 1,
    totalPages: 1,
    success: false,
  });

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

  const userStats = [
    {
      title: "In Progress Orders",
      value: bookingOrders.orders.filter((order) => order.state === 0).length,
      trend:
        bookingOrders.orders.filter((order) => order.state === 0).length > 0
          ? ("up" as const)
          : ("down" as const),
      description: "Artisan currently engaged",
    },
    {
      title: "Closed Orders",
      value: bookingOrders.orders.filter((order) => order.state === 1).length,
      trend:
        bookingOrders.orders.filter((order) => order.state === 1).length > 0
          ? ("up" as const)
          : ("down" as const),
      description: "Total orders fulfilled and closed",
    },
    {
      title: "Total Orders",
      value: bookingOrders.totalOrders,
      trend:
        bookingOrders.totalOrders > 0 ? ("up" as const) : ("down" as const),
      description: "Total orders booked on the platform",
    },
  ];

  const artisanStats = [
    {
      title: "In Progress Orders",
      value: 24,
      trend: "up" as const,
      percentage: "+15%",
      description: "Active orders increasing",
    },
    {
      title: "Closed Orders",
      value: 156,
      trend: "down" as const,
      percentage: "-8%",
      description: "Completion rate needs attention",
    },
    {
      title: "Total Orders",
      value: 1892,
      trend: "up" as const,
      percentage: "+12%",
      description: "Order volume growing steadily",
    },
  ];

  return (
    <div className="flex flex-col gap-4 p-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Welcome{" "}
          <span className="font-bold">
            {user?.firstName} {user?.lastName}
          </span>
        </p>
      </div>

      {user?.role === "Artisan" && (
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold">Your bookings Statistics</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {artisanStats.map((stat) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              trend={stat.trend}
              percentage={stat.percentage}
              description={stat.description}
              isLoading={loading}
              />
            ))}
          </div>
        </div>
      )}

      {user?.role === "User" && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {userStats.map((stat) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              trend={stat.trend}
              description={stat.description}
              isLoading={loading}
            />
          ))}
        </div>
      )}
    </div>
  );
}
