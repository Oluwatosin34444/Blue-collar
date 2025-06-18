import { z } from "zod";

export const kycSchema = z.object({
  // Personal Information
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  dateOfBirth: z.date({
    required_error: "A date of birth is required.",
  }),
  gender: z.enum(["male", "female", "other", "prefer-not-to-say"]),

  // Address Information
  streetAddress: z
    .string()
    .min(5, "Street address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  zipCode: z.string().min(5, "ZIP code must be at least 5 characters"),
  country: z.string().min(2, "Country is required"),

  // Professional Information
  service: z.string().min(1, "Service is required"),
  yearsOfExperience: z.string().min(1, "Years of experience is required"),
  certifications: z.string().optional(),
  workDescription: z
    .string()
    .min(10, "Work description must be at least 10 characters"),

  // Emergency Contact
  emergencyContactName: z.string().min(2, "Emergency contact name is required"),
  emergencyContactEmail: z.string().email("Invalid email address"),
  emergencyContactPhone: z
    .string()
    .min(10, "Emergency contact phone is required"),
  emergencyContactRelation: z.string().min(1, "Relationship is required"),

  // Document Uploads
  nationalId: z
    .any()
    .refine((files) => files?.length > 0, "National ID is required"),
  proofOfAddress: z
    .any()
    .refine((files) => files?.length > 0, "Proof of address is required"),
  professionalCertificate: z.any().optional(),
});

export type KYCFormData = z.infer<typeof kycSchema>;
