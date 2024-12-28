"use client";

import { AiOutlineInfoCircle } from "react-icons/ai";
import Sections from "./Mission";
import VisionSection from "./Vission";
import CoreValues from "./CoreValues";
import WhyChooseUs from "./WhyChooseUs";
import MeetOurTeam from "./MeetOurTeam";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/variants";
import WhatWeDo from "./WhatWeDo";

const AboutUsComponent = () => {
  return (
    <div className="px-4 sm:px-8 lg:px-16 max-w-[1040px] mx-auto">
      {/* Header Section */}
      <header className="flex justify-center items-center py-8">
        <div className="flex flex-col-reverse sm:flex-row-reverse items-center gap-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center sm:text-left">
            About Us
          </h1>
          <span className="bg-blue-700 w-[40px] h-[40px] rounded-full  items-center justify-center hidden md:flex ">
            <AiOutlineInfoCircle size={24} className="text-white" />
          </span>
        </div>
      </header>

      <div className="space-y-12">
        {/* First Section: Left-Aligned Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          <motion.div
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.5 }}
          >
            <Sections />
          </motion.div>
          <motion.div
            variants={fadeIn("left", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.5 }}
          >
            <Image
              src="https://www.planstudyabroad.com/images/canada/study-in-canada-Scholarship-and-Funding.jpg"
              alt="Mission"
              width={300}
              height={300}
              className="object-cover w-full max-w-[300px] h-auto rounded-lg"
            />
          </motion.div>
        </div>

        {/* Second Section: Right-Aligned Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          <motion.div
            variants={fadeIn("right", 0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.5 }}
          >
            <Image
              src="https://www.planstudyabroad.com/images/canada/Possibility-to-earn-money-while-studying.jpg"
              alt="Vision"
              width={300}
              height={300}
              className="object-cover w-full max-w-[300px] h-auto rounded-lg"
            />
          </motion.div>
          <motion.div
            variants={fadeIn("left", 0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.5 }}
          >
            <VisionSection />
          </motion.div>
        </div>

        {/* Third Section: Left-Aligned Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          <motion.div
            variants={fadeIn("right", 0.4)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.5 }}
          >
            <CoreValues />
          </motion.div>
          <motion.div
            variants={fadeIn("left", 0.4)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.5 }}
          >
            <Image
              src="https://www.planstudyabroad.com/images/blog/discussing-video-course-detail.jpg"
              alt="Core Values"
              width={300}
              height={300}
              className="object-cover w-full max-w-[300px] h-auto rounded-lg"
            />
          </motion.div>
        </div>

        {/* Fourth Section: Right-Aligned Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          <motion.div
            variants={fadeIn("right", 0.5)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.5 }}
          >
            <Image
              src="https://www.planstudyabroad.com/images/usa/Scholarship-and-Funding.jpg"
              alt="Vision"
              width={300}
              height={300}
              className="object-cover w-full max-w-[300px] h-auto rounded-lg"
            />
          </motion.div>
          <motion.div
            variants={fadeIn("left", 0.5)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.5 }}
          >
            <WhatWeDo />
          </motion.div>
        </div>

        {/* Fifth Section: Left-Aligned Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          <motion.div
            variants={fadeIn("right", 0.6)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.5 }}
          >
            <WhyChooseUs />
          </motion.div>
          <motion.div
            variants={fadeIn("left", 0.6)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.5 }}
          >
            <Image
              src="https://www.planstudyabroad.com/images/usa/Post-graduation-work-permit.jpg"
              alt="Why Choose Us"
              width={300}
              height={300}
              className="object-cover w-full max-w-[300px] h-auto rounded-lg"
            />
          </motion.div>
        </div>
      </div>

      {/* Meet Our Team Section */}
      <motion.div
        className="mt-12"
        variants={fadeIn("up", 0.7)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.5 }}
      >
        <MeetOurTeam />
      </motion.div>
    </div>
  );
};

export default AboutUsComponent;
