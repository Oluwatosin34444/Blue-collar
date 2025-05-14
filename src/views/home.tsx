import { Link } from "react-router-dom";
import { Hero, Review, Why, DualHowItWorks, Metrics, AnimatedServicesGrid } from "@/sections";
import { services } from "@/lib/constant";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Why />
      <DualHowItWorks />
      <AnimatedServicesGrid services={services}/>

      <Metrics />

      <Review />

      <section className="bg-gray-800 text-white py-20">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers who found their perfect
            artisan match
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
