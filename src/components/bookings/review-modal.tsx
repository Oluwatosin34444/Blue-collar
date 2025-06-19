import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, User } from "lucide-react";
import { Rating, RatingButton } from "@/components/ui/rating";
import type { BookingOrder } from "@/lib/types";
import { reviewApi } from "@/services/review-api";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import { reviewFormSchema, type ReviewFormData } from "@/lib/schemas/review";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/contexts/use-auth";

interface ReviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: BookingOrder | null;
  onReviewSubmitted: () => void;
}

export function ReviewModal({
  open,
  onOpenChange,
  order,
  onReviewSubmitted,
}: ReviewModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      username: user?.username || "",
      rating: 5,
      comment: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: ReviewFormData) => {
    if (!order) return;

    setIsLoading(true);

    try {
      const response = await reviewApi.submitReview(
        order.artisanId,
        data
      );
      toast.success(response.message);
      onReviewSubmitted();
      form.reset();
      onOpenChange(false);
    } catch (error: unknown) {
      console.error("Error submitting review:", error);
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as AxiosError<{ message: string }>;
        toast.error(
          axiosError.response?.data.message || "Failed to submit review"
        );
      } else {
        toast.error("Failed to submit review");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    form.reset();
    onOpenChange(false);
  };

  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              <Star className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <DialogTitle>Submit Review</DialogTitle>
              <DialogDescription>
                Share your experience with this artisan
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">Service Details</span>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <span className="font-medium">Service:</span>{" "}
                  {order.service_type}
                </p>
                <p>
                  <span className="font-medium">Order:</span> #
                  {order._id.slice(-8)}
                </p>
                <p>
                  <span className="font-medium">Date:</span>{" "}
                  {new Date(order.booking_date).toLocaleDateString()}
                </p>
              </div>
            </div>

            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Rating
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        {Array.from({ length: 5 }).map((_, index) => (
                          <RatingButton key={index} />
                        ))}
                      </Rating>
                      <span className="text-sm text-gray-600">
                        ({field.value}/5)
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comment</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share your experience with this artisan..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                    Submitting review...
                  </div>
                ) : (
                  "Submit Review"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
