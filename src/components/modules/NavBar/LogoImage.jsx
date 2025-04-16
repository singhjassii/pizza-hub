"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

function LogoImage() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // ensures this code only runs on the client
  }, []);

  if (!mounted) {
    return (
      <Image
        src="/logo-dark.png"
        height={40}
        width={240}
        alt="pizza-hub-logo"
        priority
      />
    );
  }
  return (
    <>
      <Image
        src="/logo-dark.png"
        height={40}
        width={240}
        alt="pizza-hub-logo"
        priority
        className={`${resolvedTheme !== "dark" && "hidden"}`}
      />
      <Image
        src="/logo.png"
        height={40}
        width={240}
        alt="pizza-hub-logo"
        priority
        className={`${resolvedTheme === "dark" && "hidden"}`}
      />
    </>
  );
}

export default LogoImage;
