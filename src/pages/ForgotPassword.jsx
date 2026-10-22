
import { useState } from "react";
import {
  ArrowLeft,
  Mail,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  LockKeyhole,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f7f8ff] p-4 sm:p-8 dark:bg-[#080b18]">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-indigo-400/20 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-violet-400/20 blur-[100px]" />

      <div className="relative grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-white/70 bg-white shadow-2xl shadow-indigo-950/10 md:min-h-[650px] md:grid-cols-2 dark:border-slate-800 dark:bg-slate-950">
        {/* Left branding panel */}
        <section className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-[#4338ca] via-[#6366f1] to-[#8b5cf6] p-12 text-white md:flex lg:p-16">
          <div className="absolute -right-24 top-24 h-72 w-72 rounded-full border border-white/20" />
          <div className="absolute -right-12 top-36 h-48 w-48 rounded-full border border-white/20" />

          <Link to="/" className="relative flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/20 bg-white/15 shadow-lg backdrop-blur-md">
              <Mail size={25} />
            </div>
            <span className="text-2xl font-black tracking-tight">
              mailflow<span className="text-indigo-200">.</span>
            </span>
          </Link>

          <div className="relative z-10 max-w-md">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold backdrop-blur-md">
              <Sparkles size={15} />
              YOUR WORKSPACE, SECURED
            </div>

            <h1 className="text-5xl font-extrabold leading-[1.15] tracking-tight lg:text-6xl">
              Lost your password?
              <span className="mt-2 block text-indigo-200">
                No worries.
              </span>
            </h1>

            <p className="mt-6 max-w-sm text-base leading-7 text-indigo-100">
              It happens to the best of us. Let's get you back to
              doing what you do best, one secure step at a time.
            </p>

            <div className="mt-10 flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/15">
                <ShieldCheck size={25} />
              </div>
              <div>
                <p className="text-sm font-bold">Your security matters</p>
                <p className="mt-1 text-xs text-indigo-100">
                  A simple, secure recovery experience.
                </p>
              </div>
            </div>
          </div>

          <p className="relative text-xs text-indigo-100/80">
            © 2026 Mailflow. Made with care.
          </p>
        </section>

        {/* Right form panel */}
        <section className="flex items-center justify-center px-6 py-10 sm:px-12 lg:px-16">
          <div className="w-full max-w-md">
            <Link
              to="/login"
              className="mb-12 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:-translate-x-1 hover:text-indigo-600"
            >
              <ArrowLeft size={17} />
              Back to sign in
            </Link>

            {!submitted ? (
              <>
                <div className="mb-7 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-indigo-100 to-violet-100 text-indigo-600 shadow-sm dark:from-indigo-950 dark:to-violet-950 dark:text-indigo-300">
                  <LockKeyhole size={29} />
                </div>

                <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
                  Account recovery
                </p>

                <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  Forgot password?
                </h2>

                <p className="mt-4 text-sm leading-7 text-slate-500 dark:text-slate-400">
                  Don't worry, we've got you. Enter your registered
                  email address and we'll guide you through recovery.
                </p>

                <form onSubmit={handleSubmit} className="mt-9">
                  <label
                    htmlFor="email"
                    className="mb-2.5 block text-sm font-bold text-slate-700 dark:text-slate-200"
                  >
                    Email address
                  </label>

                  <div className="group relative">
                    <Mail
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition group-focus-within:text-indigo-500"
                    />
                    <input
                      id="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@example.com"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:bg-slate-900"
                    />
                  </div>

                  <button
                    type="submit"
                    className="group mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/30 active:translate-y-0"
                  >
                    Send recovery instructions
                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </button>
                </form>

                <div className="mt-7 flex items-center justify-center gap-2 text-xs text-slate-400">
                  <ShieldCheck size={15} />
                  Your account information stays protected.
                </div>

                <p className="mt-9 text-center text-sm text-slate-500">
                  Remember your password?{" "}
                  <Link
                    to="/login"
                    className="font-bold text-indigo-600 transition hover:text-violet-600 dark:text-indigo-400"
                  >
                    Sign in
                  </Link>
                </p>
              </>
            ) : (
              <div className="animate-in fade-in duration-500">
                <div className="mb-7 grid h-16 w-16 place-items-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950">
                  <CheckCircle2 size={32} />
                </div>

                <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
                  Request received
                </p>

                <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  Check your inbox
                </h2>

                <p className="mt-4 text-sm leading-7 text-slate-500 dark:text-slate-400">
                  If an account exists for{" "}
                  <strong className="break-all text-slate-800 dark:text-white">
                    {email}
                  </strong>
                  , recovery instructions will be sent to that address.
                </p>

                <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-800 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
                  This is a frontend demo. No real recovery email is sent.
                </div>

                <Link
                  to="/login"
                  className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-4 text-sm font-bold text-white transition hover:bg-indigo-700"
                >
                  Return to sign in
                  <ArrowRight size={18} />
                </Link>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 w-full py-3 text-sm font-semibold text-slate-500 transition hover:text-indigo-600"
                >
                  Try another email
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
