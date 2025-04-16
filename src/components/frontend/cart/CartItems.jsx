import { getItemsByIds } from "@/controllers/item.controller";
import CartTable from "./CartTable";
import CartTotal from "./CartTotal";

async function CartItems({ ids }) {
  const items = await getItemsByIds({
    body: { ids: JSON.parse(`[${ids}]`) },
  });
  console.warn(items);
  return (
    <>
      <CartTable items={JSON.stringify(items)} />
      <CartTotal />
    </>
  );
}

export default CartItems;
