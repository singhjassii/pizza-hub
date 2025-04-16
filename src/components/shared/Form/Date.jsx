import { ErrorMessage } from "@hookform/error-message";

import TextError from "./TextError";

function Datee({
  label,
  name,
  watch,
  errors,
  setValue,
  className,
  register,
  ...rest
}) {
  return (
    <div className={`form-control h-full relative mb-5 ${className || ""}`}>
      <input
        type="date"
        className="bg-transparent text-field-text-color"
        name={name}
        id={name}
        {...register(name)}
        {...rest}
        disabled={name === "expiryDate"}
      />
      <label
        htmlFor={name}
        className="absolute top-[35%] left-0 ml-2 px-2  cursor-text select-none placeHolderAnimationActive bg-page-bg-color"
      >
        {label}
      </label>
      <ErrorMessage errors={errors} name={name} render={TextError} />
    </div>
  );
}

export default Datee;
