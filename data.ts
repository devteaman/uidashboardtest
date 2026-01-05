export interface Startup {
  id: string;
  name: string;
  tagline: string;
  description: string;
  sector: "Fintech" | "SaaS" | "AI" | "HealthTech" | "Climate" | "Web3";
  stage: "Pre-seed" | "Seed" | "Series A" | "Series B";
  raised: number;
  target: number;
  valuation: number;
  location: string;
  logo: string;
  validation: string[];
  isBookmarked: boolean;
  pitchDeckUrl: string;
  team: { name: string; role: string; avatar: string }[];
  metrics: { label: string; value: string }[];
}

export const STARTUPS: Startup[] = [
  {
    id: "1",
    name: "Nebula AI",
    tagline: "Generative infrastructure for edge computing.",
    description:
      "Nebula AI provides a decentralized layer for LLM inference at the edge, reducing latency by 80% for real-time applications.",
    sector: "AI",
    stage: "Seed",
    raised: 1200000,
    target: 2000000,
    valuation: 12000000,
    location: "San Francisco, CA",
    logo: "https://api.dicebear.com/7.x/identicon/svg?seed=nebula",
    validation: ["Top 5%", "YC W24", "Verified Revenue"],
    isBookmarked: false,
    pitchDeckUrl: "https://example.com/deck1.pdf",
    team: [
      {
        name: "Sarah Chen",
        role: "CEO (ex-Google)",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      },
      {
        name: "Marcus Thorne",
        role: "CTO (PhD AI)",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=marcus",
      },
    ],
    metrics: [
      { label: "MRR", value: "$45k" },
      { label: "MoM Growth", value: "22%" },
      { label: "Burn Rate", value: "$12k/mo" },
    ],
  },
  {
    id: "2",
    name: "Veridia",
    tagline: "Carbon credit verification using satellite imagery.",
    description:
      "Veridia uses high-resolution multispectral data to verify reforestation projects in real-time, bringing transparency to carbon markets.",
    sector: "Climate",
    stage: "Series A",
    raised: 4500000,
    target: 5000000,
    valuation: 25000000,
    location: "London, UK",
    logo: "https://api.dicebear.com/7.x/identicon/svg?seed=veridia",
    validation: ["B-Corp", "Techstars", "High Impact"],
    isBookmarked: true,
    pitchDeckUrl: "https://example.com/deck2.pdf",
    team: [
      {
        name: "Elena Rossi",
        role: "CEO",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=elena",
      },
    ],
    metrics: [
      { label: "Verified Credits", value: "1.2M" },
      { label: "Partners", value: "15" },
    ],
  },
  {
    id: "3",
    name: "Aether Pay",
    tagline: "The liquidity layer for emerging markets.",
    description:
      "Aether Pay enables instant cross-border settlements using stablecoins, bypassing legacy banking rails in Southeast Asia.",
    sector: "Fintech",
    stage: "Seed",
    raised: 800000,
    target: 1500000,
    valuation: 8000000,
    location: "Singapore",
    logo: "https://api.dicebear.com/7.x/identicon/svg?seed=aether",
    validation: ["Fintech50", "Regulated"],
    isBookmarked: false,
    pitchDeckUrl: "https://example.com/deck3.pdf",
    team: [
      {
        name: "David Kim",
        role: "Founder",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      },
    ],
    metrics: [
      { label: "TPV", value: "$2M/mo" },
      { label: "Users", value: "10k+" },
    ],
  },
  {
    id: "4",
    name: "SynthBio",
    tagline: "Programming cells like software.",
    description:
      "SynthBio is a modular bio-design platform that allows researchers to drag-and-drop genetic components to create custom enzymes.",
    sector: "HealthTech",
    stage: "Series B",
    raised: 12000000,
    target: 20000000,
    valuation: 85000000,
    location: "Boston, MA",
    logo: "https://api.dicebear.com/7.x/identicon/svg?seed=synth",
    validation: ["Patented", "FDA Pending"],
    isBookmarked: false,
    pitchDeckUrl: "https://example.com/deck4.pdf",
    team: [
      {
        name: "Dr. James Wu",
        role: "Lead Scientist",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james",
      },
    ],
    metrics: [
      { label: "Patents", value: "14" },
      { label: "Pipeline", value: "3 Drugs" },
    ],
  },
  {
    id: "5",
    name: "Flow State",
    tagline: "Deep work analytics for remote teams.",
    description:
      "Flow State integrates with work tools to provide managers with non-invasive insights into team burnout and productivity peaks.",
    sector: "SaaS",
    stage: "Pre-seed",
    raised: 250000,
    target: 500000,
    valuation: 3000000,
    location: "Berlin, Germany",
    logo: "https://api.dicebear.com/7.x/identicon/svg?seed=flow",
    validation: ["Fastest Growing"],
    isBookmarked: true,
    pitchDeckUrl: "https://example.com/deck5.pdf",
    team: [
      {
        name: "Lars Weber",
        role: "Founder",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lars",
      },
    ],
    metrics: [
      { label: "Waitlist", value: "5k" },
      { label: "CAC", value: "$12" },
    ],
  },
  {
    id: "6",
    name: "Orbit Logistics",
    tagline: "Autonomous freight for the last mile.",
    description:
      "Orbit builds small-form-account autonomous delivery robots designed for suburban environments.",
    sector: "AI",
    stage: "Seed",
    raised: 2000000,
    target: 3500000,
    valuation: 15000000,
    location: "Austin, TX",
    logo: "https://api.dicebear.com/7.x/identicon/svg?seed=orbit",
    validation: ["Pilot Program", "Fortune 500"],
    isBookmarked: false,
    pitchDeckUrl: "https://example.com/deck6.pdf",
    team: [
      {
        name: "Sam Rivera",
        role: "CEO",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sam",
      },
    ],
    metrics: [
      { label: "Deliveries", value: "500+" },
      { label: "Fleet Size", value: "12" },
    ],
  },
  {
    id: "7",
    name: "Koda",
    tagline: "No-code smart contracts for legal teams.",
    description:
      "Koda simplifies complex legal agreements into executable smart contracts without writing a single line of Solidity.",
    sector: "Web3",
    stage: "Seed",
    raised: 1500000,
    target: 2000000,
    valuation: 10000000,
    location: "New York, NY",
    logo: "https://api.dicebear.com/7.x/identicon/svg?seed=koda",
    validation: ["Security Audited"],
    isBookmarked: false,
    pitchDeckUrl: "https://example.com/deck7.pdf",
    team: [
      {
        name: "Tiffany Page",
        role: "Founder",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tiffany",
      },
    ],
    metrics: [
      { label: "TVL", value: "$45M" },
      { label: "Active Orgs", value: "120" },
    ],
  },
  {
    id: "8",
    name: "Zephyr Health",
    tagline: "Personalized nutrition based on microbiome DNA.",
    description:
      "Zephyr provides at-home testing kits that analyze your gut health to provide 100% personalized meal plans.",
    sector: "HealthTech",
    stage: "Series A",
    raised: 6000000,
    target: 8000000,
    valuation: 40000000,
    location: "Los Angeles, CA",
    logo: "https://api.dicebear.com/7.x/identicon/svg?seed=zephyr",
    validation: ["Clinically Validated"],
    isBookmarked: false,
    pitchDeckUrl: "https://example.com/deck8.pdf",
    team: [
      {
        name: "Dr. Anna Scott",
        role: "CEO",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=anna",
      },
    ],
    metrics: [
      { label: "Subscribers", value: "12k" },
      { label: "Churn", value: "4%" },
    ],
  },
  {
    id: "9",
    name: "Prism Security",
    tagline: "Zero-trust architecture for IoT devices.",
    description:
      "Prism provides a lightweight security layer for the billions of insecure IoT devices currently connected to the grid.",
    sector: "SaaS",
    stage: "Seed",
    raised: 3000000,
    target: 4000000,
    valuation: 18000000,
    location: "Seattle, WA",
    logo: "https://api.dicebear.com/7.x/identicon/svg?seed=prism",
    validation: ["SOC2 Type II"],
    isBookmarked: true,
    pitchDeckUrl: "https://example.com/deck9.pdf",
    team: [
      {
        name: "Kevin Tran",
        role: "CEO",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=kevin",
      },
    ],
    metrics: [
      { label: "Endpoints", value: "250k" },
      { label: "LTV", value: "$85k" },
    ],
  },
  {
    id: "10",
    name: "Green Grid",
    tagline: "Peer-to-peer energy trading for neighborhoods.",
    description:
      "Green Grid allows homeowners with solar panels to sell excess energy directly to their neighbors via a decentralized marketplace.",
    sector: "Climate",
    stage: "Seed",
    raised: 500000,
    target: 1200000,
    valuation: 5000000,
    location: "Denver, CO",
    logo: "https://api.dicebear.com/7.x/identicon/svg?seed=greengrid",
    validation: ["DOE Grant"],
    isBookmarked: false,
    pitchDeckUrl: "https://example.com/deck10.pdf",
    team: [
      {
        name: "Mike Mendez",
        role: "Founder",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
      },
    ],
    metrics: [
      { label: "kWh Traded", value: "450k" },
      { label: "CO2 Saved", value: "120t" },
    ],
  },
];
