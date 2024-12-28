import Image from "next/image";

interface CountryFlagProps {
  countryName: string;
  flagUrl: string;
}

const CountryFlag: React.FC<CountryFlagProps> = ({ flagUrl, countryName }) => {
  return (
    <div className="relative h-[50vh] w-full">
      <div className="w-full h-full">
        <Image
          src={flagUrl}
          alt={`${countryName} flag`}
          fill
          className="object-cover" // Ensures the image covers the container
        />
      </div>
      <div className="absolute bottom-0 left-0 w-full bg-red-700 bg-opacity-80 flex justify-center items-center p-4">
        {/* Positioned at the bottom with transparency */}
        <h1 className="text-white text-4xl md:text-5xl font-bold">
          Work in {countryName}
        </h1>
      </div>
    </div>
  );
};

export default CountryFlag;
