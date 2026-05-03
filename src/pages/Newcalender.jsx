import { useState } from "react";

// ── Icons (inline SVG components to avoid external deps) ──────────────────────
const CheckIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1.5,5 4,7.5 8.5,2.5" />
  </svg>
);
const PlusIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="8" y1="2" x2="8" y2="14" /><line x1="2" y1="8" x2="14" y2="8" />
  </svg>
);
const ChevronIcon = ({ dir }) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
    {dir === "left" ? <polyline points="10,3 5,8 10,13" /> : <polyline points="6,3 11,8 6,13" />}
  </svg>
);
const XIcon = () => (
  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-3 h-3">
    <line x1="2" y1="2" x2="10" y2="10" /><line x1="10" y1="2" x2="2" y2="10" />
  </svg>
);

// ── Data ──────────────────────────────────────────────────────────────────────
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAY_LABELS = ["Su","Mo","Tu","We","Th","Fr","Sa"];
const EVENT_DAYS = new Set([3, 8, 12, 15, 20, 22, 28]);

const CONNECTED_CALENDARS = [
  { id: 1, name: "Google Calendar", email: "user@company.com", emoji: "📅", bg: "bg-red-500/10", dot: "bg-red-400" },
];

const AVAILABLE_INTEGRATIONS = [
  { id: 2, name: "Outlook Calendar", desc: "Connect your Outlook calendar to sync meetings", emoji: "📧", bg: "bg-blue-500/10" },
  { id: 3, name: "Zoom", desc: "Automatically generate Zoom links for meetings", emoji: "🎥", bg: "bg-sky-400/10" },
  { id: 4, name: "Microsoft Teams", desc: "Sync Teams status and create meeting links", emoji: "💼", bg: "bg-indigo-500/10" },
];

const PRIORITY_COLORS = { high: "bg-red-400", med: "bg-amber-400", low: "bg-emerald-400" };

const INITIAL_TASKS = [
  { id: 1, text: "Review Q2 calendar syncs", done: false, priority: "high" },
  { id: 2, text: "Connect Outlook calendar", done: false, priority: "med" },
  { id: 3, text: "Schedule team standup", done: true, priority: "low" },
  { id: 4, text: "Setup Zoom integration", done: false, priority: "med" },
];

