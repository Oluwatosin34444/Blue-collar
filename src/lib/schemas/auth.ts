import { z } from "zod";

import { isValidPhoneNumber } from "react-phone-number-input";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

const imageSchema = z
  .union([
    z.instanceof(File).refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Invalid file. Choose either JPEG, PNG, or WEBP image."
    ).refine(
      (file) => file.size <= MAX_FILE_SIZE,
      "Max file size allowed is 2MB."
    ),
    z.string().url("Must be a valid image URL"),
  ])
  .optional();

export const clientRegistrationSchema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    phone: z.string().refine(isValidPhoneNumber, "Invalid phone number"),
    location: z.string().min(1, "Please select a location"),
    address: z.string().min(1, "Please enter your address"),
    userImage: imageSchema,
    confirmPassword: z.string(),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const artisanRegistrationSchema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().refine(isValidPhoneNumber, "Invalid phone number"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    service: z.string().min(1, "Please select a service"),
    location: z.string().min(1, "Please select a location"),
    address: z.string().min(1, "Please enter your address"),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions",
    }),
    artisanImage: imageSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean(),
});

export const profileSchema = z.object({
  id: z.string(),
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .optional(),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .optional(),
  email: z.string().email("Invalid email address"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  phone: z.string().refine(isValidPhoneNumber, "Invalid phone number"),
  location: z.string().min(1, "Please select a location"),
  address: z.string().min(1, "Please enter your address"),
  service: z.string().optional(),
  userImage: imageSchema,
  artisanImage: imageSchema,
  active: z.boolean(),
});

export const passwordSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    oldPassword: z.string().min(8, "Password must be at least 8 characters"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

export type ClientRegistrationFormData = z.infer<
  typeof clientRegistrationSchema
>;
export type ArtisanRegistrationFormData = z.infer<
  typeof artisanRegistrationSchema
>;
export type ProfileFormData = z.infer<typeof profileSchema>;
export type PasswordFormData = z.infer<typeof passwordSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
