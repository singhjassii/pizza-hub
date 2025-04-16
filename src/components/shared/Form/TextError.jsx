import { ExclamationMarkIcon } from "../../../Icons/indexIcon";

function TextError({ message }) {
  return (
    <div className="absolute flex items-center -bottom-7 textError select-none">
      <div className="text-md">
        <ExclamationMarkIcon />
      </div>
      <div className="ml-2 text-sm">{message}</div>
    </div>
  );
}

export default TextError;
