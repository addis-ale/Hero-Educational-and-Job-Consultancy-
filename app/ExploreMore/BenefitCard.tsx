import { IconType } from "react-icons";

interface BenefitCardProps {
  icon: IconType;
  header: string;
  description: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({
  icon: Icon,
  header,
  description,
}) => {
  return (
    <div className="p-6 rounded-xl shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300 ease-in-out">
      <div className="flex items-center gap-4 mb-4">
        <span className="p-4 bg-rose-100 rounded-full">
          <Icon size={24} className="text-rose-500 " />
        </span>
        <h2 className="text-xl font-bold text-gray-800">{header}</h2>
      </div>
      <p className="text-gray-600 text-lg leading-relaxed">{description}</p>
    </div>
  );
};

export default BenefitCard;
