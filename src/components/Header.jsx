
import {
  Bell,
  Menu,
  Moon,
  Search,
  Sun,
  Mail,
  UserRound,
  ChevronDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header({
  search = "",
  onSearchChange,
  onMenu,
  dark = false,
  onThemeToggle,
}) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/95 px-4 backdrop-blur transition-colors md:h-[76px] md:gap-6 md:px-8 dark:border-slate-800 dark:bg-slate-900/95">
      <button
        type="button"
        onClick={onMenu}
        aria-label="Open navigation"
        className="rounded-lg p-2 hover:bg-slate-100 md:hidden dark:hover:bg-slate-800"
      >
        <Menu size={21} />
      </button>

      <button
        type="button"
        onClick={() => navigate("/")}
        className="hidden min-w-[175px] items-center gap-2.5 text-left md:flex"
        aria-label="Go to inbox"
      >
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none">
          <Mail size={21} />
        </span>
        <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          mailflow<span className="text-indigo-600">.</span>
        </span>
      </button>

      <div className="relative min-w-0 flex-1 md:max-w-2xl">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange?.(event.target.value)}
          placeholder="Search emails, people..."
          aria-label="Search emails"
          className="w-full rounded-xl border border-transparent bg-slate-100 py-3 pl-11 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white dark:bg-slate-800 dark:text-white dark:focus:border-indigo-500 dark:focus:bg-slate-800"
        />
      </div>

      <div className="ml-auto flex shrink-0 items-center gap-1 md:gap-3">
        <button
          type="button"
          onClick={onThemeToggle}
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          title={dark ? "Switch to light mode" : "Switch to dark mode"}
          className="grid h-10 w-10 place-items-center rounded-xl text-slate-500 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          {dark ? <Sun size={19} /> : <Moon size={19} />}
        </button>

        <button
          type="button"
          onClick={() => window.alert("You're all caught up!")}
          aria-label="Notifications"
          className="relative grid h-10 w-10 place-items-center rounded-xl text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <Bell size={19} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-rose-400 dark:border-slate-900" />
        </button>

        <button
          type="button"
          onClick={() => navigate("/profile")}
          aria-label="Open profile page"
          className="flex items-center gap-2 rounded-xl p-1.5 text-left transition hover:bg-slate-100 dark:hover:bg-slate-800 sm:gap-2.5"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-orange-100 text-xs font-extrabold text-orange-800">
            DG
          </span>

          <span className="hidden lg:block">
            <span className="block text-xs font-bold text-slate-900 dark:text-white">
              Dinesh G.
            </span>
            <span className="mt-0.5 block text-[11px] text-slate-400">
              Free plan
            </span>
          </span>

          <ChevronDown
            size={15}
            className="hidden text-slate-400 lg:block"
          />
        </button>
      </div>
    </header>
  );
}
