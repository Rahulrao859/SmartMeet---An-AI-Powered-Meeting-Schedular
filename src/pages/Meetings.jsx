import { useState, useRef, useEffect } from "react";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const MEETINGS = [
  {
    id: 1,
    title: "Project Sync",
    date: "Mon, May 5",
    time: "5:00 PM",
    duration: "45 min",
    link: "https://teams.microsoft.com/l/meetup-join/example1",
    tag: "Engineering",
    tagColor: "from-blue-500 to-cyan-400",
    participants: [
      { id: 1, name: "Alex Chen",    initials: "AC", status: "online",  color: "from-violet-500 to-purple-400" },
      { id: 2, name: "Jamie Torres", initials: "JT", status: "online",  color: "from-sky-500 to-blue-400" },
      { id: 3, name: "Morgan Lee",   initials: "ML", status: "offline", color: "from-emerald-500 to-teal-400" },
      { id: 4, name: "Riley Park",   initials: "RP", status: "online",  color: "from-pink-500 to-rose-400" },
    ],
    messages: [
      { id: 1, user: "Alex Chen",    text: "Hey everyone, agenda doc is pinned above 👆",  time: "4:52 PM" },
      { id: 2, user: "Jamie Torres", text: "Thanks! Already had a look, let's discuss the Q3 blockers first.", time: "4:54 PM" },
      { id: 3, user: "Morgan Lee",   text: "I'll join 5 min late, heads up!",               time: "4:58 PM" },
    ],
  },
  {
    id: 2,
    title: "Design Review",
    date: "Tue, May 6",
    time: "10:00 AM",
    duration: "60 min",
    link: "https://meet.google.com/example2",
    tag: "Design",
    tagColor: "from-fuchsia-500 to-pink-400",
    participants: [
      { id: 1, name: "Sam Rivera",  initials: "SR", status: "online",  color: "from-orange-500 to-amber-400" },
      { id: 2, name: "Dana Kim",    initials: "DK", status: "online",  color: "from-teal-500 to-green-400" },
      { id: 3, name: "Quinn Patel", initials: "QP", status: "offline", color: "from-indigo-500 to-blue-400" },
    ],
    messages: [
      { id: 1, user: "Sam Rivera", text: "Figma link shared in the calendar invite 🎨", time: "9:45 AM" },
      { id: 2, user: "Dana Kim",   text: "Perfect, I'll come prepared with feedback on the nav flow.", time: "9:50 AM" },
    ],
  },
  {
    id: 3,
    title: "Quarterly Planning",
    date: "Wed, May 7",
    time: "2:00 PM",
    duration: "90 min",
    link: "https://zoom.us/j/example3",
    tag: "Strategy",
    tagColor: "from-amber-500 to-yellow-400",
    participants: [
      { id: 1, name: "Jordan Moss",  initials: "JM", status: "online",  color: "from-red-500 to-orange-400" },
      { id: 2, name: "Casey Wright", initials: "CW", status: "online",  color: "from-cyan-500 to-sky-400" },
      { id: 3, name: "Blake Stone",  initials: "BS", status: "online",  color: "from-lime-500 to-green-400" },
      { id: 4, name: "Drew Hayes",   initials: "DH", status: "offline", color: "from-violet-500 to-fuchsia-400" },
      { id: 5, name: "Avery Cole",   initials: "AC", status: "online",  color: "from-pink-500 to-red-400" },
    ],
    messages: [
      { id: 1, user: "Jordan Moss",  text: "This will be a big one — please review the OKRs doc beforehand.", time: "1:30 PM" },
      { id: 2, user: "Casey Wright", text: "Done! I've also added a few slides on market expansion.", time: "1:45 PM" },
      { id: 3, user: "Blake Stone",  text: "Excited for this. See everyone at 2! 🚀", time: "1:55 PM" },
    ],
  },
  {
    id: 4,
    title: "1:1 Check-in",
    date: "Thu, May 8",
    time: "11:30 AM",
    duration: "30 min",
    link: "https://teams.microsoft.com/l/meetup-join/example4",
    tag: "HR",
    tagColor: "from-teal-500 to-emerald-400",
    participants: [
      { id: 1, name: "Nora Blaine", initials: "NB", status: "online",  color: "from-purple-500 to-indigo-400" },
      { id: 2, name: "Theo Banks",  initials: "TB", status: "offline", color: "from-green-500 to-teal-400" },
    ],
    messages: [
      { id: 1, user: "Nora Blaine", text: "Hi Theo, looking forward to our session!", time: "11:00 AM" },
    ],
  },
];

