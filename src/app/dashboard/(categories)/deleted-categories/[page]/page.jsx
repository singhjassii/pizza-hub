import {
  getRows,
  permanentDeleteRows,
  restoreDeletedRows,
} from "@/app/serverActions";
import columns from "@/components/modules/TableColumns/category/Columns";
import { DataTable } from "@/components/shared/Table/DataTable";
import { CATEGORY_RESOURCE } from "@/constants/resources";

async function DeletedCategories({ params, searchParams }) {
  const { page } = await params;
  const { limit = 10, search } = await searchParams;
  const data = await getRows(CATEGORY_RESOURCE, page, limit, search, true);
  const restoreDeleted = await restoreDeletedRows(
    CATEGORY_RESOURCE,
    "deleted-categories"
  );
  const permanentDelete = await permanentDeleteRows(
    CATEGORY_RESOURCE,
    "deleted-categories"
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
      filterWithIn="Category"
    />
  );
}

export default DeletedCategories;
