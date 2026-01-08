import React, { useState, useMemo, useEffect } from "react";
import {
  LayoutDashboard,
  Calendar as CalendarIcon,
  Bookmark,
  Search,
  Filter,
  TrendingUp,
  Users,
  DollarSign,
  MapPin,
  ExternalLink,
  ChevronRight,
  X,
  CheckCircle2,
  MoreVertical,
  ArrowUpRight,
  Bell,
  Clock,
  ChevronDown,
} from "lucide-react";
import type { Startup } from "./data";
import { supabase } from "./supabase";
import InvestorProfile from "./InvestorProfile";

// --- Types ---
type View = "dashboard" | "calendar" | "watchlist" | "profile" | "investor_profile";

// --- Components ---

const Sidebar = ({
  activeView,
  onViewChange,
}: {
  activeView: View;
  onViewChange: (v: View) => void;
}) => {
  const items = [
    { id: "dashboard" as View, label: "Deal Flow", icon: LayoutDashboard },
    { id: "calendar" as View, label: "Events", icon: CalendarIcon },
    { id: "watchlist" as View, label: "Watchlist", icon: Bookmark },
  ];

  return (
    <aside className="w-64 bg-[#050507] flex flex-col h-screen fixed left-0 top-0 pl-4 border-r border-white/5 z-20">
      <div className="p-8 pb-8">
        <div className="flex items-center gap-2 text-white mb-1">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-lg">
            A
          </div>
          <span className="text-xl font-bold tracking-tight">Angels Den</span>
        </div>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {items.map((item) => (
          <div key={item.id} className="relative">
            {activeView === item.id && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-500 rounded-r-full" />
            )}
            <button
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ml-2 ${activeView === item.id
                ? "text-blue-400 bg-blue-500/5"
                : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
                }`}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </button>
          </div>
        ))}
      </nav>

      {/* Fading Squares Graphic */}
      <div className="absolute bottom-0 left-0 p-6 opacity-30 pointer-events-none overflow-hidden w-full h-32">
        <div className="flex flex-wrap gap-2 w-32 rotate-12 origin-bottom-left transform translate-y-4 -translate-x-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className={`w-6 h-6 bg-blue-500/40 rounded-sm ${i % 2 === 0 ? 'opacity-40' : 'opacity-80'}`}></div>
          ))}
        </div>
      </div>

      <div className="p-4 mt-auto">
        <div
          onClick={() => onViewChange("investor_profile")}
          className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors cursor-pointer border ${activeView === 'investor_profile'
            ? 'bg-blue-500/10 border-blue-500/20'
            : 'border-transparent hover:bg-white/5 hover:border-white/5'
            }`}
        >
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80"
            alt="Profile"
            className="w-8 h-8 rounded-full border border-white/10"
          />
          <div className="flex-1 overflow-hidden">
            <p className={`text-sm font-medium truncate ${activeView === 'investor_profile' ? 'text-blue-400' : 'text-white'}`}>
              Alex Thompson
            </p>
            <p className="text-xs text-zinc-500 truncate">Venture Partner</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

const StatCard = ({
  label,
  value,
  trend,
}: {
  label: string;
  value: string;
  trend: string;
}) => (
  <div className="relative overflow-hidden rounded-2xl bg-[#0a0a0c] border border-white/5 p-6 group">
    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

    <div className="relative z-10">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-1">{label}</h3>
          <p className="text-2xl font-bold text-white tracking-tight">{value}</p>
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 ${trend.includes('+') ? 'text-emerald-400 bg-emerald-400/10' : 'text-rose-400 bg-rose-400/10'}`}>
          <TrendingUp size={10} /> {trend}
        </span>
      </div>

      {/* Decorative Graph Line */}
      <div className="h-10 w-full opacity-50">
        <svg viewBox="0 0 100 20" className="w-full h-full overflow-visible preserve-3d">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 15 Q 10 10, 20 12 T 40 8 T 60 14 T 80 5 L 100 10" fill="none" stroke="#3b82f6" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          <path d="M0 15 Q 10 10, 20 12 T 40 8 T 60 14 T 80 5 L 100 10 V 20 H 0 Z" fill="url(#gradient)" stroke="none" />
        </svg>
      </div>
    </div>
  </div>
);

const RegisterInterestModal = ({
  isOpen,
  onClose,
  onConfirm,
  startupName,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  startupName: string;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0a0a0c] border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
        <h3 className="text-xl font-bold text-white mb-2">Register Interest</h3>
        <p className="text-zinc-400 mb-6">
          Are you sure you want to register interest in <span className="text-white font-semibold">{startupName}</span>? This will notify the deal team and they will contact you shortly.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl font-bold text-white shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all"
          >
            Confirm Registration
          </button>
        </div>
      </div>
    </div>
  );
};

// Fix: Explicitly type StartupCard as React.FC to include standard React attributes like 'key' in the props definition
const StartupCard: React.FC<{
  startup: Startup;
  onClick: () => void;
  onBookmark: (e: React.MouseEvent) => void;
}> = ({ startup, onClick, onBookmark }) => {
  const percentRaised = Math.round((startup.raised / startup.target) * 100);

  return (
    <div
      onClick={onClick}
      className="group bg-[#0a0a0c] border border-white/5 rounded-xl p-6 hover:border-zinc-700 transition-colors cursor-pointer"
    >
      <div className="flex justify-between items-start mb-4">
        <img
          src={startup.logo}
          alt={startup.name}
          className="w-12 h-12 rounded-xl bg-zinc-900 object-cover"
        />
        <button
          onClick={onBookmark}
          className={`p-2 rounded-lg transition-all duration-300 active:scale-90 hover:scale-110 ${startup.isBookmarked
            ? "text-blue-400 bg-blue-500/10"
            : "text-zinc-600 hover:text-zinc-300 hover:bg-white/5"
            }`}
        >
          <Bookmark
            size={18}
            fill={startup.isBookmarked ? "currentColor" : "none"}
            className="transition-all duration-300"
          />
        </button>
      </div>

      <div className="mb-6 space-y-1">
        <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
          {startup.name}
        </h3>
        <p className="text-sm text-zinc-500 line-clamp-2 h-10">
          {startup.tagline}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6 h-7 overflow-hidden">
        <span className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/50 whitespace-nowrap">
          {startup.sector}
        </span>
        <span className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/50 whitespace-nowrap">
          {startup.stage}
        </span>
        {startup.validation.slice(0, 1).map((v) => (
          <span key={v} className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center gap-1.5 whitespace-nowrap">
            <CheckCircle2 size={10} fill="currentColor" /> {v}
          </span>
        ))}
      </div>

      <div className="mb-4">
        <p className="text-sm font-medium text-zinc-400">
          Valuation: <span className="text-white font-semibold">${(startup.valuation / 1000000).toFixed(1)}M</span>
        </p>
      </div>

      <div className="space-y-3 pt-4 border-t border-white/5">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-[10px] uppercase text-zinc-500 font-bold tracking-widest mb-1">
              Raised
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-base font-semibold text-white">
                ${(startup.raised / 1000000).toFixed(1)}M
              </span>
              <span className="text-zinc-600 text-xs">
                / ${(startup.target / 1000000).toFixed(1)}M
              </span>
            </div>
          </div>
          <span className="text-sm font-medium text-white">
            {percentRaised}%
          </span>
        </div>
        <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-1000"
            style={{ width: `${percentRaised}%` }}
          />
        </div>
      </div>
    </div>
  );
};

const StartupDetailView = ({
  startup,
  onBack,
  onToggleBookmark,
  onRegisterInterest,
}: {
  startup: Startup;
  onBack: () => void;
  onToggleBookmark: () => void;
  onRegisterInterest: () => void;
}) => {
  const [showPitchModal, setShowPitchModal] = useState(false);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="p-2 text-zinc-500 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
        <div className="flex items-center gap-3">
          <img
            src={startup.logo}
            alt={startup.name}
            className="w-10 h-10 rounded-lg"
          />
          <h2 className="text-2xl font-bold text-white">{startup.name}</h2>
        </div>
        <div className="ml-auto flex gap-3">
          <button
            onClick={onToggleBookmark}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-300 active:scale-95 ${startup.isBookmarked
              ? "bg-blue-500/10 border-blue-500/20 text-blue-400"
              : "border-white/5 text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
          >
            <Bookmark
              size={18}
              fill={startup.isBookmarked ? "currentColor" : "none"}
              className={startup.isBookmarked ? "scale-110" : ""}
            />
            {startup.isBookmarked ? "Watched" : "Watchlist"}
          </button>
          <button
            onClick={onRegisterInterest}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl font-bold text-white shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all"
          >
            Register Interest
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="grid grid-cols-3 gap-8 mb-12">
        <div className="col-span-2 space-y-8">
          <div className="relative rounded-3xl overflow-hidden aspect-[16/7] group">
            <img
              src={`https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=1200`}
              alt="Startup Cover"
              className="w-full h-full object-cover brightness-50 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <h3 className="text-3xl font-bold text-white mb-2">
                {startup.tagline}
              </h3>
              <div className="flex items-center gap-4 text-zinc-300">
                <span className="flex items-center gap-1">
                  <MapPin size={16} /> {startup.location}
                </span>
                <span className="flex items-center gap-1">
                  <Users size={16} /> 2-10 Employees
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign size={16} /> $
                  {(startup.valuation / 1000000).toFixed(1)}M Valuation
                </span>
              </div>
            </div>
          </div>

          <div className="bg-[#0a0a0c] border border-white/5 rounded-3xl p-8">
            <h4 className="text-xl font-bold text-white mb-4">About</h4>
            <p className="text-zinc-400 leading-relaxed text-lg">
              {startup.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-[#0a0a0c] border border-white/5 rounded-3xl p-8">
              <h4 className="text-xl font-bold text-white mb-6">
                Traction Metrics
              </h4>
              <div className="space-y-6">
                {startup.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="flex justify-between items-center"
                  >
                    <span className="text-zinc-500 font-medium">{m.label}</span>
                    <span className="text-white font-bold text-xl">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#0a0a0c] border border-white/5 rounded-3xl p-8">
              <h4 className="text-xl font-bold text-white mb-6">Pitch Deck</h4>
              <button
                onClick={() => setShowPitchModal(true)}
                className="w-full h-32 rounded-2xl border border-dashed border-white/10 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all group flex flex-col items-center justify-center gap-3"
              >
                <div className="p-3 rounded-full bg-white/5 group-hover:scale-110 transition-transform">
                  <ArrowUpRight className="text-zinc-500 group-hover:text-blue-400" />
                </div>
                <span className="text-zinc-400 group-hover:text-blue-400 font-medium">
                  View Full Pitch Deck
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-[#0a0a0c] border border-white/5 rounded-3xl p-8 space-y-6">
            <h4 className="text-xl font-bold text-white">Investment Status</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-zinc-500">Progress</span>
                <span className="text-blue-400 font-bold">
                  {Math.round((startup.raised / startup.target) * 100)}%
                </span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500"
                  style={{
                    width: `${(startup.raised / startup.target) * 100}%`,
                  }}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/5">
                <p className="text-xs text-zinc-500 font-bold uppercase mb-1">
                  Raised
                </p>
                <p className="text-lg font-bold text-white">
                  ${(startup.raised / 1000000).toFixed(1)}M
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5">
                <p className="text-xs text-zinc-500 font-bold uppercase mb-1">
                  Min. Invest
                </p>
                <p className="text-lg font-bold text-white">$25k</p>
              </div>
            </div>
            <div className="pt-4 border-t border-white/5">
              <div className="flex items-center gap-3 text-zinc-400 text-sm mb-4">
                <Clock size={16} />
                <span>Closing in 14 days</span>
              </div>
              <button className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-white font-bold transition-all">
                Download Data Room
              </button>
            </div>
          </div>

          <div className="bg-[#0a0a0c] border border-white/5 rounded-3xl p-8">
            <h4 className="text-xl font-bold text-white mb-6">Founding Team</h4>
            <div className="space-y-6">
              {startup.team.map((member) => (
                <div key={member.name} className="flex items-center gap-4">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-12 h-12 rounded-full border border-white/10"
                  />
                  <div>
                    <p className="font-bold text-white">{member.name}</p>
                    <p className="text-sm text-zinc-500">{member.role}</p>
                  </div>
                  <button className="ml-auto p-2 text-zinc-600 hover:text-white transition-colors">
                    <ExternalLink size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pitch Modal */}
      {showPitchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
          <button
            onClick={() => setShowPitchModal(false)}
            className="absolute top-8 right-8 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-10"
          >
            <X size={24} />
          </button>
          <div className="w-full max-w-6xl aspect-[16/9] bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0c]">
              <div className="text-center">
                <h4 className="text-2xl font-bold text-white mb-4">
                  Pitch Deck Reader
                </h4>
                <p className="text-zinc-500 mb-8">
                  PDF Viewer would be rendered here for {startup.name}
                </p>
                <div className="flex gap-4 justify-center">
                  <div
                    className="w-4 h-4 rounded-full bg-blue-500 animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <div
                    className="w-4 h-4 rounded-full bg-blue-500 animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <div
                    className="w-4 h-4 rounded-full bg-blue-500 animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CalendarView = () => {
  const events = [
    {
      date: "2024-05-12",
      title: "Pitch Day: AI Infra",
      time: "10:00 AM",
      tag: "Webinar",
    },
    {
      date: "2024-05-15",
      title: "Investor Dinner NYC",
      time: "7:30 PM",
      tag: "Meetup",
    },
    {
      date: "2024-05-20",
      title: "Q2 Portfolio Review",
      time: "3:00 PM",
      tag: "Report",
    },
  ];

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="col-span-2 bg-[#0a0a0c] border border-white/5 rounded-3xl p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white">May 2024</h2>
          <div className="flex gap-2">
            <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 text-white">
              &larr;
            </button>
            <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 text-white">
              &rarr;
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-px bg-white/5 rounded-2xl overflow-hidden">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="bg-[#0a0a0c] p-4 text-center text-xs font-bold text-zinc-500 uppercase tracking-widest"
            >
              {day}
            </div>
          ))}
          {days.map((day) => (
            <div
              key={day}
              className="bg-[#0a0a0c] min-h-[100px] p-4 group relative hover:bg-white/5 transition-colors"
            >
              <span
                className={`text-sm font-medium ${day === 12 || day === 15 || day === 20
                  ? "text-blue-400"
                  : "text-zinc-600"
                  }`}
              >
                {day}
              </span>
              {(day === 12 || day === 15 || day === 20) && (
                <div className="mt-2 flex flex-col gap-1">
                  <div className="w-full h-1 bg-blue-500/40 rounded-full" />
                  <span className="text-[10px] text-blue-300 font-bold truncate">
                    Pitch Day
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-white mb-6">Upcoming Events</h3>
        {events.map((event, idx) => (
          <div
            key={idx}
            className="bg-[#0a0a0c] border border-white/5 rounded-2xl p-6 hover:border-blue-500/30 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl">
                <CalendarIcon size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                  {event.title}
                </p>
                <p className="text-xs text-zinc-500">
                  {event.date} • {event.time}
                </p>
              </div>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-1 rounded bg-white/5 text-zinc-400">
              {event.tag}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [view, setView] = useState<View>("dashboard");
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sectorFilter, setSectorFilter] = useState("All");
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const [startups, setStartups] = useState<Startup[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<"recently_added" | "most_raised" | "highest_valuation">("recently_added");
  const [showSortMenu, setShowSortMenu] = useState(false);

  // Modal State
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [startupToRegister, setStartupToRegister] = useState<Startup | null>(null);

  useEffect(() => {
    fetchStartups();

    // Listen for modal trigger
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const handleOpenModal = (e: any) => {
      setStartupToRegister(e.detail);
      setRegisterModalOpen(true);
    };
    window.addEventListener('openRegisterModal', handleOpenModal);
    return () => window.removeEventListener('openRegisterModal', handleOpenModal);
  }, []);

  const handleRegisterConfirm = () => {
    setRegisterModalOpen(false);
    const toast = document.getElementById("toast-notification");
    if (toast) {
      toast.classList.remove("translate-y-20", "opacity-0");
      setTimeout(
        () => toast.classList.add("translate-y-20", "opacity-0"),
        3000
      );
    }
    setStartupToRegister(null);
  };

  const fetchStartups = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('startups')
        .select('*')
        .order('id');

      if (error) throw error;

      if (data) {
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        const mappedData: Startup[] = data.map((item: any) => ({
          ...item,
          isBookmarked: item.is_bookmarked,
          pitchDeckUrl: item.pitch_deck_url
        }));
        setStartups(mappedData);
      }
    } catch (error) {
      console.error('Error fetching startups:', error);
    } finally {
      setLoading(false);
    }
  };

  const sectors = [
    "All",
    "Fintech",
    "AI",
    "SaaS",
    "Climate",
    "HealthTech",
    "Web3",
  ];

  const filteredStartups = useMemo(() => {
    let result = startups;
    if (view === "watchlist") {
      result = result.filter((s) => s.isBookmarked);
    }
    if (sectorFilter !== "All") {
      result = result.filter((s) => s.sector === sectorFilter);
    }
    if (searchQuery) {
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.tagline.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return result.sort((a, b) => {
      if (sortBy === 'most_raised') {
        return b.raised - a.raised;
      }
      if (sortBy === 'highest_valuation') {
        return b.valuation - a.valuation;
      }
      // recently_added - assume ID order is close enough or use a real date if available (we don't have one, so stable sort)
      return 0;
    });
  }, [startups, sectorFilter, searchQuery, view, sortBy]);

  const handleToggleBookmark = async (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();

    // Find the startup to toggle
    const startup = startups.find(s => s.id === id);
    if (!startup) return;

    const newIsBookmarked = !startup.isBookmarked;

    // Optimistic update
    setStartups((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, isBookmarked: newIsBookmarked } : s
      )
    );

    // ALSO update selectedStartup if it matches, ensuring Detail View updates immediately
    if (selectedStartup && selectedStartup.id === id) {
      setSelectedStartup(prev => prev ? ({ ...prev, isBookmarked: newIsBookmarked }) : null);
    }

    try {
      const { error } = await supabase
        .from('startups')
        .update({ is_bookmarked: newIsBookmarked })
        .eq('id', id);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error updating bookmark:', error);
      // Revert optimistic update
      setStartups((prev) =>
        prev.map((s) =>
          s.id === id ? { ...s, isBookmarked: !newIsBookmarked } : s
        )
      );
    }
  };

  const handleStartupClick = (startup: Startup) => {
    setSelectedStartup(startup);
    setView("profile");
  };

  const renderDashboard = () => (
    <>
      <div className="grid grid-cols-4 gap-6 mb-12">
        <StatCard
          label="Total Deal Flow"
          value="248"
          trend="+12%"
        />
        <StatCard
          label="Avg. Valuation"
          value="$14.2M"
          trend="+5.4%"
        />
        <StatCard
          label="Active Founders"
          value="842"
          trend="+22%"
        />
        <StatCard
          label="Pipeline Value"
          value="$420M"
          trend="+18%"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1 group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-blue-400 transition-colors"
            size={20}
          />
          <input
            type="text"
            placeholder="Search startups, keywords..."
            className="w-full bg-[#0a0a0c] border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-zinc-600"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {sectors.map((s) => (
            <button
              key={s}
              onClick={() => setSectorFilter(s)}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${sectorFilter === s
                ? "bg-blue-500 text-white border-blue-600 shadow-lg shadow-blue-500/20"
                : "bg-[#0a0a0c] border-white/5 text-zinc-500 hover:text-white"
                }`}
            >
              {s}
            </button>
          ))}
          <div className="relative">
            <button
              onClick={() => setShowSortMenu(!showSortMenu)}
              className={`flex items-center gap-2 px-4 py-2 bg-[#0a0a0c] border border-white/5 rounded-xl text-zinc-500 hover:text-white transition-all ${showSortMenu ? 'border-blue-500/50 text-white' : ''}`}
            >
              <Filter size={18} />
              <span className="hidden sm:inline">Sort: {sortBy === 'recently_added' ? 'Newest' : sortBy === 'most_raised' ? 'Most Raised' : 'Valuation'}</span>
              <ChevronDown size={14} />
            </button>

            {showSortMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-[#0a0a0c] border border-white/10 rounded-xl shadow-xl z-50 overflow-hidden">
                <button
                  onClick={() => { setSortBy('recently_added'); setShowSortMenu(false); }}
                  className={`w-full text-left px-4 py-3 text-sm hover:bg-white/5 transition-colors ${sortBy === 'recently_added' ? 'text-blue-400 font-medium' : 'text-zinc-400'}`}
                >
                  Newest
                </button>
                <button
                  onClick={() => { setSortBy('most_raised'); setShowSortMenu(false); }}
                  className={`w-full text-left px-4 py-3 text-sm hover:bg-white/5 transition-colors ${sortBy === 'most_raised' ? 'text-blue-400 font-medium' : 'text-zinc-400'}`}
                >
                  Most Raised
                </button>
                <button
                  onClick={() => { setSortBy('highest_valuation'); setShowSortMenu(false); }}
                  className={`w-full text-left px-4 py-3 text-sm hover:bg-white/5 transition-colors ${sortBy === 'highest_valuation' ? 'text-blue-400 font-medium' : 'text-zinc-400'}`}
                >
                  Highest Valuation
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-[320px] bg-[#0a0a0c] border border-white/5 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      ) : filteredStartups.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStartups.map((s) => (
            <StartupCard
              key={s.id}
              startup={s}
              onClick={() => handleStartupClick(s)}
              onBookmark={(e) => handleToggleBookmark(s.id, e)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 border border-dashed border-white/5 rounded-3xl">
          <div className="p-4 rounded-full bg-white/5 text-zinc-500 mb-4">
            <Search size={32} />
          </div>
          <h3 className="text-xl font-bold text-white">No startups found</h3>
          <p className="text-zinc-500">
            Try adjusting your filters or search query.
          </p>
        </div>
      )}
      <RegisterInterestModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        onConfirm={handleRegisterConfirm}
        startupName={startupToRegister?.name || ''}
      />
    </>
  );

  const renderWatchlist = () => (
    <>
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-white mb-2">My Watchlist</h2>
        <p className="text-zinc-500">
          Startups you're tracking for potential investment.
        </p>
      </div>

      {filteredStartups.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStartups.map((s) => (
            <StartupCard
              key={s.id}
              startup={s}
              onClick={() => handleStartupClick(s)}
              onBookmark={(e) => handleToggleBookmark(s.id, e)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 border border-dashed border-white/5 rounded-3xl">
          <div className="p-4 rounded-full bg-white/5 text-zinc-500 mb-4">
            <Bookmark size={32} />
          </div>
          <h3 className="text-xl font-bold text-white">Watchlist is empty</h3>
          <p className="text-zinc-500">
            Bookmarked startups will appear here for easy access.
          </p>
          <button
            onClick={() => setView("dashboard")}
            className="mt-6 px-6 py-2 bg-blue-500/10 text-blue-400 rounded-xl hover:bg-blue-500/20 transition-all"
          >
            Explore Startups
          </button>
        </div>
      )}
    </>
  );

  return (
    <div className="min-h-screen bg-[#050507] text-zinc-300 font-sans selection:bg-blue-500/30">
      <Sidebar
        activeView={view}
        onViewChange={(v) => {
          setView(v);
        }}
      />

      {/* Top Right Blue Gradient Mesh */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none z-0" />

      <main className="pl-64 min-h-screen pb-20 relative z-10">
        <header className="h-20 border-b border-white/5 px-10 flex items-center justify-between sticky top-0 bg-[#050507]/80 backdrop-blur-md z-30">
          <div className="flex items-center gap-4">
            {view !== "dashboard" && (
              <button
                onClick={() => setView("dashboard")}
                className="text-zinc-500 hover:text-white flex items-center gap-1 text-sm"
              >
                Dashboard <ChevronRight size={14} />
              </button>
            )}
            <h2 className="text-lg font-bold text-white capitalize">{view}</h2>
          </div>
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-zinc-500 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-purple-500 rounded-full border-2 border-[#050507]" />
            </button>
            <button className="p-2 text-zinc-500 hover:text-white transition-colors">
              <MoreVertical size={20} />
            </button>
          </div>
        </header>

        <div className="p-10 max-w-7xl mx-auto">
          {view === "dashboard" && renderDashboard()}
          {view === "calendar" && <CalendarView />}
          {view === "watchlist" && renderWatchlist()}
          {view === "profile" && selectedStartup && (
            <StartupDetailView
              startup={selectedStartup}
              onBack={() => setView("dashboard")}
              onToggleBookmark={() => handleToggleBookmark(selectedStartup.id)}
              onRegisterInterest={() => {
                setStartupToRegister(selectedStartup);
                setRegisterModalOpen(true);
              }}
            />
          )}

          {view === "investor_profile" && <InvestorProfile />}
        </div>
      </main>

      {/* Toast Notification (Simple Implementation) */}
      <div
        id="toast-notification"
        className="fixed bottom-10 right-10 flex items-center gap-4 bg-[#0a0a0c] border border-blue-500/30 text-blue-400 px-6 py-4 rounded-2xl shadow-2xl transition-all duration-500 translate-y-20 opacity-0 z-50"
      >
        <div className="p-2 bg-blue-500/20 rounded-full">
          <CheckCircle2 size={20} />
        </div>
        <div>
          <p className="font-bold">Registration Successful</p>
          <p className="text-sm text-zinc-500">
            Founders have been notified of your interest.
          </p>
        </div>
      </div>

      <RegisterInterestModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        onConfirm={handleRegisterConfirm}
        startupName={startupToRegister?.name || ''}
      />
    </div>
  );
}
