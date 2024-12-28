import Image from "next/image";

interface HowItWorksProps {
  imgSrc: string;
  label: string;
}
const HowItWorksCard: React.FC<HowItWorksProps> = ({ label, imgSrc }) => {
  return (
    <div className="flex flex-col items-center max-w-64 ">
      <div className="relative w-32 h-32 border-b-2">
        <Image
          src={imgSrc}
          alt={label}
          layout="fill" // Makes the image fill the container
          objectFit="cover" // Maintains aspect ratio
          className="rounded-lg" // Optional styling
        />
      </div>
      <div className="mt-2 text-center font-semibold text-blue-700">
        {label}
      </div>
    </div>
  );
};

export default HowItWorksCard;
