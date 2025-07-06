import { createContext, useContext, useState } from "react";
import type { Dispatch, SetStateAction, ReactNode } from "react";
import type { GetCartType } from "@/types";

interface CheckoutProviderProps {
  children: ReactNode;
}

interface CheckoutContextType {
  amount: number;
  setAmount: Dispatch<SetStateAction<number>>;
  items: GetCartType | undefined;
  setItems: Dispatch<SetStateAction<GetCartType | undefined>>;
  paymentMethod: string;
  setPaymentMethod: Dispatch<SetStateAction<string>>;

  selectedAddressId: string | null;
  setSelectedAddressId: Dispatch<SetStateAction<string | null>>;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined
);

export const CheckoutProvider = ({ children }: CheckoutProviderProps) => {
  const [amount, setAmount] = useState<number>(0);
  const [items, setItems] = useState<GetCartType | undefined>(undefined);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );
  console.log(selectedAddressId);

  return (
    <CheckoutContext.Provider
      value={{
        amount,
        setAmount,
        items,
        setItems,
        paymentMethod,
        setPaymentMethod,
        selectedAddressId,
        setSelectedAddressId,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = (): CheckoutContextType => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }
  return context;
};
