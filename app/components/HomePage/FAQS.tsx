import { useState } from "react";
import { faqs } from "@/utils/faqs";
import { FaPlus, FaMinus, FaQuestionCircle } from "react-icons/fa";
import Heading from "../Heading";
import Button from "../Button";
import { useRouter } from "next/navigation";

const FAQS = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  const router = useRouter();
  return (
    <div className="flex flex-col gap-10 p-8 rounded-lg  max-w-3xl mx-auto ">
      {/* Header Section */}
      <div className="flex gap-3 items-center justify-center">
        <span className="w-[60px] h-[60px] rounded-full bg-blue-600 flex justify-center items-center p-3 shadow-md">
          <FaQuestionCircle className="text-white" size={28} />
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800">
          FAQS
        </h2>
      </div>

      {/* FAQ Items */}
      <div className="space-y-6">
        {faqs.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={item.question}
              className={`border border-gray-300 rounded-lg shadow-md transition-all ${
                isOpen ? "bg-blue-50" : "bg-white"
              }`}
            >
              <div
                onClick={() => toggleFAQ(index)}
                className={`flex justify-between items-center px-6 py-4 cursor-pointer rounded-lg transition-all duration-300 ${
                  isOpen ? "bg-blue-100" : "hover:bg-gray-50"
                }`}
                aria-expanded={isOpen}
                aria-controls={`faq-${index}`}
              >
                <h3
                  className={`text-lg font-medium flex-1 text-left ${
                    isOpen ? "font-semibold text-blue-700" : "text-gray-700"
                  }`}
                >
                  {item.question}
                </h3>
                <span className="text-2xl text-blue-600">
                  {isOpen ? <FaMinus /> : <FaPlus />}
                </span>
              </div>

              {isOpen && (
                <div
                  id={`faq-${index}`}
                  className="px-6 py-4 overflow-hidden transition-max-height duration-500 ease-in-out"
                  style={{
                    maxHeight: isOpen ? "200px" : "0",
                  }}
                >
                  <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Contact Section */}
      <div className="flex flex-col gap-6 items-center">
        <Heading title="Need more information?" />
        <Button
          label="Contact Us"
          onClick={() => {
            router.push("/contactUs");
          }}
        />
      </div>
    </div>
  );
};

export default FAQS;
