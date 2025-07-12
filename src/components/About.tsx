import { Separator } from "@/components/ui/separator";

const About = () => {
  return (
    <section className="text-black px-2">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-gray-900">About Us</h2>

        <p className="text-lg leading-relaxed text-gray-700">
          At <span className="font-semibold text-gray-900">Our Brand</span>, we
          blend tradition with modern style to bring you thoughtfully crafted
          apparel. Each piece in our collection is designed to celebrate
          individuality, comfort, and confidence.
        </p>

        <p className="mt-4 text-md text-gray-600">
          From breezy kurtis to sharp urban wear, our designs reflect
          simplicity, versatility, and elegance. We're here to redefine everyday
          fashion with an Indian soul and a global edge.
        </p>

        <Separator className="my-10" />

        <div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">
            Our Mission
          </h3>
          <p className="text-gray-700">
            To empower self-expression through comfortable, high-quality fashion
            that celebrates cultural roots while embracing modern trends.
          </p>
        </div>

        <Separator className="my-10" />

        <div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">
            Our Philosophy
          </h3>
          <p className="text-gray-700">
            Fashion should feel good — inside and out. That's why we focus on
            high-quality fabrics, clean fits, and timeless patterns. We believe
            in thoughtful fashion that lasts beyond the trend.
          </p>
        </div>

        <Separator className="my-10" />

        <div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">
            Craftsmanship & Quality
          </h3>
          <p className="text-gray-700">
            Every product is made with precision, care, and passion. We work
            with skilled artisans and trusted manufacturers to ensure quality
            that meets our high standards.
          </p>
        </div>

        <Separator className="my-10" />

        <div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">
            Sustainability
          </h3>
          <p className="text-gray-700">
            We're committed to responsible sourcing and ethical production
            practices. Our goal is to build a brand that cares as much about the
            planet as it does about design. We use eco-friendly packaging and
            support fair labor practices.
          </p>
        </div>

        <Separator className="my-10" />

        <div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">
            Customer Promise
          </h3>
          <p className="text-gray-700">
            We stand for transparency, responsive support, and satisfaction
            guaranteed. If you're not happy with your purchase, we'll make it
            right.
          </p>
        </div>

        <Separator className="my-10" />

        <div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">
            Headquarters
          </h3>
          <p className="text-gray-700">
            Street No. 1, New Vijay Nagar, Churpur Road, Haibowal Kalan,
            Ludhiana, Punjab - 141001, India
          </p>
        </div>

        <Separator className="my-10" />

        <div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">
            Get in Touch
          </h3>
          <p className="text-gray-700">Email: support@isharae.com</p>
          <p className="text-gray-700">Phone: +91-XXXXXXXXXX</p>
        </div>

        <Separator className="my-10" />

        <p className="text-sm text-gray-500 mt-10">
          © {new Date().getFullYear()} - isharae.com | All rights reserved.
        </p>
      </div>
    </section>
  );
};

export default About;
