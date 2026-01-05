
CREATE TABLE IF NOT EXISTS startups (
  id text PRIMARY KEY,
  name text NOT NULL,
  tagline text,
  description text,
  sector text,
  stage text,
  raised bigint,
  target bigint,
  valuation bigint,
  location text,
  logo text,
  validation text[],
  is_bookmarked boolean DEFAULT false,
  pitch_deck_url text,
  team jsonb,
  metrics jsonb,
  created_at timestamptz DEFAULT now()
);

INSERT INTO startups (id, name, tagline, description, sector, stage, raised, target, valuation, location, logo, validation, is_bookmarked, pitch_deck_url, team, metrics) VALUES
('1', 'Nebula AI', 'Generative infrastructure for edge computing.', 'Nebula AI provides a decentralized layer for LLM inference at the edge, reducing latency by 80% for real-time applications.', 'AI', 'Seed', 1200000, 2000000, 12000000, 'San Francisco, CA', 'https://api.dicebear.com/7.x/identicon/svg?seed=nebula', ARRAY['Top 5%', 'YC W24', 'Verified Revenue'], false, 'https://example.com/deck1.pdf', '[{"name": "Sarah Chen", "role": "CEO (ex-Google)", "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah"}, {"name": "Marcus Thorne", "role": "CTO (PhD AI)", "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=marcus"}]', '[{"label": "MRR", "value": "$45k"}, {"label": "MoM Growth", "value": "22%"}, {"label": "Burn Rate", "value": "$12k/mo"}]'),
('2', 'Veridia', 'Carbon credit verification using satellite imagery.', 'Veridia uses high-resolution multispectral data to verify reforestation projects in real-time, bringing transparency to carbon markets.', 'Climate', 'Series A', 4500000, 5000000, 25000000, 'London, UK', 'https://api.dicebear.com/7.x/identicon/svg?seed=veridia', ARRAY['B-Corp', 'Techstars', 'High Impact'], true, 'https://example.com/deck2.pdf', '[{"name": "Elena Rossi", "role": "CEO", "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=elena"}]', '[{"label": "Verified Credits", "value": "1.2M"}, {"label": "Partners", "value": "15"}]'),
('3', 'Aether Pay', 'The liquidity layer for emerging markets.', 'Aether Pay enables instant cross-border settlements using stablecoins, bypassing legacy banking rails in Southeast Asia.', 'Fintech', 'Seed', 800000, 1500000, 8000000, 'Singapore', 'https://api.dicebear.com/7.x/identicon/svg?seed=aether', ARRAY['Fintech50', 'Regulated'], false, 'https://example.com/deck3.pdf', '[{"name": "David Kim", "role": "Founder", "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=david"}]', '[{"label": "TPV", "value": "$2M/mo"}, {"label": "Users", "value": "10k+"}]'),
('4', 'SynthBio', 'Programming cells like software.', 'SynthBio is a modular bio-design platform that allows researchers to drag-and-drop genetic components to create custom enzymes.', 'HealthTech', 'Series B', 12000000, 20000000, 85000000, 'Boston, MA', 'https://api.dicebear.com/7.x/identicon/svg?seed=synth', ARRAY['Patented', 'FDA Pending'], false, 'https://example.com/deck4.pdf', '[{"name": "Dr. James Wu", "role": "Lead Scientist", "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=james"}]', '[{"label": "Patents", "value": "14"}, {"label": "Pipeline", "value": "3 Drugs"}]'),
('5', 'Flow State', 'Deep work analytics for remote teams.', 'Flow State integrates with work tools to provide managers with non-invasive insights into team burnout and productivity peaks.', 'SaaS', 'Pre-seed', 250000, 500000, 3000000, 'Berlin, Germany', 'https://api.dicebear.com/7.x/identicon/svg?seed=flow', ARRAY['Fastest Growing'], true, 'https://example.com/deck5.pdf', '[{"name": "Lars Weber", "role": "Founder", "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=lars"}]', '[{"label": "Waitlist", "value": "5k"}, {"label": "CAC", "value": "$12"}]'),
('6', 'Orbit Logistics', 'Autonomous freight for the last mile.', 'Orbit builds small-form-account autonomous delivery robots designed for suburban environments.', 'AI', 'Seed', 2000000, 3500000, 15000000, 'Austin, TX', 'https://api.dicebear.com/7.x/identicon/svg?seed=orbit', ARRAY['Pilot Program', 'Fortune 500'], false, 'https://example.com/deck6.pdf', '[{"name": "Sam Rivera", "role": "CEO", "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=sam"}]', '[{"label": "Deliveries", "value": "500+"}, {"label": "Fleet Size", "value": "12"}]'),
('7', 'Koda', 'No-code smart contracts for legal teams.', 'Koda simplifies complex legal agreements into executable smart contracts without writing a single line of Solidity.', 'Web3', 'Seed', 1500000, 2000000, 10000000, 'New York, NY', 'https://api.dicebear.com/7.x/identicon/svg?seed=koda', ARRAY['Security Audited'], false, 'https://example.com/deck7.pdf', '[{"name": "Tiffany Page", "role": "Founder", "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=tiffany"}]', '[{"label": "TVL", "value": "$45M"}, {"label": "Active Orgs", "value": "120"}]'),
('8', 'Zephyr Health', 'Personalized nutrition based on microbiome DNA.', 'Zephyr provides at-home testing kits that analyze your gut health to provide 100% personalized meal plans.', 'HealthTech', 'Series A', 6000000, 8000000, 40000000, 'Los Angeles, CA', 'https://api.dicebear.com/7.x/identicon/svg?seed=zephyr', ARRAY['Clinically Validated'], false, 'https://example.com/deck8.pdf', '[{"name": "Dr. Anna Scott", "role": "CEO", "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=anna"}]', '[{"label": "Subscribers", "value": "12k"}, {"label": "Churn", "value": "4%"}]'),
('9', 'Prism Security', 'Zero-trust architecture for IoT devices.', 'Prism provides a lightweight security layer for the billions of insecure IoT devices currently connected to the grid.', 'SaaS', 'Seed', 3000000, 4000000, 18000000, 'Seattle, WA', 'https://api.dicebear.com/7.x/identicon/svg?seed=prism', ARRAY['SOC2 Type II'], true, 'https://example.com/deck9.pdf', '[{"name": "Kevin Tran", "role": "CEO", "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=kevin"}]', '[{"label": "Endpoints", "value": "250k"}, {"label": "LTV", "value": "$85k"}]'),
('10', 'Green Grid', 'Peer-to-peer energy trading for neighborhoods.', 'Green Grid allows homeowners with solar panels to sell excess energy directly to their neighbors via a decentralized marketplace.', 'Climate', 'Seed', 500000, 1200000, 5000000, 'Denver, CO', 'https://api.dicebear.com/7.x/identicon/svg?seed=greengrid', ARRAY['DOE Grant'], false, 'https://example.com/deck10.pdf', '[{"name": "Mike Mendez", "role": "Founder", "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=mike"}]', '[{"label": "kWh Traded", "value": "450k"}, {"label": "CO2 Saved", "value": "120t"}]');

ALTER TABLE startups ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Access" ON startups FOR SELECT USING (true);
CREATE POLICY "Public Update Access" ON startups FOR UPDATE USING (true); 
