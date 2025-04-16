import HookFormContainer from "@/components/shared/Form/HookFormContainer";
import itemConfig from "@/constants/addItem/itemConfig";
import { CATEGORY_RESOURCE } from "@/constants/resources";
import { editItemById, getItemById } from "@/controllers/item.controller";
import { getBypage } from "@/controllers/shared/common.controllers";

async function getCategories() {
  return getBypage({
    resource: CATEGORY_RESOURCE,
    limit_from_p: "all",
    raw: true,
  })();
}
async function EditItem({ params }) {
  const { rows } = await getCategories();
  const { id } = await params;
  const itemData = await getItemById({
    params: { id },
  });
  const finalFormConfig = itemConfig.map((item) => {
    if (item.name === "categoryId") {
      return {
        ...item,
        options: [
          ...item.options,
          ...rows.map(({ name, id }) => ({ key: id, value: name })),
        ],
        value: itemData[item.name],
      };
    }
    return { ...item, value: itemData[item.name] };
  });
  async function submitHandler({ itemImage, ...rest }) {
    "use server";
    const imageType = typeof itemImage;
    try {
      await editItemById({
        params: { id },
        body: {
          itemImage: imageType === "string" ? itemImage : itemImage[0],
          ...rest,
        },
      });
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
      redirectPath="/dashboard/all-items/1"
      message="category updated successfully"
    />
  );
}

export default EditItem;
