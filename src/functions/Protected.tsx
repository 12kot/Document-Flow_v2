import React, { ReactElement } from "react";
import { Navigate } from "react-router-dom";

type ProtectedProps = {
  isLoggedIn: boolean;
  path: string;
  children: ReactElement;
};

const Protected: React.FC<ProtectedProps> = ({
  isLoggedIn,
  path,
  children,
}): ReactElement => {
  if (!isLoggedIn) return <Navigate to={path} />;

  return children;
};

export default Protected;
