import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Reuse the same mockArtisans array as in artisans.tsx
const categories = [
  "Electrical",
  "Plumbing",
  "Carpentry",
  "Painting",
  "Masonry",
  "Tiling",
  "POP/False Ceiling",
  "Welding/Fabrication",
  "Generator Repair",
  "AC Repair",
  "Cleaning",
  "Laundry",
  "Hairdressing",
  "Tailoring",
  "Barbing"
];
const locations = [
  "Lagos",
  "Abuja",
  "Port Harcourt",
  "Ibadan",
  "Kano",
  "Enugu",
  "Benin City",
  "Kaduna",
  "Jos",
  "Abeokuta"
];
const mockArtisans = Array.from({ length: 25 }, (_, i) => {
  const category = categories[i % categories.length];
  const location = locations[i % locations.length];
  return {
    id: i + 1,
    name: `Artisan ${i + 1}`,
    category,
    rating: +(4 + Math.random()).toFixed(1),
    reviews: Math.floor(Math.random() * 200 + 10),
    location,
    contact: `artisan${i + 1}@bluecollar.com`,
    address: `${100 + i} ${location} Main Rd, Nigeria`,
    image: `https://randomuser.me/api/portraits/men/${i % 10}.jpg`,
  };
});

const ArtisanDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const artisan = mockArtisans.find(a => a.id === Number(id));

  if (!artisan) {
    return <div className="max-w-2xl mx-auto py-12 text-center">Artisan not found.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <Button variant="outline" className="mb-6" onClick={() => navigate(-1)}>
        ← Back
      </Button>
      <div className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center">
        <img
          src={artisan.image}
          alt={artisan.name}
          className="w-32 h-32 rounded-full object-cover mb-4 border"
        />
        <h2 className="text-3xl font-bold mb-2">{artisan.name}</h2>
        <p className="text-lg text-gray-600 mb-2">{artisan.category}</p>
        <div className="flex items-center mb-2">
          <span className="text-yellow-400">★</span>
          <span className="ml-1 font-semibold">{artisan.rating}</span>
          <span className="text-gray-500 ml-2">({artisan.reviews} reviews)</span>
        </div>
        <p className="text-gray-700 mb-2">Location: {artisan.location}</p>
        <p className="text-gray-700 mb-2">Contact: {artisan.contact}</p>
        <p className="text-gray-700 mb-2">Address: {artisan.address}</p>
        <Button className="mt-4 w-full">Contact Artisan</Button>
      </div>
    </div>
  );
};

export default ArtisanDetails; 