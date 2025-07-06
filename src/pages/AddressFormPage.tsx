import { useCreateMyAddress } from "@/api/MyaddressApi";
import AddressForm from "@/forms/address-form/AddressForm";
import { useGetMyAddresses } from "@/api/MyaddressApi";

const AddressFormPage = () => {
  const { createAddress, isPending } = useCreateMyAddress();
  const { refetch } = useGetMyAddresses();

  return (
    <div className="container m-auto sm:container">
      <AddressForm
        onSave={createAddress}
        isLoading={isPending}
        refetchAddresses={refetch}
      />
    </div>
  );
};

export default AddressFormPage;
