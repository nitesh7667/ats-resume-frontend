import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");

    // Treat missing, empty, or the old dummy "true" value as unauthenticated
    const isAuthenticated = token && token.trim() !== "" && token !== "true";

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;