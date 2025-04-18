"use client";
import { CartIcon, HamburgerIcon } from "@/Icons/indexIcon";
import { userExists } from "@/redux/slices/user";
import { UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Navbar({ cats, getUserDetails }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("userLoggedInToken"));
    async function fetchUserDetails() {
      if (typeof window !== "undefined") {
        // Check if window object is available
        const details = await getUserDetails(token);
        dispatch(userExists(details));
      }
    }
    if (token) {
      fetchUserDetails();
    }
  }, []);
  const [scrollY, setScrollY] = useState(false);
  const [mobileMenuToggle, setMobileMenuToggle] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav
      className={`p-0 lg:p-5 w-full transition-all z-50 ${
        scrollY
          ? "bg-white text-black left-0 fixed top-0 stickyNavBar"
          : "lg:text-white bg-transparent lg:absolute top-0"
      }`}
    >
      <div className="mainContainer">
        <div className="flex lg:hidden py-5 items-center justify-between">
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => setMobileMenuToggle((prev) => !prev)}
          >
            <HamburgerIcon size="2rem" />
          </button>
          <Link href="/">
            <Image src="/logo.png" width={100} height={30} alt="logo" />
          </Link>
          <div className="lg:hidden relative">
            <CartIcon size="2rem" />
            <div className="size-[1.2rem] absolute bg-[#e3000e] flex items-center justify-center text-white text-xs rounded-full -top-1 -right-1">
              {cart.ids.length}
            </div>
          </div>
        </div>
        <div
          className={`flex w-full lg:justify-center mobileMenu ${
            mobileMenuToggle ? "mobileMenuOpen" : "mobileMenuHide"
          }`}
        >
          <ul className="flex flex-col lg:flex-row gap-5 lg:py-0 lg:gap-10 justify-center items-center overflow-hidden uppercase text-xl">
            {cats.slice(0, 2).map(({ id, name }) => (
              <Link href={`/#${name}${id}`} key={id}>
                <li>{name}</li>
              </Link>
            ))}
            <Link href="/">
              <li className="hidden lg:block">
                <Image src="/logo.png" width={100} height={30} alt="logo" />
              </li>
            </Link>
            {cats.slice(2).map(({ id, name }, index) => (
              <Link href={`/#${name}${id}`} key={id}>
                <li
                  className={`${index + 2 === cats.length - 1 && "mb-5 lg:mb-0"}`}
                >
                  {name}
                </li>
              </Link>
            ))}
          </ul>
          {user && (
            <div className="hidden lg:flex items-center gap-5 ml-5">
              <Link
                href={`/cart?ids=${cart.ids}`}
                className={`${cart.ids.length === 0 && "pointer-events-none"}`}
              >
                <li className="hidden lg:block relative">
                  <CartIcon size="2rem" />
                  <div className="size-[1.2rem] absolute bg-[#e3000e] flex items-center justify-center text-white text-xs rounded-full -top-1 -right-1">
                    {cart.ids.length}
                  </div>
                </li>
              </Link>
              <li className="hidden lg:block relative group">
                <UserIcon size="2rem" />
                <div className="absolute right-0 pt-2 top-[150%] text-black transition-all scale-0 origin-top-right group-hover:scale-100  bg-white shadow-xl rounded-md">
                  <p className="w-full border-b-[1px] border-gray-300 px-5 pb-2">
                    {user?.name}
                  </p>
                  <p className="w-full border-b-[1px] border-gray-300 px-5 py-2">
                    {user?.phoneNumber}
                  </p>
                  <p className="w-full border-b-[1px] border-gray-300 px-5 py-2">
                    {user?.email}
                  </p>
                  <div className="w-full p-2">
                    <button
                      type="button"
                      className="bg-[#e3000e] p-2 rounded-full w-full"
                      onClick={() => {
                        localStorage.removeItem("userLoggedInToken");
                        localStorage.removeItem("cartItems");
                        window.location.reload();
                      }}
                    >
                      <p className="text-center text-white">Log out</p>
                    </button>
                  </div>
                </div>
              </li>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
