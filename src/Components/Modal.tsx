import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import * as ReactDOM from "react-dom";

interface AddModalProps {
  title: string;
  isOpen?: boolean;
  setIsOpen: (value: boolean) => void;
  child: React.ReactNode;
  data?: any;
}

export const Modal: React.FC<AddModalProps> = ({ title, setIsOpen, child }) => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      {/* Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
      />

      {/* Modal */}
      <div
        className="fixed z-50 top-1/2 left-1/2 w-[95%] max-w-sm sm:max-w-md -translate-x-1/2 -translate-y-1/2
                   bg-white border border-gray-200 rounded-xl shadow-xl p-4 sm:p-6"
      >
        {/* Close Button */}
        <button
          title="Close"
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-black transition"
        >
          <AiOutlineClose size={20} />
        </button>

        {/* Title */}
        <div className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
          {title}
        </div>

        {/* Content */}
        <div>{child}</div>
      </div>
    </>,
    document.querySelector(".portalModalDiv") as HTMLDivElement
  );
};
