import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
// npm i react-hook-form

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  disabled,
  required,
  register,
  errors,
}) => {
  // Regex for phone number validation
  const phoneRegex = /^9[0-9]{8}$/;

  // Regex for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return (
    <div className="w-full relative">
      {/* Use flexbox to align +251 and input in a row */}
      {id === "phoneNumber" && (
        <div className="flex items-center absolute top-[25px] left-4">
          <span className="text-gray-500">+251</span>
        </div>
      )}

      <input
        autoComplete="off"
        id={id}
        disabled={disabled}
        type={type}
        {...register(id, {
          required,
          pattern:
            id === "phoneNumber"
              ? {
                  value: phoneRegex,
                  message:
                    "Phone number must start with 9 and contain 9 digits",
                }
              : id === "email"
              ? {
                  value: emailRegex,
                  message: "Please enter a valid email address",
                }
              : undefined,
        })}
        // Adjust padding only if the field is phoneNumber to make space for +251
        className={`peer w-full ${
          id === "phoneNumber" ? " flex items-start pl-[54px]" : "pl-4"
        } p-4 pt-6 outline-none font-light bg-white border-2 rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed ${
          errors[id] ? `border-rose-400` : `border-slate-300`
        } ${errors[id] ? `focus:border-rose-400` : `focus:border-slate-300`} `}
      />

      <label
        htmlFor={id}
        className={`absolute cursor-text duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
          peer-focus:scale-75 peer-focus:-translate-y-4 ${
            errors[id] ? `text-rose-500` : `text-slate-400`
          } ${
          id === `phoneNumber`
            ? `top-[10px] z-10 origin-[0] -translate-y-4 py-2`
            : ``
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
