import { ErrorMessage } from "@hookform/error-message";
import TextError from "./TextError";

function Input({
  label,
  name,
  typo,
  register,
  justView,
  fieldJustView,
  watch,
  className,
  ifAvailable,
  errors,
  ...rest
}) {
  return (
    <div
      className={`form-control h-full relative mb-5 ${className || ""} ${ifAvailable && !watch(name) && "hidden"}`}
    >
      <input
        type={typo}
        id={name}
        className="bg-transparent text-field-text-color"
        {...rest}
        {...register?.(name)}
        disabled={(justView || fieldJustView) && true}
      />
      <label
        htmlFor={name}
        className={`absolute top-[27%] left-0 ml-2 px-2 text-[#697177] cursor-text select-none ${
          watch(name) !== "" &&
          "placeHolderAnimationActive text-[#0072f5] bg-page-bg-color"
        }`}
      >
        {label}
      </label>

      {register?.(name) && (
        <ErrorMessage errors={errors} name={name} render={TextError} />
      )}
    </div>
  );
}

export default Input;