// ─── ChatBox ──────────────────────────────────────────────────────────────────
function ChatBox({ meetingId, initialMessages }) {
  const [msgs, setMsgs] = useState(initialMessages);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMsgs((prev) => [...prev, { id: Date.now(), user: "You", text, time }]);
    setInput("");
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <div className="flex flex-col rounded-2xl overflow-hidden border border-white/10 bg-[#0d1226]/70 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
        <span className="text-[11px] font-semibold tracking-widest uppercase text-slate-400">Group Chat</span>
        <span className="ml-auto flex items-center gap-1.5 text-[11px] text-slate-500">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
          Live
        </span>
      </div>

      {/* Messages */}
      <div className="flex flex-col gap-3 overflow-y-auto h-48 px-4 py-3 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
        {msgs.map((m) => (
          <div key={m.id} className={`flex flex-col gap-0.5 ${m.user === "You" ? "items-end" : "items-start"}`}>
            <span className="text-[11px] text-slate-500 px-1">{m.user === "You" ? "You" : m.user} · {m.time}</span>
            <div
              className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                m.user === "You"
                  ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-br-sm"
                  : "bg-white/8 text-slate-200 rounded-bl-sm border border-white/10"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 px-3 py-3 border-t border-white/10">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Type a message…"
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-blue-500/60 focus:bg-white/8 transition-all"
        />
        <button
          onClick={send}
          className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 transition-all shadow-lg shadow-blue-900/40 active:scale-95"
        >
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── MeetingDetails ───────────────────────────────────────────────────────────
function MeetingDetails({ meeting }) {
  return (
    <div className="px-4 pb-4 pt-1 flex flex-col gap-4">
      {/* Join Button */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400">{meeting.duration} · Starts at {meeting.time}</span>
        <a
          href={meeting.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white text-sm font-semibold shadow-lg shadow-blue-900/40 transition-all hover:scale-105 active:scale-95"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Join Meeting
        </a>
      </div>

      {/* Participants */}
      <div>
        <p className="text-[11px] font-semibold tracking-widest uppercase text-slate-400 mb-3">
          Participants <span className="text-slate-600">({meeting.participants.length})</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {meeting.participants.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl px-3 py-2 hover:bg-white/10 transition-colors cursor-default"
            >
              <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${p.color} flex items-center justify-center text-white text-[11px] font-bold shrink-0`}>
                {p.initials}
              </div>
              <span className="text-sm text-slate-300 whitespace-nowrap">{p.name}</span>
              <span className={`w-2 h-2 rounded-full shrink-0 ${p.status === "online" ? "bg-emerald-400" : "bg-slate-600"}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Chat */}
      <ChatBox meetingId={meeting.id} initialMessages={meeting.messages} />
    </div>
  );
}

// ─── MeetingCard ──────────────────────────────────────────────────────────────
function MeetingCard({ meeting, isOpen, onToggle }) {
  return (
    <div
      className={`rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer
        ${isOpen
          ? "border-blue-500/40 shadow-xl shadow-blue-900/20 bg-[#0d1630]"
          : "border-white/8 hover:border-white/20 bg-[#0d1226]/60 hover:bg-[#0f1730]/80 hover:shadow-lg hover:shadow-blue-950/30 hover:scale-[1.01]"
        }`}
      onClick={onToggle}
    >
      {/* Card Header */}
      <div className="flex items-center gap-4 px-4 py-4">
        {/* Icon */}
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${meeting.tagColor} flex items-center justify-center shadow-lg shrink-0`}>
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-white text-[15px] truncate">{meeting.title}</p>
          <p className="text-xs text-slate-400 mt-0.5">{meeting.date} · {meeting.time}</p>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 shrink-0">
          <span className={`hidden sm:inline-flex px-2.5 py-1 rounded-full text-[11px] font-semibold bg-gradient-to-r ${meeting.tagColor} text-white bg-opacity-20`}>
            {meeting.tag}
          </span>

          {/* Avatar stack */}
          <div className="flex -space-x-2">
            {meeting.participants.slice(0, 3).map((p) => (
              <div key={p.id} className={`w-6 h-6 rounded-full bg-gradient-to-br ${p.color} border-2 border-[#080e1f] flex items-center justify-center text-white text-[9px] font-bold`}>
                {p.initials[0]}
              </div>
            ))}
            {meeting.participants.length > 3 && (
              <div className="w-6 h-6 rounded-full bg-white/10 border-2 border-[#080e1f] flex items-center justify-center text-slate-300 text-[9px] font-bold">
                +{meeting.participants.length - 3}
              </div>
            )}
          </div>

          {/* Chevron */}
          <svg
            className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Expanded Content */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? "max-h-[900px] opacity-100" : "max-h-0 opacity-0"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-t border-white/8">
          <MeetingDetails meeting={meeting} />
        </div>
      </div>
    </div>
  );
}

// ─── MeetingsPage ─────────────────────────────────────────────────────────────
export default function MeetingsPage() {
  const [openId, setOpenId] = useState(null);
  const [filter, setFilter] = useState("All");

  const tags = ["All", ...Array.from(new Set(MEETINGS.map((m) => m.tag)))];

  const filtered = filter === "All" ? MEETINGS : MEETINGS.filter((m) => m.tag === filter);

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <div className="min-h-screen bg-[#080e1f] font-[system-ui]">
      <main className="flex flex-col min-h-screen overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between px-6 py-5 border-b border-white/6">
          <div>
            <h1 className="text-white text-xl font-bold">Meetings</h1>
            <p className="text-slate-500 text-xs mt-0.5">{MEETINGS.length} scheduled this week</p>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-semibold shadow-lg shadow-blue-900/40 hover:from-blue-500 hover:to-violet-500 transition-all hover:scale-105 active:scale-95">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            New Meeting
          </button>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {/* Filter pills */}
          <div className="flex gap-2 mb-5 flex-wrap">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  filter === t
                    ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-900/30"
                    : "bg-white/5 border border-white/10 text-slate-400 hover:text-slate-200 hover:bg-white/10"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { label: "This Week",   value: MEETINGS.length,  icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", color: "from-blue-500 to-cyan-400" },
              { label: "Online Now",  value: MEETINGS.reduce((acc, m) => acc + m.participants.filter(p => p.status === "online").length, 0), icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", color: "from-emerald-500 to-teal-400" },
              { label: "Total Mins",  value: MEETINGS.reduce((acc, m) => acc + parseInt(m.duration), 0), icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", color: "from-violet-500 to-purple-400" },
              { label: "Messages",    value: MEETINGS.reduce((acc, m) => acc + m.messages.length, 0), icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z", color: "from-pink-500 to-rose-400" },
            ].map((s) => (
              <div key={s.label} className="bg-[#0a1228]/70 border border-white/8 rounded-2xl px-4 py-3 flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-lg`}>
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-bold text-lg leading-tight">{s.value}</p>
                  <p className="text-slate-500 text-[11px]">{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Meeting Cards */}
          <div className="flex flex-col gap-3 pb-6">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                <svg className="w-10 h-10 mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <p className="text-sm">No meetings found</p>
              </div>
            ) : (
              filtered.map((m) => (
                <MeetingCard
                  key={m.id}
                  meeting={m}
                  isOpen={openId === m.id}
                  onToggle={() => toggle(m.id)}
                />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}