import { IconType } from "react-icons";

interface AdminNavItemsProps {
  selected?: boolean;
  icon: IconType;
  label: string;
}
const AdminNavItem: React.FC<AdminNavItemsProps> = ({
  selected,
  icon: Icon,
  label,
}) => {
  return (
    <div
      className={`flex mb-4 items-center justify-center text-center p-2 border-b-2 gap-1 hover:text-slate-800 transition cursor-pointer ${
        selected
          ? `border-b-white text-white`
          : `border-transparent text-slate-500`
      }`}
    >
      <Icon size={20} />
      <div className="font-medium text-sm text-center break-normal">
        {label}
      </div>
    </div>
  );
};

export default AdminNavItem;
