import { ErrorMessage } from "@hookform/error-message";

import TextError from "./TextError";

function TextArea({
  label,
  name,
  typo,
  register,
  watch,
  justView,
  fieldJustView,
  className,
  errors,
  ifAvailable,
  ...rest
}) {
  return (
    <div className={`form-control h-full relative mb-5 ${className || ""}`}>
      <textarea
        type={typo}
        id={name}
        className="bg-transparent text-field-text-color pt-4"
        {...register?.(name)}
        {...rest}
        disabled={(justView || fieldJustView) && true}
      />
      <label
        htmlFor={name}
        className="absolute top-[35%] left-0 ml-2 px-2  cursor-text select-none placeHolderAnimationActive bg-page-bg-color"
      >
        {label}
      </label>

      {register?.name && (
        <ErrorMessage errors={errors} name={name} render={TextError} />
      )}
    </div>
  );
}

export default TextArea;
