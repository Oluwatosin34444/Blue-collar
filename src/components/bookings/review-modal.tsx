
import { useState } from "react"
import { useForm } from "react-hook-form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Star, User } from "lucide-react"
import { Rating, RatingButton } from "@/components/ui/rating"
import type { BookingOrder } from "@/lib/types"

interface ReviewFormData {
  username: string
  rating: number
  comment: string
}

interface ReviewModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  order: BookingOrder | null
  onReviewSubmitted: () => void
}

export function ReviewModal({ open, onOpenChange, order, onReviewSubmitted }: ReviewModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [rating, setRating] = useState(5)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReviewFormData>({
    defaultValues: {
      username: "",
      rating: 5,
      comment: "",
    },
  })

  const onSubmit = async (data: ReviewFormData) => {
    if (!order) return

    setIsLoading(true)

    const reviewData = {
      ...data,
      rating,
      orderId: order._id,
      artisanId: order.artisanId,
    }

    console.log("Submitting review:", reviewData)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    reset()
    setRating(5)
    onReviewSubmitted()
  }

  const handleClose = () => {
    reset()
    setRating(5)
    onOpenChange(false)
  }

  if (!order) return null

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
              <DialogDescription>Share your experience with this service</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <User className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">Service Details</span>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <span className="font-medium">Service:</span> {order.service_type}
              </p>
              <p>
                <span className="font-medium">Order:</span> #{order._id.slice(-8)}
              </p>
              <p>
                <span className="font-medium">Date:</span> {new Date(order.booking_date).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Your Name</Label>
            <input
              id="username"
              {...register("username", { required: "Name is required" })}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Enter your name"
            />
            {errors.username && <p className="text-sm text-red-600">{errors.username.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>Rating</Label>
            <div className="flex items-center space-x-2">
              <Rating defaultValue={rating} onValueChange={setRating}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <RatingButton key={index} />
                ))}
              </Rating>
              <span className="text-sm text-gray-600">({rating}/5)</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Comment</Label>
            <Textarea
              id="comment"
              {...register("comment", { required: "Comment is required" })}
              placeholder="Share your experience with this service..."
              className="min-h-[100px]"
            />
            {errors.comment && <p className="text-sm text-red-600">{errors.comment.message}</p>}
          </div>

          <DialogFooter className="flex space-x-2">
            <Button type="button" variant="outline" onClick={handleClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
              {isLoading ? "Submitting..." : "Submit Review"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
