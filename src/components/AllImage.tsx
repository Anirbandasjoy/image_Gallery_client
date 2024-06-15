import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import ImageModal from "./ImageModal";
import { IoMdClose } from "react-icons/io";
import { AuthContext } from "../contex/AuthProvider";
import { AuthContextType } from "../helper/type";
interface Image {
  id: number;
  image_url: string;
  email: string;
}

const AllImage: React.FC<{ onImageUploaded: () => void }> = ({
  onImageUploaded,
}) => {
  const [images, setImages] = useState<Image[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [filteredImages, setFilteredImages] = useState<Image[]>([]);

  const { user } = useContext(AuthContext as React.Context<AuthContextType>);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get<Image[]>(
          "http://localhost:5000/images"
        );
        setImages(response.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [onImageUploaded]);

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const deleteImage = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/images/${id}`);
      setImages(images.filter((image) => image.id !== id));
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  useEffect(() => {
    const filterData = images?.filter((image) => image?.email === user?.email);
    setFilteredImages(filterData);
  }, [user?.email, images]);

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
        {filteredImages?.map((image) => (
          <div key={image.id} className="relative">
            <div
              className="overflow-hidden cursor-pointer bg-cover rounded-lg shadow-lg"
              onClick={() => openModal(image.image_url)}
            >
              <img
                src={image.image_url}
                alt={`Image ${image.id}`}
                className="w-full h-full"
              />
            </div>
            <button
              onClick={() => deleteImage(image.id)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2 cursor-pointer"
            >
              <IoMdClose />
            </button>
          </div>
        ))}
      </div>
      {selectedImage && (
        <ImageModal imageUrl={selectedImage} onClose={closeModal} />
      )}
    </div>
  );
};

export default AllImage;
