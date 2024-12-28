import { IconType } from "react-icons";

export type Service = {
  title: string;
  description: string;
  Icon: IconType; // Type for the icon
  link: string;
};

interface ServiceCardProps {
  serviceOverview: Service; // Expecting a single service object
}

const ServiceCard: React.FC<ServiceCardProps> = ({ serviceOverview }) => {
  const { Icon } = serviceOverview; // Destructure Icon from serviceOverview

  return (
    <div className="flex flex-col gap-4 max-w-[300px] bg-white border border-slate-200 rounded-xl shadow-lg transition-transform transform hover:scale-105 duration-300">
      <div className="flex gap-4 items-center font-bold text-xl p-4 border-b border-slate-200">
        <span className="flex items-center  justify-center w-[55px] h-[55px] bg-blue-500 text-white rounded-full">
          <Icon size={24} /> {/* Correctly render the Icon component */}
        </span>
        <span>{serviceOverview.title}</span>
      </div>
      <div className="p-4 text-gray-700">
        {serviceOverview.description}{" "}
        {/* Use the description from the service */}
      </div>
      <div className="p-5 w-full">
        <button className="cursor-pointer p-3 bg-blue-700 rounded-md text-white font-semibold w-full">
          See Detail
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
