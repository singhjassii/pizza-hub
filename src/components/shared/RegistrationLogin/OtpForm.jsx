import { otpVerificationSubmitHandler } from "@/app/serverActions";
import otpConfig from "@/constants/userLogin/otpConfig";
import HookFormContainer from "../Form/HookFormContainer";

function OtpForm({ otpEmail }) {
  return (
    <>
      <h2 className="text-xl font-medium text-black">OTP sent successfully</h2>
      <p>
        To&nbsp;
        {otpEmail}
      </p>
      <div className="w-full">
        <HookFormContainer
          formConfig={otpConfig}
          submitHandler={otpVerificationSubmitHandler}
          gridClass="grid gap-5 mb-5"
          otpEmail={otpEmail}
          message="Logged in successfully"
          submitButtonText="Sign In"
        />
      </div>
    </>
  );
}

export default OtpForm;
