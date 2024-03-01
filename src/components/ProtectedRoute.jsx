import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import FullScreen from "./FullScreen";
function ProtectedRoute({ children }) {
  const { user,isLoading } = useAuth();

  if(isLoading) return (
    <FullScreen>
      <span className="loader"></span>
    </FullScreen>
  );
  if (!user) return <Navigate to="/" />;

  return children;
}

export default ProtectedRoute;
