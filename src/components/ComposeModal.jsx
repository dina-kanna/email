
import { useEffect, useRef, useState } from "react";
import {
  Paperclip,
  Send,
  X,
  Minus,
  Maximize2,
  ChevronDown,
  FileText,
  Image as ImageIcon,
  FileArchive,
  Trash2,
  Check,
} from "lucide-react";

const inputClass =
  "w-full min-w-0 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-100";

const fieldClass =
  "flex items-center gap-3 border-b border-slate-100 px-5 py-3 dark:border-slate-800";

function getFileIcon(file) {
  if (file.type?.startsWith("image/")) return ImageIcon;
  if (file.type?.includes("zip")) return FileArchive;
  return FileText;
}

export default function ComposeModal({
  initialEmail,
  onClose,
  onSend,
  onSaveDraft,
}) {
  const [to, setTo] = useState(initialEmail?.to || "");
  const [cc, setCc] = useState(initialEmail?.cc || "");
  const [bcc, setBcc] = useState(initialEmail?.bcc || "");
  const [subject, setSubject] = useState(initialEmail?.subject || "");
  const [body, setBody] = useState(initialEmail?.body || "");
  const [showCC, setShowCC] = useState(Boolean(initialEmail?.cc));
  const [showBCC, setShowBCC] = useState(Boolean(initialEmail?.bcc));
  const [attachments, setAttachments] = useState([]);
  const [minimized, setMinimized] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [sending, setSending] = useState(false);

  const fileInputRef = useRef(null);
  const toInputRef = useRef(null);

  const mode = initialEmail?.mode || "new";

  const title =
    mode === "reply"
      ? "Reply to message"
      : mode === "forward"
        ? "Forward message"
        : mode === "draft"
          ? "Edit draft"
          : "New message";

  useEffect(() => {
    toInputRef.current?.focus();

    function handleEscape(event) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  function handleFiles(event) {
    const selectedFiles = Array.from(event.target.files || []);

    setAttachments((current) => {
      const combined = [...current, ...selectedFiles];

      return combined.filter(
        (file, index, list) =>
          list.findIndex(
            (item) =>
              item.name === file.name &&
              item.size === file.size &&
              item.lastModified === file.lastModified
          ) === index
      );
    });

    // Allows selecting the same file again after removing it.
    event.target.value = "";
  }

  function removeAttachment(indexToRemove) {
    setAttachments((current) =>
      current.filter((_, index) => index !== indexToRemove)
    );
  }

  function getMessage() {
    return {
      to: to.trim(),
      cc: cc.trim(),
      bcc: bcc.trim(),
      subject: subject.trim(),
      body,
      attachments: [
        ...(initialEmail?.attachments || []),
        ...attachments.map((file) => file.name),
      ],
    };
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (sending) return;

    setSending(true);

    try {
      onSend(getMessage());
    } finally {
      setSending(false);
    }
  }

  function handleSaveDraft() {
    onSaveDraft({
      ...getMessage(),
      id: initialEmail?.id,
    });
  }

  return (
    <div
      className={`fixed inset-0 z-50 ${
        minimized ? "pointer-events-none" : "flex items-center justify-center"
      } bg-slate-950/50 p-0 backdrop-blur-[3px] sm:p-4`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {minimized ? (
        <div className="pointer-events-auto fixed bottom-0 right-4 flex w-[min(380px,calc(100vw-2rem))] items-center justify-between rounded-t-2xl bg-slate-900 px-4 py-3 text-white shadow-2xl">
          <button
            type="button"
            onClick={() => setMinimized(false)}
            className="flex min-w-0 flex-1 items-center gap-2 text-left text-sm font-semibold"
          >
            <MailIcon />
            <span className="truncate">{subject || "New message"}</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Discard and close composer"
            className="rounded-lg p-2 text-slate-300 hover:bg-slate-700 hover:text-white"
          >
            <X size={17} />
          </button>
        </div>
      ) : (
        <section
          role="dialog"
          aria-modal="true"
          aria-labelledby="compose-title"
          className={`flex max-h-[100dvh] w-full flex-col overflow-hidden bg-white shadow-2xl transition-all dark:bg-slate-900 sm:rounded-2xl sm:border sm:border-slate-200 dark:sm:border-slate-700 ${
            expanded
              ? "h-[100dvh] max-w-none sm:h-[94dvh]"
              : "h-[100dvh] max-w-2xl sm:h-auto sm:max-h-[92dvh]"
          }`}
        >
          {/* Composer header */}
          <header className="flex shrink-0 items-center justify-between bg-slate-900 px-5 py-4 text-white dark:bg-slate-950">
            <div className="flex min-w-0 items-center gap-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-indigo-500/20 text-indigo-300">
                <Send size={17} />
              </div>
              <div className="min-w-0">
                <h2
                  id="compose-title"
                  className="truncate text-sm font-bold"
                >
                  {title}
                </h2>
                <p className="mt-0.5 text-[11px] text-slate-400">
                  Compose your message
                </p>
              </div>
            </div>

            <div className="ml-3 flex shrink-0 items-center gap-1">
              <button
                type="button"
                onClick={() => setMinimized(true)}
                aria-label="Minimize composer"
                className="rounded-lg p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                <Minus size={17} />
              </button>
              <button
                type="button"
                onClick={() => setExpanded((value) => !value)}
                aria-label={expanded ? "Restore composer size" : "Expand composer"}
                className="hidden rounded-lg p-2 text-slate-300 transition hover:bg-white/10 hover:text-white sm:block"
              >
                <Maximize2 size={16} />
              </button>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close composer"
                className="rounded-lg p-2 text-slate-300 transition hover:bg-rose-500/20 hover:text-rose-300"
              >
                <X size={18} />
              </button>
            </div>
          </header>

          <form
            onSubmit={handleSubmit}
            className="flex min-h-0 flex-1 flex-col"
          >
            {/* Recipient fields */}
            <div className="shrink-0">
              <div className={fieldClass}>
                <label
                  htmlFor="compose-to"
                  className="w-10 shrink-0 text-xs font-semibold text-slate-500 dark:text-slate-400"
                >
                  To
                </label>
                <input
                  ref={toInputRef}
                  id="compose-to"
                  type="text"
                  required
                  value={to}
                  onChange={(event) => setTo(event.target.value)}
                  placeholder="name@example.com"
                  autoComplete="email"
                  className={inputClass}
                />

                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() => setShowCC((value) => !value)}
                    className={`text-xs font-semibold ${
                      showCC
                        ? "text-indigo-600 dark:text-indigo-400"
                        : "text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                    }`}
                  >
                    CC
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowBCC((value) => !value)}
                    className={`text-xs font-semibold ${
                      showBCC
                        ? "text-indigo-600 dark:text-indigo-400"
                        : "text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                    }`}
                  >
                    BCC
                  </button>
                </div>
              </div>

              {showCC && (
                <div className={fieldClass}>
                  <label
                    htmlFor="compose-cc"
                    className="w-10 shrink-0 text-xs font-semibold text-slate-500 dark:text-slate-400"
                  >
                    CC
                  </label>
                  <input
                    id="compose-cc"
                    type="text"
                    value={cc}
                    onChange={(event) => setCc(event.target.value)}
                    placeholder="Add carbon copy recipients"
                    className={inputClass}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setShowCC(false);
                      setCc("");
                    }}
                    aria-label="Remove CC field"
                    className="text-slate-400 hover:text-rose-500"
                  >
                    <X size={15} />
                  </button>
                </div>
              )}

              {showBCC && (
                <div className={fieldClass}>
                  <label
                    htmlFor="compose-bcc"
                    className="w-10 shrink-0 text-xs font-semibold text-slate-500 dark:text-slate-400"
                  >
                    BCC
                  </label>
                  <input
                    id="compose-bcc"
                    type="text"
                    value={bcc}
                    onChange={(event) => setBcc(event.target.value)}
                    placeholder="Add hidden recipients"
                    className={inputClass}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setShowBCC(false);
                      setBcc("");
                    }}
                    aria-label="Remove BCC field"
                    className="text-slate-400 hover:text-rose-500"
                  >
                    <X size={15} />
                  </button>
                </div>
              )}

              <div className={fieldClass}>
                <label
                  htmlFor="compose-subject"
                  className="w-10 shrink-0 text-xs font-semibold text-slate-500 dark:text-slate-400"
                >
                  Subject
                </label>
                <input
                  id="compose-subject"
                  type="text"
                  required
                  value={subject}
                  onChange={(event) => setSubject(event.target.value)}
                  placeholder="What's this about?"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Message editor */}
            <div className="flex min-h-0 flex-1 flex-col px-5 pt-4">
              <label
                htmlFor="compose-message"
                className="mb-3 text-xs font-semibold text-slate-500 dark:text-slate-400"
              >
                Message
              </label>

              <textarea
                id="compose-message"
                value={body}
                onChange={(event) => setBody(event.target.value)}
                placeholder="Write your message here..."
                className="min-h-[140px] w-full flex-1 resize-none bg-transparent text-sm leading-7 text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-200"
              />

              {/* Attachments */}
              {attachments.length > 0 && (
                <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {attachments.map((file, index) => {
                    const FileIcon = getFileIcon(file);

                    return (
                      <div
                        key={`${file.name}-${file.size}-${file.lastModified}`}
                        className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800"
                      >
                        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
                          <FileIcon size={17} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-semibold text-slate-700 dark:text-slate-200">
                            {file.name}
                          </p>
                          <p className="mt-1 text-[10px] text-slate-400">
                            {file.size < 1024 * 1024
                              ? `${Math.max(1, Math.round(file.size / 1024))} KB`
                              : `${(file.size / (1024 * 1024)).toFixed(1)} MB`}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeAttachment(index)}
                          aria-label={`Remove ${file.name}`}
                          className="shrink-0 rounded-lg p-1.5 text-slate-400 hover:bg-rose-100 hover:text-rose-600 dark:hover:bg-rose-950"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 rounded-lg border border-dashed border-slate-300 px-3 py-2 text-xs font-semibold text-slate-500 transition hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-indigo-500 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-300"
                >
                  <Paperclip size={15} />
                  Attach files
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFiles}
                  className="hidden"
                  aria-label="Choose attachment files"
                />

                <span className="text-[10px] text-slate-400">
                  {attachments.length
                    ? `${attachments.length} attachment${attachments.length === 1 ? "" : "s"}`
                    : "Add documents or images"}
                </span>
              </div>
            </div>

            {/* Actions */}
            <footer className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-slate-100 bg-slate-50/80 px-4 py-4 dark:border-slate-800 dark:bg-slate-900 sm:px-5">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Send size={15} />
                  {sending ? "Sending..." : "Send"}
                </button>

                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-bold text-slate-600 transition hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-indigo-500 dark:hover:text-indigo-300"
                >
                  <Check size={15} />
                  Save draft
                </button>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="rounded-xl px-3 py-2.5 text-xs font-semibold text-rose-500 transition hover:bg-rose-50 dark:hover:bg-rose-950/40"
              >
                Discard
              </button>
            </footer>
          </form>
        </section>
      )}
    </div>
  );
}

function MailIcon() {
  return <Send size={16} className="shrink-0 text-indigo-300" />;
}
