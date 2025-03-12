import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../Services/isAuthenticated";

const AuthenticanGuard = ({ children }) => {
  
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default AuthenticanGuard;
