"use client";
import DeleteIcon from "@/Icons/DeleteIcon";
import {
  addItemsForCheckout,
  changeQuantityById,
  removeFromCartById,
} from "@/redux/slices/cart";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function CartTable({ items }) {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addItemsForCheckout(JSON.parse(items)));
  }, [dispatch, items]);
  const { cart } = useSelector((state) => state.cart);
  return (
    <div className="mainContainer py-5">
      {/* using table */}
      <table className="text-[#283034]">
        <thead className="hidden md:table-header-group">
          <tr>
            {["Product", "Price", "Quantity", "Total", "Delete"].map(
              (colName) => (
                <th key={colName} className="text-start last:text-end">
                  <h2 className="text-2xl font-normal">{colName}</h2>
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {cart.items.map(
            ({
              itemImage,
              name,
              price,
              totalPrice,
              quantity,
              description,
              id,
            }) => (
              <tr key={id} className="block md:table-row">
                <td
                  className="md:flex items-center md:w-fit gap-2"
                  data-label="Product"
                >
                  <Image
                    src={itemImage}
                    alt="cartItemImage"
                    height={70}
                    width={70}
                    className="rounded-full w-[70px] h-[70px] hidden md:block"
                  />
                  <div className="flex flex-col gap-1 items-end md:items-start">
                    <h5 className="uppercase text-2xl">{name}</h5>
                    <p className="text-lg text-gray-500 font-light">
                      {description}
                    </p>
                  </div>
                </td>
                <td className="text-2xl" data-label="Price">
                  {`₹${price}`}
                </td>
                <td className="text-2xl" data-label="Quantity">
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      dispatch(
                        changeQuantityById({
                          id,
                          quantity: Number(e.target.value),
                        })
                      )
                    }
                    min={1}
                    className="!w-[4rem]"
                  />
                </td>
                <td className="text-2xl" data-label="Total">
                  {`₹${totalPrice}`}
                </td>
                <td className="text-3xl text-[#e3000e]" data-label="Delete">
                  <button
                    type="button"
                    className="md:justify-end flex md:w-full cursor-pointer"
                    onClick={() => {
                      dispatch(removeFromCartById({ id }));
                      router.replace(
                        `?ids=${cart.ids.filter((item) => item !== id)}`
                      );
                    }}
                  >
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      {/* using div */}
    </div>
  );
}

export default CartTable;
