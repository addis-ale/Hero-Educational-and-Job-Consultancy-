import { FaChevronDown } from "react-icons/fa";

const Accordion = () => {
  return (
    <div>
      <div className="max-w-[400px] mx-auto">
        <div className="flex justify-between items-start w-full">
          <div className="flex flex-col">
            <span>what you offer?</span>
            <span>we give consulting for our students?</span>
          </div>
          <span>
            <FaChevronDown />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
