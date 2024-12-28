import Image from "next/image";
import BenefitCard from "./BenefitCard";
import {
  FaGraduationCap,
  FaUniversity,
  FaBriefcase,
  FaChartLine,
} from "react-icons/fa";

const benefitCards = [
  {
    header: "Tailored Academic Guidance",
    icon: FaGraduationCap,
    description:
      "Receive personalized advice on courses and degree programs aligned with your academic background and future aspirations.",
  },
  {
    header: "Scholarship and University Insights",
    icon: FaUniversity,
    description:
      "Discover the best universities and scholarship programs that suit your profile and financial needs.",
  },
  {
    header: "Career Path Insights",
    icon: FaBriefcase,
    description:
      "Get expert advice on job roles that match your skills, interests, and professional goals.",
  },
  {
    header: "Job Market Trends and Tips",
    icon: FaChartLine,
    description:
      "Stay ahead with insights on emerging job markets, application tips, and industry-specific hiring practices.",
  },
];

const Benefits = () => {
  return (
    <div className="min-h-[65vh] p-8 lg:p-16 bg-rose-100 flex items-center">
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 w-full">
        {/* Left Section with Cards */}
        <div className="flex-1 w-full">
          <div className="flex items-center gap-2 mb-6">
            <h1 className="font-bold text-2xl md:text-3xl  ">Benefits!</h1>
            <hr className="w-full border-white" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {benefitCards.map((card) => (
              <BenefitCard
                key={card.header}
                header={card.header}
                description={card.description}
                icon={card.icon}
              />
            ))}
          </div>
        </div>

        {/* Right Section with Image */}
        <div className="w-full max-w-sm lg:max-w-md flex justify-center">
          <Image
            src="https://www.planstudyabroad.com/images/virtual-office/virtual-office-benefits-img.png"
            alt="Benefits illustration"
            className="object-cover rounded-lg"
            width={300}
            height={300}
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Benefits;
