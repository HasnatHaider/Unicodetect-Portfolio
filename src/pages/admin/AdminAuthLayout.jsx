import { Outlet } from "react-router-dom";
import { AuthProvider } from "../../contexts/AuthContext";

// Wraps every admin route, so Firebase Auth loads only when /admin is visited.
export default function AdminAuthLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
