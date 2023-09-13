import { getCookie } from "./cookie/Cookie";
import { Navigate } from "react-router-dom";

const PrivateRoute = (props: any) => {
  const isAuthenticated = getCookie("token");
  console.log(props);
  return isAuthenticated === undefined ? (
    <Navigate to="/login" />
  ) : (
    props.component
  );
};

export default PrivateRoute;
