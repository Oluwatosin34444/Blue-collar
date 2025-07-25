import { useAuth } from "@/contexts/use-auth";
import { StatCard } from "@/components/stats-card";
import { bookingApi } from "@/services/booking-api";
import { useEffect, useState } from "react";
import type {
  Artisan,
  ArtisanResponse,
  BookingOrder,
  Users,
  UsersResponse,
} from "@/lib/types";
import { authApi } from "@/services/auth-api";

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
  const [bookingOrders, setBookingOrders] = useState<BookingOrder[]>([]);
  const [users, setUsers] = useState<Users[]>([]);
  const [artisans, setArtisans] = useState<Artisan[]>([]);

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

  useEffect(() => {
    if (user?.role === "Admin") {
      const fetchUsers = async () => {
        setLoading(true);
        try {
          const users = (await authApi.getAllUsers()) as UsersResponse;

          setUsers(users.data);
        } catch (error) {
          console.error("Error fetching artisans:", error);
          setUsers([]);
        } finally {
          setLoading(false);
        }
      };
      fetchUsers();
    }
  }, [user?.role]);

  useEffect(() => {
    if (user?.role === "Admin") {
      const fetchArtisans = async () => {
        setLoading(true);
        try {
          let allArtisans: Artisan[] = [];
          // let currentPage = 1;
          let totalPages = 1;

          // Fetch first page to get total pages
          const firstPageData = (await authApi.getAllArtisans(
            1
          )) as ArtisanResponse;
          totalPages = firstPageData.totalPages;
          allArtisans = [...firstPageData.artisanItems];

          // Fetch remaining pages concurrently
          const pagePromises = [];
          for (let page = 2; page <= totalPages; page++) {
            pagePromises.push(authApi.getAllArtisans(page));
          }

          const responses = await Promise.all(pagePromises);
          responses.forEach((response: ArtisanResponse) => {
            allArtisans = [...allArtisans, ...response.artisanItems];
          });

          setArtisans(
            allArtisans.filter((artisan) => artisan.active && artisan.verified)
          );
        } catch (error) {
          console.error("Error fetching artisans:", error);
          setArtisans([]);
        } finally {
          setLoading(false);
        }
      };
      fetchArtisans();
    }
  }, [user?.role]);

  const userStats = [
    {
      title: "In Progress Orders",
      value: bookingOrders?.filter((order) => order.state === 0).length,
      trend:
        bookingOrders?.filter((order) => order.state === 0).length > 0
          ? ("up" as const)
          : ("down" as const),
      description: "Artisan currently engaged",
    },
    {
      title: "Closed Orders",
      value: bookingOrders?.filter((order) => order.state === 1).length,
      trend:
        bookingOrders?.filter((order) => order.state === 1).length > 0
          ? ("up" as const)
          : ("down" as const),
      description: "Total orders fulfilled and closed",
    },
    {
      title: "Total Orders",
      value: bookingOrders?.length,
      trend: bookingOrders?.length > 0 ? ("up" as const) : ("down" as const),
      description: "Total orders booked on the platform",
    },
  ];

  const artisanStats = [
    {
      title: "In Progress Orders",
      value: bookingOrders?.filter((order) => order.state === 0).length,
      trend:
        bookingOrders?.filter((order) => order.state === 0).length > 0
          ? ("up" as const)
          : ("down" as const),
      description: "Artisan currently engaged",
    },
    {
      title: "Closed Orders",
      value: bookingOrders?.filter((order) => order.state === 1).length,
      trend:
        bookingOrders?.filter((order) => order.state === 1).length > 0
          ? ("up" as const)
          : ("down" as const),
      description: "Total orders fulfilled and closed",
    },
    {
      title: "Total Orders",
      value: bookingOrders?.length,
      trend: bookingOrders?.length > 0 ? ("up" as const) : ("down" as const),
      description: "Total orders booked on the platform",
    },
  ];

  const adminStats = [
    {
      title: "Total Users",
      value: users?.length,
      trend: users?.length > 0 ? ("up" as const) : ("down" as const),
      description: "Total users registered on the platform",
    },
    {
      title: "Total Artisans",
      value: artisans?.length,
      trend: artisans?.length > 0 ? ("up" as const) : ("down" as const),
      description: "Total artisans registered on the platform",
    },
    {
      title: "Total Bookings",
      value: bookingOrders?.length,
      trend: bookingOrders?.length > 0 ? ("up" as const) : ("down" as const),
      description: "Total bookings on the platform",
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
            {artisanStats?.map((stat) => (
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
        </div>
      )}

      {user?.role === "User" && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {userStats?.map((stat) => (
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

      {user?.role === "Admin" && (
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold">View app Statistics</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {adminStats?.map((stat) => (
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
        </div>
      )}
    </div>
  );
}
