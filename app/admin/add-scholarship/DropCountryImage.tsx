"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
//import { FaTrash } from "react-icons/fa"; // Trash icon from react-icons

interface DropCountryImageProps {
  imageUrl: File | string | null; // Allow string for existing image URLs
  setImageUrl: (file: File | null) => void;
  label: string; // Label for the upload field
}

const DropCountryImage: React.FC<DropCountryImageProps> = ({
  imageUrl,
  setImageUrl,
  label,
}) => {
  const [showImagePreview, setShowImagePreview] = useState(false);

  // Cleanup URLs for previews on component unmount or file change
  useEffect(() => {
    let previewUrl: string | undefined;
    if (imageUrl && typeof imageUrl !== "string") {
      previewUrl = URL.createObjectURL(imageUrl);
    }
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [imageUrl]);

  // Handler for image upload
  const onDropImage = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setImageUrl(acceptedFiles[0]);
        setShowImagePreview(false); // Hide preview initially
      }
    },
    [setImageUrl]
  );

  // Dropzone configuration
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    open: openFileDialog, // Manual file dialog open
  } = useDropzone({
    onDrop: onDropImage,
    accept: { "image/*": [] }, // Accept all image types
    multiple: false, // Allow only one image
  });

  // Handler to delete the uploaded image
  //const deleteImage = () => setImageUrl(null);

  // Render image preview with delete icon
  const renderImagePreview = () => {
    if (!imageUrl || !showImagePreview) return null;

    const previewUrl =
      typeof imageUrl === "string" ? imageUrl : URL.createObjectURL(imageUrl);

    return (
      <div className="relative">
        <div
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation(); // Prevent opening file dialog
            setShowImagePreview(false);
          }}
        >
          <Image
            src={previewUrl}
            alt={`${label} Preview`}
            className="w-full h-full object-cover"
            width={400}
            height={400}
          />
        </div>
        {/* <FaTrash
          aria-label={`Delete ${label}`}
          className="absolute top-1 right-1 text-red-500 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation(); // Prevent opening file dialog
            deleteImage();
          }}
        /> */}
      </div>
    );
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Image Upload Dropzone */}
      <div
        {...getRootProps()}
        className={`border-2 p-2 border-dashed cursor-pointer rounded-lg text-sm font-normal text-slate-400 flex items-center justify-center ${
          isDragActive ? "border-blue-500" : "border-slate-400"
        }`}
        style={{
          height: imageUrl ? (showImagePreview ? "300px" : "100px") : "100px",
          width: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <input {...getInputProps()} className="hidden" />
        {imageUrl ? (
          showImagePreview ? (
            renderImagePreview()
          ) : (
            <div className="flex flex-col items-center gap-4">
              <p
                onClick={(e) => {
                  e.stopPropagation(); // Prevent opening file dialog
                  setShowImagePreview(true);
                }}
                className="cursor-pointer"
              >
                Click to Preview {label}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent opening file dialog
                  openFileDialog();
                }}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Replace {label}
              </button>
            </div>
          )
        ) : (
          <p>+ {label}</p>
        )}
      </div>
    </div>
  );
};

export default DropCountryImage;
