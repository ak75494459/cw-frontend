import { createContext, useContext, useState } from "react";
import type { Dispatch, SetStateAction, ReactNode } from "react";
import type { GetCartType } from "@/types"; // Adjust this path

// Props for Provider
interface CheckoutProviderProps {
  children: ReactNode;
}

// Context type
interface CheckoutContextType {
  amount: number;
  setAmount: Dispatch<SetStateAction<number>>;
  items: GetCartType | undefined;
  setItems: Dispatch<SetStateAction<GetCartType | undefined>>;
  paymentMethod: string;
  setPaymentMethod: Dispatch<SetStateAction<string>>;
}

// Create Context
const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined
);

// Provider Component
export const CheckoutProvider = ({ children }: CheckoutProviderProps) => {
  const [amount, setAmount] = useState<number>(0);
  const [items, setItems] = useState<GetCartType | undefined>(undefined);
  const [paymentMethod, setPaymentMethod] = useState<string>("");

  return (
    <CheckoutContext.Provider
      value={{
        amount,
        setAmount,
        items,
        setItems,
        paymentMethod,
        setPaymentMethod,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

// Hook to use the context
export const useCheckout = (): CheckoutContextType => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }
  return context;
};