// ── Mini Calendar ─────────────────────────────────────────────────────────────
function MiniCalendar() {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState(today.getDate());

  const changeMonth = (dir) => {
    let m = viewMonth + dir, y = viewYear;
    if (m > 11) { m = 0; y++; }
    if (m < 0) { m = 11; y--; }
    setViewMonth(m); setViewYear(y);
  };

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPrev = new Date(viewYear, viewMonth, 0).getDate();
  const trailing = 42 - firstDay - daysInMonth;

  const isCurrentMonth = viewMonth === today.getMonth() && viewYear === today.getFullYear();

  return (
    <div className="px-5 py-4 border-b border-white/5">
      {/* Header */}
      <p className="text-[11px] font-semibold tracking-widest text-white/30 uppercase mb-4">Calendar</p>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xl font-bold text-white/90">{MONTHS[viewMonth]} {viewYear}</span>
        <div className="flex gap-1">
          {["left","right"].map((d,i) => (
            <button
              key={d}
              onClick={() => changeMonth(i === 0 ? -1 : 1)}
              className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/10 border border-white/8 flex items-center justify-center transition-all duration-150 text-white/50 hover:text-white/80"
            >
              <ChevronIcon dir={d} />
            </button>
          ))}
        </div>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 mb-2">
        {DAY_LABELS.map(d => (
          <div key={d} className="text-center text-[12px] font-semibold text-white/25 tracking-wider py-1">{d}</div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-y-2 gap-x-1">
        {/* Prev month trailing */}
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`p${i}`} className="flex items-center justify-center h-14 text-[14px] text-white/15 rounded-2xl">
            {daysInPrev - firstDay + 1 + i}
          </div>
        ))}
        {/* Current month */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const d = i + 1;
          const isToday = isCurrentMonth && d === today.getDate();
          const isSel = isCurrentMonth && d === selected && !isToday;
          const hasEvent = EVENT_DAYS.has(d);
          return (
            <button
              key={d}
              onClick={() => setSelected(d)}
              className={`relative flex items-center justify-center h-14 w-full text-[15px] rounded-2xl font-medium transition-all duration-150
                ${isToday ? "bg-violet-500 text-white shadow-lg shadow-violet-500/30" : ""}
                ${isSel ? "bg-violet-500/15 text-violet-300 ring-1 ring-violet-500/40" : ""}
                ${!isToday && !isSel ? "text-white/50 hover:bg-white/8 hover:text-white/80" : ""}
              `}
            >
              {d}
              {hasEvent && (
                <span className={`absolute bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${isToday ? "bg-white/60" : "bg-violet-400"}`} />
              )}
            </button>
          );
        })}
        {/* Next month leading */}
        {Array.from({ length: trailing }).map((_, i) => (
          <div key={`n${i}`} className="flex items-center justify-center h-14 text-[14px] text-white/15 rounded-2xl">
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Todo Sidebar ──────────────────────────────────────────────────────────────
function TodoSidebar() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [input, setInput] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [nextId, setNextId] = useState(10);

  const addTask = () => {
    const text = input.trim();
    if (!text) return;
    setTasks(t => [{ id: nextId, text, done: false, priority: "low" }, ...t]);
    setNextId(n => n + 1);
    setInput("");
    setShowInput(false);
  };

  const toggleTask = (id) => setTasks(t => t.map(x => x.id === id ? { ...x, done: !x.done } : x));
  const deleteTask = (id) => setTasks(t => t.filter(x => x.id !== id));

  const sorted = [...tasks.filter(t => !t.done), ...tasks.filter(t => t.done)];

  return (
    <div className="flex-1 overflow-y-auto px-5 py-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[10px] font-semibold tracking-widest text-white/30 uppercase">To-Do</p>
        <button
          onClick={() => { setShowInput(s => !s); }}
          className="w-6 h-6 rounded-lg bg-violet-500/20 hover:bg-violet-500 border border-violet-500/30 flex items-center justify-center text-violet-400 hover:text-white transition-all duration-200"
        >
          <PlusIcon className="w-3 h-3" />
        </button>
      </div>

      {/* Input */}
      {showInput && (
        <div className="flex gap-2 mb-3">
          <input
            autoFocus
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") addTask(); if (e.key === "Escape") setShowInput(false); }}
            placeholder="Add a task…"
            className="flex-1 bg-white/5 border border-white/10 focus:border-violet-500/50 text-white/80 placeholder-white/20 text-[12px] px-3 py-2 rounded-lg outline-none transition-colors font-medium"
          />
          <button
            onClick={addTask}
            className="bg-violet-500 hover:bg-violet-400 text-white text-[11px] font-semibold px-3 rounded-lg transition-colors"
          >
            Add
          </button>
        </div>
      )}

      {/* Task list */}
      <div className="flex flex-col gap-1.5">
        {sorted.length === 0 && (
          <p className="text-center text-white/20 text-[12px] py-6">No tasks yet ✨</p>
        )}
        {sorted.map(task => (
          <div
            key={task.id}
            className={`group flex items-start gap-2.5 px-3 py-2.5 rounded-xl border transition-all duration-200
              ${task.done ? "bg-white/2 border-white/4 opacity-40" : "bg-white/4 border-white/7 hover:border-white/14"}
            `}
          >
            {/* Priority dot */}
            <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${PRIORITY_COLORS[task.priority]}`} />
            {/* Check */}
            <button
              onClick={() => toggleTask(task.id)}
              className={`w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center mt-0.5 transition-all duration-200
                ${task.done ? "bg-emerald-400 border-emerald-400" : "border-white/20 hover:border-violet-400"}
              `}
            >
              {task.done && <CheckIcon className="w-2.5 h-2.5 text-white" />}
            </button>
            {/* Text */}
            <span className={`flex-1 text-[12px] leading-relaxed font-medium ${task.done ? "line-through text-white/30" : "text-white/70"}`}>
              {task.text}
            </span>
            {/* Delete */}
            <button
              onClick={() => deleteTask(task.id)}
              className="opacity-0 group-hover:opacity-100 text-white/25 hover:text-red-400 transition-all duration-150 mt-0.5"
            >
              <XIcon />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Calendar Component ───────────────────────────────────────────────────
const Calendar = () => {
  const [connectedCals] = useState(CONNECTED_CALENDARS);
  const [integrations, setIntegrations] = useState(
    AVAILABLE_INTEGRATIONS.map(i => ({ ...i, connected: false }))
  );

  const connectIntegration = (id) => {
    setIntegrations(prev => prev.map(i => i.id === id ? { ...i, connected: true } : i));
  };

  return (
    <div
      className="flex h-screen w-full overflow-hidden text-white"
      style={{ background: "linear-gradient(135deg, #09090f 0%, #0d0d18 100%)" }}
    >
      {/* ── SIDEBAR 60% ── */}
      <aside className="w-[60%] min-w-0 flex flex-col border-r border-white/6 overflow-hidden"
        style={{ background: "rgba(255,255,255,0.02)" }}>
        <MiniCalendar />
        <TodoSidebar />
      </aside>

      {/* ── MAIN 40% ── */}
      <main className="w-[40%] overflow-y-auto px-8 py-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-white mb-1.5">
            Calendar Integrations
          </h1>
          <p className="text-white/40 text-[13px] font-medium">
            Manage your connected calendars and platforms
          </p>
        </div>

        {/* Connected Calendars */}
        <section className="mb-10">
          <p className="text-[10px] font-semibold tracking-widest text-white/30 uppercase mb-4">
            Connected Calendars
          </p>
          <div className="grid grid-cols-1 gap-4">
            {connectedCals.map(cal => (
              <div
                key={cal.id}
                className="group flex items-center gap-4 px-5 py-4 rounded-2xl border border-white/7 hover:border-violet-500/40 transition-all duration-300 cursor-default"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                {/* Icon */}
                <div className={`w-11 h-11 ${cal.bg} rounded-xl flex items-center justify-center text-xl flex-shrink-0`}>
                  {cal.emoji}
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-white/90 mb-0.5">{cal.name}</p>
                  <p className="text-[12px] text-white/35 truncate">{cal.email}</p>
                </div>
                {/* Status + Toggle */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full">
                    <CheckIcon className="w-2.5 h-2.5" /> Synced
                  </span>
                  {/* Toggle */}
                  <div className="w-9 h-5 bg-violet-500 rounded-full relative cursor-pointer shadow-md shadow-violet-500/30">
                    <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Available Integrations */}
        <section>
          <p className="text-[10px] font-semibold tracking-widest text-white/30 uppercase mb-4">
            Available Integrations
          </p>
          <div className="grid grid-cols-1 gap-4">
            {integrations.map(item => (
              <div
                key={item.id}
                className="px-5 py-5 rounded-2xl border border-white/7 hover:border-white/14 transition-all duration-300"
                style={{ background: "rgba(255,255,255,0.025)" }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-11 h-11 ${item.bg} rounded-xl flex items-center justify-center text-xl`}>
                    {item.emoji}
                  </div>
                  {item.connected ? (
                    <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-lg">
                      <CheckIcon className="w-2.5 h-2.5" /> Connected
                    </span>
                  ) : (
                    <button
                      onClick={() => connectIntegration(item.id)}
                      className="flex items-center gap-1.5 text-[12px] font-semibold text-white/50 hover:text-white bg-white/5 hover:bg-violet-500 border border-white/8 hover:border-violet-500 px-3 py-1.5 rounded-lg transition-all duration-200"
                    >
                      <PlusIcon className="w-3 h-3" /> Connect
                    </button>
                  )}
                </div>
                <h3 className="text-[14px] font-semibold text-white/90 mb-1.5">{item.name}</h3>
                <p className="text-[12px] text-white/35 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Calendar;