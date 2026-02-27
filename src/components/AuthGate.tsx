import { useAuth } from "@/hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";

export const AuthGate = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!user) {
    // Redirect to login with return path so CRM users get password-only login
    const redirect = encodeURIComponent(location.pathname);
    return <Navigate to={`/auth/login?redirect=${redirect}`} replace />;
  }

  return <>{children}</>;
};
