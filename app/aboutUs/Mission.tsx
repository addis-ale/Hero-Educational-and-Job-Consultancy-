import { GiTargetShot } from "react-icons/gi";

const Sections = () => {
  return (
    <div className="flex justify-center items-center  ">
      <div className="   p-8 max-w-lg">
        <div className="flex items-center">
          <div className="bg-blue-700 w-[30px] h-[30px] rounded-full flex items-center justify-center mr-4">
            <GiTargetShot size={24} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Our Mission</h2>
        </div>

        <p className="mt-6 text-gray-600 leading-relaxed">
          At <span className="font-bold">[Your Company Name]</span>, our mission
          is to empower students and professionals to achieve their full
          potential through personalized educational and career consulting
          services. We provide tailored guidance for those seeking scholarships,
          educational programs, and international job opportunities, helping
          them unlock a world of possibilities.
        </p>

        {/* <div className="mt-4 flex justify-end">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300">
            Learn More
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Sections;
