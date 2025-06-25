import { useCreateMyAddress } from "@/api/MyaddressApi";
import AddressForm from "@/forms/address-form/AddressForm";

const AddressFormPage = () => {
  const { createAddress, isPending } = useCreateMyAddress();

  return (
    <div className="container m-auto sm:container">
      <AddressForm onSave={createAddress} isLoading={isPending} />
    </div>
  );
};

export default AddressFormPage;
