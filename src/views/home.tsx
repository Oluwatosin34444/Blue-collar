import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen">
      <section className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative w-full mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Find Skilled Artisans for Your Projects
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Connect with professional craftsmen, builders, and skilled workers in your area
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/artisans" 
              className="px-8 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition-colors"
            >
              Find Artisans
            </Link>
            <Link 
              to="/register" 
              className="px-8 py-3 border-2 border-white text-white rounded-md font-semibold hover:bg-white hover:text-gray-900 transition-colors"
            >
              Register
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose BlueCollar?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Verified Professionals</h3>
              <p className="text-gray-600">All our artisans are verified and background-checked for your peace of mind</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Quality Guaranteed</h3>
              <p className="text-gray-600">We ensure high-quality work through our rating and review system</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Secure Payments</h3>
              <p className="text-gray-600">Safe and secure payment system with money-back guarantee</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Services</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link 
              to="/artisans?category=carpentry" 
              className="bg-blue-600 text-white p-8 rounded-lg text-center hover:bg-blue-700 transition-colors"
            >
              <h3 className="text-xl font-semibold">Carpentry</h3>
            </Link>
            <Link 
              to="/artisans?category=plumbing" 
              className="bg-blue-600 text-white p-8 rounded-lg text-center hover:bg-blue-700 transition-colors"
            >
              <h3 className="text-xl font-semibold">Plumbing</h3>
            </Link>
            <Link 
              to="/artisans?category=electrical" 
              className="bg-blue-600 text-white p-8 rounded-lg text-center hover:bg-blue-700 transition-colors"
            >
              <h3 className="text-xl font-semibold">Electrical</h3>
            </Link>
            <Link 
              to="/artisans?category=painting" 
              className="bg-blue-600 text-white p-8 rounded-lg text-center hover:bg-blue-700 transition-colors"
            >
              <h3 className="text-xl font-semibold">Painting</h3>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers who found their perfect artisan match
          </p>
          <Link 
            to="/register" 
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition-colors"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
