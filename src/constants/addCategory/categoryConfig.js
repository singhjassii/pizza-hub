const categoryConfig = [
  {
    name: "name",
    label: "Category Name",
    type: "text",
    control: "input",
    value: "",
    validationType: "string",
    validations: [{ type: "required", params: ["Category Name is required"] }],
  },
  {
    name: "description",
    label: "Category Description",
    type: "text",
    control: "textarea",
    value: "",
    validationType: "string",
    validations: [
      { type: "required", params: ["Category Description is required"] },
    ],
  },
];

export default categoryConfig;
