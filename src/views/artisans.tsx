import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CustomPagination } from '@/components/custom-pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { locations, services } from '@/lib/constant';
import Container from '@/components/container';

interface Artisan {
  id: number;
  name: string;
  service: string;
  rating: number;
  reviews: number;
  location: string;
  contact: string;
  address: string;
  image: string;
}

const mockArtisans: Artisan[] = Array.from({ length: 25 }, (_, i) => {
  const service = services[i % services.length];
  const location = locations[i % locations.length];
  return {
    id: i + 1,
    name: `Artisan ${i + 1}`,
    service,
    rating: +(4 + Math.random()).toFixed(1),
    reviews: Math.floor(Math.random() * 200 + 10),
    location,
    contact: `artisan${i + 1}@bluecollar.com`,
    address: `${100 + i} ${location} Main Rd, Nigeria`,
    image: `https://randomuser.me/api/portraits/men/${i % 10}.jpg`,
  };
});

const ITEMS_PER_PAGE = 10;

const Artisans = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [service, setService] = useState(searchParams.get('service') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [includedServices, setIncludedServices] = useState<string[]>([]);

  useEffect(() => {
    const includedServicesParam = searchParams.get('includedServices');
    if (includedServicesParam) {
      const services = includedServicesParam.split(',');
      console.log('Included services from URL:', services);
      setIncludedServices(services);
    }
  }, [searchParams]);

  const filteredArtisans = mockArtisans.filter(artisan => {
    const matchesService = !service || artisan.service === service;
    const matchesLocation = !location || artisan.location === location;
    const matchesSearch = !searchTerm ||
      artisan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artisan.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artisan.service.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Check if artisan's service matches any of the included services
    const matchesIncludedServices = includedServices.length === 0 || 
      includedServices.some(includedService => 
        artisan.service.toLowerCase() === includedService.toLowerCase()
      );

    console.log('Artisan:', artisan.name, {
      service: artisan.service,
      includedServices,
      matchesService,
      matchesLocation,
      matchesSearch,
      matchesIncludedServices,
      finalResult: matchesService && matchesLocation && matchesSearch && matchesIncludedServices
    });

    if (includedServices.length > 0) {
      return matchesIncludedServices && matchesSearch;
    }

    return matchesService && matchesLocation && matchesSearch;
  });

  const totalPages = Math.ceil(filteredArtisans.length / ITEMS_PER_PAGE);
  const paginatedArtisans = filteredArtisans?.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleFilterChange = (type: 'service' | 'location', value: string) => {
    if (type === 'service') setService(value === 'all' ? '' : value);
    if (type === 'location') setLocation(value === 'all' ? '' : value);
    setPage(1);
    setSearchParams({
      search: searchTerm,
      service: type === 'service' ? (value === 'all' ? '' : value) : service,
      location: type === 'location' ? (value === 'all' ? '' : value) : location,
      page: '1',
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setSearchParams({
      search: searchTerm,
      service,
      location,
      page: '1',
    });
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setSearchParams({
      search: searchTerm,
      service,
      location,
      page: String(newPage),
    });
  };

  return (
    <Container>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Find Skilled Artisans</h1>
        {includedServices.length > 0 && (
          <div className="mb-4 p-4 bg-blue-50 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Selected Services:</h2>
            <div className="flex flex-wrap gap-2">
              {includedServices.map((service, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        )}
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 items-center mb-4">
          <Input
            type="text"
            placeholder="Search by name, service, or location..."
            className="w-full"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <Select
            defaultValue={service || 'all'}
            onValueChange={value => handleFilterChange('service', value)}
          >
            <SelectTrigger className="w-full border rounded-md px-3 py-2">
              <SelectValue placeholder="All Services" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              {services.map(s => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            defaultValue={location || 'all'}
            onValueChange={value => handleFilterChange('location', value)}
          >
            <SelectTrigger className="w-full border rounded-md px-3 py-2">
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map(loc => (
                <SelectItem key={loc} value={loc}>{loc}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button type="submit" className="w-full md:w-auto bg-blue-600 hover:bg-blue-700">Search</Button>
        </form>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedArtisans?.map(artisan => (
          <div
            key={artisan.id}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition"
            onClick={() => navigate(`/artisans/${artisan.id}`)}
          >
            <img
              src={artisan.image}
              alt={artisan.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{artisan.name}</h3>
              <p className="text-gray-600 mb-2">{artisan.service}</p>
              <div className="flex items-center mb-2">
                <span className="text-yellow-400">★</span>
                <span className="ml-1">{artisan.rating}</span>
                <span className="text-gray-500 ml-1">({artisan.reviews} reviews)</span>
              </div>
              <p className="text-gray-600 mb-2">{artisan.location}</p>
              <p className="text-gray-500 text-sm">Contact: {artisan.contact}</p>
            </div>
          </div>
        ))}
      </div>

      <CustomPagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        className="mt-8"
      />
    </Container>
  );
};

export default Artisans; 