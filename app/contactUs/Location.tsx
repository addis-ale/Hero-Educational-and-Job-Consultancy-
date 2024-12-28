"use client";

const Location = () => {
  return (
    <div className="w-full  mt-8 md:mt-0">
      {" "}
      {/* Set width to full */}
      <h3 className="text-3xl font-semibold text-gray-700 mb-4">
        Our Location
      </h3>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8365724670785!2d38.7842048!3d9.0079232!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164bcb59a44f27e9%3A0x4b66ffb9399b750!2sYour%20Location!5e0!3m2!1sen!2sus!4v1632868717050"
        width="300"
        height="250"
        loading="lazy"
        className="w-full"
      ></iframe>
    </div>
  );
};

export default Location;
