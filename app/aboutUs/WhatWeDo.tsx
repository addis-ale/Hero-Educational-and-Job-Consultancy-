import { AiOutlineBulb } from "react-icons/ai";

const WhatWeDo = () => {
  return (
    <div className="flex justify-center items-center  ">
      <div className="bg-white rounded-lg  p-8 max-w-lg">
        <div className="flex items-center gap-2">
          <div className="bg-blue-700 w-[30px] h-[30px] rounded-full flex items-center justify-center mr-4 ">
            <AiOutlineBulb size={24} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">What We Do</h2>
        </div>

        <p className="mt-6 text-gray-600 leading-relaxed">
          Our consulting services include:
        </p>
        <ul className="mt-4 list-disc list-inside text-gray-600 leading-relaxed">
          <li>Academic counseling</li>
          <li>College application assistance</li>
          <li>Career guidance</li>
          <li>Test preparation support</li>
        </ul>

        {/* <div className="mt-4 flex justify-end">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300">
            Learn More
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default WhatWeDo;
