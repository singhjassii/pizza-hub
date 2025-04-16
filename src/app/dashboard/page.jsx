import BarGraph from "@/components/shared/Graphs/BarChart";
import LineGraph from "@/components/shared/Graphs/LineGraph";
import ShapeBarChart from "@/components/shared/Graphs/ShapeBarChart";
import {
  getOrdersLast7Days,
  getSalesByCategory,
  getTop10ItemsByRevenue,
  getTotalCount,
} from "@/controllers/stats.controller";
import CategoryIcon from "@/Icons/CategoryIcon";
import FoodItemsIcon from "@/Icons/FoodItemsIcon";
import { ListIcon } from "@/Icons/indexIcon";
import UserIcon from "@/Icons/UserIcon";

const firstSectionGraphs = [{ comp: ShapeBarChart }, { comp: LineGraph }];
async function Home() {
  const [
    salesByCategory,
    { totalUsers, totalCategories, totalItems, totalOrders },
    last7daysOrders,
    top10ItemsRevenue,
  ] = await Promise.all([
    getSalesByCategory(),
    getTotalCount(),
    getOrdersLast7Days(),
    getTop10ItemsByRevenue(),
  ]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-5 w-full">
      <div className="col-span-3">
        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-5">
          {firstSectionGraphs.map(({ comp: Comp }, index) => (
            <div
              className="bg-secondary-accent-color panel shadow-xl rounded-md col-span-2 h-[300px] p-2"
              key={index}
            >
              <Comp
                salesByCategory={salesByCategory}
                last7daysOrders={last7daysOrders}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-3 lg:col-span-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 h-[400px] lg:h-full">
          {[
            { icon: UserIcon, label: "users", count: totalUsers },
            { icon: CategoryIcon, label: "categories", count: totalCategories },
            { icon: FoodItemsIcon, label: "items", count: totalItems },
            { icon: ListIcon, label: "orders", count: totalOrders },
          ].map(({ count, label, icon: Icon }) => (
            <div
              className="bg-secondary-accent-color flex flex-col items-center gap-2 justify-center panel shadow-xl rounded-md col-span-1"
              key={label}
            >
              <div className=" size-[5rem] rounded-full border-[0.3rem] border-[#f7a11c] items-center justify-center flex">
                <h5 className="text-field-text-color text-xl">{count}</h5>
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-[#C82734]">
                  <Icon />
                </span>
                <h5 className="capitalize">{label}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-secondary-accent-color panel shadow-xl rounded-md col-span-full h-[400px] p-2">
        <BarGraph top10ItemsRevenue={top10ItemsRevenue} />
      </div>
    </div>
  );
}

export default Home;
