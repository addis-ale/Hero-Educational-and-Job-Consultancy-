"use client";

import Heading from "@/app/components/Heading";
import { Application } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import moment from "moment";
import ActionBtn from "../admincomponents/ActionBtn";
import { MdAccessTimeFilled, MdDone, MdRemoveRedEye } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";
import Status from "@/app/components/Status";
import { FaTimesCircle } from "react-icons/fa";

// Define the type for rows used in DataGrid
interface ApplicationRow {
  id: string;
  fullname: string;
  email: string;
  date: string;
  status: string;
  type: string; // Ensure the type field is included
}

interface ManageApplicationClientProps {
  applications: Application[];
}

const ManageApplicationClient: React.FC<ManageApplicationClientProps> = ({
  applications,
}) => {
  const router = useRouter();

  const handleReviewed = (id: string) => {
    axios
      .put("/api/application", { id, status: "accepted" })
      .then(() => {
        toast.success("Application accepted");
        router.refresh();
      })
      .catch((error) => {
        toast.error("Something went wrong!");
        console.log(error);
      });
  };

  const handlePending = (id: string) => {
    axios
      .put("/api/application", { id, status: "pending" })
      .then(() => {
        toast.success("Application status updated to pending");
        router.refresh();
      })
      .catch((error) => {
        toast.error("Something went wrong!");
        console.log(error);
      });
  };

  const handleDenied = (id: string) => {
    axios
      .put("/api/application", { id, status: "rejected" })
      .then(() => {
        toast.success("Application rejected");
        router.refresh();
      })
      .catch((error) => {
        toast.error("Something went wrong!");
        console.log(error);
      });
  };

  // Type the rows array properly
  let rows: ApplicationRow[] = [];
  if (applications) {
    rows = applications.map((app) => ({
      id: app.id,
      fullname: app.fullName,
      email: app.email,
      type: app.type,
      date: moment(app.createdAt).fromNow(), // Adjust as needed for formatting
      status: app.status,
    }));
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "fullname", headerName: "Full Name", width: 130 },
    { field: "email", headerName: "Email", width: 220 },
    { field: "type", headerName: "Type", width: 220 },
    {
      field: "date",
      headerName: "Date",
      width: 200,
    },
    {
      field: "status",
      headerName: "Application Status",
      width: 120,
      renderCell: (params) => {
        return (
          <div>
            {params.row.status === "pending" ? (
              <Status
                text="Pending"
                icon={MdAccessTimeFilled}
                bg="bg-slate-200"
                color="text-slate-700"
              />
            ) : params.row.status === "rejected" ? (
              <Status
                text="Rejected"
                icon={FaTimesCircle}
                bg="bg-red-200"
                color="text-red-700"
              />
            ) : params.row.status === "accepted" ? (
              <Status
                text="Accepted"
                icon={MdDone}
                bg="bg-green-200"
                color="text-green-700"
              />
            ) : (
              <></>
            )}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="flex justify-between gap-4 w-full my-2">
            <ActionBtn
              icon={FaTimesCircle}
              onClick={() => {
                handleDenied(params.row.id);
              }}
            />
            <ActionBtn
              icon={MdAccessTimeFilled}
              onClick={() => {
                handlePending(params.row.id);
              }}
            />
            <ActionBtn
              icon={MdDone}
              onClick={() => {
                handleReviewed(params.row.id);
              }}
            />
            <ActionBtn
              icon={MdRemoveRedEye}
              onClick={() => {
                router.push(`/application/${params.row.id}`);
              }}
            />
          </div>
        );
      },
    },
  ];

  const paginationModel = { page: 0, pageSize: 9 };

  return (
    <div className="max-w-[1450px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Manage Applications" center />
      </div>
      <div className="border-2" style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[9, 20]}
          checkboxSelection
          sx={{ border: 0 }}
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
};

export default ManageApplicationClient;
