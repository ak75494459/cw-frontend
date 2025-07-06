import { useCheckout } from "@/context/CheckOutContext"; // ✅ get from context
import { useGetMyAddresses } from "@/api/MyaddressApi";
import SelectAddress from "@/components/SelectAddress";

const SelectAddressPage = () => {
  const { addressesData, isLoading } = useGetMyAddresses();
  const { selectedAddressId, setSelectedAddressId } = useCheckout(); // ✅ get state

  if (isLoading) return <div className="container m-auto">Loading...</div>;

  return (
    <div className="container m-auto py-6 space-y-6">
      <h1 className="text-xl font-semibold">Select Delivery Address</h1>
      <SelectAddress
        addressesData={addressesData!}
        selectedAddressId={selectedAddressId}
        setSelectedAddressId={setSelectedAddressId}
      />
    </div>
  );
};

export default SelectAddressPage;
