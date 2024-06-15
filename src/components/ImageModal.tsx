import { IoMdClose } from "react-icons/io";
interface ImageModalProps {
  imageUrl: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70">
      <div className="max-w-3/4 max-h-3/4">
        <img src={imageUrl} alt="Modal" className="w-full h-auto" />
        <button
          onClick={onClose}
          className="absolute top-0 right-0 m-4 text-white bg-red-500 text-xl"
        >
          <IoMdClose size={50} />
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
