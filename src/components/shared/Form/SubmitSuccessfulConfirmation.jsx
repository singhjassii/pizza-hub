import CheckIcon from "../../../Icons/CheckIcon";

function SubmitSuccessfulConfirmation({ message }) {
  return (
    <div className="w-full bg-nav-header-bg py-3 px-5 flex flex-row items-center rounded-[5px]">
      <div className="text-lg text-icon-fill-color p-2 border-2 border-icon-fill-color rounded-full bg-main-bg-color">
        <CheckIcon />
      </div>
      <p className="ml-2 capitalize text-field-text-color">{message}</p>
      <p></p>
    </div>
  );
}

export default SubmitSuccessfulConfirmation;
