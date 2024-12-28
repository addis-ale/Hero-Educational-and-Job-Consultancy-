"use client";

import Image from "next/image";
import Button from "../Button";
import { useRouter } from "next/navigation";

interface ScholarshipCardProps {
  scholarshipName: string; // Updated prop name to reflect scholarship
  imageUrl: string; // Image URL for the scholarship
}

const ScholarshipCard: React.FC<ScholarshipCardProps> = ({
  scholarshipName,
  imageUrl,
}) => {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-between h-[300px] border rounded-md hover:scale-105 transition">
      <Image
        src={imageUrl}
        alt={`${scholarshipName} image`} // Update alt text for scholarship
        width={300}
        height={200} // Adjust height to ensure consistency
        className="object-cover w-full h-[200px] rounded-t-md" // Maintain aspect ratio and fill the width
      />

      <div className="p-4 flex flex-col justify-between flex-grow">
        <h2 className="text-xl font-bold text-gray-800 text-center">
          {scholarshipName} {/* Update display text to scholarship name */}
        </h2>
        <div className="mt-2 flex justify-center">
          <Button
            label="Apply Now" // Keep the same button label or change it if needed
            onClick={() => {
              router.push("/apply"); // Adjust navigation path if necessary
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ScholarshipCard;
