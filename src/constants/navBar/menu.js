import { MinusIcon } from "lucide-react";
import {
  CategoryIcon,
  FoodItemsIcon,
  HomeIcon,
  OrdersIcon,
  UserIcon,
} from "../../Icons/indexIcon";

const menu = [
  {
    id: 1,
    parent: "Dashboard",
    icon: HomeIcon,
    link: "/dashboard",
    children: [],
  },
  {
    id: 2,
    parent: "Category",
    icon: CategoryIcon,
    children: [
      {
        id: 1,
        name: "All Categories",
        icon: MinusIcon,
        link: "/dashboard/all-categories/1",
      },
      {
        id: 2,
        name: "Add Category",
        icon: MinusIcon,
        link: "/dashboard/add-category",
      },
    ],
  },
  {
    id: 3,
    parent: "Items",
    icon: FoodItemsIcon,
    children: [
      {
        id: 1,
        name: "All Items",
        icon: MinusIcon,
        link: "/dashboard/all-items/1",
      },
      {
        id: 2,
        name: "Add Item",
        icon: MinusIcon,
        link: "/dashboard/add-item",
      },
    ],
  },
  {
    id: 4,
    parent: "Orders",
    icon: OrdersIcon,
    children: [
      {
        id: 1,
        name: "All Orders",
        icon: MinusIcon,
        link: "/dashboard/all-orders/1",
      },
    ],
  },
  {
    id: 5,
    parent: "Users",
    icon: UserIcon,
    children: [
      {
        id: 1,
        name: "All Users",
        icon: MinusIcon,
        link: "/dashboard/all-users/1",
      },
    ],
  },
];

export default menu;
