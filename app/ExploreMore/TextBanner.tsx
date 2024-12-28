"use client";

import { useRouter } from "next/navigation";

const TextBanner = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col md:flex-row justify-center items-start gap-10 px-8 py-12  mx-auto">
      <div className="flex flex-col text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-sky-500 text-center items-center md:text-left md:whitespace-nowrap">
        <div>Personalized Support</div>
        <div>from Experienced</div>
        <div>Advisors</div>
      </div>

      <div className="flex flex-col gap-6 text-lg md:text-lg leading-relaxed text-gray-700">
        <p>
          Whether you&#39; re planning to study abroad or looking for job
          opportunities, our expert advisors are here to guide you every step of
          the way.
        </p>
        <div>
          <button
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105"
            onClick={() => router.push("/apply")}
          >
            Your Future Starts Here!
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextBanner;
