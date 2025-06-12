import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { bookingApi, type CreateBookingOrder } from "@/services/booking-api";
import { toast } from "sonner";
import { bookingFormSchema, type BookingFormData } from "@/lib/schemas/booking";
import { DateTimePicker } from "../ui/date-time-picker";

interface BookingModalProps {
  artisanName: string;
  artisanUsername: string;
  serviceName: string;
  userName: string;
  artisanBooked: boolean;
  onBookingSuccess: () => void;
}

export function BookingModal({
  artisanName,
  artisanUsername,
  serviceName,
  userName,
  artisanBooked,
  onBookingSuccess,
}: BookingModalProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      date: (() => {
        const date = new Date();
        date.setHours(date.getHours() + 2);
        return date;
      })(),
      additionalInfo: "",
      address: "",
      artisanUsername,
      serviceName,
      userName,
    },
    mode: "onChange",
  });

  const handleBookingSubmit = async (data: BookingFormData) => {
    if (data.date < new Date()) {
      toast.error("Please select a date in the future");
      return;
    }

    if (!data.address) {
      toast.error("Please enter your address");
      return;
    }

    const bookingOrder: CreateBookingOrder = {
      booked_by: data.userName,
      artisanUsername: data.artisanUsername,
      service_type: data.serviceName,
      user_location: data.address,
    };

    try {
      setIsLoading(true);
      const response = await bookingApi.createBookingOrder(bookingOrder);
      toast.success(response.message);
      setOpen(false);
      form.reset();
      onBookingSuccess();
      setIsLoading(false);
    } catch (error) {
      console.error("Error creating booking order:", error);
      toast.error("Error creating booking order");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="w-fit" disabled={artisanBooked} size="lg">
          {artisanBooked ? `Artisan Unavailable` : `Book ${artisanName}`}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Book {artisanName} for {serviceName} service
          </AlertDialogTitle>
        </AlertDialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleBookingSubmit, (errors) => {
              console.log("errors", errors);
            })}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Date</FormLabel>
                  <FormControl>
                    <DateTimePicker
                      value={field.value}
                      onChange={field.onChange}
                      className="w-full"
                      granularity="minute"
                      hourCycle={12}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="additionalInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brief Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Additional information..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Address</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter your address..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                    Submitting booking...
                  </div>
                ) : (
                  "Submit Booking"
                )}
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
