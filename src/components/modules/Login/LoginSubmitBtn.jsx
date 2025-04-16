function LoginSubmitBtn({ getLoginInfo, isSubmitting, submitButtonText }) {
  return (
    <div className="flex flex-col gap-4 mt-8">
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full signInBtn flex  items-center justify-center gap-3 transition-all p-3 bg-nav-items-text rounded-[5px] h-[50px]"
        onClick={getLoginInfo}
      >
        {!isSubmitting ? (
          <p className="text-center text-nav-header-bg">
            {submitButtonText || "Sign in"}
          </p>
        ) : (
          <>
            <div className="signingInLoader block dark:hidden"></div>
            <div className="signingInLoaderDark hidden dark:block"></div>
          </>
        )}
      </button>
    </div>
  );
}

export default LoginSubmitBtn;
