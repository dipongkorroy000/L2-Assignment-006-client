import Home from "@/components/modules/superAdmin/Home";
import Parcels from "@/components/modules/superAdmin/Parcels";
import ParcelStats from "@/components/modules/superAdmin/ParcelStats";
import Payments from "@/components/modules/superAdmin/Payments";
import PaymentStats from "@/components/modules/superAdmin/PaymentStats";
import Users from "@/components/modules/superAdmin/Users";
import UserStats from "@/components/modules/superAdmin/UserStats";
import type {ISidebarItem} from "@/types/types";

const superSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [{title: "Home", url: "/super-admin/home", component: Home}],
  },
  {
    title: "SuperAdmin",
    items: [
      {title: "Parcels", url: "/super-admin/parcels", component: Parcels},
      {title: "ParcelStats", url: "/super-admin/parcelStats", component: ParcelStats},

      {title: "Payments", url: "/super-admin/payments", component: Payments},
      {title: "PaymentStats", url: "/super-admin/paymentStats", component: PaymentStats},

      {title: "Users", url: "/super-admin/users", component: Users},
      {title: "UserStats", url: "/super-admin/UserStats", component: UserStats},
    ],
  },
];

export default superSidebarItems;
