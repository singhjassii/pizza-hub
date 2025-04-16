import ErrorLayout from "./ErrorLayout";

function FullPageError({ message }) {
  return <ErrorLayout message={message} fullPage />;
}

export default FullPageError;
