"use client";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaTrash } from "react-icons/fa"; // React Icons for the trash icon
interface DocumentApplyProps {
  passportFile: File | null; // To allow for the possibility that there might not be a file uploaded yet
  idFile: File | null;
  educationFiles: File[]; // Multiple files for educational background
  setPassportFile: (file: File | null) => void; // Setter function for passport file
  setIdFile: (file: File | null) => void; // Setter function for ID file
  setEducationFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const DocumentApply: React.FC<DocumentApplyProps> = ({
  passportFile,
  idFile,
  educationFiles,
  setEducationFiles,
  setPassportFile,
  setIdFile,
}) => {
  const [showPassportImage, setShowPassportImage] = useState(false);
  const [showIDImage, setShowIDImage] = useState(false);
  const [showEducationImages, setShowEducationImages] = useState(false);

  // Cleanup URLs for previews
  useEffect(() => {
    return () => {
      if (passportFile) URL.revokeObjectURL(URL.createObjectURL(passportFile));
      if (idFile) URL.revokeObjectURL(URL.createObjectURL(idFile));
      educationFiles.forEach((file) =>
        URL.revokeObjectURL(URL.createObjectURL(file))
      );
    };
  }, [passportFile, idFile, educationFiles]);

  // Handler for Passport Photo upload
  const onDropPassport = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setPassportFile(acceptedFiles[0]);
      setShowPassportImage(false); // Initially show the "Preview" text
    }
  }, []);

  // Handler for Proof of ID Photo upload
  const onDropID = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setIdFile(acceptedFiles[0]);
      setShowIDImage(false);
    }
  }, []);

  // Handler for Educational Background upload (multiple files)
  const onDropEducation = useCallback((acceptedFiles: File[]) => {
    setEducationFiles((prevFiles: File[]) => [...prevFiles, ...acceptedFiles]);
    setShowEducationImages(false);
  }, []);

  // Dropzone for Passport Photo
  const {
    getRootProps: getRootPropsPassport,
    getInputProps: getInputPropsPassport,
    isDragActive: isDragActivePassport,
    open: openPassportDialog, // Open file dialog manually
  } = useDropzone({
    onDrop: onDropPassport,
    accept: { "image/*": [] }, // Accept all image types
    multiple: false, // Only allow one file
  });

  // Dropzone for Proof of ID Photo
  const {
    getRootProps: getRootPropsID,
    getInputProps: getInputPropsID,
    isDragActive: isDragActiveID,
    open: openIDDialog,
  } = useDropzone({
    onDrop: onDropID,
    accept: { "image/*": [] },
    multiple: false,
  });

  // Dropzone for Educational Background (multiple files)
  const {
    getRootProps: getRootPropsEducation,
    getInputProps: getInputPropsEducation,
    isDragActive: isDragActiveEducation,
    open: openEducationDialog,
  } = useDropzone({
    onDrop: onDropEducation,
    accept: { "image/*": [] },
    multiple: true,
  });

  // Helper function to render image previews with trash icon
  const renderImagePreview = (
    file: File | null,
    isVisible: boolean,
    toggle: () => void,
    deleteImage: () => void // Function to delete image
  ) => {
    if (!file || !isVisible) return null;
    const previewUrl = URL.createObjectURL(file);
    return (
      <div className="relative">
        <div
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation(); // Prevent opening file dialog
            toggle();
          }}
        >
          <Image
            src={previewUrl}
            alt="preview"
            className="w-full h-full object-cover"
            width={100}
            height={100}
          />
        </div>
        <FaTrash
          className="absolute top-1 right-1 text-red-500 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation(); // Prevent opening file dialog
            deleteImage();
          }}
        />
      </div>
    );
  };

  // Helper function to render multiple image previews (for educational background)
  const renderMultipleImagePreviews = (
    files: File[],
    isVisible: boolean,
    deleteImage: (index: number) => void // Function to delete image
  ) => {
    if (!isVisible) return null;
    return files.map((file, index) => {
      const previewUrl = URL.createObjectURL(file);
      return (
        <div key={index} className="relative">
          <div
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation(); // Prevent opening file dialog
              setShowEducationImages(!showEducationImages);
            }}
          >
            <Image
              src={previewUrl}
              alt={`education-file-${index}`}
              className="w-24 h-24 object-cover rounded-lg mr-2"
              width={100}
              height={100}
            />
          </div>
          <FaTrash
            className="absolute top-1 right-1 text-red-500 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation(); // Prevent opening file dialog
              deleteImage(index);
            }}
          />
        </div>
      );
    });
  };

  // Handler to delete passport photo
  const deletePassportPhoto = () => setPassportFile(null);

  // Handler to delete ID photo
  const deleteIDPhoto = () => setIdFile(null);

  // Handler to delete education files
  const deleteEducationFile = (index: number) => {
    setEducationFiles((prevFiles) =>
      prevFiles.filter((_, fileIndex) => fileIndex !== index)
    );
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Passport Photo Dropzone */}
      <div
        {...getRootPropsPassport()}
        className={`border-2 p-2 border-dashed cursor-pointer rounded-lg text-sm font-normal text-slate-400 flex items-center justify-center ${
          isDragActivePassport ? "border-blue-500" : "border-slate-400"
        }`}
        style={{
          height: passportFile
            ? showPassportImage
              ? "300px"
              : "100px"
            : "100px",
          width: "full",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <input {...getInputPropsPassport()} className="hidden" />
        {passportFile ? (
          showPassportImage ? (
            <div className="w-full h-full">
              {renderImagePreview(
                passportFile,
                showPassportImage,
                () => setShowPassportImage(false),
                deletePassportPhoto
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <p
                onClick={(e) => {
                  e.stopPropagation(); // Prevent opening file dialog
                  setShowPassportImage(true);
                }}
              >
                Click to Preview Passport Photo
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent opening file dialog
                  openPassportDialog();
                }}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Replace Passport Photo
              </button>
            </div>
          )
        ) : (
          <p>+ Passport Photo</p>
        )}
      </div>

      {/* Proof of ID Photo Dropzone */}
      <div
        {...getRootPropsID()}
        className={`border-2 p-2 border-dashed cursor-pointer rounded-lg text-sm font-normal text-slate-400 flex items-center justify-center ${
          isDragActiveID ? "border-blue-500" : "border-slate-400"
        }`}
        style={{
          height: idFile ? (showIDImage ? "300px" : "100px") : "100px",
          width: "full",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <input {...getInputPropsID()} className="hidden" />
        {idFile ? (
          showIDImage ? (
            <div className="w-full h-full">
              {renderImagePreview(
                idFile,
                showIDImage,
                () => setShowIDImage(false),
                deleteIDPhoto
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <p
                onClick={(e) => {
                  e.stopPropagation(); // Prevent opening file dialog
                  setShowIDImage(true);
                }}
              >
                Click to Preview ID Photo
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent opening file dialog
                  openIDDialog();
                }}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Replace Birth Certificate Photo
              </button>
            </div>
          )
        ) : (
          <p>+ Birth Certificate Photo</p>
        )}
      </div>
      {/* Educational Background Dropzone (multiple files) */}
      <div
        {...getRootPropsEducation()}
        className={`border-2 p-2 border-dashed cursor-pointer rounded-lg text-sm font-normal text-slate-400 flex items-center justify-center ${
          isDragActiveEducation ? "border-blue-500" : "border-slate-400"
        }`}
        style={{
          minHeight:
            educationFiles.length > 0
              ? showEducationImages
                ? "300px"
                : "100px"
              : "100px",
          width: "full",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <input {...getInputPropsEducation()} className="hidden" />
        {educationFiles.length > 0 ? (
          showEducationImages ? (
            <div className="w-full flex flex-wrap">
              {renderMultipleImagePreviews(
                educationFiles,
                showEducationImages,
                deleteEducationFile // Pass the delete function here
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <p
                onClick={(e) => {
                  e.stopPropagation(); // Prevent opening file dialog
                  setShowEducationImages(true);
                }}
              >
                Click to Preview Educational Images
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent opening file dialog
                  openEducationDialog();
                }}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Add More Educational Images
              </button>
            </div>
          )
        ) : (
          <p>+ Educational Background Images</p>
        )}
      </div>
    </div>
  );
};
export default DocumentApply;
