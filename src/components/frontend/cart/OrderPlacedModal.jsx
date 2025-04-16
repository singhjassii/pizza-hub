"use client";
import { emptyCart } from "@/redux/slices/cart";
import { CheckCircle2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

function OrderPlacedModal({ setOrderPlacedModalShow }) {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <div className="overlay-sidebar flex justify-center !z-50 items-center">
      <div className="bg-white w-[80%] md:w-[50%] rounded-md text-[#e84e1d] flex flex-col items-center gap-5 p-10">
        <h5 className="uppercase text-[#283034] text-lg sm:text-2xl">
          Order placed successfully
        </h5>
        <CheckCircle2Icon size="4rem" />
        <button
          type="button"
          className="checkoutBtn w-full bg-[#e84e1d] hover:bg-transparent border border-[#e84e1d] transition-all duration-500 group text-center p-3"
          onClick={() => {
            localStorage.removeItem("cartItems");
            setOrderPlacedModalShow(false);
            dispatch(emptyCart());
            router.push("/");
          }}
        >
          <h6 className="uppercase text-white flex justify-center  transition-all duration-500 group-hover:text-[#e84e1d] font-medium">
            Go home
          </h6>
        </button>
      </div>
    </div>
  );
}

export default OrderPlacedModal;
