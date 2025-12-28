import Home from "@/components/modules/admin/Home";
import Parcels from "@/components/modules/admin/Parcels";
import ParcelStats from "@/components/modules/admin/ParcelStats";
import Payments from "@/components/modules/admin/Payments";
import PaymentStats from "@/components/modules/admin/PaymentStats";
import Users from "@/components/modules/admin/Users";
import UserStats from "@/components/modules/admin/UserStats";
import type {ISidebarItem} from "@/types/types";

const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [{title: "Home", url: "/admin/home", component: Home}],
  },
  {
    title: "Admin Tasks",
    items: [
      {title: "Parcels", url: "/admin/parcels", component: Parcels},
      {title: "Parcels Stats", url: "/admin/parcelStats", component: ParcelStats},

      {title: "Payments", url: "/admin/payments", component: Payments},
      {title: "Payments Stats", url: "/admin/paymentsStats", component: PaymentStats},

      {title: "Users", url: "/admin/users", component: Users},
      {title: "User Stats", url: "/admin/usersStats", component: UserStats},
    ],
  },
];

export default adminSidebarItems;
