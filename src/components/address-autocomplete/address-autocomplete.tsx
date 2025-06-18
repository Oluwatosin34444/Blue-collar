import AddressAutoComplete, { type AddressType } from "./index";
import { useState, useEffect, useCallback } from "react";

interface AutocompleteComponentProps {
  value?: string;
  onChange?: (value: string) => void;
}

export const AutocompleteComponent = ({ value, onChange }: AutocompleteComponentProps) => {
  const [address, setAddress] = useState<AddressType>({
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

  const [searchInput, setSearchInput] = useState("");

  // Update address when external value changes
  useEffect(() => {
    if (value && value !== address.formattedAddress) {
      setSearchInput(value);
    }
  }, [address.formattedAddress, value]);

  // Handle address change and notify parent
  const handleAddressChange = useCallback((newAddress: AddressType) => {
    console.log('handleAddressChange called with:', newAddress);
    setAddress(newAddress);
    // Return the formatted address as string to the form field
    if (onChange) {
      console.log('Calling onChange with:', newAddress.formattedAddress, JSON.stringify(newAddress));
      onChange(JSON.stringify(newAddress));
    }
  }, [onChange]);

  return (
    <AddressAutoComplete
      address={address}
      setAddress={handleAddressChange}
      searchInput={searchInput}
      setSearchInput={setSearchInput}
      dialogTitle="Enter Address"
    />
  );
};