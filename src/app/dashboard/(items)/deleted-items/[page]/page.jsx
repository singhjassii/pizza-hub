import {
  getRows,
  permanentDeleteRows,
  restoreDeletedRows,
} from "@/app/serverActions";
import columns from "@/components/modules/TableColumns/item/Columns";
import { DataTable } from "@/components/shared/Table/DataTable";
import { ITEM_RESOURCE } from "@/constants/resources";

async function DeletedItems({ params, searchParams }) {
  const { page } = await params;
  const { limit = 10, search } = await searchParams;
  const data = await getRows(ITEM_RESOURCE, page, limit, search, true);
  const restoreDeleted = await restoreDeletedRows(
    ITEM_RESOURCE,
    "deleted-items"
  );
  const permanentDelete = await permanentDeleteRows(
    ITEM_RESOURCE,
    "deleted-items"
  );
  return (
    <DataTable
      data={data}
      currentPage={Number(page)}
      currentLimit={Number(limit)}
      restoreDeletedRows={restoreDeleted}
      permanentDeleteRows={permanentDelete}
      bin
      currentSearched={search}
      columns={columns}
      filterKey="name"
      filterWithIn="Item"
    />
  );
}

export default DeletedItems;
