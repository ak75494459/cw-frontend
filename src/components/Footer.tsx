const Footer = () => {
  return (
    <footer className="bg-white text-[#492822] px-6 py-12 text-base">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Contact Info + Map */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="mb-2">
              <strong>Head Office Address:</strong>
              <br />
              Jalandhar-Delhi G.T. Road,
              <br />
              Phagwara, Punjab (India) - 144411
            </p>
            <p className="mb-2">
              <strong>Email:</strong>{" "}
              <a
                href="mailto:support@nishorama.com"
                className="hover:underline"
              >
                support@nishorama.com
              </a>
              <br />
              <strong>Mob:</strong> +91 82913 59775
            </p>
            <p className="mb-4">
              <strong>Opening Hours:</strong> Mon to Sat: 10 AM - 8:30 PM
            </p>

            {/* Social Media */}
            <div className="flex gap-6 mt-4">
              <a
                href="#"
                aria-label="Facebook"
                className="hover:text-[#6b4337]"
              >
                <svg
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="text-[#492822]"
                >
                  <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2c0-2 1.2-3 3-3 .9 0 2 .2 2 .2v2h-1c-1 0-1.3.6-1.3 1.3v1.5h2.2l-.3 3h-1.9v7A10 10 0 0 0 22 12" />
                </svg>
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-[#6b4337]">
                <svg
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="text-[#492822]"
                >
                  <path d="M22.46 6c-.77.35-1.5.59-2.28.7a4 4 0 0 0 1.74-2.23 8.13 8.13 0 0 1-2.6 1 4 4 0 0 0-6.8 3.66 11.35 11.35 0 0 1-8.23-4.18 4 4 0 0 0 1.23 5.32 4 4 0 0 1-1.81-.5v.05a4 4 0 0 0 3.2 3.92 4 4 0 0 1-1.8.07 4 4 0 0 0 3.73 2.8A8.14 8.14 0 0 1 2 19.54a11.4 11.4 0 0 0 6.15 1.8c7.39 0 11.44-6.14 11.44-11.46 0-.18 0-.36-.02-.54A8.2 8.2 0 0 0 22.46 6z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-[#6b4337]"
              >
                <svg
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="text-[#492822]"
                >
                  <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Google Map */}
          <div className="w-full h-64 rounded-md overflow-hidden shadow-lg">
            <iframe
              title="Lovely Professional University Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3410.7482400044996!2d75.70229287507274!3d31.255392074336314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a5f5e9c489cf3%3A0x4049a5409d53c300!2sLovely%20Professional%20University!5e0!3m2!1sen!2sin!4v1749066561266!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-lg font-semibold mb-2">Brand</h3>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:underline">
                  About Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">CUSTOMER POLICIES</h3>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Support</h3>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:underline">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  FAQ's
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Return and Exchange Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center pt-6 border-t">
          © 2025 - <strong>NISHORAMA</strong> Powered by Shopify
        </div>
      </div>
    </footer>
  );
};

export default Footer;
