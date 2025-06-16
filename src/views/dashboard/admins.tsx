import { useAuth } from "@/contexts/use-auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Admins = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user?.role !== "Admin") {
      navigate("/dashboard");
    }
  }, [user?.role, navigate]);

  return <div>Admins</div>;
};

export default Admins;
