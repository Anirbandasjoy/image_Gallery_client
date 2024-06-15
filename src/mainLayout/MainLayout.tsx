import React, { useRef, ChangeEvent, useState, useContext } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";
import { uploadImage } from "../api";
import AllImage from "../components/AllImage";
import { AuthContext } from "../contex/AuthProvider";
import { AuthContextType } from "../helper/type";
import { useNavigate } from "react-router-dom";

const MainLayout: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user, logOut } = useContext(
    AuthContext as React.Context<AuthContextType>
  );
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await logOut();
    alert("logOut successfully");
    navigate("/login");
  };
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const imageUrl = URL.createObjectURL(file);
        setImageUrl(imageUrl);
        setLoading(true);
        const imageURL = await uploadImage(file);
        await axios.post("http://localhost:5000/images", {
          imageUrl: imageURL,
          email: user?.email,
        });

        console.log("Image URL uploaded to backend successfully");
        setImageUrl(null);
        alert("uploaded Image");
      } catch (error) {
        console.error("Error uploading image URL to backend:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    }
  };

  const handleImageUploaded = () => {
    console.log("Image uploaded, refetching images...");
  };

  return (
    <div>
      <div className="bg-gray-200 border border-gray-400 mt-2 w-[95%] mx-auto py-20">
        <div className="flex flex-col justify-center items-center">
          <div className="mb-2">
            {loading ? (
              <div>Loading...</div>
            ) : (
              imageUrl && (
                <div className="border border-gray-400 inline-block rounded-sm bg-red-500">
                  <img src={imageUrl} alt="Uploaded" className="mt-4 w-40" />
                </div>
              )
            )}
          </div>
          <div className="flex justify-center items-center space-x-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center"
              onClick={handleButtonClick}
            >
              <FaCloudUploadAlt className="h-6 w-6 mr-2" />
              Upload Image
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>
      </div>
      <div className="my-10">
        <div className="flex justify-between items-center ">
          <h1></h1>
          <h1 className="text-center mb-8 text-2xl font-bold text-blue-400">
            Image Gallery
          </h1>
          <div
            className=" px-3 py-2 rounded-sm text-center mb-8 text-sm bg-red-400 text-gray-600 font-bold mr-10"
            onClick={handleLogOut}
          >
            <button>LogOut</button>
          </div>
        </div>
        <AllImage onImageUploaded={handleImageUploaded} />
      </div>
    </div>
  );
};

export default MainLayout;
