"use client";
import Image from "next/image";
import InfoBox from "./InfoBox";
import { FaBookOpen, FaPaperPlane, FaBriefcase } from "react-icons/fa";
import Link from "next/link";

const SubBanner = () => {
  return (
    <div className="flex flex-col lg:flex-row bg-rose-100 p-4 md:p-8 gap-6">
      {/* Parent container */}
      <div className="relative w-full md:flex-1 h-[40vh] sm:h-[50vh] md:h-[75vh] bg-center bg-cover">
        <div className="flex justify-center items-center h-full p-2 sm:p-4 md:p-11">
          <Image
            src="https://www.planstudyabroad.com/images/study-abroad-line.webp"
            width={500}
            height={700}
            alt="background image"
            className="object-cover w-full h-full"
            priority
          />
        </div>

        {/* Centered absolute image */}
        <div className="absolute top-2 left-2 right-2 bottom-2 sm:p-4">
          <Image
            src="https://www.planstudyabroad.com/images/study-abroad-consultant.webp"
            width={800}
            height={800}
            alt="overlay image"
            className="object-contain w-full h-full"
            priority
          />
        </div>
      </div>

      {/* Cards section */}
      <div className="w-full flex flex-col lg:flex-1">
        <h1 className="text-xl md:text-2xl font-bold text-black flex flex-col md:text-left">
          <span>Choose a suitable option</span>
          <span>that suits your requirement</span>
        </h1>

        {/* Section 1 */}
        <div className="w-full flex flex-col mt-4">
          <div className="flex items-center gap-2 w-[90%] md:w-[75%]">
            <span className="whitespace-nowrap">Education Service:</span>
            <hr className="w-full border-t border-white" />
          </div>
          <div className=" scroll-smooth grid grid-cols-2 gap-2 mt-4">
            <a href="#steps">
              <div>
                <InfoBox label="3 steps to choose a course" icon={FaBookOpen} />
              </div>
            </a>
            <Link href={"/apply"}>
              <InfoBox
                label="I want to apply for a course"
                icon={FaPaperPlane}
              />
            </Link>
          </div>
        </div>

        {/* Section 2 */}
        <div className="w-full flex flex-col mt-4">
          <div className="flex items-center gap-2 w-[90%] md:w-[75%]">
            <span className="whitespace-nowrap">Job Application:</span>
            <hr className="w-full border-t border-white" />
          </div>
          <div className="grid grid-cols-2  gap-2 mt-4">
            <a href="#steps">
              <div>
                <InfoBox
                  label="3 Easy steps to find a job"
                  icon={FaBriefcase}
                />
              </div>
            </a>
            <Link href={"/apply"}>
              <InfoBox label="I want to apply for a job" icon={FaPaperPlane} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubBanner;
