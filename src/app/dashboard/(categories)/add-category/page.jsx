import HookFormContainer from "@/components/shared/Form/HookFormContainer";
import categoryConfig from "@/constants/addCategory/categoryConfig";
import { addCategory } from "@/controllers/category.controller";

async function AddCategory() {
  async function submitHandler(values) {
    "use server";
    try {
      await addCategory(values);
    } catch (error) {
      console.error(error);
      return { error };
    }
  }
  return (
    <HookFormContainer
      submitHandler={submitHandler}
      formConfig={categoryConfig}
      gridClass="mt-5 grid gap-10"
      message="category added successfully"
    />
  );
}

export default AddCategory;
