const getBase64 = ({ mimeType, buffer }) => {
  // eslint-disable-next-line node/prefer-global/buffer
  const base64String = Buffer.from(buffer).toString("base64");
  const res = `data:${mimeType};base64,${base64String}`;
  return res;
};

async function getFileMimeTypeAndBuffer(file) {
  const mimeType = file.type;
  // Convert File to ArrayBuffer
  const arrayBuffer = await file.arrayBuffer();
  return {
    mimeType,
    buffer: arrayBuffer,
  };
}
function generateOTP() {
  const otp = Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit number
  return otp;
}

export { generateOTP, getBase64, getFileMimeTypeAndBuffer };
