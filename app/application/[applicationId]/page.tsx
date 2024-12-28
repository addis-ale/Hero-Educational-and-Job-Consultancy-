import { getApplicationById } from "@/actions/getApplicationById";
import Container from "@/app/components/Container";
import NullData from "@/app/components/NullData";
import ApplicationDetail from "./ApplicationDetail";

interface IParams {
  applicationId?: string;
}

const Application = async ({ params }: { params: IParams }) => {
  const { applicationId } = params;

  if (!applicationId) {
    return <NullData title="Application ID is missing" />;
  }

  const application = await getApplicationById(params);

  if (!application) {
    return <NullData title="No Application Found" />;
  }

  return (
    <div className="p-8">
      <Container>
        <ApplicationDetail application={application} />
      </Container>
    </div>
  );
};

export default Application;
