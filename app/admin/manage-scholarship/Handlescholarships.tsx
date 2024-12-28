"use client";

import Heading from "@/app/components/Heading";
import { Scholarship } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import moment from "moment";
import ActionBtn from "../admincomponents/ActionBtn";
import { MdRemoveRedEye, MdUpdate } from "react-icons/md";
// import axios from "axios";
// import toast from "react-hot-toast";

import { FaTimesCircle } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";

// Define the type for rows used in DataGrid
interface ScholarshipRow {
  id: string;
  name: string;
  sch_title: string;
  job_title: string;
  date: string;
}

interface ManageScholarshipProps {
  scholarships: Scholarship[];
}

const ManageScholarshipClient: React.FC<ManageScholarshipProps> = ({
  scholarships,
}) => {
  const router = useRouter();
  const handleDelete = async (id: string) => {
    try {
      // Make the DELETE request to the API
      await axios.delete(`/api/scholarship/${id}`);

      // Show success message
      toast.success("Scholarship successfully deleted!");

      // Optionally, refresh the page or update the UI
      router.refresh(); // or update the state to remove the deleted item from the UI
    } catch (error) {
      console.error("Failed to delete scholarship:", error);
      toast.error("Failed to delete scholarship.");
    }
  };
  // Type the rows array properly
  let rows: ScholarshipRow[] = [];
  if (scholarships) {
    rows = scholarships.map((scholar) => ({
      id: scholar.id,
      name: scholar.name,
      sch_title: scholar.sch_title,
      job_title: scholar.job_title,
      date: moment(scholar.createdAt).fromNow(), // Adjust as
    }));
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "name", headerName: "Nation", width: 130 },
    { field: "sch_title", headerName: "Scholarship Title", width: 220 },
    { field: "job_title", headerName: "Job Title", width: 220 },
    {
      field: "date",
      headerName: "Date",
      width: 200,
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
                handleDelete(params.row.id);
              }}
            />

            <ActionBtn
              icon={MdUpdate}
              onClick={() => {
                router.push(`/update/${params.row.id}`);
                // handleReviewed(params.row.id);
              }}
            />
            <ActionBtn
              icon={MdRemoveRedEye}
              onClick={() => {
                router.push(`/country/${params.row.id}`);
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
        <Heading title="Manage Scholarships" center />
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

export default ManageScholarshipClient;
