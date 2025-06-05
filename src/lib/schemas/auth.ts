import { z } from "zod";

import { isValidPhoneNumber } from "react-phone-number-input";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8MB

const imageSchema = z.any().optional()
.refine(file => file?.length == 1 ? ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type) ? true : false : true, 'Invalid file. choose either JPEG or PNG image')
.refine(file => file?.length == 1 ? file?.[0]?.size <= MAX_FILE_SIZE ? true : false : true, 'Max file size allowed is 8MB.')

export const clientRegistrationSchema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    phone: z.string().refine(isValidPhoneNumber, "Invalid phone number"),
    location: z.string().min(1, "Please select a location"),
    role: z.enum(["User"]),
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
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions",
    }),
    artisanImage: imageSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ClientRegistrationFormData = z.infer<
  typeof clientRegistrationSchema
>;
export type ArtisanRegistrationFormData = z.infer<
  typeof artisanRegistrationSchema
>;
