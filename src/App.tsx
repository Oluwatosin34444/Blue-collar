import { Route, Routes } from "react-router-dom";
import { Home, About, Contact, Artisans, Services, Login, Register, ClientRegistration, ArtisanRegistration } from "./views/index";
import { MyAppNav } from "./components/navbar";
import ArtisanDetails from "./views/artisans/[id]";
import { TailwindIndicator } from "./components/tailwind-indicator";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <MyAppNav />
      <main className="container mx-auto px-4 py-8">
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
      </main>
      <TailwindIndicator />
    </div>
  );
}

export default App;
