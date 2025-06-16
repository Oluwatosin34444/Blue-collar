"use client";

import type React from "react";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CustomPagination } from "@/components/custom-pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { locations, services } from "@/lib/constant";
import Container from "@/components/container";
import { authApi } from "@/services/auth-api";
import { Card, CardContent } from "@/components/ui/card";
import type { Review } from "@/lib/types";
import { Rating, RatingButton } from "@/components/ui/rating";
import { BadgeCheckIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Artisan {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  location: string;
  address: string;
  verified: boolean;
  artisanImage: string;
  active: boolean;
  service: string;
  booked: boolean;
  phone: string;
  rating: number;
  dateAdded: string;
  review: Review[];
}

interface ArtisanResponse {
  artisanItems: Artisan[];
  totalArtisanItems: number;
  currentPage: number;
  totalPages: number;
  success: boolean;
}

const ITEMS_PER_PAGE = 9;

const Artisans = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [service, setService] = useState("");
  const [location, setLocation] = useState("");
  const [page, setPage] = useState(1);
  const [includedServices, setIncludedServices] = useState<string[]>([]);
  const [artisans, setArtisans] = useState<Artisan[]>([]);
  // const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // Sync URL parameters with state
  useEffect(() => {
    const search = searchParams.get("search") || "";
    const serviceParam = searchParams.get("service") || "";
    const locationParam = searchParams.get("location") || "";
    const pageParam = Number(searchParams.get("page")) || 1;
    const includedServicesParam = searchParams.get("includedServices");

    setSearchTerm(search);
    setService(serviceParam);
    setLocation(locationParam);
    setPage(pageParam);

    if (includedServicesParam) {
      const services = includedServicesParam.split(",").filter((s) => s.trim());
      setIncludedServices(services);
    } else {
      setIncludedServices([]);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchArtisans = async () => {
      setLoading(true);
      try {
        let allArtisans: Artisan[] = [];
        // let currentPage = 1;
        let totalPages = 1;

        // Fetch first page to get total pages
        const firstPageData = (await authApi.getAllArtisans(
          1
        )) as ArtisanResponse;
        totalPages = firstPageData.totalPages;
        allArtisans = [...firstPageData.artisanItems];

        // Fetch remaining pages concurrently
        const pagePromises = [];
        for (let page = 2; page <= totalPages; page++) {
          pagePromises.push(authApi.getAllArtisans(page));
        }

        const responses = await Promise.all(pagePromises);
        responses.forEach((response: ArtisanResponse) => {
          allArtisans = [...allArtisans, ...response.artisanItems];
        });

        setArtisans(
          allArtisans.filter((artisan) => artisan.active && artisan.verified)
        );
      } catch (error) {
        console.error("Error fetching artisans:", error);
        setArtisans([]);
      } finally {
        setLoading(false);
      }
    };
    fetchArtisans();
  }, []);

  const filteredArtisans = useMemo(() => {
    return artisans?.filter((artisan) => {
      const matchesService = !service || artisan.service === service;
      const matchesLocation = !location || artisan.location === location;
      const matchesSearch =
        !searchTerm ||
        `${artisan.firstName} ${artisan.lastName}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        artisan.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artisan.service.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesIncludedServices =
        includedServices.length === 0 ||
        includedServices.some(
          (includedService) =>
            artisan.service.toLowerCase() === includedService.toLowerCase()
        );

      if (includedServices.length > 0) {
        return matchesIncludedServices && matchesSearch;
      }

      return matchesService && matchesLocation && matchesSearch;
    });
  }, [artisans, service, location, searchTerm, includedServices]);

  // After filtering
  const paginatedArtisans = useMemo(() => {
    return filteredArtisans.slice(
      (page - 1) * ITEMS_PER_PAGE,
      page * ITEMS_PER_PAGE
    );
  }, [filteredArtisans, page]);

  const totalFilteredPages = Math.ceil(
    filteredArtisans.length / ITEMS_PER_PAGE
  );

  const handleFilterChange = (type: "service" | "location", value: string) => {
    // Update the state immediately for a responsive UI
    if (type === "service") {
      setService(value === "all" ? "" : value);
    } else {
      setLocation(value === "all" ? "" : value);
    }

    // Reset to first page when filters change
    setPage(1);

    // Update URL parameters
    const newParams: Record<string, string> = {
      page: "1",
    };

    if (searchTerm) newParams.search = searchTerm;
    if (type === "service" ? value !== "all" : service) {
      newParams.service = type === "service" ? value : service;
    }
    if (type === "location" ? value !== "all" : location) {
      newParams.location = type === "location" ? value : location;
    }
    if (includedServices.length > 0) {
      newParams.includedServices = includedServices.join(",");
    }

    setSearchParams(newParams);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Reset to first page when searching
    setPage(1);

    // Update URL parameters
    const newParams: Record<string, string> = {
      page: "1",
    };

    if (searchTerm) newParams.search = searchTerm;
    if (service) newParams.service = service;
    if (location) newParams.location = location;
    if (includedServices.length > 0) {
      newParams.includedServices = includedServices.join(",");
    }

    setSearchParams(newParams);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);

    const newParams: Record<string, string> = {
      page: String(newPage),
    };

    if (searchTerm) newParams.search = searchTerm;
    if (service) newParams.service = service;
    if (location) newParams.location = location;
    if (includedServices.length > 0)
      newParams.includedServices = includedServices.join(",");

    setSearchParams(newParams);
  };

  const clearIncludedServices = () => {
    setIncludedServices([]);
    setService("");
    const newParams: Record<string, string> = {};

    if (searchTerm) newParams.search = searchTerm;
    if (location) newParams.location = location;
    if (page > 1) newParams.page = String(page);

    setSearchParams(newParams);
  };

  if (loading) {
    return (
      <Container>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="space-y-4 py-10">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold mb-4">Find Skilled Artisans</h1>
        {includedServices.length > 0 && (
          <div className="mb-4 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">Selected Services:</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={clearIncludedServices}
                className="text-blue-600 hover:text-blue-800"
              >
                Clear Services
              </Button>
            </div>
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
        <form
          onSubmit={handleSearch}
          className="flex flex-col md:flex-row gap-4 items-center mb-4"
        >
          <Input
            type="text"
            placeholder="Search by name, service, or location..."
            className="w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select
            value={service || "all"}
            onValueChange={(value) => handleFilterChange("service", value)}
          >
            <SelectTrigger className="w-full border rounded-md px-3 py-2">
              <SelectValue placeholder="All Services" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              {services.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={location || "all"}
            onValueChange={(value) => handleFilterChange("location", value)}
          >
            <SelectTrigger className="w-full border rounded-md px-3 py-2">
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            type="submit"
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
          >
            Search
          </Button>
        </form>
      </div>

      {paginatedArtisans?.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
            <div className="text-gray-400 mb-4">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Artisans Found
            </h3>
            <p className="text-gray-500 mb-4">
              We couldn't find any artisans matching your search criteria.
            </p>
            <div className="text-sm text-gray-400">
              {searchTerm && <p>Search: "{searchTerm}"</p>}
              {service && <p>Service: {service}</p>}
              {location && <p>Location: {location}</p>}
              {includedServices.length > 0 && (
                <p>Selected Services: {includedServices.join(", ")}</p>
              )}
            </div>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchTerm("");
                setService("");
                setLocation("");
                setIncludedServices([]);
                setPage(1);
                setSearchParams({});
              }}
            >
              Clear All Filters
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedArtisans?.map((artisan) => (
            <Card
              key={artisan._id}
              onClick={() => navigate(`/artisans/${artisan._id}`)}
              className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-none pt-0"
            >
              <div className="relative">
                <img
                  src={
                    artisan.artisanImage ||
                    `https://ui-avatars.com/api/?name=${artisan.firstName}+${artisan.lastName}`
                  }
                  alt={`${artisan.firstName} ${artisan.lastName}`}
                  className="w-full h-54 object-cover rounded-t-lg"
                />
                {artisan?.verified && (
                  <Badge
                    variant="secondary"
                    className="bg-green-500 text-white absolute top-2 right-2"
                  >
                    <BadgeCheckIcon />
                    Verified
                  </Badge>
                )}
              </div>

              <CardContent className="space-y-1">
                <h3 className="text-xl font-semibold">{`${artisan.firstName} ${artisan.lastName}`}</h3>
                <p className="text-gray-600">{artisan.service}</p>
                <div className="flex items-center text-sm">
                  <Rating defaultValue={artisan.rating} readOnly>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <RatingButton key={index} />
                    ))}
                  </Rating>
                </div>
                <p className="text-gray-600">{artisan.location}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {paginatedArtisans?.length > 0 && (
        <CustomPagination
          currentPage={page}
          totalPages={totalFilteredPages}
          onPageChange={handlePageChange}
          className="mt-8"
        />
      )}
    </Container>
  );
};

export default Artisans;
