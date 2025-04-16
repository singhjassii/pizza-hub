import {
  getRows,
  permanentDeleteRows,
  restoreDeletedRows,
} from "@/app/serverActions";
import columns from "@/components/modules/TableColumns/order/Columns";
import { DataTable } from "@/components/shared/Table/DataTable";
import { ORDER_RESOURCE } from "@/constants/resources";

async function DeletedOrders({ params, searchParams }) {
  const { page } = await params;
  const { limit = 10, search } = await searchParams;
  const data = await getRows(ORDER_RESOURCE, page, limit, search, true);
  const restoreDeleted = await restoreDeletedRows(
    ORDER_RESOURCE,
    "deleted-orders"
  );
  const permanentDelete = await permanentDeleteRows(
    ORDER_RESOURCE,
    "deleted-orders"
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
      filterKey="customerName"
      filterWithIn="Order"
    />
  );
}

export default DeletedOrders;
