import { FaAward } from "react-icons/fa";

const WhyChooseUs = () => {
  return (
    <div className="flex justify-center items-center  ">
      <section className=" p-8 max-w-3xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="bg-blue-700 w-[40px] h-[40px] rounded-full flex items-center justify-center mr-4 ">
            <FaAward size={24} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Why Us?
          </h2>
        </div>

        <p className="mt-6 text-gray-600 text-lg leading-relaxed text-center">
          With over a decade of experience, a dedicated team of experts, and a
          track record of success, we are committed to helping students achieve
          their academic goals. Our personalized approach ensures that every
          student gets the attention they deserve.
        </p>

        {/* <div className="mt-6 text-center">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300">
            Learn More
          </button>
        </div> */}
      </section>
    </div>
  );
};

export default WhyChooseUs;
