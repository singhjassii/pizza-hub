import { loginUserSubmitHandler } from "@/app/serverActions";
import loginConfig from "@/constants/userLogin/loginConfig";
import HookFormContainer from "../Form/HookFormContainer";

function LoginForm({ setSignInType }) {
  return (
    <>
      <h2 className="text-xl font-medium text-black">Log In</h2>
      <div className="w-full">
        <HookFormContainer
          formConfig={loginConfig}
          submitHandler={loginUserSubmitHandler}
          gridClass="grid gap-5 mb-5"
          submitButtonText="Sign In"
          message="Logged In successfully"
        />
      </div>
      <p className="text-gray-500">OR</p>
      <button
        type="button"
        className="uppercase text-icon-fill-color cursor-pointer"
        onClick={() => setSignInType("register")}
      >
        Sign up instead
      </button>
    </>
  );
}

export default LoginForm;
