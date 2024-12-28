import Heading from "@/app/components/Heading";
import { Application } from "@prisma/client";
import Image from "next/image";

interface ApplicationDetailProps {
  application: Application;
}

const ApplicationDetail: React.FC<ApplicationDetailProps> = ({
  application,
}) => {
  return (
    <div>
      <div className="">
        {/* Removed flex and items-start */}
        <div className="my-2">
          <Heading title="Application Details" />
        </div>
        {/* Application Information Section */}
        <div className="w-full">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {[
              { label: "Application ID", value: application.id },
              { label: "Full Name", value: application.fullName },
              { label: "Email", value: application.email },
              { label: "Phone Number", value: application.phoneNumber },
              { label: "Type", value: application.type },
              { label: "Field", value: application.field },
              { label: "Status", value: application.status },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="bg-gray-50 sm:bg-gray-100 p-3 rounded-lg w-full"
              >
                <h3 className="font-medium text-gray-700">{label}</h3>
                <p className="text-gray-600">{value}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Documents Section */}
        <div className="bg-white rounded-lg p-4 sm:p-6 mt-6 shadow md:shadow-lg md:border md:border-gray-200">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
            Documents
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-gray-50 sm:bg-gray-100 p-3 sm:p-4 rounded-lg w-full">
              <h3 className="font-medium text-gray-700">Passport Image</h3>
              <div className="mt-2">
                <Image
                  src={application.passportImage}
                  alt="Passport"
                  width={500}
                  height={300}
                  className="rounded-md object-cover w-full h-full"
                />
              </div>
            </div>

            <div className="bg-gray-50 sm:bg-gray-100 p-3 sm:p-4 rounded-lg w-full">
              <h3 className="font-medium text-gray-700">
                Birth Certificate Image
              </h3>
              <div className="mt-2">
                <Image
                  src={application.birthCerteficateImage}
                  alt="Birth Certificate"
                  width={500}
                  height={300}
                  className="rounded-md object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Educational Background Section */}
        <div className="bg-white rounded-lg p-4 sm:p-6 mt-6 shadow md:shadow-lg md:border md:border-gray-200 w-full">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
            Educational Background
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {application.educationalBackground.map((edu, index) => (
              <div
                key={index}
                className="bg-gray-50 sm:bg-gray-100 p-3 sm:p-4 rounded-lg w-full"
              >
                <h3 className="font-medium text-gray-700">
                  Education {index + 1}
                </h3>
                <div className="mt-2">
                  <Image
                    src={edu}
                    alt={`Educational background image ${index + 1}`}
                    width={500}
                    height={300}
                    className="rounded-md object-cover w-full h-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetail;
