import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const PublicOnlyRoute = ({ children }) => {
  const { user } = useAuth();
  if (user === undefined)
    return (
      <div className="route-loader" role="status" aria-label="Loading">
        <span className="ping-loader">
          <span className="ping-loader__pulse ping-loader__pulse--1"></span>
          <span className="ping-loader__pulse ping-loader__pulse--2"></span>
          <span className="ping-loader__pulse ping-loader__pulse--3"></span>
          <span className="ping-loader__dot"></span>
        </span>
      </div>
    );
  if (user) return <Navigate to="/admin" replace />;
  return children;
};

export default PublicOnlyRoute;
