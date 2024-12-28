import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "../components/Container";
import ApplicationForm from "./ApplicationForm";

const Apply = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div>
      <Container>
        <ApplicationForm currentUser={currentUser} />
      </Container>
    </div>
  );
};

export default Apply;
