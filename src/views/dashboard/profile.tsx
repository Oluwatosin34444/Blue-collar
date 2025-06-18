"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/use-auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PhoneInput } from "@/components/phone-input";
import {
  passwordSchema,
  profileSchema,
  type PasswordFormData,
  type ProfileFormData,
} from "@/lib/schemas/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { services } from "@/lib/constant";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn, destructureAddress } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { locations } from "@/lib/constant";
import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import Container from "@/components/container";
import { AutocompleteComponent } from "@/components/address-autocomplete/address-autocomplete";

const Profile = () => {
  const {
    user,
    updateUserProfile,
    updateArtisanProfile,
    updateUserPassword,
    updateArtisanPassword,
  } = useAuth();

  console.log(user, "user");

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const userAddress = destructureAddress(user?.address || "");

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      id: "",
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      phone: "",
      location: "",
      address: "",
      service: "",
      userImage: undefined,
      artisanImage: undefined,
      active: false,
    },
    mode: "onChange",
  });

  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      username: user?.username || "",
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (user) {
      form.reset({
        id: user.id || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        username: user.username,
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "",
        address: user.address || "",
        service: user.role === "Artisan" ? user.service : "",
        userImage:
          user.role === "User" || user.role === "Admin"
            ? user.userImage
            : undefined,
        artisanImage: user.role === "Artisan" ? user.artisanImage : undefined,
        active: user.active,
      });

      const existingImage =
        user.role === "Artisan" ? user.artisanImage : user.userImage;
      if (existingImage) {
        setImagePreview(existingImage);
      }
    }
  }, [user, form]);

  const isActive = form.watch("active");

  useEffect(() => {
    const existingImage =
      user?.role === "Artisan" ? user.artisanImage : user?.userImage;
    if (isActive && !existingImage) {
      form.setValue("active", true);
      toast.info("Upload your profile image to activate your account");
    }
  }, [isActive, form, user]);

  const handleImageChange = useCallback(
    (file: File | null) => {
      if (file) {
        setSelectedFile(file);
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);

        if (user?.role === "Artisan") {
          form.setValue("artisanImage", file, { shouldValidate: true });
        } else {
          form.setValue("userImage", file, { shouldValidate: true });
        }

        toast.success(
          "New image selected. Save changes to update your profile."
        );
      }
    },
    [form, user?.role]
  );

  const onSubmit = async (data: ProfileFormData) => {
    if (data.active && !selectedFile && !imagePreview) {
      toast.info("Upload your profile image to activate your account");
      return;
    }

    try {
      if (user?.role === "User" || user?.role === "Admin") {
        const userData = {
          ...data,
          userImage: selectedFile || data.userImage,
        };
        await updateUserProfile(userData);
      } else {
        const artisanData = {
          ...data,
          artisanImage: selectedFile || data.artisanImage,
        };
        await updateArtisanProfile(artisanData);
      }

      setSelectedFile(null);
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    } catch (error) {
      console.error("Profile update failed:", error);
    }
  };

  const onPasswordSubmit = async (data: PasswordFormData) => {
    try {
      if (user?.role === "User" || user?.role === "Admin") {
        await updateUserPassword(data);
      } else {
        await updateArtisanPassword(data);
      }

      passwordForm.reset();
    } catch (error) {
      console.error("Password update failed:", error);
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  if (!user) {
    return (
      <Container>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
        </div>
      </Container>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center space-x-6 mb-8">
              <button
                type="button"
                onClick={() =>
                  document.getElementById("profileImageInput")?.click()
                }
                className="relative group cursor-pointer rounded-full overflow-hidden"
              >
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src={imagePreview || ""}
                    alt={`${user.firstName} ${user.lastName}`}
                  />
                  <AvatarFallback>{user.firstName?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-xs font-medium">
                    Change Photo
                  </span>
                </div>
              </button>
              <input
                type="file"
                id="profileImageInput"
                className="hidden"
                accept="image/jpeg,image/png,image/webp"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  handleImageChange(file || null);
                }}
              />
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  {user.firstName + " " + user.lastName}
                </h2>
                <p className="text-sm text-gray-500">{user.role}</p>
                {selectedFile && (
                  <p className="text-xs text-amber-600 mt-1 font-medium">
                    Unsaved changes - click "Save Changes" to update
                  </p>
                )}
              </div>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((data) => onSubmit(data))}
                className="space-y-6"
              >
                <div className="grid grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input {...field} readOnly />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input {...field} readOnly />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input {...field} readOnly />
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
                          <Input {...field} readOnly />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <PhoneInput
                            placeholder="Enter a phone number"
                            {...field}
                            international
                            defaultCountry="NG"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {user?.role === "Artisan" && (
                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Service</FormLabel>
                          <div className="relative">
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                      "w-full justify-between border-input font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value
                                      ? services?.find(
                                          (service) => service === field.value
                                        ) ?? field.value
                                      : "Select Service"}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="p-0">
                                <Command>
                                  <CommandInput placeholder="Search Service..." />
                                  <CommandList>
                                    <CommandEmpty>Not found.</CommandEmpty>
                                    <CommandGroup>
                                      {services?.map((service) => (
                                        <CommandItem
                                          value={service}
                                          key={service}
                                          onSelect={() => {
                                            form.setValue("service", service);
                                          }}
                                        >
                                          <Check
                                            className={cn(
                                              "mr-2 h-4 w-4",
                                              service === field.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                            )}
                                          />
                                          {service}
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <div className="relative">
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  className={cn(
                                    "w-full justify-between border-input font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value
                                    ? locations?.find(
                                        (location) => location === field.value
                                      ) ?? field.value
                                    : "Select Location"}
                                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="p-0">
                              <Command>
                                <CommandInput placeholder="Search Location..." />
                                <CommandList>
                                  <CommandEmpty>Not found.</CommandEmpty>
                                  <CommandGroup>
                                    {locations?.map((location) => (
                                      <CommandItem
                                        value={location}
                                        key={location}
                                        onSelect={() => {
                                          form.setValue("location", location);
                                        }}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            location === field.value
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                        {location}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <AutocompleteComponent
                            value={field.value}
                            onChange={field.onChange}
                            existingAddress={userAddress}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="active"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm border-input">
                        <div className="space-y-0.5">
                          <FormLabel>Account Status</FormLabel>
                          <FormDescription>
                            {field.value ? "Active" : "Inactive"}
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end">
                  <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                        Saving changes...
                      </div>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </TabsContent>
        <TabsContent value="password">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900">
              Change Password
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Update your password to secure your account
            </p>

            <Form {...passwordForm}>
              <form
                onSubmit={passwordForm.handleSubmit((data) =>
                  onPasswordSubmit(data)
                )}
                className="space-y-6 mt-6"
              >
                <div className="grid grid-cols-2 gap-6">
                  <FormField
                    control={passwordForm.control}
                    name="oldPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Old Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={passwordForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={passwordForm.control}
                    name="confirmNewPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={passwordForm.formState.isSubmitting}
                  >
                    {passwordForm.formState.isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                        Updating password...
                      </div>
                    ) : (
                      "Update Password"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
