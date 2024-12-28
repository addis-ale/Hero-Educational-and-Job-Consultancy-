import { getCurrentUser } from "@/actions/getCurrentUser";
import { getScholarships } from "@/actions/getScholarships";
import Container from "@/app/components/Container";
import NullData from "@/app/components/NullData";
import ManageScholarshipClient from "./Handlescholarships";

const ManageScholarship = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "ADMIN")
    return <NullData title="Oops! Access Denied!" />;
  const allSchoarships = await getScholarships();
  if (!allSchoarships || allSchoarships.length === 0)
    return <NullData title="No Scholarships Posted!" />;
  return (
    <div>
      <Container>
        <ManageScholarshipClient scholarships={allSchoarships} />
      </Container>
    </div>
  );
};

export default ManageScholarship;
