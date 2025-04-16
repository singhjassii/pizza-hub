const otpConfig = [
  {
    name: "otp",
    label: "OTP",
    type: "number",
    control: "input",
    value: "",
    validationType: "string",
    validations: [
      { type: "required", params: ["OTP is required"] },
      {
        type: "min",
        params: [4, "OTP should only be of 4 numbers"],
      },
      {
        type: "max",
        params: [4, "OTP should only be of 4 numbers"],
      },
    ],
  },
];
export default otpConfig;
