"use client";

import JobTypeCard from "./JobTypeCard";

interface JobTypeSwiperProps {
  jobType: Work[]; // Adjusted the interface name for consistency
  countryName: string;
}

interface Work {
  job_name: string;
  image_url: string;
}

const JobTypeSwiper: React.FC<JobTypeSwiperProps> = ({
  jobType,
  countryName,
}) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-8 p-6  ">
        <h1 className="text-red-700 font-bold text-3xl md:text-4xl text-center">
          Best Working Areas in {countryName}
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-6">
          {jobType.map((job, index) => (
            <JobTypeCard
              key={index}
              jobName={job.job_name}
              imageUrl={job.image_url}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-8 p-6  rounded-lg shadow-md">
        <h2 className="text-red-700 font-bold text-3xl md:text-4xl text-center mt-8">
          Requirements for Jobs in {countryName}
        </h2>
        <ul className="list-disc list-inside mt-4 text-lg">
          <li>
            Valid identification (e.g., national ID card or driver`s license)
          </li>
          <li>
            Resume or curriculum vitae (CV) outlining work experience (if
            applicable)
          </li>
          <li>Basic literacy skills (ability to read and write)</li>
          <li>Willingness to learn and undergo training</li>
          <li>
            References from previous employers or community leaders (if
            applicable)
          </li>
          <li>Availability to work flexible hours</li>
          <li>
            Proof of any relevant certifications or training (if applicable)
          </li>
          <li>
            Motivation to succeed in the role and contribute positively to the
            team
          </li>
        </ul>
      </div>
      {/* <div className="max-w-[700px] flex justify-center items-center mx-auto">
        <Button
          label={`Start Your Journey To ${countryName}`}
          onClick={() => {
            router.push("/apply");
          }}
          custom="bg-red-700"
        />
      </div> */}
    </div>
  );
};

export default JobTypeSwiper;
