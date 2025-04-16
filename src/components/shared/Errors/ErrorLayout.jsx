import Image from "next/image";

function ErrorLayout({ message, fullPage }) {
  return (
    <div className="flex flex-col gap-3 items-center justify-center w-full">
      <Image
        src="/errorImage.png"
        alt="error"
        className="w-[40%] object-contain"
        width={500}
        height={500}
        priority
      />
      <p className="text-red-700 text-xl dark:text-red-500 font-medium">
        ⚠️
        {message}
        ⚠️
      </p>
      <div className="flex-row flex gap-2">
        <button
          type="button"
          className="bg-black dark:bg-white group px-6 py-2 mt-3 border-black border-2 outline-2 rounded-md cursor-pointer hover:bg-white transition-all "
          onClick={() => location.reload()}
        >
          <p className="text-white dark:text-black group-hover:text-black">
            Reload
          </p>
        </button>
        {fullPage && (
          <button
            type="reset"
            className="bg-black dark:bg-white group px-6 py-2 mt-3 border-black border-2 outline-2 rounded-md cursor-pointer hover:bg-white transition-all "
          >
            <p className="text-white dark:text-black group-hover:text-black">
              Log In Again
            </p>
          </button>
        )}
      </div>
    </div>
  );
}

export default ErrorLayout;
