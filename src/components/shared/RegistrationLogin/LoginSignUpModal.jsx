import { useState } from "react";
import LoginForm from "./LoginForm";
import OtpForm from "./OtpForm";
import RegisterForm from "./RegisterForm";

function LoginSignUpModal() {
  const [signIntype, setSignInType] = useState("login");
  const [otpEmail, setOtpEmail] = useState(null);
  return (
    <div className="overlay-sidebar flex justify-center !z-50 items-center">
      <div className="px-10 py-5 bg-page-bg-color flex flex-col items-center gap-5 rounded-md w-[80%] sm:w-[60%] md:w-[40%] lg:w-[25%]">
        {signIntype === "register" ? (
          <RegisterForm
            setSignInType={setSignInType}
            setOtpEmail={setOtpEmail}
          />
        ) : signIntype === "otp" ? (
          <OtpForm otpEmail={otpEmail} />
        ) : (
          <LoginForm setSignInType={setSignInType} />
        )}
      </div>
    </div>
  );
}

export default LoginSignUpModal;
