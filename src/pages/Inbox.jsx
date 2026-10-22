
import { useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Inbox as InboxIcon,
  Star,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import EmailList from "../components/EmailList";
import EmailDetail from "../components/EmailDetail";
import ComposeModal from "../components/ComposeModal";
import { initialEmails } from "../data/emails";

const folderTitles = {
  inbox: "Inbox",
  starred: "Starred",
  sent: "Sent",
  drafts: "Drafts",
  spam: "Spam",
  trash: "Trash",
  archive: "Archive",
};

function StatCard({ icon: Icon, label, value, color, hint }) {
  return (
    <article className="flex min-w-0 items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900 sm:p-5">
      <div
        className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl sm:h-12 sm:w-12 ${color}`}
      >
        <Icon size={20} />
      </div>

      <div className="min-w-0">
        <p className="truncate text-[10px] font-medium text-slate-400 sm:text-xs">
          {label}
        </p>
        <p className="mt-1 text-xl font-extrabold tracking-tight sm:text-2xl">
          {value}
        </p>
        <p className="mt-1 hidden text-[10px] text-slate-400 sm:block">
          {hint}
        </p>
      </div>
    </article>
  );
}

export default function Inbox({
  darkMode = false,
  onThemeToggle = () => {},
}) {
  const [emails, setEmails] = useState(() =>
    initialEmails.map((email) => ({ ...email }))
  );

  const [folder, setFolder] = useState("inbox");
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openedId, setOpenedId] = useState(null);
  const [compose, setCompose] = useState(null);
  const [notice, setNotice] = useState("");

  const unread = emails.filter(
    (email) => email.folder === "inbox" && email.unread
  ).length;

  const starred = emails.filter((email) => email.starred).length;

  const openedEmail = emails.find((email) => email.id === openedId);

  const filteredEmails = useMemo(() => {
    return emails
      .filter((email) => {
        const matchesFolder =
          folder === "starred"
            ? email.starred &&
              !["trash", "spam"].includes(email.folder)
            : email.folder === folder;

        const matchesTab =
          tab === "all" ||
          (tab === "unread" && email.unread) ||
          (tab === "read" && !email.unread);

        const query = search.toLowerCase().trim();

        const matchesSearch =
          !query ||
          [
            email.sender,
            email.email,
            email.subject,
            email.preview,
            email.body,
          ].some((value) =>
            (value || "").toLowerCase().includes(query)
          );

        return matchesFolder && matchesTab && matchesSearch;
      })
      .sort((a, b) => b.id - a.id);
  }, [emails, folder, tab, search]);

  function updateEmail(id, changes) {
    setEmails((current) =>
      current.map((email) =>
        email.id === id ? { ...email, ...changes } : email
      )
    );
  }

  function showNotice(message) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2600);
  }

  function openEmail(id) {
    const email = emails.find((item) => item.id === id);
    if (!email) return;

    if (email.folder === "drafts") {
      setCompose({
        ...email,
        mode: "draft",
        to: email.to || email.email || "",
      });
      return;
    }

    updateEmail(id, { unread: false });
    setOpenedId(id);
  }

  function toggleStar(id) {
    const email = emails.find((item) => item.id === id);
    if (email) {
      updateEmail(id, { starred: !email.starred });
    }
  }

  function selectEmail(id, checked) {
    setSelected((current) =>
      checked
        ? [...new Set([...current, id])]
        : current.filter((item) => item !== id)
    );
  }

  function selectAll(checked) {
    setSelected((current) =>
      checked
        ? [
            ...new Set([
              ...current,
              ...filteredEmails.map((email) => email.id),
            ]),
          ]
        : current.filter(
            (id) =>
              !filteredEmails.some((email) => email.id === id)
          )
    );
  }

  function moveEmails(destination) {
    const ids = selected.length
      ? selected
      : openedId !== null
        ? [openedId]
        : filteredEmails.map((email) => email.id);

    if (!ids.length) return;

    setEmails((current) =>
      current.map((email) =>
        ids.includes(email.id)
          ? { ...email, folder: destination }
          : email
      )
    );

    setSelected([]);
    setOpenedId(null);

    showNotice(
      destination === "trash"
        ? "Moved to trash"
        : "Messages archived"
    );
  }

  function markRead() {
    const ids = selected.length
      ? selected
      : filteredEmails.map((email) => email.id);

    setEmails((current) =>
      current.map((email) =>
        ids.includes(email.id)
          ? { ...email, unread: false }
          : email
      )
    );

    setSelected([]);
    showNotice("Messages marked as read");
  }

  function sendEmail(message) {
    const id = Date.now();

    setEmails((current) => [
      {
        id,
        sender: "Dinesh G.",
        email: "me@mailflow.app",
        to: message.to,
        cc: message.cc,
        bcc: message.bcc,
        subject: message.subject,
        preview:
          message.body.slice(0, 120) || "(No message content)",
        body: message.body,
        time: "Just now",
        date: new Date().toLocaleString(),
        avatar: "DG",
        color: "#DCDDFD",
        unread: false,
        starred: false,
        folder: "sent",
        attachments: message.attachments || [],
      },
      ...current.filter((email) => email.id !== compose?.id),
    ]);

    setCompose(null);
    showNotice("Message sent successfully");
  }

  function saveDraft(message) {
    const id = compose?.id || Date.now();

    const draft = {
      id,
      sender: "Draft",
      email: message.to,
      to: message.to,
      cc: message.cc,
      bcc: message.bcc,
      subject: message.subject || "(No subject)",
      preview: message.body.slice(0, 120),
      body: message.body,
      time: "Just now",
      date: new Date().toLocaleString(),
      avatar: "DG",
      color: "#DCDDFD",
      unread: false,
      starred: false,
      folder: "drafts",
      attachments: message.attachments || [],
    };

    setEmails((current) => [
      draft,
      ...current.filter((email) => email.id !== id),
    ]);

    setFolder("drafts");
    setTab("all");
    setOpenedId(null);
    setSelected([]);
    setCompose(null);

    showNotice("Draft saved successfully");
  }

  function replyTo(email) {
    setOpenedId(null);

    setCompose({
      mode: "reply",
      to: email.email,
      subject: `Re: ${email.subject}`,
      body: `\n\nOn ${email.date || email.time}, ${email.sender} wrote:\n> ${email.body.replace(/\n/g, "\n> ")}`,
    });
  }

  function forwardEmail(email) {
    setOpenedId(null);

    setCompose({
      mode: "forward",
      to: "",
      subject: `Fwd: ${email.subject}`,
      body: `\n\n---------- Forwarded message ----------\nFrom: ${email.sender} <${email.email}>\nSubject: ${email.subject}\n\n${email.body}`,
    });
  }

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100">
        <Header
          search={search}
          onSearchChange={(value) => {
            setSearch(value);
            setOpenedId(null);
          }}
          onMenu={() => setMobileOpen(true)}
          dark={darkMode}
          onThemeToggle={onThemeToggle}
        />

        <div className="flex min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-76px)]">
          <Sidebar
            folder={folder}
            emails={emails}
            onFolderChange={(value) => {
              setFolder(value);
              setTab("all");
              setOpenedId(null);
              setSelected([]);
            }}
            onCompose={() => setCompose({ mode: "new" })}
            mobileOpen={mobileOpen}
            onClose={() => setMobileOpen(false)}
            darkMode={darkMode}
            onToggleTheme={onThemeToggle}
          />

          <main className="min-w-0 flex-1">
            <div className="mx-auto w-full max-w-[1500px] p-3 sm:p-5 lg:p-8">
              <div className="mb-6 flex items-start justify-between gap-3">
                <div>
                  <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[2px] text-indigo-600">
                    Your workspace
                  </p>

                  <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                    {folder === "inbox"
                      ? `Good morning, ${
                          sessionStorage.getItem("mailflow-demo-name") ||
                          "Dinesh"
                        } 👋`
                      : folderTitles[folder]}
                  </h1>

                  <p className="mt-2 text-xs text-slate-400 sm:text-sm">
                    {folder === "inbox"
                      ? "Here's what's happening in your inbox today."
                      : `Manage your ${folderTitles[folder].toLowerCase()} messages.`}
                  </p>
                </div>

                <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 sm:flex">
                  <CalendarDays size={16} className="text-indigo-500" />
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>

              {!openedEmail && (
                <div className="mb-6 grid grid-cols-3 gap-2 sm:gap-4">
                  <StatCard
                    icon={InboxIcon}
                    label="Inbox messages"
                    value={
                      emails.filter(
                        (email) => email.folder === "inbox"
                      ).length
                    }
                    color="bg-indigo-50 text-indigo-600 dark:bg-indigo-950"
                    hint="Your conversations"
                  />

                  <StatCard
                    icon={CheckCircle2}
                    label="Unread"
                    value={unread}
                    color="bg-emerald-50 text-emerald-600 dark:bg-emerald-950"
                    hint="Needs your attention"
                  />

                  <StatCard
                    icon={Star}
                    label="Starred"
                    value={starred}
                    color="bg-amber-50 text-amber-500 dark:bg-amber-950"
                    hint="Important messages"
                  />
                </div>
              )}

              {openedEmail ? (
                <EmailDetail
                  email={openedEmail}
                  onBack={() => setOpenedId(null)}
                  onReply={replyTo}
                  onForward={forwardEmail}
                  onStar={toggleStar}
                  onToggleRead={() => {
                    updateEmail(openedEmail.id, {
                      unread: !openedEmail.unread,
                    });
                    setOpenedId(null);
                  }}
                  onArchive={() => moveEmails("archive")}
                  onDelete={() => moveEmails("trash")}
                />
              ) : (
                <EmailList
                  emails={filteredEmails}
                  folder={folder}
                  tab={tab}
                  onTabChange={setTab}
                  onOpen={openEmail}
                  onStar={toggleStar}
                  onSelect={selectEmail}
                  selected={selected}
                  onSelectAll={selectAll}
                  onMarkRead={markRead}
                  onArchive={() => moveEmails("archive")}
                  onDelete={() => moveEmails("trash")}
                  onRefresh={() => showNotice("Inbox is up to date")}
                />
              )}
            </div>
          </main>
        </div>

        {compose && (
          <ComposeModal
            key={compose.id || `${compose.mode}-${compose.subject || "new"}`}
            initialEmail={compose}
            onClose={() => {
              setCompose(null);
              showNotice("Composer closed");
            }}
            onSend={sendEmail}
            onSaveDraft={saveDraft}
          />
        )}

        {notice && (
          <div
            role="status"
            className="fixed bottom-5 right-5 z-[60] max-w-[calc(100vw-40px)] rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-xl dark:bg-white dark:text-slate-900"
          >
            {notice}
          </div>
        )}
      </div>
    </div>
  );
}
