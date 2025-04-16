import NavBarWrapper from "@/components/shared/NavBarWrapper";

function layout({ children }) {
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
  const ADMIN_PASS = process.env.ADMIN_PASS;
  return (
    <div className="dashboardBody">
      <NavBarWrapper ADMIN_EMAIL={ADMIN_EMAIL} ADMIN_PASS={ADMIN_PASS}>
        {children}
      </NavBarWrapper>
    </div>
  );
}

export default layout;
