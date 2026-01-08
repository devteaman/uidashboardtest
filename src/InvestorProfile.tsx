import React, { useState } from "react";
import {
    CheckCircle2,
    Edit2,
    ShieldCheck,
    Lock,
    Bell,
    Sliders,
    MessageSquare,
    User,
    ChevronRight,
    TrendingUp,
    Briefcase
} from "lucide-react";

// --- Types ---
type Tab = "overview" | "preferences" | "messages";

interface InvestmentHolding {
    id: string;
    startup: string;
    date: string;
    amount: string;
    status: "Committed" | "Transferred";
}

interface Message {
    id: string;
    from: string;
    avatar?: string;
    preview: string;
    time: string;
    unread: boolean;
}

// --- Mock Data ---
const HOLDINGS: InvestmentHolding[] = [
    { id: "1", startup: "Nebula AI", date: "2024-03-15", amount: "£25,000", status: "Transferred" },
    { id: "2", startup: "Veridia", date: "2024-06-22", amount: "£15,000", status: "Transferred" },
    { id: "3", startup: "SynthBio", date: "2024-09-01", amount: "£50,000", status: "Committed" },
    { id: "4", startup: "Flow State", date: "2024-11-10", amount: "£10,000", status: "Committed" },
];

const MESSAGES: Message[] = [
    { id: "1", from: "Angels Den Team", preview: "Welcome to the platform! Here's how to get started...", time: "2h ago", unread: true },
    { id: "2", from: "SynthBio", preview: "Thank you for your commitment. Next steps...", time: "3d ago", unread: false },
];

const PREFERRED_TAGS = [
    "AI", "SaaS", "Fintech", "HealthTech", "Climate",
    "Web3", "Hardware", "B2B", "B2C"
];

// --- Components ---

const ProfileHeader = () => (
    <div className="flex items-center justify-between mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="flex items-center gap-6">
            <div className="relative group cursor-pointer">
                <div className="w-20 h-20 rounded-full bg-zinc-800 border-2 border-white/10 group-hover:border-blue-500 transition-colors overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80" alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 rounded-full bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div>
                <div className="flex items-center gap-3 mb-1">
                    <h1 className="text-3xl font-bold text-white">Alex Thompson</h1>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-1">
                        <CheckCircle2 size={12} /> Verified
                    </span>
                </div>
                <p className="text-zinc-400 font-medium">Venture Partner</p>
            </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-all">
            <Edit2 size={16} />
            <span>Edit Profile</span>
        </button>
    </div>
);

const TabsNavigation = ({ activeTab, onTabChange }: { activeTab: Tab; onTabChange: (t: Tab) => void }) => {
    const tabs: { id: Tab; label: string }[] = [
        { id: "overview", label: "Overview" },
        { id: "preferences", label: "Preferences" },
        { id: "messages", label: "Messages" },
    ];

    return (
        <div className="flex border-b border-white/5 mb-8">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`px-6 py-4 text-sm font-medium transition-all relative ${activeTab === tab.id
                            ? "text-white"
                            : "text-zinc-500 hover:text-zinc-300"
                        }`}
                >
                    {tab.label}
                    {activeTab === tab.id && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                    )}
                </button>
            ))}
        </div>
    );
};

