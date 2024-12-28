"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css"; // Import core Swiper styles
import "swiper/css/navigation"; // Import Navigation styles
import Button from "../Button";
import { useRouter } from "next/navigation";
import { fadeIn } from "@/utils/variants";
const slides = [
  {
    id: 1,
    image: "https://www.planstudyabroad.com/images/banner/banner-new3.webp",
    title: "Unlock Your Educational Future With Us!",
    description:
      "Expert guidance for scholarship applications and university selection, tailored to your academic journey.",
  },
  {
    id: 2,
    image: "https://www.planstudyabroad.com/images/banner/banner-new8.webp",
    title: "Achieve Your Career Goals with Expert Job Consulting",
    description:
      "Personalized job consulting to help you navigate the employment market and land your dream job.",
  },
  {
    id: 3,
    image: "https://www.planstudyabroad.com/images/banner/banner-new4.webp",
    title: "Discover Global Opportunities in Education and Careers",
    description:
      "Whether you're aiming for higher education abroad or exploring job prospects, we provide the support you need.",
  },
  {
    id: 4,
    image: "https://www.planstudyabroad.com/images/banner/banner-new7.webp",
    title: "Scholarship Success Starts Here",
    description:
      "We help you identify and apply for scholarships to ease the financial burden of your education.",
  },
  {
    id: 5,
    image: "https://www.planstudyabroad.com/images/banner/banner-new2.webp",
    title: "Step Up in Your Career",
    description:
      "From resume building to interview preparation, we guide you through every step of your job search.",
  },
  {
    id: 6,
    image: "https://www.planstudyabroad.com/images/banner/banner-new4.webp",
    title: "Your Future Awaits - Let's Build It Together",
    description:
      "With our expertise, you can confidently pursue both educational and job opportunities worldwide.",
  },
];

const DynamicHeroSection = () => {
  const router = useRouter();

  return (
    <div className="relative group">
      {/* Swiper navigation buttons */}
      <div className="absolute top-1/2 z-10 justify-between w-full px-2 hidden group-hover:flex">
        <div
          className="p-3 bg-gray-200 rounded-full hover:bg-gray-500 cursor-pointer"
          id="prev-btn"
        >
          <svg
            className="w-5 h-5"
            fill="#000000"
            viewBox="0 0 256 256"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M160,220a11.96287,11.96287,0,0,1-8.48535-3.51465l-80-80a12.00062,12.00062,0,0,1,0-16.9707l80-80a12.0001,12.0001,0,0,1,16.9707,16.9707L96.9707,128l71.51465,71.51465A12,12,0,0,1,160,220Z" />
          </svg>
        </div>
        <div
          className="p-3 bg-gray-200 rounded-full hover:bg-gray-500 cursor-pointer"
          id="next-btn"
        >
          <svg
            fill="#000000"
            className="w-5 h-5"
            viewBox="0 0 256 256"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M96,220a12,12,0,0,1-8.48535-20.48535L159.0293,128,87.51465,56.48535a12.0001,12.0001,0,0,1,16.9707-16.9707l80,80a12.00062,12.00062,0,0,1,0,16.9707l-80,80A11.96287,11.96287,0,0,1,96,220Z" />
          </svg>
        </div>
      </div>

      {/* Swiper with navigation, autoplay, and loop */}
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={{
          prevEl: "#prev-btn",
          nextEl: "#next-btn",
        }}
        loop={true} // Enable looping
        autoplay={{
          delay: 5000, // Auto-slide every 5 seconds
          disableOnInteraction: false, // Prevents autoplay from stopping on user interactions
          pauseOnMouseEnter: true, // Pause autoplay when hovering
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="min-h-[50vh] relative">
              <div>
                <Image
                  src={slide.image}
                  fill
                  alt={slide.title}
                  className="w-full "
                />
              </div>
              <div className="absolute inset-0 flex flex-col justify-center items-start  max-w-[500px] pl-4 xl:pl-8 2xl:pl-12 py-2">
                <motion.div
                  variants={fadeIn("left", 0.05)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: false, amount: 0.7 }}
                >
                  <h1 className="font-bold  text-3xl text-gray-600">
                    {slide.title}
                  </h1>
                </motion.div>
                <motion.div
                  variants={fadeIn("right", 0.05)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: false, amount: 0.7 }}
                >
                  <p className="mt-4 text-md text-blue-700 font-semibold max-w-[450px]">
                    {slide.description}
                  </p>
                </motion.div>
                <div className="w-full my-5 flex items-center gap-4 justify-center">
                  <motion.div
                    variants={fadeIn("right", 0.05)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: false, amount: 0.7 }}
                  >
                    <Button
                      label="Explore More"
                      onClick={() => {
                        router.push("/ExploreMore");
                      }}
                    />
                  </motion.div>
                  <motion.div
                    variants={fadeIn("left", 0.05)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: false, amount: 0.7 }}
                  >
                    <Button
                      label="Apply Now"
                      onClick={() => {
                        router.push("/apply");
                      }}
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DynamicHeroSection;
