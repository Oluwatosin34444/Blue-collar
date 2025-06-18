import { cn } from "@/lib/utils";
import { Quote } from "lucide-react";
import type { Review } from "@/lib/types";
import { Rating, RatingButton } from "@/components/ui/rating";

export const ReviewCard = ({ username, comment, rating }: Review) => {
  return (
    <figure
      className={cn(
        "relative flex flex-col w-64 cursor-pointer overflow-hidden rounded-xl border border-[#F5F2ED]/[.70] p-4 bg-[#ffffff]/[.70] shadow",
        "hover:bg-[#ffffff] hover:border-primary hover:border"
      )}
    >
      <Quote className="text-primary w-[40px] h-[25px] rotate-180 mb-10" />
      <div className="flex flex-col h-full items-center justify-between">
        <Rating defaultValue={rating} readOnly>
          {Array.from({ length: 5 }).map((_, index) => (
            <RatingButton key={index} />
          ))}
        </Rating>
        <blockquote className="mt-2 text-sm text-gray-500">
          {comment}
        </blockquote>
        <figcaption className="text-sm mt-20 font-semibold italic text-gray-700">
          {username}
        </figcaption>
      </div>
    </figure>
  );
};
