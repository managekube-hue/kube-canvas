import { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GitBranch, Loader2, Settings, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const { user, signIn, signInWithGitHub } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Determine redirect target: CRM users go to /crm, default to /uidr/technical-docs
  const redirectTo = searchParams.get("redirect") || "/uidr/technical-docs";
  const isCrmLogin = redirectTo.startsWith("/crm");

  useEffect(() => {
    if (user) {
      navigate(redirectTo, { replace: true });
    }
  }, [user, navigate, redirectTo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await signIn(email, password);
    if (error) setError(error.message);
    else navigate(redirectTo);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-full border-2 border-blue-500 flex items-center justify-center">
              <Settings size={14} className="text-blue-500" />
            </div>
            <span className="font-bold text-white tracking-wider">KUBRIC</span>
          </Link>
          <h1 className="text-2xl font-bold text-white">
            {isCrmLogin ? "CRM Sign In" : "Sign In"}
          </h1>
          <p className="text-sm text-white/50 mt-2">
            {isCrmLogin
              ? "Access ManageKube CRM. Credentials provided by your admin."
              : "Access Technical Docs & Developer Tools"}
          </p>
        </div>

        {/* GitHub SSO only for UIDR (non-CRM) */}
        {!isCrmLogin && (
          <>
            <Button
              onClick={signInWithGitHub}
              className="w-full bg-[#24292e] hover:bg-[#2f363d] text-white gap-2"
            >
              <GitBranch className="w-4 h-4" /> Sign in with GitHub
            </Button>

            <div className="flex items-center gap-3">
              <div className="flex-1 border-t border-white/10" />
              <span className="text-xs text-white/40">or</span>
              <div className="flex-1 border-t border-white/10" />
            </div>
          </>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
            required
          />
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign In"}
          </Button>
        </form>

        <p className="text-center text-xs text-white/40">
          {isCrmLogin
            ? "Credentials are managed by your CRM administrator."
            : <>Need an account? Contact your admin or{" "}<Link to="/uidr" className="text-blue-400 hover:underline">visit UIDR</Link></>}
        </p>
      </div>
    </div>
  );
}