const TagCloud = () => {
    const [selectedTags, setSelectedTags] = useState<string[]>(["AI", "Fintech", "B2B"]);

    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    return (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="text-blue-400" size={20} />
                <h3 className="text-lg font-bold text-white">Investment Focus</h3>
            </div>
            <div className="flex flex-wrap gap-2">
                {PREFERRED_TAGS.map(tag => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                        <button
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all ${isSelected
                                    ? "bg-blue-500/20 border-blue-500 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.2)]"
                                    : "bg-white/5 border-white/10 text-zinc-400 hover:text-zinc-300 hover:border-white/20"
                                }`}
                        >
                            {tag}
                        </button>
                    );
                })}
            </div>
            <div className="mt-auto pt-6 text-xs text-zinc-500 flex justify-between items-center">
                <span>{selectedTags.length} selected</span>
                <button className="text-white hover:underline">Manage All</button>
            </div>
        </div>
    );
};

const KYCStatus = () => {
    const steps = [
        { label: "ID Check", status: "complete", icon: User },
        { label: "AML Check", status: "pending", icon: ShieldCheck },
        { label: "Accredited Status", status: "locked", icon: Lock },
    ];

    return (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 h-full">
            <div className="flex items-center gap-2 mb-6">
                <ShieldCheck className="text-emerald-400" size={20} />
                <h3 className="text-lg font-bold text-white">Verification Status</h3>
            </div>

            <div className="relative">
                {/* Connecting Line */}
                <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-white/5 z-0" />

                <div className="space-y-6 relative z-10">
                    {steps.map((step, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step.status === 'complete' ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' :
                                    step.status === 'pending' ? 'bg-amber-500/10 border-amber-500 text-amber-400' :
                                        'bg-zinc-800 border-zinc-700 text-zinc-600'
                                }`}>
                                <step.icon size={18} />
                            </div>
                            <div className="flex-1">
                                <p className={`font-bold ${step.status === 'locked' ? 'text-zinc-600' : 'text-white'}`}>{step.label}</p>
                                <p className="text-xs text-zinc-500 capitalize">{step.status}</p>
                            </div>
                            {step.status === 'complete' && <CheckCircle2 size={18} className="text-emerald-500" />}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const HoldingsTable = () => {
    return (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Briefcase className="text-purple-400" size={20} />
                    <h3 className="text-lg font-bold text-white">My Investments</h3>
                </div>
                <button className="text-sm text-zinc-400 hover:text-white flex items-center gap-1">
                    View All <ChevronRight size={14} />
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-white/5 text-xs text-zinc-500 uppercase tracking-wider">
                            <th className="pb-3 pl-2">Startup Name</th>
                            <th className="pb-3">Date</th>
                            <th className="pb-3">Amount</th>
                            <th className="pb-3 text-right pr-2">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {HOLDINGS.map(holding => (
                            <tr key={holding.id} className="group hover:bg-white/5 transition-colors">
                                <td className="py-4 pl-2 font-medium text-white group-hover:text-blue-400 transition-colors">{holding.startup}</td>
                                <td className="py-4 text-zinc-400 text-sm">{holding.date}</td>
                                <td className="py-4 text-white font-medium">{holding.amount}</td>
                                <td className="py-4 text-right pr-2">
                                    <span className={`inline-block px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${holding.status === 'Transferred'
                                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                            : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                        }`}>
                                        {holding.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const NotificationToggle = ({ label, defaultChecked = false }: { label: string, defaultChecked?: boolean }) => {
    const [checked, setChecked] = useState(defaultChecked);
    return (
        <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0 last:pb-0">
            <span className="text-zinc-300">{label}</span>
            <button
                onClick={() => setChecked(!checked)}
                className={`w-11 h-6 rounded-full transition-colors relative ${checked ? 'bg-blue-600' : 'bg-zinc-700'}`}
            >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${checked ? 'left-6' : 'left-1'}`} />
            </button>
        </div>
    )
}

const PreferencesTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-500">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6">
                <Bell className="text-amber-400" size={20} />
                <h3 className="text-lg font-bold text-white">Notifications</h3>
            </div>
            <div className="space-y-1">
                <NotificationToggle label="New Deal Alerts" defaultChecked />
                <NotificationToggle label="Weekly Digest" />
                <NotificationToggle label="Pitch Reminders (24h)" defaultChecked />
                <NotificationToggle label="Portfolio Updates" defaultChecked />
            </div>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6">
                <Sliders className="text-pink-400" size={20} />
                <h3 className="text-lg font-bold text-white">Investment Criteria</h3>
            </div>
            <div className="space-y-6">
                <div>
                    <label className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-3 block">Preferred Ticket Size</label>
                    <div className="flex justify-between text-sm text-zinc-400 mb-2">
                        <span>£5k</span>
                        <span>£50k+</span>
                    </div>
                    <div className="h-2 bg-zinc-700 rounded-full relative overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-blue-500 rounded-full" />
                    </div>
                </div>

                <div>
                    <label className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-3 block">Preferred Stage</label>
                    <div className="flex gap-2">
                        {['Pre-Seed', 'Seed', 'Series A'].map(stage => (
                            <button key={stage} className={`px-4 py-2 rounded-lg border text-sm font-medium ${stage === 'Seed' ? 'bg-blue-500/20 border-blue-500 text-blue-400' : 'bg-transparent border-zinc-700 text-zinc-500'}`}>
                                {stage}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const MessagesTab = () => (
    <div className="space-y-4 animate-in fade-in duration-500">
        {MESSAGES.map(msg => (
            <div key={msg.id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-colors cursor-pointer group flex gap-4">
                <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-zinc-500 text-lg border border-white/10">
                        {msg.from[0]}
                    </div>
                    {msg.unread && <div className="absolute top-0 right-0 w-3 h-3 bg-blue-500 rounded-full border-2 border-[#0a0a0c]" />}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                        <h4 className={`font-bold truncate ${msg.unread ? 'text-white' : 'text-zinc-400'}`}>{msg.from}</h4>
                        <span className="text-xs text-zinc-600 whitespace-nowrap">{msg.time}</span>
                    </div>
                    <p className={`text-sm truncate ${msg.unread ? 'text-zinc-300' : 'text-zinc-600'}`}>{msg.preview}</p>
                </div>
            </div>
        ))}
        <div className="p-8 text-center border border-dashed border-white/5 rounded-2xl">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 text-zinc-500">
                <MessageSquare size={20} />
            </div>
            <p className="text-zinc-500">End of messages</p>
        </div>
    </div>
)

const OverviewTab = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TagCloud />
            <KYCStatus />
        </div>
        <HoldingsTable />
    </div>
);

// --- Main Container ---
const InvestorProfile = () => {
    const [activeTab, setActiveTab] = useState<Tab>("overview");

    return (
        <div className="min-h-full">
            <ProfileHeader />
            <TabsNavigation activeTab={activeTab} onTabChange={setActiveTab} />

            <div className="pb-10">
                {activeTab === "overview" && <OverviewTab />}
                {activeTab === "preferences" && <PreferencesTab />}
                {activeTab === "messages" && <MessagesTab />}
            </div>
        </div>
    );
};

export default InvestorProfile;
