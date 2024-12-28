import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "../components/NullData";
import { getApplicationByCurrentUser } from "@/actions/getApplicationByUserId";

import Container from "../components/Container";
import ApplicationClient from "./ApplicationClient";

const MyApplications = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return <NullData title="Oops! Access Denied!" />;
  const userId = currentUser.id;
  const myapplications = await getApplicationByCurrentUser(userId);
  if (!myapplications) return <NullData title="No Applications Yet...!" />;
  return (
    <div className="pt-8">
      <Container>
        <ApplicationClient applications={myapplications} />
      </Container>
    </div>
  );
};

export default MyApplications;
