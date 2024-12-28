interface NullDataProps {
  title: string;
}

const NullData: React.FC<NullDataProps> = ({ title }) => {
  return (
    <div className="flex justify-center items-center w-full h-[50vh] text-xl md:text-2xl">
      <p className="font-medium">{title}</p>
    </div>
  );
};

export default NullData;
