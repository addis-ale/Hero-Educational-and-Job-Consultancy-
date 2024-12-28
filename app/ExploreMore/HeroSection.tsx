import Image from "next/image";

const ExploreHeroSection = () => {
  return (
    <div className="min-h-[50vh] relative">
      <div>
        <Image
          src="https://www.planstudyabroad.com/images/virtual-office/virtual-office-banner.jpg"
          fill
          alt="hero image"
        />
      </div>
      <div className="absolute right-0 top-2 md:right-10 md:top-11 flex flex-col items-end max-w-[300px] md:max-w-full lg:pr-[250px] p-2 ">
        <div className="">
          <h1 className="text-2xl font-bold md:text-3xl lg:text-5xl text-blue-600  gap-2  text-right flex flex-col">
            <span className="">Unlock Your</span>
            <strong className="font-bold "> future Dreams</strong>
          </h1>
        </div>
        <div>
          <p className="mt-4 text-md  font-semibold max-w-[450px] text-right text-gray-600">
            Expert Guidance Online!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExploreHeroSection;
