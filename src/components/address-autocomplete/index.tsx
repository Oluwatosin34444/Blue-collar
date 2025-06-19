/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormMessages } from "@/components/form-messages";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { Delete, Loader2, Pencil } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import AddressDialog from "./address-dialog";

import { Command as CommandPrimitive } from "cmdk";

export interface AddressType {
  address1: string;
  address2: string;
  formattedAddress: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  lat: number;
  lng: number;
}

interface AddressAutoCompleteProps {
  address: AddressType;
  setAddress: (address: AddressType) => void;
  searchInput: string;
  setSearchInput: (searchInput: string) => void;
  dialogTitle: string;
  showInlineError?: boolean;
  placeholder?: string;
}

const GOOGLE_BASE_URL = import.meta.env.VITE_API_GOOGLE_BASE_URL;

async function fetchAutocompleteSuggestions(input: string) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    throw new Error("Missing Google Maps API Key");
  }

  if (!input.trim()) {
    return { data: [], error: null };
  }

  const url = `${GOOGLE_BASE_URL}/v1/places:autocomplete`;

  const primaryTypes = [
    "street_address",
    "subpremise",
    "route",
    "street_number",
    "landmark",
  ];

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
      },
      body: JSON.stringify({
        input: input,
        includedPrimaryTypes: primaryTypes,
        includedRegionCodes: ["NG"], // Default to Nigeria, you can make this dynamic
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { data: data.suggestions || [], error: null };
  } catch (error) {
    console.error("Error fetching autocomplete suggestions:", error);
    return {
      data: [],
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

async function fetchPlaceDetails(placeId: string) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    throw new Error("Missing Google Maps API Key");
  }

  const url = `${GOOGLE_BASE_URL}/v1/${placeId}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "id,displayName,formattedAddress,addressComponents,location",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const addressComponents = data.addressComponents || [];
    const address: AddressType = {
      address1: data.formattedAddress || "",
      address2: "",
      formattedAddress: data.formattedAddress || "",
      city:
        addressComponents.find((comp: any) => comp.types.includes("locality"))
          ?.longText || "",
      region:
        addressComponents.find((comp: any) =>
          comp.types.includes("administrative_area_level_1")
        )?.longText || "",
      postalCode:
        addressComponents.find((comp: any) =>
          comp.types.includes("postal_code")
        )?.longText || "",
      country:
        addressComponents.find((comp: any) => comp.types.includes("country"))
          ?.longText || "",
      lat: data.location?.latitude || 0,
      lng: data.location?.longitude || 0,
    };

    return { data: { address, adrAddress: data }, error: null };
  } catch (error) {
    console.error("Error fetching place details:", error);
    return {
      data: null,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export default function AddressAutoComplete(props: AddressAutoCompleteProps) {
  const {
    address,
    setAddress,
    dialogTitle,
    showInlineError = true,
    searchInput,
    setSearchInput,
    placeholder,
  } = props;

  const [selectedPlaceId, setSelectedPlaceId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [adrAddress, setAdrAddress] = useState(null);

  console.log(selectedPlaceId, "see selectedPlaceId");

  useEffect(() => {
    if (selectedPlaceId) {
      setIsLoadingDetails(true);
      fetchPlaceDetails(selectedPlaceId)
        .then((result) => {
          if (result.data) {
            setAddress(result.data.address);
            setAdrAddress(result.data.adrAddress);
          }
        })
        .finally(() => {
          setIsLoadingDetails(false);
        });
    }
  }, [selectedPlaceId, setAddress]);

  return (
    <>
      {selectedPlaceId !== "" || address.formattedAddress ? (
        <div className="flex items-center gap-2">
          <Input value={address?.formattedAddress} readOnly />

          <AddressDialog
            isLoading={isLoadingDetails}
            dialogTitle={dialogTitle}
            adrAddress={adrAddress || ""}
            address={address}
            setAddress={setAddress}
            open={isOpen}
            setOpen={setIsOpen}
          >
            <Button
              disabled={isLoadingDetails}
              size="icon"
              variant="outline"
              className="shrink-0"
            >
              <Pencil className="size-4" />
            </Button>
          </AddressDialog>
          <Button
            type="reset"
            onClick={() => {
              setSelectedPlaceId("");
              setAddress({
                address1: "",
                address2: "",
                formattedAddress: "",
                city: "",
                region: "",
                postalCode: "",
                country: "",
                lat: 0,
                lng: 0,
              });
              setAdrAddress(null);
            }}
            size="icon"
            variant="outline"
            className="shrink-0"
          >
            <Delete className="size-4" />
          </Button>
        </div>
      ) : (
        <AddressAutoCompleteInput
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          selectedPlaceId={selectedPlaceId}
          setSelectedPlaceId={setSelectedPlaceId}
          setIsOpenDialog={setIsOpen}
          showInlineError={showInlineError}
          placeholder={placeholder}
        />
      )}
    </>
  );
}

interface CommonProps {
  selectedPlaceId: string;
  setSelectedPlaceId: (placeId: string) => void;
  setIsOpenDialog: (isOpen: boolean) => void;
  showInlineError?: boolean;
  searchInput: string;
  setSearchInput: (searchInput: string) => void;
  placeholder?: string;
}

function AddressAutoCompleteInput(props: CommonProps) {
  const {
    setSelectedPlaceId,
    selectedPlaceId,
    setIsOpenDialog,
    showInlineError,
    searchInput,
    setSearchInput,
    placeholder,
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [predictions, setPredictions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      close();
    }
  };

  const debouncedSearchInput = useDebounce(searchInput, 500);

  useEffect(() => {
    if (debouncedSearchInput.trim()) {
      setIsLoading(true);
      setError(null);

      fetchAutocompleteSuggestions(debouncedSearchInput)
        .then((result) => {
          if (result.error) {
            setError(result.error);
            setPredictions([]);
          } else {
            setPredictions(result.data);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setPredictions([]);
      setError(null);
    }
  }, [debouncedSearchInput]);

  return (
    <Command
      shouldFilter={false}
      onKeyDown={handleKeyDown}
      className="overflow-visible"
    >
      <div className="flex w-full items-center justify-between rounded-lg border bg-background ring-offset-background text-sm focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <CommandPrimitive.Input
          value={searchInput}
          onValueChange={setSearchInput}
          onBlur={close}
          onFocus={open}
          placeholder={placeholder || "Enter address"}
          className="w-full file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm
        focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
        aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
        />
      </div>

      {searchInput !== "" && !isOpen && !selectedPlaceId && showInlineError && (
        <FormMessages
          type="error"
          className="pt-1 text-sm"
          messages={["Select a valid address from the list"]}
        />
      )}

      {error && (
        <FormMessages
          type="error"
          className="pt-1 text-sm"
          messages={[`Error: ${error}`]}
        />
      )}

      {isOpen && (
        <div className="relative animate-in fade-in-0 zoom-in-95 h-auto">
          <CommandList>
            <div className="absolute top-1.5 z-50 w-full">
              <CommandGroup className="relative h-auto z-50 min-w-[8rem] overflow-hidden rounded-md border shadow-md bg-background">
                {isLoading ? (
                  <div className="h-28 flex items-center justify-center">
                    <Loader2 className="size-6 animate-spin" />
                  </div>
                ) : (
                  <>
                    {predictions.map(
                      (prediction: {
                        placePrediction: {
                          placeId: string;
                          place: string;
                          text: { text: string };
                        };
                      }) => (
                        <CommandPrimitive.Item
                          value={prediction.placePrediction.text.text}
                          onSelect={() => {
                            setSearchInput("");
                            setSelectedPlaceId(
                              prediction.placePrediction.place
                            );
                            setIsOpenDialog(true);
                          }}
                          className="flex select-text flex-col cursor-pointer gap-0.5 h-max p-2 px-3 rounded-md aria-selected:bg-accent aria-selected:text-accent-foreground hover:bg-accent hover:text-accent-foreground items-start"
                          key={prediction.placePrediction.placeId}
                          onMouseDown={(e) => e.preventDefault()}
                        >
                          {prediction.placePrediction.text.text}
                        </CommandPrimitive.Item>
                      )
                    )}
                  </>
                )}

                <CommandEmpty>
                  {!isLoading && predictions.length === 0 && (
                    <div className="py-4 flex items-center justify-center">
                      {searchInput === ""
                        ? "Please enter an address"
                        : "No address found"}
                    </div>
                  )}
                </CommandEmpty>
              </CommandGroup>
            </div>
          </CommandList>
        </div>
      )}
    </Command>
  );
}
