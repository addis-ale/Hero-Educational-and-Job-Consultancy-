import Image from "next/image";
import React from "react";
import { FaQuoteRight } from "react-icons/fa";

interface TestimonialCardProps {
  testimony: TestimonialType;
}
interface TestimonialType {
  id: number;
  name: string;
  testimonial: string;
  date: string;
  avatar: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimony }) => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6">
        <FaQuoteRight className="text-gray-400 text-3xl mb-4" />
        <p className="text-gray-600 italic mb-4 px-3 max-w-64 overflow-y-auto">
          {testimony.testimonial}
        </p>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              {testimony.avatar ? (
                <Image
                  src={testimony.avatar}
                  alt={testimony.name}
                  width={56} // Set width based on w-14 (14 * 4px = 56px)
                  height={56} // Set height based on h-14 (14 * 4px = 56px)
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-blue-500 text-white text-lg font-bold">
                  {testimony.name.charAt(0)}
                </div>
              )}
            </div>

            <h3 className="text-lg font-semibold text-gray-800">
              {testimony.name}
            </h3>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 p-4 text-center">
        <p className="text-sm text-gray-500">— Happy Parent</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
