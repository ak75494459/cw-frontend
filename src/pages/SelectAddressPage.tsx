import { useGetMyAddresses } from "@/api/MyaddressApi";
import SelectAddress from "@/components/SelectAddress";

const SelectAddressPage = () => {
  const { addressesData, isLoading } = useGetMyAddresses();
  if (isLoading) return <div className="container m-auto">Loding...</div>;
  return <SelectAddress addressesData={addressesData!} />;
};

export default SelectAddressPage;
