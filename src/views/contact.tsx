import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@/lib/schemas/contact";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Container from "@/components/container";
import { toast } from "sonner";
import { useState } from "react";

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    console.log("Contact Form Submitted:", data);
    try {
      setIsLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      form.reset();
      toast.success("Message sent successfully");
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Failed to send message");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <div className="w-full mx-auto px-4 py-12 grid md:grid-cols-2 gap-10">
        <div>
          <h1 className="text-3xl font-bold mb-4">Contact BlueCollar</h1>
          <p className="text-lg mb-4">
            Whether you're a customer looking for help or an artisan ready to
            join our network, we'd love to hear from you. Reach out and a member
            of the BlueCollar team will get back to you shortly.
          </p>
          <div className="space-y-4 text-base">
            <p>
              <strong>Email:</strong> support@bluecollar.ng
            </p>
            <p>
              <strong>Phone:</strong> +234 814 894 4147
            </p>
            <p>
              <strong>Address:</strong> 23, Lekki Phase 1, Lagos, Nigeria
            </p>
            <p>
              <strong>Business Hours:</strong> Mon - Sat, 8AM - 6PM
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Type your message here..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                    Sending...
                  </div>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default Contact;
