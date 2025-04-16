import { ErrorMessage } from "@hookform/error-message";

import Image from "next/image";

import { useEffect, useState } from "react";

import { UploadCloudIcon } from "../../../Icons/indexIcon";
import TextError from "./TextError";

function File({
  label,
  name,
  watch,
  typo,
  register,
  setValue,
  errors,
  ...rest
}) {
  const [imagePreview, setImagePreview] = useState(false);
  const convert2base64 = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result.toString());
    };
    reader.readAsDataURL(file);
  };
  useEffect(() => {
    if (watch(name)[0]) {
      if (typeof watch(name)[0] === "object") {
        convert2base64(watch(name)[0]);
      } else {
        setImagePreview(watch(name));
      }
    } else {
      setImagePreview(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch(name)]);

  return (
    <>
      <div className="form-control relative h-full mb-5">
        <input
          type={typo}
          accept="image/*"
          id={name}
          {...rest}
          {...register(name)}
        />
        <label
          htmlFor={name}
          className="fileLabel flex items-center w-full cursor-pointer"
        >
          <p className="absolute -top-[10px] text-[13px] bg- font-[600] left-0 ml-2 px-2 text-active-color bg-page-bg-color">
            {label}
          </p>
          <div className="text-[20px] text-[#697177]">
            <UploadCloudIcon />
          </div>
          <p
            className={`text-[15px] ml-2 ${watch(name)[0] ? "normal-case text-field-text-color" : "capitalize text-[#697177]"}`}
          >
            {watch(name)[0]
              ? watch(name)[0]?.name
              : `upload your ${label} here `}
          </p>
        </label>
        <ErrorMessage errors={errors} name={name} render={TextError} />
      </div>
      {imagePreview && (
        <div className="w-32 h-32 bg-transparent filePreviewContainer">
          <Image
            src={imagePreview}
            alt="preview"
            height={128}
            width={128}
            className="h-full w-full object-cover"
          />
        </div>
      )}
    </>
  );
}

export default File;
