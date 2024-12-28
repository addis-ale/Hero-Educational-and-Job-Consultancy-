import { fieldsOfStudy } from "@/utils/fieldOfStudy";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface FieldOfStudySelectionProps {
  id: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const FieldOfStudySelection: React.FC<FieldOfStudySelectionProps> = ({
  id,
  label,
  disabled,
  required,
  register,
  errors,
}) => {
  return (
    <div className="w-full relative">
      <select
        id={id}
        disabled={disabled}
        defaultValue="Computer Science" // Set Computer Science as default
        {...register(id, { required })}
        className={`peer w-full p-4 pt-6 outline-none font-light bg-white border-2 rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed ${
          errors[id] ? `border-rose-400` : `border-slate-300`
        } ${errors[id] ? `focus:border-rose-400` : `focus:border-slate-300`} `}
      >
        <option value="" disabled>
          Select your field of study
        </option>
        {fieldsOfStudy.map((field) => (
          <option key={field} value={field}>
            {field}
          </option>
        ))}
      </select>
      <label
        htmlFor={id}
        className={`absolute cursor-text duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
          peer-focus:scale-75 peer-focus:-translate-y-4 ${
            errors[id] ? `text-rose-500` : `text-slate-400`
          } `}
      >
        {label}
      </label>
    </div>
  );
};

export default FieldOfStudySelection;
