import { useCheckout } from "@/context/CheckOutContext";
import { useGetMyAddresses } from "@/api/MyaddressApi";
import SelectAddress from "@/components/SelectAddress";

const SelectAddressPage = () => {
  const { addressesData, isLoading } = useGetMyAddresses();
  const { selectedAddress, setSelectedAddress } = useCheckout();

  if (isLoading) return <div className="container m-auto">Loading...</div>;

  return (
    <div className="container m-auto py-6 space-y-6">
      <h1 className="text-xl font-semibold">Select Delivery Address</h1>
      <SelectAddress
        addressesData={addressesData!}
        selectedAddress={selectedAddress}
        setSelectedAddress={setSelectedAddress}
      />
    </div>
  );
};

export default SelectAddressPage;
