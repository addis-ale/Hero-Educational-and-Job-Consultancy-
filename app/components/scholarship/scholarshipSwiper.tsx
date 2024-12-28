"use client";

import { useRouter } from "next/navigation";
import Button from "../Button";
import ScholarshipCard from "./ScholarshipCard";

interface ScholarshipSwiperProps {
  scholar: Scholarship[]; // Updated to reflect scholarship structure
  countryName: string;
}

interface Scholarship {
  name: string; // Scholarship name
  image_url: string; // Image URL for the scholarship
}

const ScholarshipSwiper: React.FC<ScholarshipSwiperProps> = ({
  scholar,
  countryName,
}) => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-8 p-6">
        <h1 className="text-red-700 font-bold text-3xl md:text-4xl text-center">
          Best Scholarships Available for {countryName}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3   items-center justify-center gap-6">
          {scholar.map((scholarship, index) => (
            <ScholarshipCard
              key={index}
              scholarshipName={scholarship.name}
              imageUrl={scholarship.image_url}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-8 p-6 rounded-lg shadow-md">
        <h2 className="text-red-700 font-bold text-3xl md:text-4xl text-center mt-8">
          Requirements for Scholarships in {countryName}
        </h2>
        <ul className="list-disc list-inside mt-4 text-lg">
          <li>Completed application form</li>
          <li>Proof of academic achievement (e.g., transcripts)</li>
          <li>Personal statement or essay outlining your goals</li>
          <li>Letters of recommendation (if applicable)</li>
          <li>Valid identification (e.g., national ID card or passport)</li>
          <li>Proof of financial need (if applicable)</li>
          <li>Availability for an interview (if required)</li>
        </ul>
      </div>
      <div className=" w-full flex justify-center items-center mx-auto p-5">
        <Button
          label={`Start Your Application for ${countryName}`}
          onClick={() => {
            router.push("/apply");
          }}
          custom="bg-red-700"
        />
      </div>
    </div>
  );
};

export default ScholarshipSwiper;
