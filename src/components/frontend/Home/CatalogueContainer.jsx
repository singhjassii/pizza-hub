import { Suspense } from "react";
import CatalgueGridLoader from "./CatalogueGridLoader";
import ItalianCatalogue from "./ItalianCatalogue";

function CatalogueContainer({ data }) {
  return (
    <div className="mainContainer">
      {data.rows.map(({ id, name }) => (
        <div key={id}>
          <section id={`${name}${id}`} className="py-20">
            <h2 className="font-medium uppercase pt-5 text-7xl text-center text-[#e3000e]">
              {name}
            </h2>
          </section>
          <Suspense fallback={<CatalgueGridLoader />}>
            <ItalianCatalogue key={id} catId={id} />
          </Suspense>
        </div>
      ))}
    </div>
  );
}

export default CatalogueContainer;
