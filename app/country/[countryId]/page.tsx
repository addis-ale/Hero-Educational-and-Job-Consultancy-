import CountryFlag from "./CountryFlag";
import Container from "@/app/components/Container";
import JobTypeSwiper from "@/app/components/jobType/JobTypeSwiper";
import { jobTypes } from "@/utils/jobTypes";
import { getScholarshipById } from "@/actions/getScholarshipById";
import ScholarshipSwiper from "@/app/components/scholarship/scholarshipSwiper";
import { scholarships } from "@/utils/scholarships";

interface ICountryParams {
  countryId?: string | null;
}

const Country = async ({ params }: { params: ICountryParams }) => {
  const { countryId } = params;

  // Check if `countryId` is provided; handle undefined safely
  if (!countryId) {
    return (
      <p className="text-red-500 text-center font-semibold">
        No country ID provided.
      </p>
    );
  }

  // Fetch the country details using the provided `countryId`
  const countryDetails = await getScholarshipById({ scholarshipId: countryId });

  if (!countryDetails) {
    return (
      <p className="font-semibold justify-center items-center text-red-500 text-2xl">
        There is no country available.
      </p>
    );
  }

  const {
    flag_url,
    name,
    job_title,
    job_introduction,
    sch_title,
    sch_introduction,
  } = countryDetails;

  return (
    <div>
      {/* Render Country Flag */}
      <div>
        <CountryFlag flagUrl={flag_url} countryName={name} />
      </div>

      {/* Render Main Content inside Container */}
      <Container>
        <div className="flex flex-col gap-8 p-5 mt-7">
          <div className="text-red-700 text-3xl md:text-4xl font-bold text-center">
            {job_title}
          </div>
          <div>{job_introduction}</div>
        </div>

        {/* Render Job Types Swiper */}
        <JobTypeSwiper jobType={jobTypes} countryName={name} />

        <div className="flex flex-col gap-8 p-5 mt-7">
          <div className="text-red-700 text-3xl md:text-4xl font-bold text-center">
            {sch_title}
          </div>
          <div>{sch_introduction}</div>
        </div>

        {/* Render Scholarships Swiper */}
        <ScholarshipSwiper scholar={scholarships} countryName={name} />
      </Container>
    </div>
  );
};

export default Country;
