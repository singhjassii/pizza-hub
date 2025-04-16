function ResetSubmitBtn({ getOTPInfo, isSubmitting, buttonInput }) {
  return (
    <div className="mt-8">
      <button type="submit" className="w-full p-3 bg-nav-items-text rounded-[5px]" disabled={isSubmitting} onClick={getOTPInfo}>
        <p className="text-center text-nav-header-bg">{buttonInput}</p>
      </button>
    </div>
  );
}

export default ResetSubmitBtn;
