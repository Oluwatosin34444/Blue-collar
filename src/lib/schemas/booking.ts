import { z } from "zod";

export const bookingFormSchema = z.object({
  date: z.date(),
  additionalInfo: z.string().optional(),
  address: z.string().min(10, "Address must be at least 10 characters"),
  artisanId: z.string(),
  serviceName: z.string(),
  userName: z.string(),
});

export type BookingFormData = z.infer<typeof bookingFormSchema>;
