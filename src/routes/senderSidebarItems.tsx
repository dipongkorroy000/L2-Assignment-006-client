import Home from "@/components/modules/sender/Home";
import MyParcels from "@/components/modules/sender/MyParcels";
import ParcelRequest from "@/components/modules/sender/ParcelRequest";
import Payments from "@/components/modules/sender/Payments";
import type {ISidebarItem} from "@/types/types";

const senderSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [{title: "Home", url: "/sender/home", component: Home}],
  },
  {
    title: "Parcels",
    items: [
      {title: "Parcel Request", url: "/sender/parcel-request", component: ParcelRequest},
      {title: "Parcels", url: "/sender/my-parcels", component: MyParcels},
      {title: "Payments", url: "/sender/my-payments", component: Payments},
    ],
  },
];

export default senderSidebarItems;
