import { getItemsByCategory } from "@/controllers/item.controller";
import ItemCard from "../ItemCard";

async function ItalianCatalogue({ catId }) {
  const itemsByCategory = await getItemsByCategory({ params: { id: catId } });
  return (
    <>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
        {itemsByCategory.map((item) => (
          <ItemCard itemCard={JSON.stringify(item)} key={item.name} />
        ))}
      </section>
    </>
  );
}

export default ItalianCatalogue;
