"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import Button from "@/app/components/Button";
const Activate = ({ params }: { params: { token: string } }) => {
  const { token } = params;
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const activateUser = async () => {
      try {
        const response = await axios.post(`/api/activate`, { token });
        if (response.data.success) {
          setStatus("success");
          setMessage(
            "Your account has been successfully activated! You can now log in."
          );
          setTimeout(() => router.push("/login"), 3000); // Auto-redirect after 3 seconds
        } else {
          setStatus("error");
          setMessage("Activation failed. Please check the link or try again.");
        }
      } catch (error) {
        console.error("Activation failed:", error);
        if (axios.isAxiosError(error) && error.response) {
          setMessage(error.response.data.message || "Activation failed.");
        } else {
          setMessage("An error occurred during activation.");
        }
        setStatus("error");
      }
    };

    activateUser();
  }, [token, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {status === "loading" && (
        <div className="text-lg font-semibold text-gray-600 animate-pulse">
          Activating your account...
        </div>
      )}

      {status === "success" && (
        <div className="flex justify-center items-center flex-col">
          <AiOutlineCheckCircle className="text-green-500 text-5xl mb-2" />
          <p className="text-lg font-semibold text-green-600 mb-4">{message}</p>
          <Button label="Log In" onClick={() => router.push("/login")} />
        </div>
      )}

      {status === "error" && (
        <div className="flex justify-center items-center flex-col">
          <AiOutlineCloseCircle className="text-red-500 text-5xl mb-2" />
          <p className="text-lg font-semibold text-red-600 mb-4">{message}</p>
        </div>
      )}
    </div>
  );
};

export default Activate;
