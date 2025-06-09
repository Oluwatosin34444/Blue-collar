import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { bookingApi, type BookingOrder } from "@/services/booking-api";
import { toast } from "sonner";
import { bookingFormSchema, type BookingFormData } from "@/lib/schemas/booking";
import { DatePicker } from "./ui/date-picker";

interface BookingModalProps {
  artisanName: string;
  artisanId: string;
  serviceName: string;
  userName: string;
  artisanBooked: boolean;
}

export function BookingModal({
  artisanName,
  artisanId,
  serviceName,
  userName,
  artisanBooked,
}: BookingModalProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      date: "",
      time: "",
      description: "",
      address: "",
      artisanId,
      serviceName,
      userName,
    },
  });

  const handleBookingSubmit = async (data: BookingFormData) => {
    const bookingOrder: BookingOrder = {
      booked_by: data.userName,
      artisanId: data.artisanId,
      service_type: data.serviceName,
    };

    try {
      const response = await bookingApi.createBookingOrder(bookingOrder);
      console.log("Booking order created:", response);
      toast.success("Booking order created successfully");
      setOpen(false);
      form.reset();
    } catch (error) {
      console.error("Error creating booking order:", error);
      toast.error("Error creating booking order");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mt-4 w-fit" disabled={artisanBooked}>
          Book Artisan
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Book {artisanName} for {serviceName} service
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleBookingSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Date</FormLabel>
                  <FormControl>
                    <DatePicker field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Time</FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      id="time"
                      step="1"
                      defaultValue="10:30:00"
                      {...field}
                      className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brief Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe what you need..."
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

            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                  Submitting booking...
                </div>
              ) : (
                "Submit Booking"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
