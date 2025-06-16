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

  return <div>Users</div>;
};

export default Users;
