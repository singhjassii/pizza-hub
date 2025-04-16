/* eslint-disable jsx-a11y/no-static-element-interactions */

import { useRouter } from "next/navigation";
import HamburgerIcon from "../../Icons/HamburgerIcon";

function Header({
  setHideNavBar,
  hideNavBar,
  isMobileScreen,
  setNavBtnPressed,
}) {
  const router = useRouter();

  return (
    <>
      <div className="w-full bg-secondary-accent-color shadow-md header py-5">
        <div className="flex justify-between items-center mainContainerDashboard">
          <div className="headerMenu flex items-center ">
            {isMobileScreen && (
              <div
                className=" text-[#697177] cursor-pointer mr-8"
                onClick={() => {
                  setHideNavBar(!hideNavBar);
                  if (hideNavBar) {
                    document.body.style.overflow = "hidden";
                  }
                }}
              >
                <HamburgerIcon size={25} />
              </div>
            )}
            {!isMobileScreen && (
              <button
                type="button"
                className=" text-[#697177] cursor-pointer mr-8"
                onClick={() => {
                  setHideNavBar(!hideNavBar);
                  setNavBtnPressed((prev) => !prev);
                }}
              >
                <HamburgerIcon size={25} />
              </button>
            )}
          </div>
          <div className="flex gap-4">
            <div
              className="bg-[#C82734] px-3 py-2 rounded-md cursor-pointer"
              onClick={() => {
                localStorage.removeItem("adminCredentials");
                router.replace("/login");
              }}
            >
              <p className="uppercase text-white text-sm font-semibold">
                Log out
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
