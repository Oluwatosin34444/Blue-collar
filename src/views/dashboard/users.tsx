import { useAuth } from "@/contexts/use-auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { authApi } from "@/services/auth-api";
import type { Users, UsersResponse } from "@/lib/types";
import { DataTable } from "@/components/datatable/data-table";
import { usersColumns } from "@/components/admin/users-column";

const DashboardUsers = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<Users[]>([]);

  useEffect(() => {
    if (user?.role !== "Admin") {
      navigate("/dashboard");
    }
  }, [user?.role, navigate]);

  useEffect(() => {
    const fetchArtisans = async () => {
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
    fetchArtisans();
  }, []);

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Users</h1>
        <p className="mt-2 text-sm text-gray-600">View and manage users</p>
      </div>

      <DataTable
        columns={usersColumns()}
        data={users || []}
        isLoading={loading}
        filterBy="username"
      />
    </div>
  );
};

export default DashboardUsers;
