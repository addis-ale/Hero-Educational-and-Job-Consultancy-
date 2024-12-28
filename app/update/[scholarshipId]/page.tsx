import { getScholarshipById } from "@/actions/getScholarshipById";
import NullData from "../../components/NullData";
import Container from "../../components/Container";
import UpdateScholarshipForm from "./ScholarshipDetail";

interface IParams {
  scholarshipId?: string | null;
}

const Updatescholarship = async ({ params }: { params: IParams }) => {
  const { scholarshipId } = params;

  // Handle missing scholarship ID
  if (!scholarshipId) {
    return <NullData title="Scholarship ID is missing" />;
  }

  // Fetch scholarship data
  const scholarship = await getScholarshipById({ scholarshipId });

  // Handle case where no scholarship is found
  if (!scholarship) {
    return <NullData title="No Scholarship Found" />;
  }

  return (
    <div className="p-8">
      <Container>
        <UpdateScholarshipForm scholarship={scholarship} />
      </Container>
    </div>
  );
};

export default Updatescholarship;
