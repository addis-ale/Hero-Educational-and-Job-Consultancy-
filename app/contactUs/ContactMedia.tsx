import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
  FaTelegram,
} from "react-icons/fa";
import Heading from "../components/Heading";

const ContactMedia = () => {
  return (
    <div className="mt-12 flex flex-col">
      <Heading title="Connect with Us" />
      <div className="flex space-x-6 mt-4">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline text-3xl transition-transform transform hover:scale-110"
        >
          <FaFacebookF />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline text-3xl transition-transform transform hover:scale-110"
        >
          <FaTwitter />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-800 hover:underline text-3xl transition-transform transform hover:scale-110"
        >
          <FaLinkedinIn />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline text-3xl transition-transform transform hover:scale-110"
        >
          <FaInstagram />
        </a>
        <a
          href="https://telegram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline text-3xl transition-transform transform hover:scale-110"
        >
          <FaTelegram />
        </a>
      </div>
    </div>
  );
};

export default ContactMedia;
