const signUpConfig = [
  {
    name: "name",
    label: "Name",
    type: "text",
    control: "input",
    value: "",
    validationType: "string",
    validations: [{ type: "required", params: ["Name is required"] }],
  },
  {
    name: "email",
    label: "Email Address",
    type: "text",
    control: "input",
    value: "",
    validationType: "string",
    validations: [
      { type: "email", params: ["Invalid email"] },
      { type: "required", params: ["Email is required"] },
    ],
  },
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
export default signUpConfig;
