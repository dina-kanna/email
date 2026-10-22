
import { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  ArrowRight,
  Sparkles,
  UserRound,
  ShieldCheck,
  CheckCircle2,
  LockKeyhole,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const passwordChecks = [
    { label: "At least 8 characters", valid: password.length >= 8 },
    { label: "Passwords match", valid: password.length > 0 && password === confirm },
  ];

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();

    if (name.length < 2) {
      setError("Please enter your full name.");
      return;
    }

    if (password.length < 8) {
      setError("Your password must contain at least 8 characters.");
      return;
    }

    if (password !== confirm) {
      setError("Your passwords do not match.");
      return;
    }

    // Demo only; this does not create a real account.
    sessionStorage.setItem("mailflow-demo-user", email);
    sessionStorage.setItem("mailflow-demo-name", name);

    navigate("/");
  }

  return (
    <main className="grid min-h-screen bg-[#f7f8fc] text-slate-900 dark:bg-slate-950 dark:text-white lg:grid-cols-[0.95fr_1.05fr]">
      {/* Brand panel */}
      <section className="relative hidden min-h-screen flex-col justify-between overflow-hidden bg-[#17143d] p-10 text-white lg:flex xl:p-14">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/40 via-transparent to-fuchsia-500/20" />

        <div className="absolute -left-28 top-1/4 h-96 w-96 rounded-full bg-indigo-500/25 blur-3xl" />
        <div className="absolute -bottom-32 right-0 h-[30rem] w-[30rem] rounded-full bg-violet-500/25 blur-3xl" />

        <Link to="/" className="relative z-10 flex w-fit items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur">
            <Mail size={23} />
          </span>
          <span className="text-2xl font-black tracking-tight">
            mailflow<span className="text-indigo-300">.</span>
          </span>
        </Link>

        <div className="relative z-10 my-12 max-w-xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-indigo-100 backdrop-blur">
            <Sparkles size={15} className="text-amber-300" />
            Your next chapter starts here
          </div>

          <h1 className="text-5xl font-black leading-[1.12] tracking-tight xl:text-6xl">
            A better inbox.
            <span className="mt-2 block bg-gradient-to-r from-indigo-300 to-fuchsia-300 bg-clip-text text-transparent">
              A brighter day.
            </span>
          </h1>

          <p className="mt-6 max-w-md text-base leading-8 text-indigo-100/75">
            Create a space where conversations feel organized, important
            messages stand out, and your day feels a little lighter.
          </p>

          <div className="mt-10 space-y-4">
            {[
              "Keep your conversations organized",
              "Focus on the messages that matter",
              "Make your inbox work for you",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-400/15 text-emerald-300">
                  <CheckCircle2 size={15} />
                </span>
                <span className="text-sm text-indigo-50/90">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-xs text-indigo-100/50">
          © 2026 Mailflow · Thoughtfully made for you
        </p>
      </section>

      {/* Registration panel */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-10 sm:px-10">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl dark:bg-indigo-900/20" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-fuchsia-200/30 blur-3xl dark:bg-fuchsia-900/20" />

        <div className="relative w-full max-w-md">
          <Link
            to="/"
            className="mb-8 flex w-fit items-center gap-2.5 lg:hidden"
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
              <UserRound size={25} />
            </div>

            <p className="mb-3 text-xs font-extrabold uppercase tracking-[2.5px] text-indigo-600 dark:text-indigo-400">
              Get started for free
            </p>

            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              Create your
              <span className="block text-slate-400 dark:text-slate-500">
                Mailflow account.
              </span>
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-500 dark:text-slate-400">
              Just a few details and you’re ready to get organized.
            </p>
          </div>

          {error && (
            <p
              role="alert"
              className="mb-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300"
            >
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-xs font-bold text-slate-700 dark:text-slate-300"
              >
                Full name
              </label>

              <div className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 transition focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-500/10 dark:border-slate-800 dark:bg-slate-900">
                <UserRound
                  size={18}
                  className="shrink-0 text-slate-400 transition group-focus-within:text-indigo-500"
                />
                <input
                  id="name"
                  name="name"
                  required
                  minLength={2}
                  autoComplete="name"
                  placeholder="Enter your full name"
                  className="min-w-0 flex-1 bg-transparent py-3.5 text-sm outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Email */}
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
                  className="shrink-0 text-slate-400 transition group-focus-within:text-indigo-500"
                />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@company.com"
                  className="min-w-0 flex-1 bg-transparent py-3.5 text-sm outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-xs font-bold text-slate-700 dark:text-slate-300"
              >
                Password
              </label>

              <div className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 transition focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-500/10 dark:border-slate-800 dark:bg-slate-900">
                <LockKeyhole
                  size={18}
                  className="shrink-0 text-slate-400 transition group-focus-within:text-indigo-500"
                />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={8}
                  autoComplete="new-password"
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="min-w-0 flex-1 bg-transparent py-3.5 text-sm outline-none placeholder:text-slate-400"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="shrink-0 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-indigo-600 dark:hover:bg-slate-800"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm password */}
            <div>
              <label
                htmlFor="confirm"
                className="mb-2 block text-xs font-bold text-slate-700 dark:text-slate-300"
              >
                Confirm password
              </label>

              <div className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 transition focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-500/10 dark:border-slate-800 dark:bg-slate-900">
                <ShieldCheck
                  size={18}
                  className="shrink-0 text-slate-400 transition group-focus-within:text-indigo-500"
                />

                <input
                  id="confirm"
                  name="confirm"
                  type={showConfirm ? "text" : "password"}
                  required
                  minLength={8}
                  autoComplete="new-password"
                  placeholder="Enter your password again"
                  value={confirm}
                  onChange={(event) => setConfirm(event.target.value)}
                  className="min-w-0 flex-1 bg-transparent py-3.5 text-sm outline-none placeholder:text-slate-400"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirm((value) => !value)}
                  aria-label={showConfirm ? "Hide confirmation" : "Show confirmation"}
                  className="shrink-0 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-indigo-600 dark:hover:bg-slate-800"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Password guidance */}
            <div className="flex flex-wrap gap-x-4 gap-y-2 pt-1">
              {passwordChecks.map((check) => (
                <div
                  key={check.label}
                  className={`flex items-center gap-1.5 text-[11px] ${
                    check.valid
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-slate-400"
                  }`}
                >
                  <CheckCircle2 size={13} />
                  {check.label}
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-600/25 focus:outline-none focus:ring-4 focus:ring-indigo-500/25"
            >
              Create account
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-slate-500 dark:text-slate-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-indigo-600 transition hover:text-indigo-800 dark:text-indigo-400"
            >
              Sign in
            </Link>
          </p>

          <p className="mt-6 text-center text-[11px] leading-5 text-slate-400">
            Demo registration only. No real account is created on a server.
          </p>
        </div>
      </section>
    </main>
  );
}
