import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FAQ = {
  question: string;
  answer: string;
};

const faqData: FAQ[] = [
  {
    question: "How can I submit a query?",
    answer:
      "Fill out the form above with your subject and description, then click 'Submit'.",
  },
  {
    question: "Where can I view my submitted queries?",
    answer:
      "Once submitted, your queries will appear below the form in the 'Your Queries' section.",
  },
  {
    question: "Can I edit or delete a query?",
    answer:
      "Currently, editing or deleting queries is not supported. This may be added in a future update.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white p-6  mt-6">
      <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-md transition-all"
          >
            <button
              className="w-full flex items-center justify-between px-4 py-3 font-medium text-left"
              onClick={() => toggle(index)}
            >
              <span>{faq.question}</span>
              <ChevronDown
                className={`h-5 w-5 transition-transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="px-4 pb-4 text-gray-600">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
