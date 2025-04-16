"use client";
import CartIcon from "@/icons/CartIcon";
import HeartIcon from "@/icons/HeartIcon";
import { addToCart } from "@/redux/slices/cart";
import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginSignUpModal from "../shared/RegistrationLogin/LoginSignUpModal";

function ItemCard({ itemCard }) {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const newItemCard = JSON.parse(itemCard);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const { user } = useSelector((state) => state.user);
  return (
    <div className="itemCard rounded-md group flex flex-col transition-all overflow-hidden text-[#642f21]">
      <div className=" overflow-hidden">
        <Image
          src={newItemCard.itemImage}
          alt={newItemCard.name}
          height={400}
          width={400}
          className="w-full transition-all duration-500 h-full group-hover:scale-125"
        />
      </div>
      <div className="p-5 flex flex-col gap-5 flex-grow justify-between">
        <div className="flex items-center justify-between">
          <h3 className="uppercase font-medium">{newItemCard.name}</h3>
          <span className="text-[#a4a3a3]">
            <HeartIcon size="1.5rem" />
          </span>
        </div>
        <p className="font-light text-xl text-[#8a8a8a]">
          {newItemCard.description}
        </p>
        <div className="flex items-center relative justify-between">
          <div className="bg-[#642f21] p-2 rounded-md">
            <h4 className="text-[#f7be27] font-semibold">{`₹ ${newItemCard.price}`}</h4>
          </div>
          <button
            type="button"
            disabled={cart.ids.includes(newItemCard.id)}
            className={`${cart.ids.includes(newItemCard.id) ? "bg-[#642f21] text-white" : "bg-[#f7be27] text-black"} cursor-pointer absolute right-0 top-5 opacity-0 p-2 rounded-md flex items-center gap-2 transition-all duration-500 group-hover:opacity-100 group-hover:top-0`}
            onClick={() => {
              if (user) {
                dispatch(addToCart(newItemCard.id));
              } else {
                setOpenRegisterModal(true);
              }
            }}
          >
            <CartIcon size="1rem" />
            <p className="font-light text-[1rem]">
              {cart.ids.includes(newItemCard.id) ? "Added" : "Add To Cart"}
            </p>
          </button>
        </div>
      </div>
      {openRegisterModal && <LoginSignUpModal />}
    </div>
  );
}

export default ItemCard;
