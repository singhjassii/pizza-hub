import { getRows, softDeleteRows } from "@/app/serverActions";
import columns from "@/components/modules/TableColumns/category/Columns";
import { DataTable } from "@/components/shared/Table/DataTable";
import { CATEGORY_RESOURCE } from "@/constants/resources";

async function AllCategories({ params, searchParams }) {
  const { page } = await params;
  const { limit = 10, search } = await searchParams;
  const data = await getRows(CATEGORY_RESOURCE, page, limit, search);
  const softDelete = await softDeleteRows(CATEGORY_RESOURCE, "all-categories");
  return (
    <DataTable
      data={data}
      currentPage={Number(page)}
      currentLimit={Number(limit)}
      softDeleteRows={softDelete}
      currentSearched={search}
      columns={columns}
      filterKey="name"
      filterWithIn="Category"
      binUrl="/deleted-categories/1"
    />
  );
}

export default AllCategories;
