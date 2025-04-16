"use client";
import PageError from "@/components/shared/Errors/PageError";
import { useEffect } from "react";

function ErrorPage({ error }) {
  useEffect(() => {
    console.error({ error });
  }, [error]);
  return <PageError message={error.message || "something went wrong"} />;
}

export default ErrorPage;
