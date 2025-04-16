import HookFormContainer from "@/components/shared/Form/HookFormContainer";
import categoryConfig from "@/constants/addCategory/categoryConfig";
import {
  editCategoryById,
  getCategoryById,
} from "@/controllers/category.controller";

export const dynamic = "force-dynamic";
async function EditCategory({ params }) {
  const { id } = await params;
  const categoryData = await getCategoryById({
    params: { id },
  });
  const finalFormConfig = categoryConfig.map((item) => {
    return { ...item, value: categoryData[item.name] };
  });
  async function submitHandler(values) {
    "use server";
    try {
      await editCategoryById({ params: { id }, body: values });
    } catch (error) {
      console.error(error);
      return { error };
    }
  }
  return (
    <HookFormContainer
      submitHandler={submitHandler}
      formConfig={finalFormConfig}
      gridClass="mt-5 grid gap-10"
      redirectPath="/dashboard/all-categories/1"
      message="category updated successfully"
    />
  );
}

export default EditCategory;
