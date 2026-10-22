
import { useEffect, useRef, useState } from "react";
import {
  Archive,
  CircleHelp,
  FileText,
  Inbox as InboxIcon,
  Mail,
  Moon,
  PenSquare,
  Send,
  ShieldAlert,
  Star,
  Sun,
  Trash2,
  UserRound,
  Settings,
  LogOut,
  X,
  ChevronDown,
  HardDrive,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const navigation = [
  { id: "inbox", label: "Inbox", icon: InboxIcon },
  { id: "starred", label: "Starred", icon: Star },
  { id: "sent", label: "Sent", icon: Send },
  { id: "drafts", label: "Drafts", icon: FileText },
  { id: "spam", label: "Spam", icon: ShieldAlert },
  { id: "trash", label: "Trash", icon: Trash2 },
  { id: "archive", label: "Archive", icon: Archive },
];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1 dark:focus-visible:ring-offset-slate-900";

export default function Sidebar({
  folder = "inbox",
  emails = [],
  onFolderChange = () => {},
  onCompose = () => {},
  mobileOpen = false,
  onClose = () => {},
  darkMode = false,
  onToggleTheme = () => {},
  onProfileClick = () => {},
  onSettingsClick = () => {},
  onLogout,
  onHelpClick = () => {},
}) {
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const triggerRef = useRef(null);
  const navigate = useNavigate();

  const userEmail = sessionStorage.getItem("mailflow--user") || "";
  const storedName =
    sessionStorage.getItem("mailflow-demo-name") ||
    userEmail.split("@")[0] ||
    "Dinesh G";

  const initials =
    storedName
      .split(/[\s._-]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join("") || "MF";

  const unreadCount = emails.filter(
    (email) => email.folder === "inbox" && email.unread
  ).length;

  const draftCount = emails.filter(
    (email) => email.folder === "drafts"
  ).length;

  useEffect(() => {
    if (!profileOpen) return;

    function handleOutsideClick(event) {
      if (!profileRef.current?.contains(event.target)) {
        setProfileOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setProfileOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [profileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;

    function handleEscape(event) {
      if (event.key === "Escape") {
        setProfileOpen(false);
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [mobileOpen, onClose]);

  function selectFolder(id) {
    onFolderChange(id);
    setProfileOpen(false);
    onClose();
  }

  function handleCompose() {
    onCompose();
    onClose();
  }

  function handleProfile() {
    setProfileOpen(false);
    onClose();
    onProfileClick();
  }

  function handleSettings() {
    setProfileOpen(false);
    onClose();
    onSettingsClick();
  }

  function handleHelp() {
    onClose();
    onHelpClick();
  }

  function handleLogout() {
    setProfileOpen(false);
    onClose();

    if (onLogout) {
      onLogout();
      return;
    }

    sessionStorage.removeItem("mailflow-demo-user");
    sessionStorage.removeItem("mailflow-demo-name");
    navigate("/login");
  }

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation overlay"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-slate-950/50 backdrop-blur-[2px] md:hidden"
        />
      )}

      <aside
        id="mailflow-sidebar"
        aria-label="Email navigation"
        className={`fixed inset-y-0 left-0 z-40 flex w-[250px] flex-col overflow-y-auto border-r border-slate-200 bg-white px-3 py-3 text-slate-900 transition-transform duration-300 dark:border-slate-800 dark:bg-slate-900 dark:text-white md:static md:z-auto md:translate-x-0 ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Brand */}
        <div className="mb-4 flex items-center justify-between px-1">
          <button
            type="button"
            onClick={() => selectFolder("inbox")}
            className={`flex items-center gap-2.5 rounded-lg text-left ${focusRing}`}
            aria-label="Go to inbox"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white">
              <Mail size={20} />
            </span>
            <span className="text-lg font-black tracking-tight">
              mailflow<span className="text-indigo-600">.</span>
            </span>
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className={`rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden ${focusRing}`}
          >
            <X size={18} />
          </button>
        </div>

        {/* Compose */}
        <button
          type="button"
          onClick={handleCompose}
          className={`group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-3 py-2.5 text-sm font-bold text-white shadow-md transition hover:brightness-110 ${focusRing}`}
        >
          <PenSquare
            size={17}
            className="transition-transform group-hover:rotate-[-5deg]"
          />
          Compose email
        </button>

        {/* Folders */}
        <div className="mb-2 mt-5 flex items-center justify-between px-2">
          <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
            Your workspace
          </p>
          <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-400 dark:bg-slate-800">
            {navigation.length}
          </span>
        </div>

        <nav className="grid gap-0.5" aria-label="Email folders">
          {navigation.map(({ id, label, icon: Icon }) => {
            const active = folder === id;
            const count =
              id === "inbox"
                ? unreadCount
                : id === "drafts"
                  ? draftCount
                  : 0;

            return (
              <button
                key={id}
                type="button"
                onClick={() => selectFolder(id)}
                aria-current={active ? "page" : undefined}
                className={`group relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${focusRing} ${
                  active
                    ? "bg-indigo-50 font-semibold text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                }`}
              >
                {active && (
                  <span className="absolute bottom-2 left-0 top-2 w-[3px] rounded-r-full bg-indigo-600 dark:bg-indigo-400" />
                )}

                <Icon
                  size={18}
                  strokeWidth={active ? 2.3 : 1.8}
                  className={`shrink-0 ${
                    active ? "text-indigo-600 dark:text-indigo-300" : ""
                  }`}
                />

                <span className="min-w-0 flex-1">{label}</span>

                {count > 0 && (
                  <span
                    className={`min-w-5 rounded-md px-1.5 py-0.5 text-center text-[10px] font-bold ${
                      active
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="mt-auto space-y-2 pt-4">
          {/* Storage */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/40">
            <div className="mb-2 flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300">
                <HardDrive size={15} />
              </span>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold">Storage</p>
                <p className="text-[10px] text-slate-400">
                  4.2 GB of 10 GB used
                </p>
              </div>

              <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-300">
                42%
              </span>
            </div>

            <div
              role="progressbar"
              aria-label="Storage used"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={42}
              aria-valuetext="4.2 of 10 GB used"
              className="h-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700"
            >
              <div className="h-full w-[42%] rounded-full bg-gradient-to-r from-indigo-600 to-violet-500" />
            </div>
          </div>

          {/* Theme */}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-pressed={darkMode}
            className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 ${focusRing}`}
          >
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-slate-100 dark:bg-slate-800">
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </span>

            <span className="flex-1 text-left">
              {darkMode ? "Light mode" : "Dark mode"}
            </span>

            <span
              className={`h-[18px] w-8 rounded-full p-0.5 transition ${
                darkMode ? "bg-indigo-600" : "bg-slate-300 dark:bg-slate-700"
              }`}
            >
              <span
                className={`block h-[14px] w-[14px] rounded-full bg-white shadow-sm transition-transform ${
                  darkMode ? "translate-x-3.5" : "translate-x-0"
                }`}
              />
            </span>
          </button>

          {/* Help */}
          <button
            type="button"
            onClick={handleHelp}
            className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-slate-500 transition hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-slate-800 ${focusRing}`}
          >
            <CircleHelp size={17} />
            Help &amp; feedback
          </button>

          {/* Profile menu */}
          <div
            ref={profileRef}
            className="relative border-t border-slate-200 pt-2 dark:border-slate-800"
          >
            {profileOpen && (
              <div
                id="mailflow-profile-menu"
                className="absolute bottom-full left-0 z-50 mb-2 w-full rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl dark:border-slate-700 dark:bg-slate-800"
              >
                <p className="px-2.5 pb-1.5 pt-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Account
                </p>

                <button
                  type="button"
                  onClick={handleProfile}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 ${focusRing}`}
                >
                  <UserRound size={16} />
                  My profile
                </button>

                <button
                  type="button"
                  onClick={handleSettings}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 ${focusRing}`}
                >
                  <Settings size={16} />
                  Settings
                </button>

                <div className="my-1 border-t border-slate-100 dark:border-slate-700" />

                <button
                  type="button"
                  onClick={handleLogout}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40 ${focusRing}`}
                >
                  <LogOut size={16} />
                  Sign out
                </button>
              </div>
            )}

            <button
              ref={triggerRef}
              type="button"
              aria-expanded={profileOpen}
              aria-controls="mailflow-profile-menu"
              onClick={() => setProfileOpen((open) => !open)}
              className={`flex w-full items-center gap-2.5 rounded-lg p-1.5 text-left transition hover:bg-slate-100 dark:hover:bg-slate-800 ${focusRing}`}
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-orange-400 to-rose-500 text-xs font-extrabold text-white">
                {initials}
              </span>

              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold">
                  {storedName}
                </span>
                <span className="block truncate text-[11px] text-slate-400">
                  {userEmail || "Free plan"}
                </span>
              </span>

              <ChevronDown
                size={15}
                className={`shrink-0 text-slate-400 transition-transform ${
                  profileOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
