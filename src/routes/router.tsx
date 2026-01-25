import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {role} from "@/constants/role";
import Login from "@/pages/Login";
import Profile from "@/pages/profile/Profile";
import Register from "@/pages/Register";
import Verification from "@/pages/Verification";
import type {TRole} from "@/types/types";
import withAuth from "@/utils/withAuth";
import {createBrowserRouter, Navigate} from "react-router";
import adminSidebarItems from "./adminSidebarItems";
import superSidebarItems from "./superSidebarItems";
import senderSidebarItems from "./senderSidebarItems";
import generateRoutes from "@/utils/generateRoutes";
import receiverSidebarItems from "./receiverSidebarItems";
import AboutUs from "@/pages/AboutUs";
import ContactUs from "@/pages/ContactUs";
import TrackingParcel from "@/pages/TrackingParcel";
import Success from "@/pages/Success";
import Home from "@/pages/Home";
import PrivacyPage from "@/components/modules/home/Privacy";
import Faq from "@/pages/web-pages/Faq";
import TermsAndConditions from "@/pages/web-pages/TermsAndConditions";
import Team from "@/pages/web-pages/Team";
import {Contact} from "@/pages/web-pages/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {index: true, Component: Home},
      {path: "/profile", Component: withAuth(Profile)},
      {path: "/contact-us", Component: ContactUs},
      {path: "/about-us", Component: AboutUs},
      {path: "/tracking-parcel", Component: TrackingParcel},
      {path: "/privacy", Component: PrivacyPage},
      {path: "/faq", Component: Faq},
      {path: "/terms-and-condition", Component: TermsAndConditions},
      {path: "/team", Component: Team},
      {path: "/contact", Component: Contact},
    ],
  },
  {
    path: "/admin",
    Component: withAuth(DashboardLayout, role.admin as TRole),
    children: [{index: true, element: <Navigate to="/admin/home"></Navigate>}, ...generateRoutes(adminSidebarItems)],
  },
  {
    path: "/super-admin",
    Component: withAuth(DashboardLayout, role.superAdmin as TRole),
    children: [{index: true, element: <Navigate to="/super-admin/home"></Navigate>}, ...generateRoutes(superSidebarItems)],
  },
  {
    path: "/sender",
    Component: withAuth(DashboardLayout, role.sender as TRole),
    children: [{index: true, element: <Navigate to="/sender/home"></Navigate>}, ...generateRoutes(senderSidebarItems)],
  },
  {
    path: "/receiver",
    Component: withAuth(DashboardLayout, role.receiver as TRole),
    children: [{index: true, element: <Navigate to="/receiver/home"></Navigate>}, ...generateRoutes(receiverSidebarItems)],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/verification",
    Component: Verification,
  },
  {
    path: "/payment/success",
    Component: Success,
  },
]);

export default router;
