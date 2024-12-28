"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { useRouter } from "next/navigation";
import { scholarships } from "@/types/scholarships";
// import { motion } from "framer-motion";
// import { fadeIn } from "@/utils/variants";

// const countries = [
//   {
//     id: "67143629f4f38c1fe6aea694",
//     name: "US",
//     image_url: "https://www.planstudyabroad.com/images/destination/usa.webp",
//   },
//   {
//     id: "671436d4f4f38c1fe6aea696",
//     name: "Canada",
//     image_url: "https://www.planstudyabroad.com/images/destination/canada.webp",
//   },
//   {
//     id: "671426eef4f38c1fe6aea693",
//     name: "UK",
//     image_url:
//       "https://www.planstudyabroad.com/images/destination/united-kingdom.webp",
//   },
//   {
//     id: "6714367df4f38c1fe6aea695",
//     name: "Australia",
//     image_url:
//       "https://www.planstudyabroad.com/images/destination/australia.webp",
//   },
//   {
//     id: "",
//     name: "Germany",
//     image_url: "https://www.planstudyabroad.com/images/destination/nz.webp",
//   },
//   {
//     id: "6714372df4f38c1fe6aea697",
//     name: "Ireland",
//     image_url:
//       "https://www.planstudyabroad.com/images/destination/ireland.webp",
//   },
// ];
interface CountryListProps {
  country: scholarships[];
}
const CountryList: React.FC<CountryListProps> = ({ country }) => {
  const router = useRouter();
  console.log(country);
  return (
    <div className="w-full flex flex-col gap-4 md:gap-16">
      {/* Header Section */}
      <div className="flex justify-center items-center gap-4 flex-col p-5">
        <h1 className="font-bold text-gray-700 text-2xl md:text-4xl xl:text-5xl text-center">
          Explore &amp; Choose the Best Opportunities in Education and Careers
          Worldwide.
        </h1>
        <p className="text-slate-500 font-semibold text-lg text-center">
          We provide the guidance you need to achieve your goals. Start your
          journey today and unlock your full potential!
        </p>
      </div>

      {/* Swiper Section */}
      <div className="relative group">
        {/* Navigation Buttons */}
        <div className="absolute top-1/2 -left-6 md:-left-12 transform -translate-y-1/2 z-10">
          <div
            className=" ml-5 p-3  bg-orange-500 rounded-full hover:bg-blue-700 cursor-pointer"
            id="prev-btn"
          >
            <svg
              className=" w-3  h-3 md:w-5 md:h-5"
              fill="#fff"
              viewBox="0 0 256 256"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M160,220a11.96287,11.96287,0,0,1-8.48535-3.51465l-80-80a12.00062,12.00062,0,0,1,0-16.9707l80-80a12.0001,12.0001,0,0,1,16.9707,16.9707L96.9707,128l71.51465,71.51465A12,12,0,0,1,160,220Z" />
            </svg>
          </div>
        </div>
        <div className=" absolute top-1/2 -right-6 md:-right-12 transform -translate-y-1/2 z-10">
          <div
            className=" mr-5 p-3 bg-orange-500 rounded-full hover:bg-blue-700 cursor-pointer"
            id="next-btn"
          >
            <svg
              className=" w-3  h-3 md:w-5 md:h-5"
              fill="#fff"
              viewBox="0 0 256 256"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M96,220a12,12,0,0,1-8.48535-20.48535L159.0293,128,87.51465,56.48535a12.0001,12.0001,0,0,1,16.9707-16.9707l80,80a12.00062,12.00062,0,0,1,0,16.9707l-80,80A11.96287,11.96287,0,0,1,96,220Z" />
            </svg>
          </div>
        </div>

        {/* Swiper Carousel */}
        <div className="px-4">
          <Swiper
            spaceBetween={20}
            loop={true}
            modules={[Navigation, Autoplay]}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              prevEl: "#prev-btn",
              nextEl: "#next-btn",
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
          >
            {country.map((cou) => (
              <SwiperSlide key={cou.id}>
                <div
                  className="bg-white rounded-xl overflow-hidden shadow-md mx-auto"
                  onClick={() => {
                    router.push(`/country/${cou.id}`);
                  }}
                >
                  <Image
                    src={cou.card_url}
                    alt={cou.name}
                    width={300}
                    height={300}
                    objectFit="cover"
                    className="w-full h-[300px] sm:h-[400px] md:h-[400px] transition-transform duration-300 ease-in-out transform hover:scale-105"
                  />

                  <div className="absolute bottom-3 left-4 right-4 bg-gradient-to-r from-orange-500 to-red-500 font-semibold text-white text-xl p-3 text-center border-[1px] border-white">
                    <button>Apply for {cou.name}</button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default CountryList;
