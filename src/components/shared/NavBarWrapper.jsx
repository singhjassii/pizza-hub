/* eslint-disable jsx-a11y/no-static-element-interactions */
"use client";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { useMediaQuery } from "react-responsive";
import Header from "../modules/Header";
import NavBar from "../modules/NavBar/NavBar";
import Loader from "./Loader";

function NavBarWrapper({ children, ADMIN_EMAIL, ADMIN_PASS }) {
  const router = useRouter();
  const [hideNavBar, setHideNavBar] = useState(true);
  const [navBtnPressed, setNavBtnPressed] = useState(false);
  const isMobileScreen = useMediaQuery({ query: "(max-width: 768px)" });
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const adminCredentials = JSON.parse(
      localStorage.getItem("adminCredentials")
    );
    if (
      adminCredentials?.email !== ADMIN_EMAIL ||
      adminCredentials?.password !== ADMIN_PASS
    ) {
      router.replace("/login");
      return;
    }
    setIsLoading(false);
  }, [router, ADMIN_EMAIL, ADMIN_PASS]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="screenDivider flex">
            <div
              className={`leftSideMenu h-[100vh] w-[15rem] md:w-[19rem] overflow-y-scroll shadow-xl fixed top-0 z-[999] md:sticky  transition-all py-2 ${
                hideNavBar ? "-ml-[15rem] md:ml-0" : "ml-0 md:w-[5rem]"
              }`}
              // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
              onMouseOver={() =>
                !hideNavBar &&
                navBtnPressed &&
                !isMobileScreen &&
                setHideNavBar(true)
              }
              onMouseLeave={() =>
                hideNavBar &&
                navBtnPressed &&
                !isMobileScreen &&
                setHideNavBar(false)
              }
            >
              <NavBar
                hideNavBar={hideNavBar}
                setHideNavBar={setHideNavBar}
                isMobileScreen={isMobileScreen}
              />
            </div>

            <div className="rightSideContent h-full w-full">
              <Header
                setHideNavBar={setHideNavBar}
                hideNavBar={hideNavBar}
                isMobileScreen={isMobileScreen}
                navBtnPressed={navBtnPressed}
                setNavBtnPressed={setNavBtnPressed}
                // branchData={branchData}
              />
              <div className="mainContainerDashboard">
                {/* <ErrorBoundary errorComponent={PageError}> */}
                {children}
                {/* </ErrorBoundary> */}
              </div>
            </div>
          </div>
          <div
            className={`overlay-sidebar md:hidden ${
              hideNavBar ? "hidden" : "block"
            }`}
            onClick={() => {
              setHideNavBar(true);
              document.body.style.overflow = "auto";
            }}
          ></div>
        </>
      )}
    </>
  );
}

export default NavBarWrapper;
