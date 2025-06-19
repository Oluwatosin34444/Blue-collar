import { z } from "zod";

export const reviewFormSchema = z.object({
    username: z.string().min(2, "Username must be at least 2 characters"),
    rating: z.number().min(1, "Rating must be at least 1"),
    comment: z.string().min(5, "Comment must be at least 5 characters"),
  });
  
  export type ReviewFormData = z.infer<typeof reviewFormSchema>; 