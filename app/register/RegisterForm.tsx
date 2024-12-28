"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
//import { AiOutlineGoogle } from "react-icons/ai";
import Heading from "../components/Heading";
import Input from "../components/Inputs/Input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
//import { signIn } from "next-auth/react";
import { CurrentUser } from "../components/NavgationBar/UserMenu";

interface RegisterFormProps {
  currentUser: CurrentUser | null;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailIsSent, setIsEmailSent] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const toggleIsPasswordVisible = () => {
    setIsPasswordVisible((prev) => !prev);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    setUserEmail(data.email); // Store the email entered by the user for display

    try {
      const response = await axios.post("/api/register", data);
      if (response.status === 200) {
        setIsEmailSent(true);
        console.log("The response from register api endpoin", response);
        toast.success(
          "Account Created! Please check your email to activate your account."
        );
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          const message = error.response.data.error;
          if (message.includes("active")) {
            toast.error(
              "An account with this email already exists and is active."
            );
          } else if (message.includes("inactive")) {
            toast(
              "A new activation email has been sent to your email address."
            );
            setIsEmailSent(true);
          } else {
            toast.error(message || "Invalid request.");
          }
        } else if (error.response?.status === 500) {
          toast.error("Server error. Please try again later.");
        } else {
          console.error("API error:", error.message, error.response?.data);
          toast.error(
            "A network or server error occurred. Please check your connection."
          );
        }
      } else {
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser?.active) {
      router.push("/");
      router.refresh();
    }
  }, [currentUser, router]);

  if (currentUser?.active) {
    return <p className="text-center">Logged in. Redirecting...</p>;
  }

  if (emailIsSent) {
    return (
      <p className="text-center text-lg font-semibold text-blue-700">
        We&apos;ve sent an activation link to{" "}
        <span className="font-bold">{userEmail}</span>. Please check your inbox
        and follow the link to activate your account.
      </p>
    );
  }
  return (
    <>
      <Heading title="Sign up" />
      {/* <Button
        outline
        label="Sign up with Google"
        icon={AiOutlineGoogle}
        onClick={() => signIn("google")}
      /> */}
      <hr className="bg-slate-300 w-full h-px" />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <div className="w-full relative">
        <Input
          id="password"
          label="Password"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          type={`${isPasswordVisible ? "text" : "password"}`}
        />
        <button
          onClick={toggleIsPasswordVisible}
          className="absolute top-5 p-1 right-0"
        >
          {isPasswordVisible ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          )}
        </button>
      </div>

      <Button
        label={isLoading ? "Loading..." : "Sign Up"}
        onClick={handleSubmit(onSubmit)}
        disabled={isLoading}
      />
      <p className="text-sm">
        Already have an account?
        <Link className="underline" href="/login">
          {" "}
          Log in
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
