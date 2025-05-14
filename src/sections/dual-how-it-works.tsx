import Container from "@/components/container";
import {
  Search,
  Users,
  CheckSquare,
  Briefcase,
  UserCog,
  Calendar,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function DualHowItWorks() {
  return (
    <section>
      <div className="bg-blue-600 relative overflow-hidden">
        <Container className="py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                For Clients
              </h2>
              <p className="text-lg text-blue-100 mb-8">
                Find reliable artisans for all your service needs in just a few
                simple steps.
              </p>
              <Link
                to="/artisans"
                className="px-8 py-3 bg-white text-center text-blue-700 rounded-md font-semibold hover:bg-blue-50 transition-colors"
              >
                Find Artisans
              </Link>
            </div>

            <div className="lg:col-span-8">
              <div className="bg-white rounded-lg shadow-xl p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="flex flex-col items-start border-r border-gray-200 pr-6 last:border-r-0 md:last:border-r-0 md:first:border-r md:first:pr-6 md:even:px-6 md:odd:pl-0">
                    <div className="text-blue-500 mb-4">
                      <Search size={40} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">
                      Search for Services
                    </h3>
                    <p className="text-gray-600">
                      Search for any service you need, and we'll find registered
                      artisans closest to you.
                    </p>
                  </div>

                  <div className="flex flex-col items-start border-r border-gray-200 pr-6 last:border-r-0 md:last:border-r-0 md:even:px-6">
                    <div className="text-blue-500 mb-4">
                      <Users size={40} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">
                      Choose an Artisan
                    </h3>
                    <p className="text-gray-600">
                      You pick one of the listed artisans, and after they accept
                      your service request, you can contact them to discuss
                      further.
                    </p>
                  </div>

                  <div className="flex flex-col items-start md:last:border-r-0">
                    <div className="text-blue-500 mb-4">
                      <CheckSquare size={40} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">
                      Get Your Job Done
                    </h3>
                    <p className="text-gray-600">
                      Your assigned service provider arrives at your location,
                      and gets your job done!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <div className="bg-blue-700 relative overflow-hidden">
        <Container className="py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                For Artisans
              </h2>
              <p className="text-lg text-blue-100 mb-8">
                Join our platform to connect with clients and grow your
                business.
              </p>
              <Link
                to="/artisan-registration"
                className="px-8 py-3 text-center bg-white text-blue-700 hover:bg-blue-50 rounded-md font-semibold transition-colors"
              >
                Register as Artisan
              </Link>
            </div>

            <div className="lg:col-span-8">
              <div className="bg-white rounded-lg shadow-xl p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="flex flex-col items-start border-r border-gray-200 pr-6 last:border-r-0 md:last:border-r-0 md:first:border-r md:first:pr-6 md:even:px-6 md:odd:pl-0">
                    <div className="text-blue-500 mb-4">
                      <Briefcase size={40} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">
                      Register
                    </h3>
                    <p className="text-gray-600">
                      Register on BlueCollar as a provider, and submit all
                      required information and documents.
                    </p>
                  </div>

                  <div className="flex flex-col items-start border-r border-gray-200 pr-6 last:border-r-0 md:last:border-r-0 md:even:px-6">
                    <div className="text-blue-500 mb-4">
                      <UserCog size={40} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">
                      Get Listed
                    </h3>
                    <p className="text-gray-600">
                      BlueCollar will list you as a provider for the service you
                      offer and users around you can request your service.
                    </p>
                  </div>

                  <div className="flex flex-col items-start md:last:border-r-0">
                    <div className="text-blue-500 mb-4">
                      <Calendar size={40} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">
                      Accept Jobs
                    </h3>
                    <p className="text-gray-600">
                      Accept users' requests and proceed with completing their
                      jobs and getting paid!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
