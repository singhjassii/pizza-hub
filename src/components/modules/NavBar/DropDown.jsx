import Link from "next/link";
import { ArrowUpIcon } from "../../../Icons/indexIcon";

function DropDown({
  nav,
  route,
  selectedNavItem,
  setSelectedNavItem,
  hideNavBar,
  isMobileScreen,
}) {
  const NavIcon = nav.icon;
  return (
    <>
      <button
        type="button"
        className={`catDiv relative group hover:bg-cat-div-hover-bg px-6 py-5 flex justify-between w-full items-center ${
          selectedNavItem === nav.parent &&
          "catDivActive bg-category-selected-bg-color"
        }`}
        onClick={() => {
          if (!nav.link) {
            if (hideNavBar || isMobileScreen) {
              if (selectedNavItem === nav.parent) {
                setSelectedNavItem(false);
              } else {
                setSelectedNavItem(nav.parent);
              }
            }
          } else {
            setSelectedNavItem(nav.parent);
          }
        }}
        tabIndex="0"
        aria-expanded={selectedNavItem === nav.parent}
      >
        <div
          className={`activeTintDiv absolute top-0 transition-all rounded-tr-md rounded-br-lg bg-active-color h-full w-2 ${
            selectedNavItem === nav.parent ? "left-0" : "-left-5"
          }`}
        />
        <div className="flex">
          <div
            className={`catIcon group-hover:text-on-div-hover-icon-color ${
              selectedNavItem === nav.parent
                ? "text-field-text-color"
                : "text-[#889096]"
            }`}
          >
            <NavIcon />
          </div>
          <p
            className={`text-[17px] ml-3 text-nav-items-text overflow-hidden transition-all ${
              !isMobileScreen ? (hideNavBar ? "w-full" : "w-0 h-0") : "w-full"
            }`}
          >
            {nav.parent}
          </p>
        </div>

        {nav.children.length > 0 && (hideNavBar || isMobileScreen) && (
          <span
            className={`text-[#697177] transition-all ${selectedNavItem === nav.parent ? "rotate-0" : "rotate-180"}`}
          >
            <ArrowUpIcon />
          </span>
        )}
      </button>
      {nav.children.length > 0 && (
        <>
          <div
            className={`subCatDiv ${selectedNavItem === nav.parent && (hideNavBar || isMobileScreen) ? "subCatOpen" : "subCatHide"}`}
          >
            <div className="overflow-hidden">
              <div className="flex flex-col py-3 gap-3">
                {nav.children.map(({ link, icon: Icon, name, state, id }) => (
                  <Link href={`${link}`} key={id} state={state}>
                    <li
                      className={`flex hover:text-subCat-li-hover-text transition-all items-center ${
                        link.split("/")[2] === route
                          ? "text-field-text-color"
                          : "text-[#697177]"
                      }`}
                    >
                      <span className="mr-2">
                        <Icon />
                      </span>
                      {name}
                    </li>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {!hideNavBar && !isMobileScreen && (
            <div className="absolute top-0 left-full hidden  p-5 shadow-sm rounded-r-lg bg-nav-header-bg group-hover:block">
              <div className="flex flex-col gap-3 ">
                {nav.children.map(({ link, icon: Icon, name, id }) => (
                  <Link href={`${link}`} key={id}>
                    <button
                      type="button"
                      className={`flex hover:text-subCat-li-hover-text transition-all items-center ${
                        link.split("/")[2] === route
                          ? "text-field-text-color"
                          : "text-[#697177]"
                      }`}
                      onClick={() => setSelectedNavItem(nav.parent)}
                    >
                      <span className="mr-2">
                        <Icon />
                      </span>
                      <span className="whitespace-nowrap">{name}</span>
                    </button>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default DropDown;
