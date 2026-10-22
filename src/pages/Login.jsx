
import { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Copy,
  KeyRound,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const DEMO_EMAIL = "demo@mailflow.com";
const DEMO_PASSWORD = "Mailflow@123";

export default function Login({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function useDemoCredentials() {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (
      normalizedEmail !== DEMO_EMAIL ||
      password !== DEMO_PASSWORD
    ) {
      setError(
        "Invalid demo email or password. Please use the displayed demo credentials."
      );
      return;
    }

    setLoading(true);

    // Demo authentication only. No backend is connected.
    sessionStorage.setItem(
      "mailflow-demo-user",
      normalizedEmail
    );

    if (rememberMe) {
      localStorage.setItem("mailflow-demo-name", "Demo User");
    } else {
      localStorage.removeItem("mailflow-demo-name");
    }

    // Update authentication state in App.jsx.
    onLogin?.();

    // Navigate to the Inbox.
    navigate("/");
  }

  return (
    <main className="grid min-h-screen bg-[#f7f8fc] text-slate-900 dark:bg-slate-950 dark:text-white lg:grid-cols-[1.05fr_0.95fr]">
      {/* Brand panel */}
      <section className="relative hidden min-h-screen flex-col justify-between overflow-hidden bg-[#17143d] p-10 text-white lg:flex xl:p-14">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/40 via-transparent to-violet-500/20" />
        <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute -bottom-40 right-0 h-[32rem] w-[32rem] rounded-full bg-violet-500/20 blur-3xl" />

        <Link
          to="/"
          className="relative z-10 flex w-fit items-center gap-3"
        >
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/20 backdrop-blur">
            <Mail size={23} />
          </span>
          <span className="text-2xl font-black tracking-tight">
            mailflow<span className="text-indigo-300">.</span>
          </span>
        </Link>

        <div className="relative z-10 my-12 max-w-xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-indigo-100 backdrop-blur">
            <Sparkles size={15} className="text-amber-300" />
            A fresh perspective on email
          </div>

          <h1 className="text-5xl font-black leading-[1.12] tracking-tight xl:text-6xl">
            Make room for
            <span className="mt-2 block bg-gradient-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent">
              what matters.
            </span>
          </h1>

          <p className="mt-6 max-w-md text-base leading-8 text-indigo-100/75">
            A calmer workspace for your conversations. Stay organized,
            find your focus, and make every message count.
          </p>

          <div className="mt-10 grid max-w-md grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
              <div className="mb-3 grid h-9 w-9 place-items-center rounded-xl bg-emerald-400/15 text-emerald-300">
                <CheckCircle2 size={19} />
              </div>
              <p className="text-sm font-bold">Stay organized</p>
              <p className="mt-1 text-xs leading-5 text-indigo-100/60">
                Keep every conversation in its place.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
              <div className="mb-3 grid h-9 w-9 place-items-center rounded-xl bg-violet-400/15 text-violet-300">
                <ShieldCheck size={19} />
              </div>
              <p className="text-sm font-bold">Your workspace</p>
              <p className="mt-1 text-xs leading-5 text-indigo-100/60">
                Designed for a more focused day.
              </p>
            </div>
          </div>
        </div>

        <p className="relative z-10 text-xs text-indigo-100/50">
          © 2026 Mailflow · A better space for your inbox
        </p>
      </section>

      {/* Login panel */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-10 sm:px-10">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl dark:bg-indigo-900/20" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-violet-200/40 blur-3xl dark:bg-violet-900/20" />

        <div className="relative w-full max-w-md">
          <Link
            to="/"
            className="mb-10 flex w-fit items-center gap-2.5 lg:hidden"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/20">
              <Mail size={21} />
            </span>
            <span className="text-xl font-black tracking-tight">
              mailflow<span className="text-indigo-600">.</span>
            </span>
          </Link>

          <div className="mb-7">
            <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl border border-indigo-100 bg-white text-indigo-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-indigo-400">
              <Mail size={25} />
            </div>

            <p className="mb-3 text-xs font-extrabold uppercase tracking-[2.5px] text-indigo-600 dark:text-indigo-400">
              Welcome back
            </p>

            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              Sign in to your
              <span className="block text-slate-400 dark:text-slate-500">
                workspace.
              </span>
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-500 dark:text-slate-400">
              Sign in to access your Mailflow workspace.
            </p>
          </div>

          {/* Demo credentials card */}
          <div className="mb-6 rounded-2xl border border-indigo-200 bg-indigo-50/80 p-4 dark:border-indigo-900 dark:bg-indigo-950/40">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-600 text-white">
                  <KeyRound size={18} />
                </span>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    Demo login credentials
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    For testing the application
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
                DEMO
              </span>
            </div>

            <div className="space-y-2 rounded-xl bg-white p-3 dark:bg-slate-900">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Email
                </span>
                <span className="break-all text-right text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {DEMO_EMAIL}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setEmail(DEMO_EMAIL);
                    setError("");
                  }}
                  aria-label="Use demo email"
                  className="shrink-0 rounded-lg p-1.5 text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-slate-800"
                >
                  <Copy size={15} />
                </button>
              </div>

              <div className="flex items-center justify-between gap-2 border-t border-slate-100 pt-2 dark:border-slate-800">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Password
                </span>
                <span className="break-all text-right text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {DEMO_PASSWORD}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setPassword(DEMO_PASSWORD);
                    setError("");
                  }}
                  aria-label="Use demo password"
                  className="shrink-0 rounded-lg p-1.5 text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-slate-800"
                >
                  <Copy size={15} />
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={useDemoCredentials}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/25"
            >
              <KeyRound size={16} />
              Use Demo Credentials
            </button>
          </div>

          {error && (
            <p
              role="alert"
              className="mb-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300"
            >
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs font-bold text-slate-700 dark:text-slate-300"
              >
                Email address
              </label>

              <div className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 transition focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-500/10 dark:border-slate-800 dark:bg-slate-900">
                <Mail
                  size={18}
                  className="shrink-0 text-slate-400 group-focus-within:text-indigo-500"
                />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  autoComplete="username"
                  placeholder="demo@mailflow.com"
                  className="min-w-0 flex-1 bg-transparent py-3.5 text-sm outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <label
                  htmlFor="password"
                  className="text-xs font-bold text-slate-700 dark:text-slate-300"
                >
                  Password
                </label>

                <Link
                  to="/forgot-password"
                  className="text-xs font-bold text-indigo-600 transition hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 transition focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-500/10 dark:border-slate-800 dark:bg-slate-900">
                <ShieldCheck
                  size={18}
                  className="shrink-0 text-slate-400 group-focus-within:text-indigo-500"
                />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="Enter demo password"
                  className="min-w-0 flex-1 bg-transparent py-3.5 text-sm outline-none placeholder:text-slate-400"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="shrink-0 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-indigo-600 dark:hover:bg-slate-800"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <label className="flex w-fit cursor-pointer items-center gap-2.5 py-1 text-xs text-slate-500 dark:text-slate-400">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
                className="h-4 w-4 rounded border-slate-300 accent-indigo-600"
              />
              Remember me on this device
            </label>

            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-600/25 focus:outline-none focus:ring-4 focus:ring-indigo-500/25 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Signing in..." : "Sign in to Mailflow"}
              {!loading && (
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              )}
            </button>
          </form>

          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
              New here?
            </span>
            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
          </div>

          <Link
            to="/signup"
            className="flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-bold text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50/50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-indigo-700 dark:hover:bg-slate-800"
          >
            Create your account
          </Link>

          <p className="mt-8 text-center text-[11px] leading-5 text-slate-400">
            Demo authentication only. No real account or email server is
            connected.
          </p>
        </div>
      </section>
    </main>
  );
}
