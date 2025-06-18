import { useAuth } from "@/contexts/use-auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { authApi } from "@/services/auth-api";
import type { Artisan, ArtisanResponse } from "@/lib/types";
import { DataTable } from "@/components/datatable/data-table";
import { artisansColumns } from "@/components/admin/artisans-column";

const Artisans = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [artisans, setArtisans] = useState<Artisan[]>([]);

  console.log(artisans, "see artisans");

  useEffect(() => {
    if (user?.role !== "Admin") {
      navigate("/dashboard");
    }
  }, [user?.role, navigate]);

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

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Artisans</h1>
        <p className="mt-2 text-sm text-gray-600">View and manage artisans</p>
      </div>

      <DataTable
        columns={artisansColumns()}
        data={artisans}
        isLoading={loading}
        filterBy="username"
      />
    </div>
  );
};

export default Artisans;
