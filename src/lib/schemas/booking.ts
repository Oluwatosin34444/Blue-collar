import { z } from "zod";

export const bookingFormSchema = z.object({
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  description: z.string().min(10, "Description must be at least 10 characters").optional(),
  address: z.string().min(10, "Address must be at least 10 characters"),
  artisanId: z.string(),
  serviceName: z.string(),
  userName: z.string(),
});

export type BookingFormData = z.infer<typeof bookingFormSchema>; 