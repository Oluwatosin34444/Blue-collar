import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { authApi } from "@/services/auth-api";
import type { Artisan } from "@/contexts/auth-context";
import Container from "@/components/container";
import { Rating, RatingButton } from "@/components/ui/rating";
import { BookingModal } from "@/components/bookings/booking-modal";
import { useAuth } from "@/contexts/use-auth";
import { Marquee } from "@/components/magicui/marquee";
import { ReviewCard } from "@/components/review-card";
import { destructureAddress } from "@/lib/utils";

const ArtisanDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [artisan, setArtisan] = useState<Artisan | null>(null);
  const [loading, setLoading] = useState(false);

  const { formattedAddress } = destructureAddress(user?.address || "");

  useEffect(() => {
    const fetchArtisan = async () => {
      setLoading(true);
      try {
        const data = await authApi.getArtisanProfile(id as string);
        setArtisan({
          ...data.artisan,
          id: data.artisan._id,
        });
      } catch (error) {
        console.error("Error fetching artisan:", error);
        setArtisan(null);
      } finally {
        setLoading(false);
      }
    };

    fetchArtisan();
  }, [id]);

  if (loading) {
    return (
      <Container>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
        </div>
      </Container>
    );
  }

  if (!artisan) {
    return (
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
            Artisan not found
          </h3>
          <p className="text-gray-500 mb-4">
            We couldn't find any artisan with this id.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto py-12 px-4">
      <div className="w-6xl mx-auto">
        <Button
          variant="outline"
          className="mb-6 border-input"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
        <div className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center text-center">
          <img
            src={
              artisan.artisanImage ||
              `https://ui-avatars.com/api/?name=${artisan.firstName}+${artisan.lastName}`
            }
            alt={`${artisan.firstName}`}
            className="w-32 h-32 rounded-full object-cover mb-4 border"
          />

          <h2 className="text-3xl font-bold mb-2">
            {artisan.firstName} {artisan.lastName}
          </h2>

          <p className="text-lg text-gray-600 mb-2">{artisan.service}</p>

          <div className="flex items-center justify-center mb-2">
            <Rating defaultValue={artisan.rating} readOnly>
              {Array.from({ length: 5 }).map((_, index) => (
                <RatingButton key={index} />
              ))}
            </Rating>
            <span className="text-gray-500 ml-2">
              ({artisan.reviews?.length ?? 0} reviews)
            </span>
          </div>

          <p className="text-gray-700 mb-2">Location: {artisan.location}</p>

          {user?.role === "User" && (
            <BookingModal
              artisanName={`${artisan.firstName} ${artisan.lastName}`}
              artisanUsername={artisan.username}
              serviceName={artisan.service}
              userName={user?.username || ""}
              isUserActive={user?.active || false}
              artisanBooked={artisan.booked}
              userAddress={formattedAddress}
              onBookingSuccess={() => {
                setArtisan((prevArtisan) =>
                  prevArtisan
                    ? {
                        ...prevArtisan,
                        booked: true,
                      }
                    : null
                );
              }}
            />
          )}
        </div>
      </div>

      {artisan.reviews && artisan.reviews.length > 0 && (
        <div className="mt-10">
          <h3 className="text-2xl font-semibold mb-4 text-center">Reviews</h3>
          <div className="relative flex w-full items-center justify-center overflow-hidden !bg-[#F9F9F9] !p-0">
            <Marquee pauseOnHover className="[--duration:55s] bg-[#F9F9F9]">
              {artisan.reviews.map((review, index) => (
                <ReviewCard key={index} {...review} />
              ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtisanDetails;
