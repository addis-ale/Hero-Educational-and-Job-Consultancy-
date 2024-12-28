import { GiHeartBeats } from "react-icons/gi";

const CoreValues = () => {
  return (
    <div className="flex justify-center items-center ">
      <div className=" p-8 max-w-lg">
        <div className="flex items-center gap-2">
          <div className="bg-blue-700 w-[30px] h-[30px] rounded-full flex items-center justify-center mr-4 ">
            <GiHeartBeats size={24} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Core Values</h2>
        </div>

        <ul className="mt-6 list-disc list-inside text-gray-600 leading-relaxed text-sm">
          <li>
            <span className="font-semibold text-gray-800">Integrity:</span> We
            believe in honesty and transparency in all our actions, ensuring
            students and job seekers can trust our guidance.
          </li>
          <li className="mt-2">
            <span className="font-semibold text-gray-800">
              Personalization:
            </span>{" "}
            Every student and professional is unique, and so is our approach to
            their individual needs.
          </li>
          <li className="mt-2">
            <span className="font-semibold text-gray-800">Innovation:</span> We
            stay at the cutting edge of educational and career strategies to
            serve our clients better.
          </li>
          <li className="mt-2">
            <span className="font-semibold text-gray-800">Collaboration:</span>{" "}
            We work closely with students, parents, educators, and employers to
            create the best outcomes for educational and career pursuits.
          </li>
        </ul>

        {/* 
        <div className="mt-4 flex justify-end">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300">
            Learn More
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default CoreValues;
