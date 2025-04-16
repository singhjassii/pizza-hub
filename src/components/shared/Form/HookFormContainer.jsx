"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import createYupSchema from "@/utils/createYupSchema";

// import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "next/form";

import { useRouter } from "next/navigation";
import { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { DeleteIcon, SaveIcon, SyncIcon } from "../../../Icons/indexIcon";
import LoginSubmitBtn from "../../modules/Login/LoginSubmitBtn";
import ResetSubmitBtn from "../../modules/Reset/ResetSubmitBtn";
import HookFormControl from "./HookFormControl";
import SubmitSuccessfulConfirmation from "./SubmitSuccessfulConfirmation";
import SubmitUnsucessful from "./SubmitUnsucessful";

function HookFromContainer({
  formConfig,
  gridClass,
  submitHandler,
  resetPassword,
  login,
  justView,
  invoiceSearch,
  message,
  redirectPath,
  submitButtonText,
  setSignInType,
  setOtpEmail,
  otpEmail,
}) {
  const router = useRouter();
  const [finalFormConfig] = useState(formConfig);
  const [
    showSubmitSuccessfulConfirmation,
    setShowSubmitSuccessfulConfirmation,
  ] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [formReseted, setFormReseted] = useState(false);
  const [
    showSubmitUnsuccessfulConfirmation,
    setShowSubmitUnsuccessfulConfirmation,
  ] = useState(false);
  const initialValues = {};
  finalFormConfig.forEach((item) => {
    initialValues[item.name] = item.value || "";
  });
  const yepSchema = finalFormConfig.reduce(createYupSchema, {});
  const validationSchema = Yup.object().shape(yepSchema);

  const form = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
    mode: "onBlur",
    // reValidateMode: true,
  });
  const {
    handleSubmit,
    register,
    formState,
    reset,
    watch,
    setValue,
    control: formControl,
  } = form;
  const { errors, isSubmitSuccessful, isSubmitting } = formState;
  const onSubmit = async (data) => {
    const res = await submitHandler(data, setOtpEmail, otpEmail);
    if (res?.error) {
      setErrorMessage(res.error.message); // show this under the form
    }
    if (res === "OTP sent successfully") {
      setSignInType("otp");
      setOtpEmail(data.email);
    }
    if (res?.token) {
      localStorage.setItem("userLoggedInToken", JSON.stringify(res.token));
      window.location.reload();
    }
    if (res === "Login Successfully") {
      localStorage.setItem(
        "adminCredentials",
        JSON.stringify({
          email: data.email,
          password: data.password,
        })
      );
      router.replace("/dashboard");
    }
  };
  useEffect(() => {
    if (!isSubmitSuccessful) {
      return;
    } // Ensure effect only runs when submission is successful
    if (!message?.includes("updated")) {
      reset();
      setFormReseted(true);
    }

    if (errorMessage) {
      setShowSubmitSuccessfulConfirmation(false);
      setShowSubmitUnsuccessfulConfirmation(true);
    } else {
      setShowSubmitSuccessfulConfirmation(true);
      setShowSubmitUnsuccessfulConfirmation(false);
      redirectPath && router.push(redirectPath);
    }
    // Store timeout ID
  }, [isSubmitSuccessful, message, errorMessage]);
  useEffect(() => {
    if (formReseted) {
      const timer = setTimeout(() => {
        setShowSubmitSuccessfulConfirmation(false);
        setShowSubmitUnsuccessfulConfirmation(false);
        setErrorMessage(null);
        setFormReseted(false);
      }, 3000);

      // Cleanup function
      return () => {
        clearTimeout(timer);
      };
    }
  }, [formReseted]);
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/* <DevTool control={formControl} placement="top-left" /> */}
      <div className={gridClass}>
        {showSubmitSuccessfulConfirmation &&
          !showSubmitUnsuccessfulConfirmation &&
          message && <SubmitSuccessfulConfirmation message={message} />}
        {showSubmitUnsuccessfulConfirmation && errorMessage && (
          <SubmitUnsucessful errorMessage={errorMessage} />
        )}
        {finalFormConfig.map((field) => (
          <HookFormControl
            setValue={setValue}
            watch={watch}
            register={register}
            errors={errors}
            key={field.name}
            typo={field?.type}
            control={field.control}
            ismultiple={field?.isMultiple}
            accept={field?.accept}
            options={field?.options}
            // justView={justView}
            // fieldJustView={field?.fieldJustView}
            // ifAvailable={field?.ifAvailable}
            label={field.label}
            fields={field?.fields}
            name={field.name}
            formControl={formControl}
            className={field?.className}
          />
        ))}
      </div>
      {!login && !submitButtonText ? (
        !justView && (
          <div
            className={`flex ${
              invoiceSearch ? "justify-center" : "justify-end"
            } my-10`}
          >
            <div>
              <button
                type="button"
                disabled={isSubmitting}
                className="deleteBtn mr-3 px-4 py-3 flex items-center  rounded-md transition-all border-[2px] border-red-500 text-red-500 font-medium"
                onClick={() => {
                  reset();
                }}
              >
                <div className="deleteIcon text-[20px] mr-2">
                  <DeleteIcon />
                </div>
                <div className="">Delete</div>
              </button>
            </div>
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="saveBtn px-4 py-3 flex items-center rounded-md transition-all border-[2px] border-icon-fill-color text-icon-fill-color font-medium"
              >
                <div
                  className={`saveIcon text-[20px] mr-2 ${
                    isSubmitting && "animate-spin"
                  }`}
                >
                  {!isSubmitting ? <SaveIcon /> : <SyncIcon />}
                </div>
                <div className="">Save</div>
              </button>
            </div>
          </div>
        )
      ) : resetPassword ? (
        <ResetSubmitBtn />
      ) : (
        <LoginSubmitBtn
          getLoginInfo={submitHandler}
          isSubmitting={isSubmitting}
          submitButtonText={submitButtonText}
        />
      )}
    </Form>
  );
}

export default memo(HookFromContainer);
