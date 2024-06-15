import React, { useContext } from "react";
import { AuthContext } from "../contex/AuthProvider";
import { Navigate } from "react-router-dom";
import { AuthContextType } from "../helper/type";

const PribetRoutes = ({ children }: { children: React.ReactNode }) => {
  const { loading, user } = useContext(
    AuthContext as React.Context<AuthContextType>
  );

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

export default PribetRoutes;
