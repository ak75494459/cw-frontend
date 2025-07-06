import AddressFormPage from "@/pages/AddressFormPage";
import SelectAddressPage from "@/pages/SelectAddressPage";
import React, { useState } from "react";
import CheckOutProducts from "./CheckOutProducts";

interface OverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

//  #DDD0C8
//  #323232
//  #99775C
//  #CC7351
//  #EFE4D2
//  #492822

const steps = ["Address", "Review & Pay"];

const CheckoutOverlay: React.FC<OverlayProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [useExistingAddress, setUseExistingAddress] = useState(true);

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="bg-white w-full max-w-2xl h-[90vh] sm:h-[80vh] rounded-lg shadow-xl flex flex-col overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b flex items-center justify-between bg-gray-50">
              <h2 className="text-lg font-semibold">{steps[step - 1]}</h2>
              <button onClick={onClose} className="text-gray-600  transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#640202"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-x-icon lucide-x"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            {/* Step Indicator */}
            <div className="flex justify-center space-x-2 py-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-16 rounded-full ${
                    index + 1 <= step ? "bg-[#492822]" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden">
              <div
                className="flex h-full transition-transform duration-500"
                style={{ transform: `translateX(-${(step - 1) * 100}%)` }}
              >
                {/* Step 1: Address Selection */}
                <div className="w-full min-w-full h-full overflow-y-auto px-4 py-6 space-y-4">
                  <div className="flex justify-center gap-4 flex-wrap">
                    <button
                      onClick={() => setUseExistingAddress(true)}
                      className={`px-4 py-2 font-bold rounded border ${
                        useExistingAddress
                          ? "bg-[#492822] text-white"
                          : "bg-white text-[#492822]"
                      }`}
                    >
                      Use Existing Address
                    </button>
                    <button
                      onClick={() => setUseExistingAddress(false)}
                      className={`px-4 py-2 font-bold rounded border ${
                        !useExistingAddress
                          ? "bg-[#492822] text-white"
                          : "bg-white text-[#492822]"
                      }`}
                    >
                      Add New Address
                    </button>
                  </div>

                  {useExistingAddress ? (
                    <SelectAddressPage />
                  ) : (
                    <AddressFormPage />
                  )}
                </div>

                {/* Step 2: Payment */}
                <div className="w-full min-w-full h-full overflow-y-auto  py-6">
                  {step === 2 && <CheckOutProducts />}
                </div>
              </div>
            </div>

            {/* Footer Controls */}
            <div className="flex justify-end p-4 border-t bg-gray-50">
              <button
                onClick={handleBack}
                className={`px-4 py-2 rounded ${
                  step === 1 && "text-gray-400 cursor-not-allowed hidden"
                }`}
              >
                Back
              </button>
              {step < steps.length && (
                <button
                  onClick={handleNext}
                  className="bg-[#492822] text-white px-4 py-2 rounded hover:bg-[#CC7351]  transition"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutOverlay;
