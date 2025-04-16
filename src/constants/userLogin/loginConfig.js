const loginConfig = [
  {
    name: "phoneNumber",
    label: "Mobile Number",
    type: "text",
    control: "input",
    value: "",
    validationType: "string",
    validations: [
      {
        type: "matches",
        params: [/^(?:\+91)?[6-9]\d{9}$/, "Phone number is not valid"],
      },
      { type: "required", params: ["Phone Number is required"] },
    ],
  },
];
export default loginConfig;
