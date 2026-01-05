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
  Menu,
  Clock,
} from "lucide-react";
import { STARTUPS, Startup } from "./data";

// --- Types ---
type View = "dashboard" | "calendar" | "watchlist" | "profile";

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
    <aside className="w-64 border-r border-white/5 bg-[#0a0a0c] flex flex-col h-screen fixed left-0 top-0">
      <div className="p-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
          ANGELS DEN
        </h1>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeView === item.id
                ? "bg-purple-500/10 text-purple-400 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.1)]"
                : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500" />
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium text-white truncate">
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
  icon: Icon,
  trend,
}: {
  label: string;
  value: string;
  icon: any;
  trend: string;
}) => (
  <div className="p-6 rounded-2xl bg-[#0a0a0c] border border-white/5 hover:border-purple-500/30 transition-all duration-300 group">
    <div className="flex items-start justify-between mb-4">
      <div className="p-3 rounded-xl bg-purple-500/5 text-purple-400 group-hover:bg-purple-500/10 group-hover:scale-110 transition-all duration-300">
        <Icon size={24} />
      </div>
      <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full flex items-center gap-1">
        <TrendingUp size={12} /> {trend}
      </span>
    </div>
    <h3 className="text-zinc-500 text-sm font-medium">{label}</h3>
    <p className="text-2xl font-bold text-white mt-1">{value}</p>
  </div>
);

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
      className="relative group bg-[#0a0a0c] border border-white/5 rounded-2xl p-5 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-500 cursor-pointer overflow-hidden"
    >
      {/* Hover Background Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="flex justify-between items-start mb-4">
        <img
          src={startup.logo}
          alt={startup.name}
          className="w-12 h-12 rounded-xl border border-white/10"
        />
        <button
          onClick={onBookmark}
          className={`p-2 rounded-full transition-colors ${
            startup.isBookmarked
              ? "text-purple-400"
              : "text-zinc-600 hover:text-white"
          }`}
        >
          <Bookmark
            size={20}
            fill={startup.isBookmarked ? "currentColor" : "none"}
          />
        </button>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
          {startup.name}
        </h3>
        <p className="text-sm text-zinc-400 line-clamp-1">{startup.tagline}</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
          {startup.sector}
        </span>
        <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded bg-zinc-500/10 text-zinc-400 border border-white/5">
          {startup.stage}
        </span>
        {startup.validation.slice(0, 1).map((v) => (
          <span
            key={v}
            className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center gap-1"
          >
            <CheckCircle2 size={10} /> {v}
          </span>
        ))}
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-[10px] uppercase text-zinc-500 font-bold tracking-widest">
              Raised
            </p>
            <p className="text-lg font-bold text-white">
              ${(startup.raised / 1000000).toFixed(1)}M{" "}
              <span className="text-zinc-500 text-sm">
                / ${(startup.target / 1000000).toFixed(1)}M
              </span>
            </p>
          </div>
          <p className="text-sm font-medium text-purple-400">
            {percentRaised}%
          </p>
        </div>
        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-1000"
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
}: {
  startup: Startup;
  onBack: () => void;
  onToggleBookmark: () => void;
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
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
              startup.isBookmarked
                ? "bg-purple-500/10 border-purple-500/20 text-purple-400"
                : "border-white/5 text-zinc-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Bookmark
              size={18}
              fill={startup.isBookmarked ? "currentColor" : "none"}
            />
            {startup.isBookmarked ? "Watched" : "Watchlist"}
          </button>
          <button
            onClick={() => {
              const toast = document.getElementById("toast-notification");
              if (toast) {
                toast.classList.remove("translate-y-20", "opacity-0");
                setTimeout(
                  () => toast.classList.add("translate-y-20", "opacity-0"),
                  3000
                );
              }
            }}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl font-bold text-white shadow-lg shadow-purple-500/20 hover:scale-[1.02] active:scale-95 transition-all"
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
                className="w-full h-32 rounded-2xl border border-dashed border-white/10 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all group flex flex-col items-center justify-center gap-3"
              >
                <div className="p-3 rounded-full bg-white/5 group-hover:scale-110 transition-transform">
                  <ArrowUpRight className="text-zinc-500 group-hover:text-purple-400" />
                </div>
                <span className="text-zinc-400 group-hover:text-purple-400 font-medium">
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
                <span className="text-purple-400 font-bold">
                  {Math.round((startup.raised / startup.target) * 100)}%
                </span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-500"
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
                    className="w-4 h-4 rounded-full bg-purple-500 animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <div
                    className="w-4 h-4 rounded-full bg-purple-500 animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <div
                    className="w-4 h-4 rounded-full bg-purple-500 animate-bounce"
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
                className={`text-sm font-medium ${
                  day === 12 || day === 15 || day === 20
                    ? "text-purple-400"
                    : "text-zinc-600"
                }`}
              >
                {day}
              </span>
              {(day === 12 || day === 15 || day === 20) && (
                <div className="mt-2 flex flex-col gap-1">
                  <div className="w-full h-1 bg-purple-500/40 rounded-full" />
                  <span className="text-[10px] text-purple-300 font-bold truncate">
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
            className="bg-[#0a0a0c] border border-white/5 rounded-2xl p-6 hover:border-purple-500/30 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl">
                <CalendarIcon size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">
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
  const [startups, setStartups] = useState(STARTUPS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, [view]);

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
    return result;
  }, [startups, sectorFilter, searchQuery, view]);

  const handleToggleBookmark = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setStartups((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, isBookmarked: !s.isBookmarked } : s
      )
    );
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
          icon={LayoutDashboard}
          trend="+12%"
        />
        <StatCard
          label="Avg. Valuation"
          value="$14.2M"
          icon={DollarSign}
          trend="+5.4%"
        />
        <StatCard
          label="Active Founders"
          value="842"
          icon={Users}
          trend="+22%"
        />
        <StatCard
          label="Pipeline Value"
          value="$420M"
          icon={TrendingUp}
          trend="+18%"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1 group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-purple-400 transition-colors"
            size={20}
          />
          <input
            type="text"
            placeholder="Search startups, keywords..."
            className="w-full bg-[#0a0a0c] border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {sectors.map((s) => (
            <button
              key={s}
              onClick={() => setSectorFilter(s)}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                sectorFilter === s
                  ? "bg-purple-500/10 border-purple-500/20 text-purple-400"
                  : "bg-[#0a0a0c] border-white/5 text-zinc-500 hover:text-white"
              }`}
            >
              {s}
            </button>
          ))}
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0a0a0c] border border-white/5 rounded-xl text-zinc-500 hover:text-white transition-all">
            <Filter size={18} /> Filters
          </button>
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
            className="mt-6 px-6 py-2 bg-purple-500/10 text-purple-400 rounded-xl hover:bg-purple-500/20 transition-all"
          >
            Explore Startups
          </button>
        </div>
      )}
    </>
  );

  return (
    <div className="min-h-screen bg-[#050507] text-zinc-300 font-sans selection:bg-purple-500/30">
      <Sidebar
        activeView={view}
        onViewChange={(v) => {
          setView(v);
          setLoading(true);
        }}
      />

      <main className="pl-64 min-h-screen pb-20">
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
            />
          )}
        </div>
      </main>

      {/* Toast Notification (Simple Implementation) */}
      <div
        id="toast-notification"
        className="fixed bottom-10 right-10 flex items-center gap-4 bg-[#0a0a0c] border border-emerald-500/30 text-emerald-400 px-6 py-4 rounded-2xl shadow-2xl transition-all duration-500 translate-y-20 opacity-0 z-50"
      >
        <div className="p-2 bg-emerald-500/20 rounded-full">
          <CheckCircle2 size={20} />
        </div>
        <div>
          <p className="font-bold">Registration Successful</p>
          <p className="text-sm text-zinc-500">
            Founders have been notified of your interest.
          </p>
        </div>
      </div>
    </div>
  );
}
