import {
  Archive,
  ArrowLeft,
  Forward,
  Mail,
  Reply,
  Star,
  Trash2,
} from "lucide-react";

export default function EmailDetail({
  email,
  onBack,
  onReply,
  onForward,
  onStar,
  onToggleRead,
  onArchive,
  onDelete,
}) {
  if (!email) return null;

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 p-4 dark:border-slate-800">
        <button
          type="button"
          onClick={onBack}
          className="mr-2 rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Back to inbox"
        >
          <ArrowLeft size={19} />
        </button>

        <button
          type="button"
          onClick={onArchive}
          title="Archive"
          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <Archive size={18} />
        </button>

        <button
          type="button"
          onClick={onToggleRead}
          title="Mark read or unread"
          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <Mail size={18} />
        </button>

        <button
          type="button"
          onClick={onDelete}
          title="Delete"
          className="rounded-lg p-2 text-slate-500 transition hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-slate-800"
        >
          <Trash2 size={18} />
        </button>

        <button
          type="button"
          onClick={() => onStar(email.id)}
          className={`ml-auto rounded-lg p-2 transition ${
            email.starred ? "text-amber-400" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          }`}
          aria-label="Toggle star"
        >
          <Star
            size={18}
            fill={email.starred ? "currentColor" : "none"}
          />
        </button>
      </div>

      {/* Main Email Content */}
      <div className="p-5 sm:p-8">
        <h2 className="mb-7 break-words text-xl font-extrabold tracking-tight sm:text-2xl text-slate-900 dark:text-white">
          {email.subject}
        </h2>

        {/* Sender Info */}
        <div className="flex min-w-0 items-start gap-3">
          <div
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-xs font-extrabold text-slate-700 shadow-sm"
            style={{ backgroundColor: email.color || "#E5E7EB" }}
          >
            {email.avatar || (email.name || email.sender || "U").slice(0, 2).toUpperCase()}
          </div>

          <div className="min-w-0 flex-1">
            <p className="break-words text-sm font-bold text-slate-900 dark:text-white">
              {email.name || email.sender}
            </p>
            <p className="mt-0.5 break-all text-xs text-slate-400">
              {email.email}
            </p>
            <p className="mt-0.5 text-xs text-slate-400">to me</p>
          </div>

          <span className="shrink-0 text-right text-xs text-slate-400">
            {email.date || email.time}
          </span>
        </div>

        {/* Email Body / Preview */}
        <div className="my-7 whitespace-pre-wrap break-words text-sm leading-8 text-slate-600 dark:text-slate-300">
          {email.body || email.preview}
        </div>

        {/* Action Buttons (Reply / Forward) */}
        <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-5 dark:border-slate-800">
          <button
            type="button"
            onClick={() => onReply(email)}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-200/50 transition hover:bg-indigo-700 dark:shadow-none"
          >
            <Reply size={16} />
            Reply
          </button>

          <button
            type="button"
            onClick={() => onForward(email)}
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <Forward size={16} />
            Forward
          </button>
        </div>
      </div>
    </section>
  );
}