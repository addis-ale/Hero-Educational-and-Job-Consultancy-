import { getCurrentUser } from "@/actions/getCurrentUser";
import AdminNavIcon from "./NavIcon";
import NullData from "../components/NullData";

export const metadata = {
  title: "Consultant Admin",
  description: "Consultant Admin Dashboard",
};

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();

  // Check if the user is an admin
  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Oops! Access denied!" />;
  }
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <AdminNavIcon />

      {/* Main Content Area */}
      <main className="flex-grow bg-gray-100 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
