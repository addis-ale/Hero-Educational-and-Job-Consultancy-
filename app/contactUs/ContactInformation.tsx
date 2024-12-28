import { FaClock, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

const ContactInformation = () => {
  return (
    <div className="md:w-1/2">
      <h3 className="text-2xl font-semibold text-gray-700 mb-4">
        Contact Information
      </h3>
      <div className="space-y-3">
        <div className="flex gap-2 items-center">
          <FaEnvelope size={18} className="text-blue-600" />
          <p>Email: contact@educonsult.com</p>
        </div>
        <div className="flex gap-2 items-center">
          <FaPhone size={18} className="text-blue-600" />
          <p>Phone: +1 234 567 890</p>
        </div>
        <div className="flex gap-2 items-center">
          <FaMapMarkerAlt size={18} className="text-blue-600" />
          <p>123 Education St, Learning City, World</p>
        </div>
        <div className="flex gap-2 items-center">
          <FaClock size={18} className="text-blue-600" />
          <p>Mon-Fri, 9am - 5pm</p>
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
