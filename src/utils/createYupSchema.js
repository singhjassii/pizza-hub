import * as yup from "yup";

export default function createYupSchema(schema, config) {
  const { name, validationType, validations = [] } = config;

  if (validationType === "arrayOf") {
    const validator = yup.array().of(
      yup.object().shape(
        validations.reduce((accumulator, currentValue) => {
          let innerValidator = yup[currentValue.innerValidationType]();
          currentValue.innerValidations.forEach((innerValidation) => {
            const { params: innerParams, type: innerType } = innerValidation;

            if (!innerValidator[innerType]) {
              return;
            }

            if (innerType === "matches" && typeof innerParams[0] === "string") {
              const [regexString, message] = innerParams;
              const regex = new RegExp(regexString);
              innerValidator = innerValidator[innerType](regex, message);
            } else {
              innerValidator = innerValidator[innerType](...innerParams);
            }
          });
          return {
            ...accumulator,
            [currentValue.name]: innerValidator,
          };
        }, {})
      )
    );
    schema[name] = validator;
    return schema;
  }

  if (!yup[validationType]) {
    return schema;
  }

  let validator = yup[validationType]();

  validations.forEach((validation) => {
    const { params, type } = validation;

    if (type === "test" && validationType === "mixed") {
      const [testMethod, message, testFunction] = params;
      validator = validator.test(testMethod, message, testFunction);
    } else if (type === "matches" && typeof params[0] === "string") {
      const [regexString, message] = params;
      const regex = new RegExp(regexString);
      validator = validator.matches(regex, message);
    } else {
      if (!validator[type]) {
        return;
      }
      validator = validator[type](...params);
    }
  });

  schema[name] = validator;
  return schema;
}
