import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
//npm i react-hook-form
interface TextAreaProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}
const TextArea: React.FC<TextAreaProps> = ({
  id,
  label,

  disabled,
  required,
  register,
  errors,
}) => {
  return (
    <div className="w-full relative">
      <textarea
        id={id}
        disabled={disabled}
        placeholder=""
        {...register(id, { required })}
        className={` max-h-[150px] min-h-[150px] peer w-full p-4 pt-6 outline-none font-light bg-white border-2 rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed ${
          errors[id] ? `border-rose-400` : `border-slate-300`
        } ${errors[id] ? `focus:border-rose-400` : `focus:border-slate-300`} `}
      />
      <label
        htmlFor={id}
        className={`absolute cursor-text duration-150 transform -translate-y-3 top-5 z-10 origion-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
        peer-focus:scale-75 peer-focus:-translate-y-4 ${
          errors[id] ? `text-rose-500` : `text-slate-400`
        } `}
      >
        {label}
      </label>
    </div>
  );
};

export default TextArea;
