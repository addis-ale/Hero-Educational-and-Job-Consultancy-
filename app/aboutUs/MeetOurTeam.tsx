import Image from "next/image";
import about1 from "../assets/aboutus.jpg";
import about2 from "../assets/aboutus2.jpg";

const MeetOurTeam = () => {
  return (
    <section className="container mx-auto my-12 px-4">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Meet Our Team
      </h2>
      <div className="flex flex-wrap justify-center mt-8">
        <div className="w-full sm:w-1/3 lg:w-1/4 p-6 text-center transform transition-transform duration-300 hover:scale-105">
          <Image
            className="w-32 h-32 rounded-full border-4 border-blue-500 mx-auto shadow-lg"
            src={about1}
            alt="Team Member 1"
          />
          <h3 className="mt-4 text-xl font-semibold text-gray-800">John Doe</h3>
          <p className="text-gray-500 italic">Senior Education Consultant</p>
        </div>
        <div className="w-full sm:w-1/3 lg:w-1/4 p-6 text-center transform transition-transform duration-300 hover:scale-105">
          <Image
            className="w-32 h-32 rounded-full border-4 border-blue-500 mx-auto shadow-lg"
            src={about2}
            alt="Team Member 2"
          />
          <h3 className="mt-4 text-xl font-semibold text-gray-800">
            Jane Smith
          </h3>
          <p className="text-gray-500 italic">Career Advisor</p>
        </div>
      </div>
    </section>
  );
};

export default MeetOurTeam;
