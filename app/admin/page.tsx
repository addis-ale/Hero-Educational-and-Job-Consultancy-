import Container from "../components/Container";
import SummaryDetail from "./SummaryDetail";
import NullData from "../components/NullData";
import getUsers from "@/actions/getUsers";
import { getAllApplications } from "@/actions/getAllApplications";
import { getScholarships } from "@/actions/getScholarships";

const AdminHome = async () => {
  try {
    const users = await getUsers();
    const totalUsers = users ? users.length : 0;

    const applications = await getAllApplications();
    const totalApplications = applications ? applications.length : 0;

    const deniedApplications = applications
      ? applications.filter((app) => app.status === "denied").length
      : 0;
    const reviewedApplications = applications
      ? applications.filter((app) => app.status === "reviewed").length
      : 0;
    const pendingApplications = applications
      ? applications.filter((app) => app.status === "pending").length
      : 0;

    const scholarships = await getScholarships();
    const totalScholarships = scholarships ? scholarships.length : 0;

    return (
      <Container>
        <SummaryDetail
          totalUsers={totalUsers}
          totalApplications={totalApplications}
          deniedApplications={deniedApplications}
          reviewedApplications={reviewedApplications}
          pendingApplications={pendingApplications}
          totalScholarships={totalScholarships}
          applications={applications}
        />
      </Container>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <NullData title="Error fetching data" />;
  }
};

export default AdminHome;
