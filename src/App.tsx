import { Route, Routes } from "react-router-dom";
import { Home, About, Contact, Artisans, Services, Login, Register, ClientRegistration, ArtisanRegistration } from "./views/index";
import { MyAppNav } from "./components/navbar";
import ArtisanDetails from "./views/artisans/[id]";
import { TailwindIndicator } from "./components/tailwind-indicator";
import { Footer } from "./sections";
import FloatingWhatsApp from "./components/floating-whatsapp";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <MyAppNav />
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
          <Route path="/artisan-registration" element={<ArtisanRegistration />} />
        </Routes>
      <Footer />
      <FloatingWhatsApp phoneNumber="2348********" message="Hello, I’d like to inquire about your services" />
      <TailwindIndicator />
    </div>
  );
}

export default App;
