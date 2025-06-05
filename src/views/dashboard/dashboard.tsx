import { useAuth } from "@/contexts/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">
          {" "}
          Welcome <span className="font-bold">{user?.firstName} {user?.lastName}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">You have 10 bookings</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
