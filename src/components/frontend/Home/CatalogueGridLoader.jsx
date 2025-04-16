import CatalogueSkeletonLoader from "./CatalogueSkeletonLoader";

function CatalgueGridLoader() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 pb-20">
      {Array.from({ length: 8 })
        .fill("")
        .map((_, index) => (
          <CatalogueSkeletonLoader key={index} />
        ))}
    </section>
  );
}

export default CatalgueGridLoader;
