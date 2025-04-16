import Footer from "@/components/frontend/Footer";
import AboutUsDivision from "@/components/frontend/Home/AboutUsDivision";
import CatalogueContainer from "@/components/frontend/Home/CatalogueContainer";
import HearPizzaContainer from "@/components/frontend/Home/hero/HearPizzaContainer";
import Hero from "@/components/frontend/Home/hero/Hero";
import Navbar from "@/components/frontend/Navbar";
import { CATEGORY_RESOURCE } from "@/constants/resources";
import { getLoggedInUserDetails, getRows } from "../serverActions";

async function Home() {
  const data = await getRows(CATEGORY_RESOURCE, 1, 10);
  const getUserDetails = await getLoggedInUserDetails();
  return (
    <>
      <Navbar cats={data?.rows} getUserDetails={getUserDetails} />
      <Hero />
      <div className="mainContainer">
        <AboutUsDivision />
      </div>
      <HearPizzaContainer />
      <CatalogueContainer data={data} />
      <Footer />
    </>
  );
}

export default Home;
