"use client";
import TestimonialCard from "./TestimonialCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { Autoplay, Navigation } from "swiper/modules";
import { testimonials } from "@/utils/testimonial";

const Testimonial = () => {
  return (
    <section className="py-8 flex flex-col gap-8 w-full h-full">
      <h1 className="text-center text-2xl md:text-3xl font-bold text-gray-700">
        What Our Clients Say?
      </h1>
      <div className="">
        <div className="relative">
          <div className="absolute top-1/2 -left-6 md:-left-12 transform -translate-y-1/2 z-10">
            <div
              className="ml-5 p-3 bg-orange-500 rounded-full hover:bg-blue-700 cursor-pointer"
              id="prev-btn"
            >
              <svg
                className="md:w-5 md:h-5 w-3
                h-3"
                fill="#fff"
                viewBox="0 0 256 256"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M160,220a11.96287,11.96287,0,0,1-8.48535-3.51465l-80-80a12.00062,12.00062,0,0,1,0-16.9707l80-80a12.0001,12.0001,0,0,1,16.9707,16.9707L96.9707,128l71.51465,71.51465A12,12,0,0,1,160,220Z" />
              </svg>
            </div>
          </div>
          <div className="absolute top-1/2 -right-6 md:-right-12 transform -translate-y-1/2 z-10">
            <div
              className=" mr-5 p-3 bg-orange-500 rounded-full hover:bg-blue-700 cursor-pointer"
              id="next-btn"
            >
              <svg
                className="md:w-5 md:h-5 w-3 h-3"
                fill="#fff"
                viewBox="0 0 256 256"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M96,220a12,12,0,0,1-8.48535-20.48535L159.0293,128,87.51465,56.48535a12.0001,12.0001,0,0,1,16.9707-16.9707l80,80a12.00062,12.00062,0,0,1,0,16.9707l-80,80A11.96287,11.96287,0,0,1,96,220Z" />
              </svg>
            </div>
          </div>

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
              {testimonials.map((testi) => (
                <SwiperSlide key={testi.id}>
                  <TestimonialCard testimony={testi} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
