import { useAuth } from "@/contexts/use-auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Users = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== "Admin") {
      navigate("/dashboard");
    }
  }, [user?.role, navigate]);

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Users</h1>
        <p className="mt-2 text-sm text-gray-600">View and manage users</p>
      </div>
    </div>
  );
};

export default Users;
