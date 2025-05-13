import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Register = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Create Account</h2>
          <p className="mt-2 text-gray-600">
            Choose how you want to join our community
          </p>
        </div>

        <div className="space-y-4">
          <Link to="/client-registration" className="block">
            <Button className="w-full h-24 text-lg" variant="outline">
              <div className="text-center">
                <h3 className="font-semibold">Join as a Client</h3>
                <p className="text-sm text-gray-500">
                  Find skilled artisans for your projects
                </p>
              </div>
            </Button>
          </Link>

          <Link to="/artisan-registration" className="block">
            <Button className="w-full h-24 text-lg" variant="outline">
              <div className="text-center">
                <h3 className="font-semibold">Join as an Artisan</h3>
                <p className="text-sm text-gray-500">
                  Offer your services to clients
                </p>
              </div>
            </Button>
          </Link>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
