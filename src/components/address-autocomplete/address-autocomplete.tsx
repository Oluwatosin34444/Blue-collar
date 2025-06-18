import AddressAutoComplete, { type AddressType } from "./index";
import { useState, useEffect, useCallback } from "react";

interface AutocompleteComponentProps {
  value?: string;
  onChange?: (value: string) => void;
  existingAddress?: AddressType;
}

export const AutocompleteComponent = ({ value, onChange, existingAddress }: AutocompleteComponentProps) => {
  const [address, setAddress] = useState<AddressType>(existingAddress || {
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

  useEffect(() => {
    if (value && value !== address.formattedAddress) {
      setSearchInput(value);
    }
  }, [address.formattedAddress, value]);

  const handleAddressChange = useCallback((newAddress: AddressType) => {
    console.log('handleAddressChange called with:', newAddress);
    setAddress(newAddress || existingAddress);
    if (onChange) {
      console.log('Calling onChange with:', newAddress.formattedAddress, JSON.stringify(newAddress));
      onChange(JSON.stringify(newAddress));
    }
  }, [onChange, existingAddress]);

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