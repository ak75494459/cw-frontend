import {
  Mail,
  Phone,
  MessageSquare,
  MessageCircle,
  HelpCircle,
  Smartphone,
} from "lucide-react";
import { Link } from "react-router-dom";

const Support = () => {
  return (
    <div className="bg-white p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4">Need Help? We're Here for You</h2>
      <p className="text-gray-600 mb-6">
        Whether you need technical assistance or have general questions, our
        support team is ready to help.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {/* Email */}
        <div className="flex items-start gap-4 bg-gray-50 p-4 rounded-md border">
          <Mail className="h-6 w-6 text-[#CC7351]" />
          <div>
            <h3 className="font-semibold">Email Support</h3>
            <p className="text-sm text-gray-500">support@yourdomain.com</p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-4 bg-gray-50 p-4 rounded-md border">
          <Phone className="h-6 w-6 text-[#CC7351]" />
          <div>
            <h3 className="font-semibold">Call Us</h3>
            <p className="text-sm text-gray-500">+91 9876543210</p>
          </div>
        </div>

        {/* Raise Query */}
        <Link
          to={"/contact"}
          className="flex items-start gap-4 bg-gray-50 p-4 rounded-md border"
        >
          <MessageSquare className="h-6 w-6 text-[#CC7351]" />
          <div>
            <h3 className="font-semibold">Raise Query</h3>
            <p className="text-sm text-gray-500">
              Submit a query and get a response within 2 hours
            </p>
          </div>
        </Link>

        {/* WhatsApp */}
        <div className="flex items-start gap-4 bg-gray-50 p-4 rounded-md border">
          <Smartphone className="h-6 w-6 text-[#25D366]" />
          <div>
            <h3 className="font-semibold">WhatsApp Support</h3>
            <p className="text-sm text-gray-500">+91 9876543210 (Chat Now)</p>
          </div>
        </div>

        {/* Live Chat */}
        <div className="flex items-start gap-4 bg-gray-50 p-4 rounded-md border">
          <MessageCircle className="h-6 w-6 text-[#CC7351]" />
          <div>
            <h3 className="font-semibold">Live Chat</h3>
            <p className="text-sm text-gray-500">
              Available 9am – 6pm, Monday to Saturday
            </p>
          </div>
        </div>

        {/* Help Center */}
        <Link
          to={"/faq"}
          className="flex items-start gap-4 bg-gray-50 p-4 rounded-md border"
        >
          <HelpCircle className="h-6 w-6 text-[#CC7351]" />
          <div>
            <h3 className="font-semibold">Help Center</h3>
            <p className="text-sm text-gray-500">
              Browse FAQs and self-help articles
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Support;
