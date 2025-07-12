import { Link } from "react-router-dom";

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
              Street No. 1, New Vijay Nagar, Churpur Road, Haibowal Kalan,
              <br />
              Ludhiana, Punjab - 141001, India
            </p>
            <p className="mb-2">
              <strong>Email:</strong>{" "}
              <a href="mailto:support@isharae.com" className="hover:underline">
                support@isharae.com
              </a>
              <br />
              <strong>Mob:</strong> +91 7973990408
            </p>
            <p className="mb-4">
              <strong>Opening Hours:</strong> Mon to Sat: 10 AM - 8:30 PM
            </p>

            {/* Social Media */}
            <div className="flex gap-6 mt-4">
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#6b4337]"
              >
                Facebook
              </a>
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#6b4337]"
              >
                Twitter
              </a>
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#6b4337]"
              >
                Instagram
              </a>
            </div>
          </div>

          {/* Google Map */}
          <div className="w-full h-64 rounded-md overflow-hidden shadow-lg">
            <iframe
              title="Isharae Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27377.981439418294!2d75.79147744746825!3d30.93564636713656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a83fb7d8219ab%3A0x9d74219c3630bc60!2sHaibowal%20Kalan%2C%20Ludhiana%2C%20Punjab!5e0!3m2!1sen!2sin!4v1752286336221!5m2!1sen!2sin"
              width="600"
              height="450"
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
                <Link to="/about" className="hover:underline">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">CUSTOMER POLICIES</h3>
            <ul className="space-y-1">
              <li>
                <Link to="/privacy-policy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="hover:underline">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="hover:underline">
                  Shipping Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Support</h3>
            <ul className="space-y-1">
              <li>
                <Link to="/contact" className="hover:underline">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:underline">
                  FAQ's
                </Link>
              </li>
              <li>
                <Link to="/return-policy" className="hover:underline">
                  Return and Exchange Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center pt-6 border-t">
          © 2025 - <strong>isharae.com</strong>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
