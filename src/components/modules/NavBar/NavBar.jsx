import Image from "next/image";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import menu from "../../../constants/navBar/menu";
import DropDown from "./DropDown";

// import { useRouter } from "next/router";

function NavBar({ hideNavBar, isMobileScreen }) {
  const pathname = usePathname().split("/")[2];
  const routeParent = menu.find((nav) =>
    nav.children.some((child) => child.link.split("/")[2] === pathname)
  )?.parent;
  const [selectedNavItem, setSelectedNavItem] = useState(
    routeParent || "Dashboard"
  );

  return (
    <>
      <div className="px-7 py-5 flex items-center justify-between">
        <Link href="/">
          <div
            className={`transition-all overflow-hidden ${!isMobileScreen ? (hideNavBar ? "w-full" : "w-0") : "w-full"}`}
          >
            <Image
              src="/logo.png"
              height={40}
              width={240}
              alt="pizza-hub-logo"
              priority
            />
          </div>
        </Link>
      </div>
      {menu.map((nav, index) => {
        const dropDown = (
          <DropDown
            hideNavBar={hideNavBar}
            isMobileScreen={isMobileScreen}
            nav={nav}
            route={pathname}
            selectedNavItem={selectedNavItem}
            setSelectedNavItem={setSelectedNavItem}
          />
        );

        return (
          <div
            key={nav.id}
            className="mainCatDiv relative group border-nav-item-border-color"
          >
            {index === 0 ? <Link href={nav.link}>{dropDown}</Link> : dropDown}
          </div>
        );
      })}
    </>
  );
}

export default NavBar;
