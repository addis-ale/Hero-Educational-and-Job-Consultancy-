import { IconType } from "react-icons";

interface InfoBoxProps {
  icon: IconType;
  label: string;
}

const InfoBox: React.FC<InfoBoxProps> = ({ icon: Icon, label }) => {
  return (
    <div className="group  ">
      {" "}
      {/* Fixed width for consistency */}
      <div className="flex flex-col items-center gap-3 p-6 bg-gradient-to-r from-blue-700 to-sky-500 rounded-xl shadow-lg transform transition duration-300 hover:shadow-2xl hover:from-orange-500 hover:to-red-500">
        <span className="text-white">
          <Icon
            size={30}
            className="group-hover:rotate-12 transition duration-500"
          />
        </span>
        <span className="font-semibold text-white text-lg text-center">
          {label}
        </span>
      </div>
    </div>
  );
};

export default InfoBox;
