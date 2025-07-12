import React from "react";
import { Separator } from "@/components/ui/separator"; // ✅ Update this import path if different

const TermsOfService: React.FC = () => {
  return (
    <div className="bg-background text-muted-foreground max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-primary">
        Terms of Service
      </h1>

      <p className="mb-6 text-sm sm:text-base leading-relaxed">
        Welcome to <strong className="text-primary">ISHARAE ENTERPRISES</strong>
        ! These Terms of Service ("Terms") govern your access to and use of our
        website, products, and services. By visiting our website or purchasing
        from us, you agree to be bound by these Terms. Please read them
        carefully.
      </p>

      <Separator className="my-6" />

      <section>
        <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-primary">
          1. Who Can Use Our Services
        </h2>
        <p className="text-sm sm:text-base leading-relaxed">
          By accessing our website, you confirm that you are of legal age in
          your jurisdiction or have permission from a legal guardian to use our
          services. Our products are for personal, non-commercial use, and any
          misuse or unauthorized access may result in termination of your
          account.
        </p>
      </section>

      <Separator className="my-6" />

      <section>
        <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-primary">
          2. Your Account
        </h2>
        <p className="text-sm sm:text-base leading-relaxed">
          To make purchases on our website, you may need to create an account.
          You agree to provide accurate and up-to-date information and keep your
          login details secure. You are responsible for any activity under your
          account.
          <br />
          We reserve the right to suspend or terminate accounts that violate our
          Terms or engage in fraudulent activities.
        </p>
      </section>

      <Separator className="my-6" />

      <section>
        <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-primary">
          3. Product Information & Availability
        </h2>
        <p className="text-sm sm:text-base leading-relaxed">
          We strive to ensure that all product details, descriptions, and prices
          on our website are accurate. However, slight variations may occur due
          to photography, screen settings, or manufacturing differences.
          <br />
          Product availability is subject to change without notice.
        </p>
      </section>

      <Separator className="my-6" />

      <section>
        <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-primary">
          4. Pricing & Payment
        </h2>
        <p className="text-sm sm:text-base leading-relaxed">
          All prices are listed in INR and include applicable taxes. We accept
          various payment methods, including credit/debit cards, UPI, and
          wallets.
          <br />
          We reserve the right to update prices at any time. In case of errors,
          we will notify you before processing.
        </p>
      </section>

      <Separator className="my-6" />

      <section>
        <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-primary">
          5. Shipping & Delivery
        </h2>
        <p className="text-sm sm:text-base leading-relaxed">
          We currently ship across India. Shipping times and costs may vary
          based on your location and chosen method.
          <br />
          Once dispatched, tracking details will be shared. Delays may occur due
          to factors beyond our control.
        </p>
      </section>

      <Separator className="my-6" />

      <section>
        <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-primary">
          6. Returns & Exchanges
        </h2>
        <p className="text-sm sm:text-base leading-relaxed">
          We aim to deliver quality products. If you're unsatisfied, you can
          request an exchange within 7 days of delivery.
          <br />
          Items must be unused, with tags intact, and in original packaging.
          Customized or personalized products are non-returnable.
        </p>
      </section>

      <Separator className="my-6" />

      <section>
        <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-primary">
          7. Privacy & Security
        </h2>
        <p className="text-sm sm:text-base leading-relaxed">
          Your privacy matters to us. We handle personal data as described in
          our Privacy Policy. Secure payment gateways and encryption are used to
          protect your information.
        </p>
      </section>

      <Separator className="my-6" />

      <section>
        <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-primary">
          8. Third-Party Services
        </h2>
        <p className="text-sm sm:text-base leading-relaxed">
          Our site may link to third-party services. ISHARAE ENTERPRISES isn't
          responsible for the content or policies of these external sites. Use
          them at your own risk.
        </p>
      </section>

      <Separator className="my-6" />

      <section>
        <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-primary">
          9. Intellectual Property
        </h2>
        <p className="text-sm sm:text-base leading-relaxed">
          All website content—including text, images, logos, and designs—is
          owned by ISHARAE ENTERPRISES. Unauthorized use or reproduction is
          prohibited.
        </p>
      </section>

      <Separator className="my-6" />

      <section>
        <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-primary">
          10. Limitation of Liability
        </h2>
        <p className="text-sm sm:text-base leading-relaxed">
          We are not liable for any direct or indirect damages arising from your
          use of our services or for delays beyond our reasonable control.
        </p>
      </section>

      <Separator className="my-6" />

      <section>
        <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-primary">
          11. Governing Law
        </h2>
        <p className="text-sm sm:text-base leading-relaxed">
          These Terms are governed by Indian law. Any disputes will be resolved
          via arbitration in Punjab, as per the Arbitration and Conciliation
          Act, 1996.
          {/* TODO: Change city if your jurisdiction is different */}
        </p>
      </section>

      <Separator className="my-6" />

      <section>
        <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-primary">
          12. Changes to Terms
        </h2>
        <p className="text-sm sm:text-base leading-relaxed">
          We may update these Terms occasionally. The latest version will always
          be on our website. Continued use signifies your acceptance.
        </p>
      </section>

      <Separator className="my-6" />

      <section>
        <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-primary">
          13. Contact Us
        </h2>
        <p className="text-sm sm:text-base leading-relaxed">
          For any questions about these Terms or our services, please contact:
          <br />
          <strong className="text-primary">
            ISHARAE ENTERPRISES Customer Support
          </strong>
          <br />
          Email: support@isharae.com <br />
          Phone: +91-XXXXXXXXXX
          {/* TODO: Replace email and phone with your actual contact details */}
        </p>
      </section>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Thank you for choosing{" "}
        <strong className="text-primary">ISHARAE ENTERPRISES</strong>. We
        appreciate your trust and support!
      </p>
    </div>
  );
};

export default TermsOfService;
