"use client";

import { orderConfirm } from "@/app/serverActions";
import { useState } from "react";
import { useSelector } from "react-redux";
import OrderPlacedModal from "./OrderPlacedModal";

function CartTotal() {
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const [proceedBtnClicked, setProceedBtnClicked] = useState(false);
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlacedModalShow, setOrderPlacedModalShow] = useState(false);
  const orderBody = {
    customerId: user?.id,
    address,
    orderList: cart?.items.reduce(
      (list, item, index) =>
        `${list + item?.quantity}X ${item?.name} ₹${item?.totalPrice}${index === cart?.items.length - 1 ? "." : ", "} `,
      ""
    ),
    totalBill: cart.total,
    cartBody: cart?.items.map(({ id, quantity }) => ({ itemId: id, quantity })),
  };
  return (
    <div className="mainContainer">
      <div className="w-full flex justify-end">
        <div className="bg-[#f0f4f5] flex flex-col gap-10 w-full transition-all sm:w-[22rem] rounded-md p-5 text-[#283034]">
          <h3 className="uppercase text-2xl font-medium">Cart Total</h3>
          <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center border-b border-gray-400 pb-5">
              <h5 className="text-xl">Subtotal</h5>
              <h5 className="text-xl">{`₹${cart.total}`}</h5>
            </div>
            <div className="flex justify-between items-center">
              <h5 className="text-xl">Total</h5>
              <h5 className="text-xl">{`₹${cart.total}`}</h5>
            </div>
            {proceedBtnClicked && (
              <div className="flex justify-between gap-5 items-start">
                <h5 className="text-xl">Address</h5>
                <div className="w-full">
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  {addressError && (
                    <p className="text-red-500">This is required</p>
                  )}
                </div>
              </div>
            )}
          </div>
          <button
            type="button"
            className={`checkoutBtn bg-[#e84e1d] ${!isSubmitting && "hover:bg-transparent"} border border-[#e84e1d] transition-all duration-500 group text-center p-3`}
            onClick={async () => {
              if (proceedBtnClicked && address) {
                setIsSubmitting(true);
                setAddressError(false);
                await orderConfirm(orderBody);
                setIsSubmitting(false);
                setOrderPlacedModalShow(true);
              } else if (proceedBtnClicked && !address) {
                setAddressError(true);
              } else {
                setProceedBtnClicked(true);
              }
            }}
          >
            <h6 className="uppercase text-white flex justify-center  transition-all duration-500 group-hover:text-[#e84e1d] font-medium">
              {!isSubmitting && (
                <p>{proceedBtnClicked ? "Checkout" : "Proceed to checkout"}</p>
              )}
              {isSubmitting && (
                <div className="signingInLoader block dark:hidden"></div>
              )}
            </h6>
          </button>
        </div>
      </div>
      {orderPlacedModalShow && (
        <OrderPlacedModal setOrderPlacedModalShow={setOrderPlacedModalShow} />
      )}
    </div>
  );
}

export default CartTotal;
