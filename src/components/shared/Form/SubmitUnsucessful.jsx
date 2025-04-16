import CancelIcon from "../../../Icons/CancelIcon";

const SubmitUnsucessful = ({ errorMessage }) => {
  return (
    <div className="w-full bg-nav-header-bg py-3 px-5 flex flex-row items-center rounded-[5px]">
      <div className="text-lg text-red-500 p-2  bg-main-bg-color">
        <CancelIcon />
      </div>
      <p className="ml-2 capitalize text-field-text-color">{errorMessage}</p>
    </div>
  );
};

export default SubmitUnsucessful;
