import React from "react";

import { useFieldArray } from "react-hook-form";

import HookFormControl from "./HookFormControl";

function InputArrayContainer({
  fields,
  watch,
  label,
  register,
  className,
  name,
  justView,
  formControl,
  setValue,
  errors,
}) {
  const {
    fields: inputArrayFields,
    append,
    remove,
  } = useFieldArray({
    control: formControl,
    name,
  });
  const newSectionValue = fields.reduce(
    (acc, field) => ({ ...acc, [field.name]: field.value }),
    {}
  );

  return (
    <div
      className={`grid gap-10 !p-10 relative inputArrayContainer  ${className || ""}`}
    >
      <label className="absolute top-[35%] !text-[18px] left-0 ml-2 px-2 cursor-text select-none placeHolderAnimationActive bg-page-bg-color">
        {label}
      </label>
      {name !== "attachedUsers" && (
        <div className="col-span-full">
          <div className="flex justify-end">
            <div>
              <button
                type="button"
                className="saveBtn px-4 py-3  flex items-center rounded-md transition-all border-[2px] border-icon-fill-color text-icon-fill-color font-medium"
                onClick={() => append(newSectionValue)}
              >
                <div className="">Add</div>
              </button>
            </div>
          </div>
        </div>
      )}
      {inputArrayFields.map((sectionIntialValue, index) => {
        return (
          <React.Fragment key={sectionIntialValue.id}>
            {fields.map((field) => (
              <HookFormControl
                isAninputArrayField
                setValue={setValue}
                key={field.name}
                watch={watch}
                register={register}
                errors={errors}
                typo={field?.type}
                control={field.control}
                ifAvailable={field.ifAvailable}
                options={field?.options}
                label={field.label}
                justView={justView}
                fields={field?.fields}
                name={`${name}.${index}.${field.name}`}
                index={index}
                className={field?.className}
              />
            ))}
            {!justView && (
              <div className="col-span-full">
                <hr />
              </div>
            )}
            {name !== "attachedUsers" && (
              <div className="col-span-full">
                <div className="flex justify-end gap-4">
                  <div>
                    <button
                      type="button"
                      className="saveBtn px-4 py-3  flex items-center rounded-md transition-all border-[2px] border-icon-fill-color text-icon-fill-color font-medium"
                      onClick={() => append(newSectionValue)}
                    >
                      <div className="">Add</div>
                    </button>
                  </div>
                  <div className="">
                    <button
                      type="button"
                      className="deleteBtn  px-4 py-3 flex items-center  rounded-md transition-all border-[2px] border-red-500 text-red-500 font-medium"
                      onClick={() => remove(index)}
                    >
                      <div className="">Delete</div>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default InputArrayContainer;
