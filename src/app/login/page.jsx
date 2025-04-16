import HookFormContainer from "@/components/shared/Form/HookFormContainer";
import LoginAndResetWrapper from "@/components/shared/LoginAndResetWrapper";
import loginConfig from "@/constants/login/loginConfig";
import { isAdmin } from "@/controllers/admin.controller";

function Login() {
  const submitHandler = async (values) => {
    "use server";
    try {
      const res = await isAdmin({ body: values });
      if (res) {
        return "Login Successfully";
      }
    } catch (error) {
      console.error("error occured during logging user", error);
      return { error };
    }
  };
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
  const ADMIN_PASS = process.env.ADMIN_PASS;
  return (
    <LoginAndResetWrapper ADMIN_EMAIL={ADMIN_EMAIL} ADMIN_PASS={ADMIN_PASS}>
      <p className="font-normal text-[2.5rem] text-nav-items-text">Sign in</p>
      <HookFormContainer
        formConfig={loginConfig}
        gridClass="grid gap-8"
        login
        submitHandler={submitHandler}
        message="Logged In"
      />
    </LoginAndResetWrapper>
  );
}

export default Login;
