import { type AddressType } from "@/components/address-autocomplete";

export async function GET(req: Request) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;

  if (!apiKey) {
    return Response.json({ error: "Missing API Key", data: null });
  }

  const { searchParams } = new URL(
    req.url,
    `http://${req.headers?.get("host")}`
  );
  const placeId = searchParams.get("placeId");
  const url = `https://places.googleapis.com/v1/${placeId}`;

  try {
    const response = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          // Include expected fields in the response
          "adrFormatAddress,shortFormattedAddress,formattedAddress,location,addressComponents",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const dataFinderRegx = (c: string) => {
      const regx = new RegExp(`<span class="${c}">([^<]+)</span>`);
      const match = data.adrFormatAddress.match(regx);
      return match ? match[1] : "";
    };

    const address1 = dataFinderRegx("street-address");
    const address2 = "";
    const city = dataFinderRegx("locality");
    const region = dataFinderRegx("region");
    const postalCode = dataFinderRegx("postal-code");
    const country = dataFinderRegx("country-name");
    const lat = data.location.latitude;
    const lng = data.location.longitude;

    const formattedAddress = data.formattedAddress;

    const formattedData: AddressType = {
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
    return Response.json({
      data: {
        address: formattedData,
        adrAddress: data.adrFormatAddress,
      },
      error: null,
    });
  } catch (err) {
    console.error("Error fetching place details:", err);
    return Response.json({ error: err, data: null });
  }
}
