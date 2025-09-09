import { X } from "lucide-react";

interface ModalImageProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt?: string;
}

export function ModalImage({
  isOpen,
  onClose,
  imageSrc,
  imageAlt = "Imagen",
}: ModalImageProps) {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl max-h-full p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors"
        >
          <X size={20} />
        </button>

        <img
          src={imageSrc}
          alt={imageAlt}
          className="max-w-full max-h-screen object-contain rounded-lg scale-150"
        />
      </div>
    </div>
  );
}
