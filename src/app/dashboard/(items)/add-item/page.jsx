import HookFormContainer from "@/components/shared/Form/HookFormContainer";
import itemConfig from "@/constants/addItem/itemConfig";
import { CATEGORY_RESOURCE } from "@/constants/resources";
import { addItem } from "@/controllers/item.controller";
import { getBypage } from "@/controllers/shared/common.controllers";

async function getCategories() {
  return getBypage({
    resource: CATEGORY_RESOURCE,
    limit_from_p: "all",
    raw: true,
  })();
}
async function AddItem() {
  const { rows } = await getCategories();
  console.warn(rows);
  const finalFormConfig = itemConfig.map((item) => {
    if (item.name === "categoryId") {
      return {
        ...item,
        options: [
          ...item.options,
          ...rows.map(({ name, id }) => ({ key: id, value: name })),
        ],
      };
    }
    return item;
  });
  async function submitHandler({ itemImage, ...values }) {
    "use server";
    const finalPhoto = itemImage[0];
    try {
      console.warn("values", values);
      await addItem({ itemImage: finalPhoto, ...values });
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
      message="item added successfully"
    />
  );
}

export default AddItem;
