import File from "./File";
import Input from "./Input";
import MultiSelect from "./MultiSelect";
import Select from "./Select";
import TextArea from "./TextArea";

function HookFormControl({
  control,
  setValue,
  watch,
  index,
  fields,
  formControl,
  ...rest
}) {
  switch (control) {
    case "input":
      return <Input watch={watch} {...rest} />;
    case "select":
      return <Select {...rest} watch={watch} />;
    case "textarea":
      return <TextArea {...rest} watch={watch} />;
    case "multiSelect":
      return <MultiSelect {...rest} watch={watch} setValue={setValue} />;
    case "file":
      return <File watch={watch} setValue={setValue} {...rest} />;
    case "inputArray":
      return (
        <InputArrayContainer
          watch={watch}
          setValue={setValue}
          formControl={formControl}
          {...rest}
          fields={fields}
        />
      );
    case "date":
      return <Date {...rest} watch={watch} setValue={setValue} />;
    default:
      return null;
  }
}

export default HookFormControl;
