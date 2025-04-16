import {
  getRows,
  permanentDeleteRows,
  restoreDeletedRows,
} from "@/app/serverActions";
import columns from "@/components/modules/TableColumns/user/Columns";
import { DataTable } from "@/components/shared/Table/DataTable";
import { USER_RESOURCE } from "@/constants/resources";

async function DeletedUsers({ params, searchParams }) {
  const { page } = await params;
  const { limit = 10, search } = await searchParams;
  const data = await getRows(USER_RESOURCE, page, limit, search, true);
  const restoreDeleted = await restoreDeletedRows(
    USER_RESOURCE,
    "deleted-users"
  );
  const permanentDelete = await permanentDeleteRows(
    USER_RESOURCE,
    "deleted-users"
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
      filterWithIn="Name"
    />
  );
}

export default DeletedUsers;
