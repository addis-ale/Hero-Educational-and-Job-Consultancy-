"use client";

import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../components/Inputs/Input";
import Button from "../components/Button";
import { FaPlay } from "react-icons/fa";
import DocumentApply from "./DocumentApply";
import toast from "react-hot-toast";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import firebaseApp from "@/libs/firebase";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/variants";
import SelectionInput from "../components/Inputs/Selection";
import CountrySelection from "../components/Inputs/CountrySelection";
import FieldOfStudySelection from "../components/Inputs/FieldSelection";
import axios from "axios";
import { useRouter } from "next/navigation";
import { CurrentUser } from "../components/NavgationBar/UserMenu";

// Define an interface for the uploaded images
interface UploadedImage {
  image: string;
}

// Function to handle image uploads
export const handleImageUpload = async (
  images: File | File[]
): Promise<UploadedImage[]> => {
  const uploadedImages: UploadedImage[] = []; // Store uploaded image URLs

  const imagesArray = Array.isArray(images) ? images : [images];

  for (const item of imagesArray) {
    const fileName = new Date().getTime() + "-" + item.name; // Using item.name directly
    const storage = getStorage(firebaseApp);
    const storageRef = ref(storage, `documents/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, item);

    await new Promise<void>((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.error(error);
          reject(error);
          toast.error("Something went wrong please try again later!");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              uploadedImages.push({ image: downloadURL });
              console.log("File available at", downloadURL);
              resolve();
            })
            .catch((error) => {
              reject(error);
            });
        }
      );
    });
  }

  return uploadedImages; // Return the uploaded images
};
interface ApplicatioFormProps {
  currentUser: CurrentUser | null;
}
const ApplicationForm: React.FC<ApplicatioFormProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFormSubmited, setIsFormSubmited] = useState(false);
  const [passportFile, setPassportFile] = useState<File | null>(null);
  const [idFile, setIdFile] = useState<File | null>(null);
  const [educationFiles, setEducationFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    getValues,
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      destination: "",
      type: "",
      field: "",
      status: "pending",
      passportImage: "",
      birthCerteficateImage: "",
      educationalBackground: [],
    },
  });

  const applyType = watch("type");
  const router = useRouter();

  useEffect(() => {
    if (isFormSubmited) {
      reset();
      router.refresh();
      setIsFormSubmited(false);
    }
  }, [isFormSubmited]);

  const onsubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    setIsLoading(true);
    toast("Submitting your application. please wait...");

    if (!passportFile || !idFile || educationFiles.length === 0) {
      setIsLoading(false);
      return toast.error("All documents are required!");
    }

    try {
      await handleAllImageUploads();
      const formData = getValues();
      await axios.post("/api/application", formData);
      toast.success("Application Submitted!");
      setIsFormSubmited(true);
      console.log(formData);
    } catch (error) {
      toast.error("Submission failed. Try again.");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAllImageUploads = async () => {
    const uploadedImages: {
      passport: UploadedImage[];
      id: UploadedImage[];
      education: UploadedImage[];
    } = {
      passport: [],
      id: [],
      education: [],
    };

    try {
      if (passportFile) {
        uploadedImages.passport = await handleImageUpload(passportFile);
        setValue("passportImage", uploadedImages.passport[0].image);
      }

      if (idFile) {
        uploadedImages.id = await handleImageUpload(idFile);
        setValue("birthCerteficateImage", uploadedImages.id[0].image);
      }

      if (educationFiles.length > 0) {
        uploadedImages.education = await handleImageUpload(educationFiles);
        setValue(
          "educationalBackground",
          uploadedImages.education.map((img) => img.image)
        );
      }

      console.log("Uploaded images:", uploadedImages);
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Failed to upload some images.");
    }
  };
  useEffect(() => {
    if (!currentUser) {
      router.push("/register");
      router.refresh();
    }
    if (!currentUser?.active) {
      router.push("/register");
      router.refresh();
    }
  }, [currentUser, router]);

  if (!currentUser?.active) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-center text-lg font-bold text-red-600 bg-white p-8 rounded-lg shadow-lg">
          You have to activate your account first. Redirecting...
        </p>
      </div>
    );
  }
  return (
    <>
      <motion.div
        variants={fadeIn("left", 0.05)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.7 }}
        className="flex items-center gap-4 p-5 justify-center"
      >
        <span className="bg-blue-600 w-[50px] h-[50px] md:w-[60px] md:h-[60px]  justify-center items-center rounded-full shadow-lg transition-transform transform hover:scale-110 flex">
          <FaPlay size={24} className="text-white" />
        </span>
        <h1 className="text-3xl md:text-6xl font-bold text-center text-gray-800">
          Apply Now
        </h1>
      </motion.div>
      <motion.div
        variants={fadeIn("right", 0.05)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.7 }}
      >
        <p className="p-5 text-sm md:text-base text-gray-700 text-center">
          Welcome to the application process! We’re excited to help you achieve
          your educational goals. Please complete the form below to provide us
          with your personal details and needs. Our team will review your
          application and reach out to discuss the next steps. Thank you for
          choosing [Your Company Name]; we look forward to supporting you on
          your educational journey!
        </p>
      </motion.div>
      <div className="flex flex-col md:flex-row gap-6 justify-center p-5">
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <Input
            id="fullName"
            label="Full Name"
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
          <Input
            id="phoneNumber"
            label="Phone Number"
            disabled={isLoading}
            register={register}
            errors={errors}
            type="tel"
            required
          />
          <CountrySelection
            id="destination"
            label="Destination Country"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />

          <SelectionInput
            id="type"
            label="Apply For "
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          {applyType === "scholarship" && (
            <>
              {/* <Input
            id="nationality"
            label="Nationality"
            disabled={isLoading}
            register={register}
            errors={errors}
            type="text"
            required
          /> */}

              <FieldOfStudySelection
                id="field"
                label="Field Of Study"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
              />
            </>
          )}
        </div>
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <DocumentApply
            passportFile={passportFile}
            idFile={idFile}
            educationFiles={educationFiles}
            setPassportFile={setPassportFile}
            setEducationFiles={setEducationFiles}
            setIdFile={setIdFile}
          />
          {/* <TextArea
            id="message"
            label="Message"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          /> */}
        </div>
      </div>
      <motion.div
        variants={fadeIn("up", 0.05)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.7 }}
        className="max-w-[300px] mx-auto my-6"
      >
        <Button
          label={isLoading ? `Loading...` : `Submit`}
          onClick={handleSubmit(onsubmit)}
          disabled={isLoading}
        />
      </motion.div>
    </>
  );
};

export default ApplicationForm;
