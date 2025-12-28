import {role} from "@/constants/role";
import adminSidebarItems from "@/routes/adminSidebarItems";
import receiverSidebarItems from "@/routes/receiverSidebarItems";
import senderSidebarItems from "@/routes/senderSidebarItems";
import superSidebarItems from "@/routes/superSidebarItems";
import type {TRole} from "@/types/types";

export const getSidebarItems = (userRole: TRole) => {
  switch (userRole) {
    case role.superAdmin:
      return [...superSidebarItems];

    case role.admin:
      return [...adminSidebarItems];

    case role.sender:
      return [...senderSidebarItems];

    case role.receiver:
      return [...receiverSidebarItems];

    default:
      return [];
  }
};
