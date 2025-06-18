import type { AddressType } from "@/components/address-autocomplete";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function destructureAddress(address: string): AddressType {
  try {
    const parsedAddress = JSON.parse(address) as AddressType;

    const {
      address1,
      address2,
      formattedAddress,
      city,
      region,
      postalCode,
      country,
      lat,
      lng,
    } = parsedAddress;

    return {
      address1,
      address2,
      formattedAddress,
      city,
      region,
      postalCode,
      country,
      lat,
      lng,
    };
  } catch (error) {
    console.error("Error destructuring address:", error);
    // Fallback: return an AddressType object with default values
    return {
      address1: "",
      address2: "",
      formattedAddress: address || "",
      city: "",
      region: "",
      postalCode: "",
      country: "",
      lat: 0,
      lng: 0,
    };
  }
}

