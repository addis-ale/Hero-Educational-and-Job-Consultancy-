import { FaGraduationCap } from "react-icons/fa";
import { FaUniversity } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa";
import { FaGlobeAmericas } from "react-icons/fa";

export const services = [
  {
    title: " Application Guidance",
    description:
      "Receive expert assistance in identifying and applying for scholarships that fit your profile.",
    Icon: FaGraduationCap, // Replace with actual path
    link: "/services/scholarships",
  },
  {
    title: "University Selection",
    description:
      "Get personalized recommendations for universities based on your academic interests and career goals.",
    Icon: FaUniversity, // Replace with actual path
    link: "/services/universities",
  },
  {
    title: "Career Counseling",
    description:
      "Explore career options and receive guidance on choosing the right path for your future.",
    Icon: FaBriefcase, // Replace with actual path
    link: "/services/careers",
  },
  {
    title: "Study Abroad Programs",
    description:
      "Find and apply for study abroad programs that enhance your educational experience.",
    Icon: FaGlobeAmericas, // Replace with actual path
    link: "/services/study-abroad",
  },
];
