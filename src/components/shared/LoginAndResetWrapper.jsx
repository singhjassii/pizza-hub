"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "./Loader";

function LoginAndResetWrapper({ children, ADMIN_EMAIL, ADMIN_PASS }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const adminCredentials = JSON.parse(
      localStorage.getItem("adminCredentials")
    );
    if (
      adminCredentials?.email === ADMIN_EMAIL &&
      adminCredentials?.password === ADMIN_PASS
    ) {
      router.replace("/dashboard");
      return;
    }
    setIsLoading(false);
  }, [router, ADMIN_EMAIL, ADMIN_PASS]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex h-screen">
          <div className="flex-1 flex flex-col ">
            <div className="p-5">
              <Image
                src="/logo.png"
                height={40}
                width={240}
                alt="pizza-hub-logo"
                priority
              />
            </div>
            <div className="flex-grow w-full items-center justify-center flex">
              <div className="w-[60%] flex flex-col gap-3">{children}</div>
            </div>
          </div>
          <div className="flex-1 hidden lg:flex">
            <Image
              alt="pizza-hub-login-banner"
              src="/loginBanner.png"
              className="object-cover h-full"
              width={5000}
              height={5000}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default LoginAndResetWrapper;
