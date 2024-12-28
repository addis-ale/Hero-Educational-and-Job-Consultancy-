import React from "react";
import { AiOutlinePlus } from "react-icons/ai"; // Make sure to install react-icons if you haven't
interface AddDocumentCardProps {
  onClick: () => void;
}
const AddDocumentCard: React.FC<AddDocumentCardProps> = ({ onClick }) => {
  return (
    <div
      className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-all duration-200"
      onClick={onClick} // Handle the click to add a document
    >
      <AiOutlinePlus className="text-gray-500 text-sm " />
    </div>
  );
};

export default AddDocumentCard;
