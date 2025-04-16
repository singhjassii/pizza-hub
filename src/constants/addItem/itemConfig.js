const MAX_FILE_SIZE = 5242880; // 5MB

const validFileExtensions = {
  image: ["jpg", "gif", "png", "jpeg", "svg", "webp"],
};
const isValidFileType = (fileName, fileType) => {
  if (!fileName || !fileType) {
    return false;
  }
  return (
    fileName &&
    // eslint-disable-next-line unicorn/prefer-includes
    validFileExtensions[fileType].indexOf(fileName.split(".").pop()) > -1
  );
};
const itemConfig = [
  {
    name: "categoryId",
    label: "Category",
    control: "select",
    value: "select category",
    options: [
      {
        key: "select category",
        value: "Select Category",
      },
    ],
    validationType: "string",
    validations: [
      {
        type: "matches",
        params: ["^(?!select category$).+", "This is required"],
      },
    ],
  },
  {
    name: "availability",
    label: "Category",
    control: "select",
    value: "select availability",
    options: [
      {
        key: "select availability",
        value: "Select Availability",
      },
      {
        key: "yes",
        value: "Yes",
      },
      {
        key: "no",
        value: "No",
      },
    ],
    validationType: "string",
    validations: [
      {
        type: "matches",
        params: ["^(?!select availability$).+", "This is required"],
      },
    ],
  },
  {
    name: "name",
    label: "Item Name",
    type: "text",
    control: "input",
    value: "",
    validationType: "string",
    validations: [{ type: "required", params: ["Item Name is required"] }],
  },
  {
    name: "description",
    label: "Item Description",
    type: "text",
    control: "textarea",
    value: "",
    validationType: "string",
    validations: [
      { type: "required", params: ["Item Description is required"] },
    ],
  },
  {
    name: "price",
    label: "Item Price",
    type: "number",
    control: "input",
    value: "",
    validationType: "string",
    validations: [{ type: "required", params: ["Item Price is required"] }],
  },
  {
    name: "itemImage",
    label: "Photo",
    type: "file",
    control: "file",
    accept: "image/*",
    isMultiple: "true",
    value: [],
    validationType: "mixed",
    validations: [
      { type: "required", params: ["You need to provide a photo"] },
      {
        type: "test",
        params: [
          "is-valid-file",
          "File is not valid",
          async (value) => {
            "use server";
            if (!value) {
              return false;
            }
            if (typeof value === "string") {
              return true;
            }
            return isValidFileType(
              value && value[0]?.name.toLowerCase(),
              "image"
            );
          },
        ],
      },
      {
        type: "test",
        params: [
          "is-valid-size",
          "Max allowed size is 5MB",
          async (value) => {
            "use server";
            if (typeof value === "string") {
              return true;
            }
            if (value[0]) {
              return value[0].size <= MAX_FILE_SIZE;
            }
          },
        ],
      },
    ],
  },
];

export default itemConfig;
