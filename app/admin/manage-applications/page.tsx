import { getAllApplications } from "@/actions/getAllApplications";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import ManageApplicationClient from "./ManageApplicationClient";

const ManageApplications = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "ADMIN")
    return <NullData title="Oops! Access Denied!" />;
  const allApplications = await getAllApplications();
  if (!allApplications || allApplications.length === 0)
    return <NullData title="No Applications Submitted!" />;
  return (
    <div>
      <ManageApplicationClient applications={allApplications} />
    </div>
  );
};

export default ManageApplications;
