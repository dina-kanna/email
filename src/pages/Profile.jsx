
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Camera,
  Mail,
  UserRound,
  Save,
  Pencil,
  CheckCircle2,
  Inbox,
  Send,
  Star,
  HardDrive,
  ShieldCheck,
  CalendarDays,
  X,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(
    () => sessionStorage.getItem("mailflow-demo-name") || "Dinesh G"
  );
  const [email, setEmail] = useState(
    () => sessionStorage.getItem("mailflow-demo-user") || "you@example.com"
  );
  const [avatar, setAvatar] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      if (avatar.startsWith("blob:")) {
        URL.revokeObjectURL(avatar);
      }
    };
  }, [avatar]);

  const initials =
    name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join("") || "MF";

  function handleAvatarChange(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Please choose an image smaller than 5 MB.");
      return;
    }

    setError("");
    setMessage("");

    const nextAvatar = URL.createObjectURL(file);
    setAvatar((previous) => {
      if (previous.startsWith("blob:")) {
        URL.revokeObjectURL(previous);
      }
      return nextAvatar;
    });
  }

  function handleSave(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (trimmedName.length < 2) {
      setError("Please enter your full name.");
      return;
    }

    if (!trimmedEmail) {
      setError("Please enter your email address.");
      return;
    }

    sessionStorage.setItem("mailflow-demo-name", trimmedName);
    sessionStorage.setItem("mailflow-demo-user", trimmedEmail);

    setName(trimmedName);
    setEmail(trimmedEmail);
    setEditing(false);
    setMessage("Your profile has been updated for this session.");
  }

  function cancelEditing() {
    setName(
      sessionStorage.getItem("mailflow-demo-name") || "Mailflow User"
    );
    setEmail(
      sessionStorage.getItem("mailflow-demo-user") || "you@example.com"
    );
    setEditing(false);
    setError("");
    setMessage("");
  }

  return (
    <main className="min-h-screen bg-[#f6f7fb] text-slate-900 dark:bg-slate-950 dark:text-white">
      {/* Top navigation */}
      <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <ArrowLeft size={18} />
            <span>Back to inbox</span>
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 font-black tracking-tight"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white">
              <Mail size={19} />
            </span>
            <span>
              mailflow<span className="text-indigo-600">.</span>
            </span>
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
        {/* Page heading */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[2px] text-indigo-600 dark:text-indigo-400">
              <Sparkles size={15} />
              Your account
            </div>

            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
              Profile & preferences
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
              Manage your identity and keep your Mailflow workspace up to date.
            </p>
          </div>

          {!editing && (
            <button
              type="button"
              onClick={() => {
                setEditing(true);
                setMessage("");
                setError("");
              }}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:bg-indigo-700"
            >
              <Pencil size={16} />
              Edit profile
            </button>
          )}
        </div>

        {/* Feedback */}
        {message && (
          <div
            role="status"
            className="mb-6 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300"
          >
            <CheckCircle2 size={19} className="mt-0.5 shrink-0" />
            {message}
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="mb-6 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300"
          >
            <X size={19} className="mt-0.5 shrink-0" />
            {error}
          </div>
        )}

        {/* Profile hero */}
        <section className="mb-7 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="relative h-40 overflow-hidden bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-500 sm:h-52">
            <div className="absolute -right-10 -top-24 h-72 w-72 rounded-full border border-white/20" />
            <div className="absolute -right-2 -top-16 h-60 w-60 rounded-full border border-white/15" />
            <div className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-fuchsia-400/20 blur-3xl" />

            <div className="absolute left-6 top-6 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur sm:left-8 sm:top-8">
              Mailflow member
            </div>

            <div className="absolute bottom-5 right-6 hidden items-center gap-2 text-xs font-medium text-white/80 sm:flex">
              <ShieldCheck size={15} />
              Your workspace
            </div>
          </div>

          <div className="px-5 pb-6 sm:px-8 sm:pb-8">
            <div className="-mt-12 flex flex-wrap items-end justify-between gap-4 sm:-mt-14">
              <div className="relative">
                <div className="grid h-24 w-24 place-items-center overflow-hidden rounded-3xl border-4 border-white bg-gradient-to-br from-orange-200 to-rose-200 text-2xl font-black text-orange-800 shadow-lg dark:border-slate-900 sm:h-28 sm:w-28">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="Profile avatar preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    initials
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  aria-label="Upload profile picture"
                  className="absolute -bottom-2 -right-2 grid h-9 w-9 place-items-center rounded-xl border-2 border-white bg-indigo-600 text-white shadow-md transition hover:bg-indigo-700 dark:border-slate-900"
                >
                  <Camera size={16} />
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                  aria-label="Choose a profile picture"
                />
              </div>

              <div className="mb-1 flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Active account
              </div>
            </div>

            <div className="mt-5">
              <h2 className="text-2xl font-black tracking-tight">
                {name || "Mailflow User"}
              </h2>

              <p className="mt-1 flex items-center gap-2 break-all text-sm text-slate-500 dark:text-slate-400">
                <Mail size={15} className="shrink-0" />
                {email}
              </p>

              <p className="mt-3 text-xs text-slate-400">
                Click the camera icon to preview a profile picture. The preview
                is temporary and is not uploaded to a server.
              </p>
            </div>
          </div>
        </section>

        {/* Main layout */}
        <div className="grid gap-7 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Account details */}
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7">
            <div className="mb-7 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-extrabold">Personal information</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Your basic account details.
                </p>
              </div>

              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300">
                <UserRound size={19} />
              </span>
            </div>

            <form onSubmit={handleSave} className="space-y-5">
              <div>
                <label
                  htmlFor="profile-name"
                  className="mb-2 block text-xs font-bold text-slate-700 dark:text-slate-300"
                >
                  Full name
                </label>

                <div className="relative">
                  <UserRound
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="profile-name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    disabled={!editing}
                    required
                    minLength={2}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 disabled:cursor-not-allowed disabled:opacity-80 dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="profile-email"
                  className="mb-2 block text-xs font-bold text-slate-700 dark:text-slate-300"
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="profile-email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    disabled={!editing}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 disabled:cursor-not-allowed disabled:opacity-80 dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
              </div>

              {editing && (
                <div className="flex flex-wrap gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
                  >
                    <Save size={16} />
                    Save changes
                  </button>

                  <button
                    type="button"
                    onClick={cancelEditing}
                    className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </form>
          </section>

          {/* Mailflow workspace */}
          <div className="space-y-7">
            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-extrabold">Your workspace</h3>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Quick access to your mail.
                  </p>
                </div>

                <span className="grid h-10 w-10 place-items-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-300">
                  <Mail size={19} />
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="rounded-2xl border border-slate-200 p-4 text-left transition hover:border-indigo-300 hover:bg-indigo-50/50 dark:border-slate-700 dark:hover:border-indigo-700 dark:hover:bg-slate-800"
                >
                  <Inbox size={20} className="mb-3 text-indigo-600 dark:text-indigo-400" />
                  <p className="text-sm font-bold">Inbox</p>
                  <p className="mt-1 text-xs text-slate-400">View messages</p>
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="rounded-2xl border border-slate-200 p-4 text-left transition hover:border-indigo-300 hover:bg-indigo-50/50 dark:border-slate-700 dark:hover:border-indigo-700 dark:hover:bg-slate-800"
                >
                  <Send size={20} className="mb-3 text-violet-600 dark:text-violet-400" />
                  <p className="text-sm font-bold">Sent mail</p>
                  <p className="mt-1 text-xs text-slate-400">Your sent folder</p>
                </button>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-300">
                  <HardDrive size={19} />
                </span>
                <div>
                  <h3 className="font-extrabold">Storage & plan</h3>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Your current workspace allowance
                  </p>
                </div>
              </div>

              <div className="mb-3 flex items-end justify-between gap-3">
                <div>
                  <p className="text-2xl font-black">4.2 GB</p>
                  <p className="mt-1 text-xs text-slate-400">of 10 GB used</p>
                </div>
                <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                  Free plan
                </span>
              </div>

              <div
                role="progressbar"
                aria-label="Storage used"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={42}
                className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
              >
                <div className="h-full w-[42%] rounded-full bg-gradient-to-r from-indigo-600 to-violet-500" />
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <CheckCircle2 size={15} className="text-emerald-500" />
                Your current plan is active
              </div>
            </section>

            <div className="flex items-start gap-3 rounded-2xl border border-indigo-100 bg-indigo-50/70 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/30">
              <CalendarDays size={18} className="mt-0.5 shrink-0 text-indigo-600 dark:text-indigo-400" />
              <div>
                <p className="text-sm font-bold">Make yourself at home</p>
                <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
                  Keep your profile details up to date for a more personal
                  workspace.
                </p>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-10 border-t border-slate-200 py-5 text-center text-xs text-slate-400 dark:border-slate-800">
          Mailflow · Your conversations, thoughtfully organized.
        </footer>
      </div>
    </main>
  );
}
