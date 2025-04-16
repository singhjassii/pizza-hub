import { signUpUserSubmitHandler } from "@/app/serverActions";
import signUpConfig from "@/constants/userLogin/signUpConfig";
import HookFormContainer from "../Form/HookFormContainer";

function RegisterForm({ setSignInType, setOtpEmail }) {
  return (
    <>
      <h2 className="text-xl font-medium text-black">Sign Up</h2>
      <div className="w-full">
        <HookFormContainer
          formConfig={signUpConfig}
          submitHandler={signUpUserSubmitHandler}
          setOtpEmail={setOtpEmail}
          setSignInType={setSignInType}
          gridClass="grid gap-10 mb-5"
          submitButtonText="Get Otp"
        />
      </div>
      <p className="text-gray-500">OR</p>
      <button
        type="button"
        className="uppercase text-icon-fill-color cursor-pointer"
        onClick={() => setSignInType("login")}
      >
        login instead
      </button>
    </>
  );
}

export default RegisterForm;
