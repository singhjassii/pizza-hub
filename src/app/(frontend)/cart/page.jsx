import { getLoggedInUserDetails, getRows } from "@/app/serverActions";
import CartHero from "@/components/frontend/cart/CartHero";
import CartItems from "@/components/frontend/cart/CartItems";
import Footer from "@/components/frontend/Footer";
import Navbar from "@/components/frontend/Navbar";
import Loader from "@/components/shared/Loader";
import { CATEGORY_RESOURCE } from "@/constants/resources";
import { Suspense } from "react";

async function Cart({ searchParams }) {
  const { ids } = await searchParams;
  const data = await getRows(CATEGORY_RESOURCE, 1, 10);
  const getUserDetails = await getLoggedInUserDetails();
  return (
    <>
      <Navbar cats={data?.rows} getUserDetails={getUserDetails} />
      <CartHero />
      <Suspense fallback={<Loader />}>
        <CartItems ids={ids} />
      </Suspense>
      <Footer />
    </>
  );
}

export default Cart;
