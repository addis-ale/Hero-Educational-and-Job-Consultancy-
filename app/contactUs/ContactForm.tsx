import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Heading from "../components/Heading";
import Input from "../components/Inputs/Input";
import TextArea from "../components/Inputs/TextArea";
import Button from "../components/Button";
import axios from "axios";
import toast from "react-hot-toast";

const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFormSubmited, setIsFormSubmited] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  useEffect(() => {
    if (isFormSubmited) {
      reset();
      setIsFormSubmited(false);
    }
  }, [isFormSubmited]);

  const onsubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      await axios.post("/api/emailUs", data);
      toast.success(
        "Your message has been successfully sent! We will respond to you soon!"
      );
      setIsFormSubmited(true);
    } catch (error) {
      toast.error("Submission failed. Try again.");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Heading title="Get In Touch" center />
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
        type="email"
        required
      />
      <TextArea
        id="message"
        label="Message"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Button
        label={isLoading ? `Loading...` : `Send Message`}
        onClick={handleSubmit(onsubmit)}
      />
    </>
  );
};

export default ContactForm;
