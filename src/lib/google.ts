"use server";

import { Client } from "@googlemaps/google-maps-services-js";

const client = new Client();
export const autocomplete = async (input: string) => {
  if (!input) return [];

  try {
    const response = await client.placeAutocomplete({
      params: {
        input,
        key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY!,
      },
    });

    return response.data.predictions;
  } catch (error) {
    console.error(error);
  }
};