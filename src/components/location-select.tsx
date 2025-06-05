import * as React from "react";
import { Check, ChevronsUpDown, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
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
import { Button } from "@/components/ui/button";
import { autocomplete } from "@/lib/google";
import type { PlaceAutocompleteResult } from "@googlemaps/google-maps-services-js";

export interface LocationSelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export interface SelectedLocation {
  placeId: string;
  description: string;
}

export const LocationSelect = React.forwardRef<
  HTMLButtonElement,
  LocationSelectProps
>(({ value, onValueChange, placeholder = "Select location...", disabled, className }, ref) => {
  const [open, setOpen] = React.useState(false);
  const [predictions, setPredictions] = React.useState<PlaceAutocompleteResult[]>([]);
  const [input, setInput] = React.useState("");
  const [selectedLocation, setSelectedLocation] = React.useState<SelectedLocation | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  // Debounce the input to avoid too many API calls
  const [debouncedInput, setDebouncedInput] = React.useState("");

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedInput(input);
    }, 300);

    return () => clearTimeout(timer);
  }, [input]);

  React.useEffect(() => {
    if (!debouncedInput.trim()) {
      setPredictions([]);
      return;
    }

    const fetchPredictions = async () => {
      setIsLoading(true);
      try {
        const results = await autocomplete(debouncedInput);
        setPredictions(results ?? []);
      } catch (error) {
        console.error("Error fetching predictions:", error);
        setPredictions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPredictions();
  }, [debouncedInput]);

  // Initialize selected location from value
  React.useEffect(() => {
    if (value && !selectedLocation) {
      // If value is provided but no selectedLocation, try to parse it
      // Assuming value format is "placeId|description" or just description
      const parts = value.split("|");
      if (parts.length === 2) {
        setSelectedLocation({
          placeId: parts[0],
          description: parts[1],
        });
      } else {
        setSelectedLocation({
          placeId: "",
          description: value,
        });
      }
    }
  }, [value, selectedLocation]);

  const handleSelect = (prediction: PlaceAutocompleteResult) => {
    const location = {
      placeId: prediction.place_id,
      description: prediction.description,
    };
    
    setSelectedLocation(location);
    setOpen(false);
    setInput("");
    
    // Call onValueChange with the selected value
    // You can customize this format based on your needs
    onValueChange?.(`${prediction.place_id}|${prediction.description}`);
  };

  const handleClear = () => {
    setSelectedLocation(null);
    setInput("");
    onValueChange?.("");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={ref}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between border-input",
            !selectedLocation && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          <div className="flex items-center gap-2 font-normal">
            <MapPin className="h-4 w-4" />
            {selectedLocation ? (
              <span className="truncate">{selectedLocation.description}</span>
            ) : (
              placeholder
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput
            placeholder="Search locations..."
            value={input}
            onValueChange={setInput}
          />
          <CommandList>
            <CommandEmpty>
              {isLoading ? "Searching..." : "No locations found."}
            </CommandEmpty>
            {selectedLocation && (
              <CommandGroup heading="Current">
                <CommandItem
                  value={selectedLocation.description}
                  onSelect={handleClear}
                  className="text-destructive"
                >
                  Clear selection
                </CommandItem>
              </CommandGroup>
            )}
            {predictions.length > 0 && (
              <CommandGroup heading="Suggestions">
                {predictions.map((prediction) => (
                  <CommandItem
                    key={prediction.place_id}
                    value={prediction.description}
                    onSelect={() => handleSelect(prediction)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedLocation?.placeId === prediction.place_id
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    <MapPin className="mr-2 h-4 w-4 opacity-50" />
                    <span className="truncate">{prediction.description}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
});

LocationSelect.displayName = "LocationSelect";