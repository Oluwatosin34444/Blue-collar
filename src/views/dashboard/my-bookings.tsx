import { useAuth } from '@/contexts/use-auth';

const MyBookings = () => {
  const { user } = useAuth();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Track your service requests
        </p>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="overflow-x-auto">
 
        </div>
      </div>
    </div>
  );
};

export default MyBookings;