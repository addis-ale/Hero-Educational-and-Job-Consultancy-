"use client";

import { useState } from "react";
import Heading from "../components/Heading";
import Input from "../components/Inputs/Input";
import { FieldValues, useForm } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { AiOutlineCheckCircle } from "react-icons/ai";

const PasswordResetForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailIsSent, setEmailIsSent] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({ defaultValues: { email: "" } });

  const onSubmit = async (data: FieldValues) => {
    setUserEmail(data.email);
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/resetPassword", data);
      if (response.status === 200) {
        setEmailIsSent(true);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.status === 404
            ? "This email is not registered."
            : "Failed to send the reset link. Please try again later."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (emailIsSent) {
    return (
      <div className="h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center space-y-4 flex items-center justify-center flex-col">
          <AiOutlineCheckCircle className="text-green-500 text-5xl mb-2" />
          <h2 className="text-xl font-semibold text-blue-700">
            Reset Link Sent!
          </h2>
          <p className="text-lg text-gray-700">
            We&apos;ve sent a password reset link to{" "}
            <span className="font-bold text-blue-600">{userEmail}</span>.
            <br />
            Please check your inbox and follow the link to reset your password.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <Heading title="Reset Your Password" />
        <p className="text-sm text-gray-500">
          Enter your email to receive a reset link.
        </p>

        <div className="space-y-4">
          <Input
            id="email"
            label="Email"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          {errors.email && (
            <p className="text-sm text-red-500">Please enter a valid email.</p>
          )}
          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button
            label={isLoading ? "Sending..." : "Send Reset Link"}
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading}
          />

          <div className="text-center mt-4">
            <Link
              href="/login"
              className="text-sm text-blue-600 hover:underline flex items-center justify-center gap-2"
            >
              <FaArrowLeft className="w-4 h-4" />
              <span>Return to login</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetForm;
