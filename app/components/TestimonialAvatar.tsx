import Image from "next/image";

interface TestimonialAvatarProps {
  imageUrl: string;
  name: string;
}

const TestimonialAvatar: React.FC<TestimonialAvatarProps> = ({
  imageUrl,
  name,
}) => {
  return (
    <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-gray-200 shadow-lg">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={name}
          width={10}
          height={10}
          className=" object-cover"
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full bg-blue-500 text-white text-base font-bold">
          {name ? name.charAt(0) : "?"}
        </div>
      )}
    </div>
  );
};

export default TestimonialAvatar;
