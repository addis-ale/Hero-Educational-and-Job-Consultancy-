"use client";

import Image from "next/image";
import HowItWorksCard from "./HowItWorksCard";

const HowItWorks = () => {
  return (
    <div id="steps" className="p-4">
      <h1 className="text-2xl text-gray-700 text-center font-bold">
        How Hero Educational &amp; Job Consultancy. Works
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 p-4 md:py-8 max-w-[1040px] mx-auto">
        {/* Step 1 */}
        <div className="flex flex-col items-center md:flex-row md:justify-between gap-4">
          <HowItWorksCard
            label="Find the Right Course"
            imgSrc="https://www.planstudyabroad.com/images/find-courses.webp"
          />
          <div className="hidden md:block">
            <Image
              src="https://www.planstudyabroad.com/images/how-arrow1.webp"
              alt="arrow"
              width={64}
              height={64}
              className="object-cover"
            />
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center md:flex-row md:justify-between gap-4">
          <HowItWorksCard
            label="Submit Your Application"
            imgSrc="https://www.planstudyabroad.com/images/submit-application.webp"
          />
          <div className="hidden md:block">
            <Image
              src="https://www.planstudyabroad.com/images/how-arrow1.webp"
              alt="arrow"
              width={64}
              height={64}
              className="object-cover"
            />
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center md:flex-row md:justify-between gap-4">
          <HowItWorksCard
            label="Get Your Acceptance & Apply for visa"
            imgSrc="https://www.planstudyabroad.com/images/visa-apply.webp"
          />
          <div className="hidden md:block">
            <Image
              src="https://www.planstudyabroad.com/images/how-arrow1.webp"
              alt="arrow"
              width={64}
              height={64}
              className="object-cover"
            />
          </div>
        </div>

        {/* Step 4 */}
        <div className="flex flex-col items-center md:flex-row md:justify-between gap-4">
          <HowItWorksCard
            label="Receive Our Pre-departure Services"
            imgSrc="https://www.planstudyabroad.com/images/predeparture.webp"
          />
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
