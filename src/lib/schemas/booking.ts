import { z } from "zod";

export const bookingFormSchema = z.object({
  date: z.date().refine(
    (date) => {
      const oneHourFromNow = new Date();
      oneHourFromNow.setHours(oneHourFromNow.getHours() + 1);
      return date.getTime() > oneHourFromNow.getTime();
    },
    "Booking date must be at least 1 hour in the future"
  ),
  additionalInfo: z.string().optional(),
  address: z.string().min(10, "Address must be at least 10 characters"),
  artisanUsername: z.string(),
  serviceName: z.string(),
  userName: z.string(),
});

export type BookingFormData = z.infer<typeof bookingFormSchema>;
