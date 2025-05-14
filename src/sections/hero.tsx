import { Link } from "react-router-dom";
import Container from "@/components/container";

export default function Hero() {
  return (
    <div className="w-full py-20 relative bg-gray-800 text-white">
      <Container>
        <div className="grid grid-cols-1 gap-8 items-center lg:grid-cols-2">
          <div className="flex gap-4 flex-col">
            <div className="flex gap-4 flex-col">
              <h1 className="text-5xl md:text-6xl font-bold max-w-2xl tracking-tighter text-left">
                Find Skilled Artisans for Your Projects
              </h1>
              <p className="text-xl leading-relaxed tracking-tight text-gray-50 max-w-2xl text-left">
                Connect with professional craftsmen, builders, and skilled
                workers in your area, and get your projects done quickly and
                efficiently.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-start max-w-2xl">
              <Link
                to="/artisans"
                className="px-8 py-3 bg-blue-600 text-center text-white rounded-md font-semibold hover:bg-blue-700 transition-colors"
              >
                Find Artisans
              </Link>
              <Link
                to="/register"
                className="px-8 py-3 gap-4 border-2 text-center border-white text-white rounded-md font-semibold hover:bg-white hover:text-gray-900 transition-colors"
              >
                Register
              </Link>
            </div>
          </div>
          <div className="bg-muted rounded-md aspect-square">
            <img src="/Process-cuate.png" alt="Process" />
          </div>
        </div>
      </Container>
    </div>
  );
}
