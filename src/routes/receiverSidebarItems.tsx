import Home from "@/components/modules/receiver/Home";
import MyParcels from "@/components/modules/receiver/MyParcels";
import Payments from "@/components/modules/receiver/Payments";
import type {ISidebarItem} from "@/types/types";

const receiverSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [{title: "Home", url: "/receiver/home", component: Home}],
  },
  {
    title: "Parcels",
    items: [
      {title: "Incoming Parcels", url: "/receiver/parcels", component: MyParcels},
      {title: "Payments", url: "/receiver/payments", component: Payments},
    ],
  },
];

export default receiverSidebarItems;
