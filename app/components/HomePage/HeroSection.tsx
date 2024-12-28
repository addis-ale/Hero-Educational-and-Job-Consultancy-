"use client";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/variants";
import Image from "next/image";
import heroimage from "../../assets/herosectionbg.jpg";
import Button from "../Button";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const router = useRouter();
  return (
    <div className="relative bg-gray-900 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={heroimage}
          fill
          alt="heroimage"
          className="object-cover brightness-50 w-full"
        />
      </div>

      <div className="relative flex p-2 md:px-24 py-12 items-center gap-4 text-white">
        <div className={` flex flex-col flex-1 max-w-[700px]`}>
          {/* Animated Heading */}
          <motion.div
            variants={fadeIn("down", 0.07)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.7 }}
          >
            <h1 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-blue-500 to-indigo-600 drop-shadow-lg max-w-[500px]">
              Unlock Your Educational & Job Future With Us!
            </h1>
          </motion.div>

          {/* Animated Subheading */}
          <motion.div
            variants={fadeIn("up", 0.07)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.7 }}
          >
            <p className="text-lg md:text-2xl mb-6 px-12 font-semibold text-gray-300 leading-relaxed drop-shadow-md">
              Expert guidance for scholarship applications and job selection.
            </p>
          </motion.div>

          {/* Animated Button */}
          <motion.div
            variants={fadeIn("up", 0.07)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.7 }}
            className="max-w-[300px] flex justify-center items-center"
          >
            <Button
              onClick={() => {
                router.push("/ExploreMore");
              }}
              label="Explore More"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
