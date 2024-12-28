import React from "react";

interface Application {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  type: string;
  email: string;
  status: string;
  userId: string;
  fullName: string;
  phoneNumber: string;
  educationalBackground: string[];
}

interface SummaryDetailProps {
  totalUsers: number | undefined;
  totalApplications: number;
  deniedApplications: number;
  reviewedApplications: number;
  pendingApplications: number;
  totalScholarships: number;
  applications: Application[] | null; // Add applications prop
}

const SummaryDetail: React.FC<SummaryDetailProps> = ({
  totalUsers,
  totalApplications,
  deniedApplications,
  reviewedApplications,
  pendingApplications,
  totalScholarships,
  // Include applications in destructuring
}) => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-6">Summary Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center">
        <div className="bg-white rounded-lg shadow-md p-4 m-2 flex-1 max-w-xl text-center transform transition-transform hover:scale-105">
          <h2 className="text-lg">Total Users</h2>
          <p className="text-2xl font-semibold">
            {totalUsers !== undefined ? totalUsers : "N/A"}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 m-2 flex-1 max-w-xl text-center transform transition-transform hover:scale-105">
          <h2 className="text-lg">Total Applications</h2>
          <p className="text-2xl font-semibold">{totalApplications}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 m-2 flex-1 max-w-xl text-center transform transition-transform hover:scale-105">
          <h2 className="text-lg">Denied Applications</h2>
          <p className="text-2xl font-semibold text-red-600">
            {deniedApplications}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 m-2 flex-1 max-w-xl text-center transform transition-transform hover:scale-105">
          <h2 className="text-lg">Reviewed Applications</h2>
          <p className="text-2xl font-semibold text-green-600">
            {reviewedApplications}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 m-2 flex-1 max-w-xl text-center transform transition-transform hover:scale-105">
          <h2 className="text-lg">Pending Applications</h2>
          <p className="text-2xl font-semibold text-orange-500">
            {pendingApplications}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 m-2 flex-1 max-w-xl text-center transform transition-transform hover:scale-105">
          <h2 className="text-lg">Total Scholarships</h2>
          <p className="text-2xl font-semibold text-orange-500">
            {totalScholarships}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SummaryDetail;
