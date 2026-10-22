
import {
  Archive,
  CheckCheck,
  ChevronLeft,
  ChevronRight,
  Filter,
  Mail,
  MoreHorizontal,
  RefreshCw,
  Star,
  Trash2,
} from "lucide-react";

export default function EmailList({
  emails,
  folder,
  tab,
  onTabChange,
  onOpen,
  onStar,
  onSelect,
  selected,
  onSelectAll,
  onMarkRead,
  onArchive,
  onDelete,
  onRefresh,
}) {
  const allSelected =
    emails.length > 0 &&
    emails.every((email) => selected.includes(email.id));

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 pb-0 pt-5 md:px-6">
        <h2 className="text-base font-extrabold tracking-tight">
          {folder.charAt(0).toUpperCase() + folder.slice(1)}
          <span className="ml-2 text-xs font-medium text-slate-400">
            {emails.length} messages
          </span>
        </h2>

        <div className="flex gap-2">
          <button
            onClick={() => onTabChange(tab === "unread" ? "all" : "unread")}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-500 hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-300"
          >
            <Filter size={14} />
            Filter
          </button>

          <button
            onClick={onRefresh}
            aria-label="Refresh inbox"
            className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            <RefreshCw size={15} />
          </button>
        </div>
      </div>

      <div className="mt-5 flex gap-6 border-b border-slate-100 px-4 md:px-6 dark:border-slate-800">
        {[
          ["all", "All mail"],
          ["unread", "Unread"],
          ["read", "Read"],
        ].map(([value, label]) => (
          <button
            key={value}
            onClick={() => onTabChange(value)}
            className={`border-b-2 px-0.5 pb-3 text-xs font-semibold transition ${
              tab === value
                ? "border-indigo-600 text-indigo-600 dark:text-indigo-300"
                : "border-transparent text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/70 px-4 py-2.5 md:px-6 dark:border-slate-800 dark:bg-slate-800/40">
        <input
          type="checkbox"
          checked={allSelected}
          onChange={(event) => onSelectAll(event.target.checked)}
          aria-label="Select all emails"
          className="h-4 w-4 accent-indigo-600"
        />

        <button
          onClick={onMarkRead}
          title="Mark as read"
          className="rounded-lg p-2 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-slate-700"
        >
          <Mail size={16} />
        </button>

        <button
          onClick={onArchive}
          title="Archive selected"
          className="rounded-lg p-2 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-slate-700"
        >
          <Archive size={16} />
        </button>

        <button
          onClick={onDelete}
          title="Delete selected"
          className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-slate-700"
        >
          <Trash2 size={16} />
        </button>

        <span className="ml-auto text-[11px] text-slate-400">
          {emails.length} messages
        </span>
      </div>

      <div>
        {emails.length === 0 ? (
          <div className="px-5 py-16 text-center">
            <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-indigo-50 text-indigo-500 dark:bg-indigo-950">
              <Mail size={25} />
            </div>

            <h3 className="font-bold">Nothing here just yet</h3>

            <p className="mt-2 text-sm text-slate-400">
              Your emails will appear here when they're available.
            </p>
          </div>
        ) : (
          emails.map((email) => (
            <div
              key={email.id}
              className={`group flex min-w-0 items-center gap-3 border-b border-slate-100 px-3 py-4 transition last:border-0 hover:bg-indigo-50/40 sm:px-5 dark:border-slate-800 dark:hover:bg-slate-800/60 ${
                email.unread ? "bg-indigo-50/20 dark:bg-indigo-950/10" : ""
              }`}
            >
              <input
                type="checkbox"
                checked={selected.includes(email.id)}
                onChange={(event) =>
                  onSelect(email.id, event.target.checked)
                }
                onClick={(event) => event.stopPropagation()}
                aria-label={`Select email from ${email.sender}`}
                className="h-4 w-4 shrink-0 accent-indigo-600"
              />

              <button
                onClick={() => onStar(email.id)}
                aria-label={email.starred ? "Unstar email" : "Star email"}
                className={`shrink-0 transition hover:scale-110 ${
                  email.starred
                    ? "text-amber-400"
                    : "text-slate-300 hover:text-amber-400"
                }`}
              >
                <Star
                  size={17}
                  fill={email.starred ? "currentColor" : "none"}
                />
              </button>

              <button
                onClick={() => onOpen(email.id)}
                className="flex min-w-0 flex-1 flex-col gap-1.5 text-left sm:flex-row sm:items-center sm:gap-4"
              >
                <span
                  className={`w-full truncate text-xs sm:w-36 sm:shrink-0 ${
                    email.unread
                      ? "font-extrabold text-slate-900 dark:text-white"
                      : "font-medium text-slate-600 dark:text-slate-300"
                  }`}
                >
                  {email.sender}
                </span>

                <span className="min-w-0 flex-1 overflow-hidden">
                  <span
                    className={`block truncate text-xs ${
                      email.unread
                        ? "font-bold text-slate-800 dark:text-slate-100"
                        : "text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    {email.subject}
                    {email.folder === "drafts" && (
                      <span className="ml-2 rounded bg-rose-50 px-1.5 py-0.5 text-[9px] font-bold text-rose-500">
                        Draft
                      </span>
                    )}
                  </span>

                  <span className="mt-1 block truncate text-xs text-slate-400">
                    {email.preview}
                  </span>
                </span>

                <span className="shrink-0 text-right text-[10px] text-slate-400 sm:w-20">
                  {email.time}
                </span>
              </button>
            </div>
          ))
        )}
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 text-[11px] text-slate-400 md:px-6 dark:border-slate-800">
        <span>
          Showing {emails.length ? 1 : 0}–{emails.length} of {emails.length}
        </span>

        <div className="flex gap-1">
          <button
            aria-label="Previous page"
            disabled
            className="rounded-lg p-1.5 disabled:opacity-40"
          >
            <ChevronLeft size={17} />
          </button>

          <button className="rounded-lg bg-indigo-600 px-2.5 py-1 font-bold text-white">
            1
          </button>

          <button
            aria-label="Next page"
            disabled
            className="rounded-lg p-1.5 disabled:opacity-40"
          >
            <ChevronRight size={17} />
          </button>
        </div>
      </div>
    </section>
  );
}
