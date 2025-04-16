import { getRows, softDeleteRows } from "@/app/serverActions";
import columns from "@/components/modules/TableColumns/user/Columns";
import { DataTable } from "@/components/shared/Table/DataTable";
import { USER_RESOURCE } from "@/constants/resources";

async function AllUsers({ params, searchParams }) {
  const { page } = await params;
  const { limit = 10, search } = await searchParams;
  const data = await getRows(USER_RESOURCE, page, limit, search);
  const softDelete = await softDeleteRows(USER_RESOURCE, "all-users");
  return (
    <DataTable
      data={data}
      currentPage={Number(page)}
      currentLimit={Number(limit)}
      softDeleteRows={softDelete}
      currentSearched={search}
      columns={columns}
      filterKey="name"
      filterWithIn="Name"
      binUrl="/deleted-users/1"
    />
  );
}

export default AllUsers;
