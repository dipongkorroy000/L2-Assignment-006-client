import {useGetProfileQuery} from "@/redux/features/auth/auth.api";
import type {TRole} from "@/types/types";
import type {ComponentType} from "react";
import {Navigate} from "react-router";

const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
  return function AuthWrapper() {
    const {data: profile, isLoading} = useGetProfileQuery(undefined);

    if (isLoading) return <p className="text-center my-10">Loading... </p>;

    if (!isLoading && !profile?.data?.email) return <Navigate to="/login"></Navigate>;

    if (requiredRole && !isLoading && requiredRole !== profile?.data?.role) {
      return <Navigate to="/unauthorized"></Navigate>;
    }

    return <Component></Component>;
  };
};

export default withAuth;
