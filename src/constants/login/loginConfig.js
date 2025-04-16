const loginConfig = [
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
    name: "password",
    label: "Password",
    type: "password",
    control: "input",
    value: "",
    validationType: "string",
    validations: [{ type: "required", params: ["Password is required"] }],
  },
];
export default loginConfig;
