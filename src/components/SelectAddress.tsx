import { useEffect } from "react";
import type { Address, UserAddresses } from "@/types";

type Props = {
  addressesData?: UserAddresses;
  selectedAddress: Address | null;
  setSelectedAddress: (address: Address) => void;
};

const SelectAddress = ({
  addressesData,
  selectedAddress,
  setSelectedAddress,
}: Props) => {
  // ✅ Auto-select default or first address
  useEffect(() => {
    if (!selectedAddress && addressesData?.addresses?.length) {
      const defaultAddress =
        addressesData.addresses.find((a) => a.isDefault) ??
        addressesData.addresses[0];

      if (defaultAddress) {
        setSelectedAddress(defaultAddress);
      }
    }
  }, [addressesData, selectedAddress, setSelectedAddress]);

  if (!addressesData || !addressesData.addresses?.length) {
    return <p className="text-gray-500">No addresses found.</p>;
  }

  return (
    <div className="space-y-4">
      {addressesData.addresses.map((address) => {
        const isSelected = selectedAddress?._id === address._id;

        return (
          <label
            key={address._id}
            className={`relative block p-5 border rounded-lg shadow-sm transition-all cursor-pointer ${
              isSelected
                ? "border-[#492822] bg-[#492822]/10 ring-2 ring-[#492822]"
                : "border-gray-300 hover:border-blue-300"
            }`}
          >
            <div className="flex items-start gap-4">
              <input
                type="radio"
                name="selectedAddress"
                value={address._id}
                checked={isSelected}
                onChange={() => setSelectedAddress(address)}
                className="mt-1 h-5 w-5 text-blue-600 focus:ring-blue-500"
              />
              <div className="text-sm">
                <p className="font-semibold text-gray-900">
                  {address.fullName}
                </p>
                <p className="text-gray-700">{address.addressLine1}</p>
                {address.addressLine2 && (
                  <p className="text-gray-700">{address.addressLine2}</p>
                )}
                <p className="text-gray-700">
                  {address.city}, {address.state} - {address.pincode}
                </p>
                <p className="text-gray-700">{address.country}</p>
              </div>
            </div>

            {isSelected && (
              <span className="absolute top-2 right-3 text-xs font-medium text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                Selected
              </span>
            )}
          </label>
        );
      })}
    </div>
  );
};

export default SelectAddress;
