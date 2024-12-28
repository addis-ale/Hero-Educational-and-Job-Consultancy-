import toast from "react-hot-toast";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import firebaseApp from "./firebase";
export const handleImageUpload = async (images: File | File[]) => {
  //toast("Submitting your Application, Please Wait...");
  const uploadedImages: { image: string }[] = []; // Store uploaded image URLs

  try {
    // Normalize the input to always be an array
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
            // Observe state change events such as progress, pause, and resume
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            console.error(error);
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
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

    // Return the uploaded images URLs
    return uploadedImages;
  } catch (error) {
    toast.error("Something went wrong", { id: "uploading error" });
    console.log(error);
    return []; // Return an empty array in case of an error
  }
};
