import React from "react";

const ShippingPolicy: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-4 text-center">
        🚚 Shipping Policy
      </h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">📦 Order Processing Time</h2>
        <p>
          All orders are processed within <strong>1-2 business days</strong>.
          Orders are not shipped or delivered on weekends or holidays.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          🚛 Shipping Methods & Charges
        </h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Standard Shipping:</strong> ₹49 (Free on orders over ₹999)
          </li>
          <li>
            <strong>Express Shipping:</strong> ₹99 (Delivery in 1-2 business
            days)
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">🌍 Delivery Locations</h2>
        <p>
          We currently ship across <strong>India</strong>. For remote or
          restricted areas, delivery timelines may vary.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          📅 Estimated Delivery Time
        </h2>
        <p>
          Delivery times typically range between{" "}
          <strong>3-7 business days</strong> depending on your location. You
          will receive an email with tracking details once your order is
          dispatched.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">📝 Order Tracking</h2>
        <p>
          Once your order has shipped, you will receive an email with a tracking
          number and courier details. You can use this to track your order in
          real-time.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">❗ Delays & Issues</h2>
        <p>
          Delays may occasionally occur due to unforeseen circumstances like
          weather or carrier issues. If your order hasn’t arrived within the
          estimated time, please contact our support team.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">📬 Contact</h2>
        <p>
          For any shipping-related queries, reach out to us at: <br />
          <strong>Email:</strong> support@isharae.com <br />
          <strong>Phone:</strong> +91-7973990408
        </p>
      </section>
    </div>
  );
};

export default ShippingPolicy;
