import { getRows, softDeleteRows } from "@/app/serverActions";
import columns from "@/components/modules/TableColumns/item/Columns";
import { DataTable } from "@/components/shared/Table/DataTable";
import { ITEM_RESOURCE } from "@/constants/resources";

async function AllItems({ params, searchParams }) {
  const { page } = await params;
  const { limit = 10, search } = await searchParams;
  const data = await getRows(ITEM_RESOURCE, page, limit, search);
  const softDelete = await softDeleteRows(ITEM_RESOURCE, "all-items");
  return (
    <DataTable
      data={data}
      currentPage={Number(page)}
      currentLimit={Number(limit)}
      softDeleteRows={softDelete}
      currentSearched={search}
      columns={columns}
      filterKey="name"
      filterWithIn="Item"
      binUrl="/deleted-items/1"
    />
  );
}

export default AllItems;
