import ErrorLayout from "./ErrorLayout";

function PageError({ message }) {
  return (
    <>
      <ErrorLayout message={message} />
    </>
  );
}

export default PageError;
