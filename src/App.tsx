import { Route, Routes, useLocation } from "react-router-dom";
import {
  Home,
  About,
  Contact,
  Artisans,
  Services,
  Login,
  Register,
  ClientRegistration,
  ArtisanRegistration,
  Dashboard,
  Bookings,
  Profile,
} from "./views/index";
import { MyAppNav } from "./components/navbar";
import ArtisanDetails from "./views/artisans/[id]";
import { TailwindIndicator } from "./components/tailwind-indicator";
import { Footer } from "./sections";
import FloatingWhatsApp from "./components/floating-whatsapp";
import { AuthProvider } from "./contexts/auth-context";
import { ProtectedRoute } from "./components/protected-route";
import { DashboardLayout } from "./components/dashboard-layout";
import { Toaster } from "@/components/ui/sonner";

function App() {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith("/dashboard");
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        {!isDashboardRoute && <MyAppNav />}

        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/artisans">
            <Route index element={<Artisans />} />
            <Route path=":id" element={<ArtisanDetails />} />
          </Route>
          <Route path="/services" element={<Services />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/client-registration" element={<ClientRegistration />} />
          <Route
            path="/artisan-registration"
            element={<ArtisanRegistration />}
          />

          {/* Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
        {!isDashboardRoute && <Footer />}
        {!isDashboardRoute && (
          <FloatingWhatsApp
            phoneNumber="2348********"
            message="Hello, I'd like to inquire about your services"
          />
        )}
        <TailwindIndicator />
        <Toaster />
      </div>
    </AuthProvider>
  );
}

export default App;
