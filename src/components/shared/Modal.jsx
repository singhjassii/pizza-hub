// File: components/shared/Modal.js

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-5 flex justify-center items-center ">
      <div className="bg-[#1D1B1D]  p-6 rounded-lg shadow-lg relative max-h-[80vh] overflow-y-auto mt-11 z-50 lg:mx-20">
        <button
          type="button"
          className="absolute top-2 right-2 text-sm dark:bg-red-600 dark:hover:bg-red-500 border border-black px-2 py-1 rounded-md font-semibold  dark:text-white"
          onClick={onClose}
        >
          x
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
