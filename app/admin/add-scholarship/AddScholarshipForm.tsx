"use client";

import Heading from "@/app/components/Heading";
import Input from "@/app/components/Inputs/Input";
import TextArea from "@/app/components/Inputs/TextArea";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import DropCountryImage from "./DropCountryImage";
import toast from "react-hot-toast";
import { handleImageUpload } from "@/libs/handleImageUpload";
import Button from "@/app/components/Button";
import axios from "axios";
import { useRouter } from "next/navigation";

const AddScholarshipForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [flagImageUrl, setFlagImageUrl] = useState<File | null>(null); // For flag
  const [cardImageUrl, setCardImageUrl] = useState<File | null>(null); // For card
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      sch_title: "",
      sch_introduction: "",
      job_title: "",
      job_introduction: "",
      flag_url: "",
      card_url: "",
    },
  });

  // Handle image uploads for both flag and card images
  const handleAllImageUploads = async () => {
    try {
      const uploads = await Promise.all([
        flagImageUrl ? handleImageUpload(flagImageUrl) : Promise.resolve(null),
        cardImageUrl ? handleImageUpload(cardImageUrl) : Promise.resolve(null),
      ]);

      if (uploads[0]) setValue("flag_url", uploads[0][0].image); // Store flag image URL
      if (uploads[1]) setValue("card_url", uploads[1][0].image); // Store card image URL
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Failed to upload the image(s).");
      throw error; // Re-throw error to prevent further processing
    }
  };

  // Handle form submission
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    setIsLoading(true);

    if (!flagImageUrl || !cardImageUrl) {
      toast.error("Both flag and card images are required!");
      setIsLoading(false);
      return;
    }

    try {
      toast("Uploading images and adding scholarship...");
      await handleAllImageUploads();

      const formData = getValues();
      await axios.post("/api/scholarship", formData);

      toast.success("Scholarship successfully added!");
      resetForm(); // Reset form on success
      router.refresh(); // Refresh page after submission
    } catch (error) {
      console.error("Failed to submit scholarship:", error);
      toast.error("Failed to add scholarship.");
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form state
  const resetForm = () => {
    reset();
    setFlagImageUrl(null);
    setCardImageUrl(null);
  };

  // Reset form and image state on successful submission
  useEffect(() => {
    resetForm();
  }, [reset]);

  return (
    <div className="flex flex-col gap-4">
      <Heading title="Add Scholarship" center />
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          <Input
            id="name"
            label="Nation"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />

          <TextArea
            id="sch_title" // Removed leading space
            label="Scholarship Title"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />

          <TextArea
            id="sch_introduction"
            label="Scholarship Introduction"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <DropCountryImage
            imageUrl={flagImageUrl}
            setImageUrl={setFlagImageUrl}
            label="Upload Flag Image"
          />
        </div>
        <div className="flex flex-col gap-4">
          <TextArea
            id="job_title" // Removed leading space
            label="Job Title"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />

          <TextArea
            id="job_introduction" // Corrected typo in label
            label="Job Introduction"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <DropCountryImage
            imageUrl={cardImageUrl}
            setImageUrl={setCardImageUrl}
            label="Upload Card Image"
          />
        </div>
      </div>

      <Button
        label={isLoading ? "Adding..." : "Add Scholarship"}
        onClick={handleSubmit(onSubmit)}
        disabled={isLoading}
      />
    </div>
  );
};

export default AddScholarshipForm;
