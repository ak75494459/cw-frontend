import React from "react";
import { Separator } from "@/components/ui/separator"; // ✅ Adjust this path if needed

const ReturnPolicy: React.FC = () => {
  return (
    <div className="bg-background text-muted-foreground max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-primary">
        Return & Refund Policy
      </h1>

      <p className="mb-6 text-sm sm:text-base leading-relaxed">
        Thank you for shopping with{" "}
        <strong className="text-primary">ISHARAE ENTERPRISES</strong>. We want
        you to love what you ordered! If something isn’t right, here’s how we
        can help.
      </p>

      <Separator className="my-6" />

      <section>
        <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-primary">
          Eligible Items
        </h2>
        <p className="text-sm sm:text-base leading-relaxed">
          Items must be unused, unworn, unwashed, and in original packaging with
          all tags intact.
          {/* TODO: Update this if you allow returns for used items */}
        </p>
      </section>

      <Separator className="my-6" />

      <section>
        <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-primary">
          Return Window
        </h2>
        <p className="text-sm sm:text-base leading-relaxed">
          Returns are accepted within 7 days of delivery. Requests after this
          period may not be eligible.
          {/* TODO: Change 7 days if your policy differs */}
        </p>
      </section>

      <Separator className="my-6" />

      <section>
        <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-primary">
          Refunds or Replacements
        </h2>
        <p className="text-sm sm:text-base leading-relaxed">
          Upon approval, you can choose a replacement or refund. Refunds will be
          processed to your original payment method within 5–7 business days.
          {/* TODO: Change timeline or method if needed */}
        </p>
      </section>

      <Separator className="my-6" />

      <section>
        <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-primary">
          Return Shipping
        </h2>
        <p className="text-sm sm:text-base leading-relaxed">
          Customers are responsible for return shipping costs unless the item is
          defective or incorrect.
          {/* TODO: Update if you offer free returns */}
        </p>
      </section>

      <Separator className="my-6" />

      <section>
        <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-primary">
          How to Request a Return
        </h2>
        <p className="text-sm sm:text-base leading-relaxed">
          To initiate a return, please contact our support team with your order
          number and reason for return.
          <br />
          <br />
          <strong>Contact us at:</strong>
          <br />
          Email: support@isharae.com
          <br />
          Phone: +91-7549445937
          {/* TODO: Replace with your real support email and phone */}
        </p>
      </section>

      <Separator className="my-6" />

      <section>
        <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-primary">
          Exceptions
        </h2>
        <p className="text-sm sm:text-base leading-relaxed">
          Customized or personalized items are non-returnable unless damaged or
          defective. Sale items may also be final sale.
          {/* TODO: Add any other exceptions you have */}
        </p>
      </section>

      <Separator className="my-6" />

      <p className="mt-8 text-center text-sm text-muted-foreground">
        We appreciate your trust in{" "}
        <strong className="text-primary">ISHARAE ENTERPRISES</strong>. Your
        satisfaction is important to us!
      </p>
    </div>
  );
};

export default ReturnPolicy;
