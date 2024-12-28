"use client";

import Heading from "@/app/components/Heading";
import Input from "@/app/components/Inputs/Input";
import TextArea from "@/app/components/Inputs/TextArea";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { handleImageUpload } from "@/libs/handleImageUpload";
import Button from "@/app/components/Button";
import axios from "axios";
import { useRouter } from "next/navigation";
import DropCountryImage from "../../admin/add-scholarship/DropCountryImage";
import { Scholarship } from "@prisma/client";

interface UpdateScholarshipFormProps {
  scholarship: Scholarship;
}

const UpdateScholarshipForm: React.FC<UpdateScholarshipFormProps> = ({
  scholarship,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [flagImageUrl, setFlagImageUrl] = useState<File | null>(null);
  const [cardImageUrl, setCardImageUrl] = useState<File | null>(null);
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
      name: scholarship?.name || "",
      sch_title: scholarship?.sch_title || "",
      sch_introduction: scholarship?.sch_introduction || "",
      job_title: scholarship?.job_title || "",
      job_introduction: scholarship?.job_introduction || "",
      flag_url: scholarship?.flag_url || "",
      card_url: scholarship?.card_url || "",
    },
  });

  const handleAllImageUploads = async () => {
    try {
      const uploads = await Promise.all([
        flagImageUrl ? handleImageUpload(flagImageUrl) : Promise.resolve(null),
        cardImageUrl ? handleImageUpload(cardImageUrl) : Promise.resolve(null),
      ]);

      if (uploads[0]) setValue("flag_url", uploads[0][0].image);
      if (uploads[1]) setValue("card_url", uploads[1][0].image);
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Failed to upload the image(s).");
      throw error; // Prevent further processing
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    setIsLoading(true);
    try {
      toast("Uploading images and updating scholarship...");
      await handleAllImageUploads();

      const formData = getValues();
      await axios.put(`/api/scholarship/${scholarship.id}`, formData);
      toast.success("Scholarship successfully updated!");
      router.refresh();
    } catch (error) {
      console.error("Failed to update scholarship:", error);
      toast.error("Failed to update scholarship.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    reset(scholarship); // Reset form with scholarship data
  }, [scholarship, reset]);

  return (
    <div className="flex flex-col gap-4 ">
      <Heading title="Update Scholarship" center />
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
            id="sch_title"
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
            imageUrl={flagImageUrl || scholarship.flag_url} // Handle existing image correctly
            setImageUrl={setFlagImageUrl}
            label="Upload Flag Image"
          />
        </div>
        <div className="flex flex-col gap-4">
          <TextArea
            id="job_title"
            label="Job Title"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <TextArea
            id="job_introduction"
            label="Job Introduction"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <DropCountryImage
            imageUrl={cardImageUrl || scholarship.card_url} // Handle existing image correctly
            setImageUrl={setCardImageUrl}
            label="Upload Card Image"
          />
        </div>
      </div>

      <Button
        label={isLoading ? "Updating..." : "Update Scholarship"}
        onClick={handleSubmit(onSubmit)}
        disabled={isLoading}
      />
    </div>
  );
};

export default UpdateScholarshipForm;
