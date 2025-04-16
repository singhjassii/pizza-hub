import { getRows, softDeleteRows } from "@/app/serverActions";
import columns from "@/components/modules/TableColumns/order/Columns";
import { DataTable } from "@/components/shared/Table/DataTable";
import { ORDER_RESOURCE } from "@/constants/resources";

async function AllOrders({ params, searchParams }) {
  const { page } = await params;
  const { limit = 10, search } = await searchParams;
  const data = await getRows(ORDER_RESOURCE, page, limit, search);
  const softDelete = await softDeleteRows(ORDER_RESOURCE, "all-orders");
  return (
    <DataTable
      data={data}
      currentPage={Number(page)}
      currentLimit={Number(limit)}
      softDeleteRows={softDelete}
      currentSearched={search}
      columns={columns}
      filterKey="customerName"
      filterWithIn="Order"
      binUrl="/deleted-orders/1"
    />
  );
}

export default AllOrders;
