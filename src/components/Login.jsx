import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginAPI, signupAPI } from "../api/api.js";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice.js";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Users,
  Loader2,
} from "lucide-react";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [emailId, setEmail] = useState("kotak@gmail.com");
  const [password, setPassword] = useState("Kotak@123");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Signup fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: isLogin ? loginAPI : signupAPI,
    onSuccess: (data) => {
      dispatch(addUser(data?.data?.safeUser));
      if (isLogin) {
        navigate("/feed");
      } else {
        setIsLogin(true);
        navigate("/");
      }
    },
    onError: (error) => {
      console.error("Auth failed:", error);
    },
  });

  const isLoading = mutation.isPending;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      if (emailId && password) {
        mutation.mutate({ emailId, password });
      }
    } else {
      if (firstName && lastName && emailId && password && age && gender) {
        mutation.mutate({ firstName, lastName, emailId, password, age, gender });
      }
    }
  };

  return (
    <div className="h-screen w-full flex flex-col lg:flex-row overflow-hidden font-sans antialiased selection:bg-[#4f46e5] selection:text-white">
      
      {/* =========================================
          LEFT PANEL: Subtle Cool Ice-Blue with Full Grid
          ========================================= */}
      <div
        className="w-full lg:w-[55%] xl:w-[54%] h-full bg-[#f4f7fc] relative flex flex-col justify-between p-8 sm:p-10 lg:p-14 overflow-hidden border-r border-[#e9eef7]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(203, 213, 225, 0.45) 1px, transparent 1px), linear-gradient(to bottom, rgba(203, 213, 225, 0.45) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      >
        {/* Top Brand Bar */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white border border-[#e2e8f0] flex items-center justify-center text-[#4f46e5] shadow-xs">
              <Users className="w-5 h-5 stroke-[2]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#0f172a] text-lg tracking-tight">
                  dev_meet_up
                </span>
                <span className="text-[11px] font-mono font-medium px-1.5 py-0.5 rounded bg-[#eef2ff] text-[#4f46e5] border border-[#e0e7ff]">
                  ui
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#94a3b8] tracking-widest uppercase">
                ENGINEER_NETWORK // v2.4
              </span>
            </div>
          </div>

          {/* Active Nodes Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#e2e8f0] shadow-xs text-xs font-mono text-[#64748b]">
            <span className="h-2 w-2 rounded-full bg-[#10b981]"></span>
            <span>142 nodes active</span>
          </div>
        </div>

        {/* Headline & Description */}
        <div className="relative z-10 space-y-3.5 my-auto max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eef2ff] border border-[#e0e7ff] text-xs font-medium text-[#4f46e5]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4f46e5]"></span>
            High-Signal Technical Graph
          </div>

          <h1 className="text-4xl lg:text-[44px] font-[800] text-[#0f172a] tracking-[-0.035em] leading-[1.12]">
            Build your engineering<br />network.
          </h1>

          <p className="text-[#64748b] text-[15px] leading-relaxed max-w-lg">
            Discover verified engineers, compare technical stacks, and collaborate on real systems.
          </p>
        </div>

        {/* Graph Showcase Card */}
        <div className="relative z-10 w-full max-w-[560px] h-[225px] rounded-2xl bg-white border border-[#e2e8f0] shadow-sm overflow-hidden p-6 flex flex-col justify-between">
          {/* Subtle Grid inside card */}
          <div
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(#cbd5e1 1px, transparent 1px), radial-gradient(#e2e8f0 1px, transparent 1px)",
              backgroundSize: "22px 22px",
              backgroundPosition: "0 0, 11px 11px",
            }}
          />

          {/* Vector Connection Lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 120 48 C 170 110, 240 120, 290 148"
              fill="none"
              stroke="#c7d2fe"
              strokeWidth="1.7"
            />
            <path
              d="M 330 48 C 320 100, 280 120, 290 148"
              fill="none"
              stroke="#bae6fd"
              strokeWidth="1.7"
            />
          </svg>

          {/* Top Node Row */}
          <div className="relative z-10 flex items-center gap-3">
            {/* Elena Rostova */}
            <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white border border-[#e2e8f0] shadow-xs">
              <div className="w-7 h-7 rounded-lg bg-[#ecfdf5] text-[#059669] font-mono font-bold text-[11px] flex items-center justify-center border border-[#d1fae5]">
                ER
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#0f172a]">
                  Elena Rostova
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>
                </div>
                <div className="text-[10px] font-mono text-[#64748b]">
                  Rust • Kafka • Raft
                </div>
              </div>
            </div>

            {/* 98% MATCH Pill */}
            <div className="px-2 py-0.5 rounded-md bg-[#eef2ff] border border-[#e0e7ff] text-[10px] font-mono font-bold text-[#4f46e5]">
              98% MATCH
            </div>

            {/* Marcus Chen */}
            <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white border border-[#e2e8f0] shadow-xs">
              <div className="w-7 h-7 rounded-lg bg-[#f0f9ff] text-[#0284c7] font-mono font-bold text-[11px] flex items-center justify-center border border-[#e0f2fe]">
                MC
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#0f172a]">
                  Marcus Chen
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0ea5e9]"></span>
                </div>
                <div className="text-[10px] font-mono text-[#64748b]">
                  React • Next.js • WASM
                </div>
              </div>
              <span className="text-[9px] font-mono font-medium px-1.5 py-0.5 rounded bg-[#f1f5f9] text-[#475569] uppercase tracking-wider ml-1">
                CONNECTED
              </span>
            </div>
          </div>

          {/* Bottom Developer Profile Node */}
          <div className="relative z-10 self-start ml-16">
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white border border-[#c7d2fe] shadow-xs ring-1 ring-[#e0e7ff]">
              <div className="w-8 h-8 rounded-lg bg-[#0f172a] text-white font-mono text-[11px] font-bold flex items-center justify-center">
                DEV
              </div>
              <div>
                <div className="text-xs font-bold text-[#0f172a]">
                  Your Developer Profile
                </div>
                <div className="text-[11px] font-mono text-[#64748b] flex items-center gap-1.5">
                  Ready to sync technical stack
                  <span className="inline-block w-2.5 h-2.5 rounded-full border-[1.5px] border-[#4f46e5] border-t-transparent animate-spin"></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Metadata */}
        <div className="relative z-10 flex items-center justify-between text-xs text-[#64748b] pt-2">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#10b981]" />
            <span>Verified GitHub / Git Sync</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#4f46e5]" />
            <span>End-to-End Cryptographic Match</span>
          </div>
          <div className="text-[11px] font-mono text-[#94a3b8]">
            © 2026 dev_meet_up
          </div>
        </div>
      </div>

      {/* =========================================
          RIGHT PANEL: Pure Clean White Background
          ========================================= */}
      <div className="w-full lg:w-[45%] xl:w-[46%] h-full bg-[#ffffff] flex flex-col justify-center items-center px-8 sm:px-12 lg:px-16 xl:px-20 py-8">
        <div className="w-full max-w-[420px] space-y-6">
          
          {/* Form Title & Subtitle */}
          <div>
            <h2 className="text-[32px] font-[800] text-[#0f172a] tracking-[-0.035em] leading-tight">
              {isLogin ? "Welcome back" : "Create account"}
            </h2>
            <p className="text-sm text-[#64748b] mt-1.5">
              {isLogin
                ? "Enter your credentials to continue."
                : "Enter your details to create an account."}
            </p>
          </div>

          {/* Inputs & Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#475569] mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder="First name"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#e2e8f0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4f46e5] transition"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#475569] mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="Last name"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#e2e8f0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4f46e5] transition"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#475569] mb-1">
                      Age
                    </label>
                    <input
                      type="number"
                      placeholder="Age"
                      className="w-full px-3.5 py-2.5 bg-white border border-[#e2e8f0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4f46e5] transition"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#475569] mb-1">
                      Gender
                    </label>
                    <select
                      className="w-full px-3.5 py-2.5 bg-white border border-[#e2e8f0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4f46e5] transition"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* Email Address */}
            <div>
              <label className="block text-xs font-medium text-[#475569] mb-1.5">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94a3b8]">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  value={emailId}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="sushil.gupta@devmeetup.io"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-[#e2e8f0] rounded-xl text-sm text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#4f46e5] transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-[#475569]">
                  Password
                </label>
                {isLogin && (
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="text-xs font-medium text-[#4f46e5] hover:text-[#4338ca] transition"
                  >
                    Forgot password?
                  </a>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94a3b8]">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-white border border-[#e2e8f0] rounded-xl text-sm text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#4f46e5] transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#94a3b8] hover:text-[#64748b] cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember this device for 30 days */}
            {isLogin && (
              <div className="flex items-center">
                <label className="flex items-center gap-2 text-xs text-[#64748b] cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="h-4 w-4 rounded text-[#4f46e5] focus:ring-[#4f46e5] border-[#cbd5e1] accent-[#4f46e5] cursor-pointer"
                  />
                  <span>Remember this device for 30 days</span>
                </label>
              </div>
            )}

            {/* Error message */}
            {mutation.isError && (
              <div className="p-2.5 rounded-xl bg-[#fef2f2] border border-[#fecaca] text-xs text-[#b91c1c]">
                {mutation?.error?.response?.data?.message || "Invalid credentials. Please try again."}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-[#4f46e5] hover:bg-[#4338ca] active:bg-[#3730a3] text-white font-medium text-sm rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>{isLogin ? "Sign in" : "Create account"}</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* OR CONTINUE WITH divider */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-[#f1f5f9] w-full"></div>
            <span className="bg-white px-3 text-[10px] font-mono tracking-widest text-[#94a3b8] uppercase absolute">
              OR CONTINUE WITH
            </span>
          </div>

          {/* Continue with Google */}
          <button
            type="button"
            onClick={() => alert("Google sign-in")}
            className="w-full py-2.5 px-4 bg-white hover:bg-[#f8fafc] border border-[#e2e8f0] rounded-xl text-sm font-medium text-[#1e293b] flex items-center justify-center gap-3 shadow-xs transition cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Don't have an account? Create account */}
          <div className="text-center text-xs text-[#64748b]">
            <span>{isLogin ? "Don't have an account?" : "Already have an account?"}</span>{" "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="font-medium text-[#4f46e5] hover:underline cursor-pointer ml-1"
            >
              {isLogin ? "Create account" : "Sign in here"}
            </button>
          </div>

          {/* Bottom Links */}
          <div className="flex items-center justify-center gap-4 text-[11px] font-mono text-[#94a3b8] pt-1">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#64748b] transition">
              Manifesto
            </a>
            <span>•</span>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#64748b] transition">
              Security
            </a>
            <span>•</span>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#64748b] transition">
              Network Status
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
