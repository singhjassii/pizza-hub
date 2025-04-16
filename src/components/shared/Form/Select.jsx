import { ErrorMessage } from "@hookform/error-message";

import TextError from "./TextError";

function Select({
  name,
  options,
  errors,
  watch,
  justView,
  fieldJustView,
  className,
  register,
  ifAvailable,
  ...rest
}) {
  return (
    <div className={`form-control h-full relative mb-5 ${className || ""}`}>
      <select
        id={name}
        name={name}
        {...register(name)}
        {...rest}
        disabled={(justView || fieldJustView) && true}
        className="bg-page-bg-color text-field-text-color"
      >
        {options.map((option) => (
          <option key={option.key} value={option.key} className="capitalize">
            {option.value}
          </option>
        ))}
      </select>

      <ErrorMessage errors={errors} name={name} render={TextError} />
    </div>
  );
}

export default Select;
