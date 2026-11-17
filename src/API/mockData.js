export const INITIAL_STATS = {
  sessions: 6840,
  leads: 184,
  hot_leads: 42,
  bookings: 38,
  cpl: 312,
  ad_spend: 31800,
  monthly_budget: 45000,
  published_content: 136,
  follow_up_messages: 350,
  deals_won: 14,
  deals_won_value: 485000,
  sessions_status: 'Connected to Google Analytics 4',
};

export const INITIAL_FEED = [
  {
    id: 1,
    agent: 'orch',
    category: 'ai',
    what: 'Orchestrator planned hourly marketing sprint and scheduled 4 agent tasks',
    why: 'Hourly cron triggered. Checked goals: Website visits +12%, leads on track.',
    chips: [['Hourly Cycle', 'blue'], ['LangGraph', 'violet']],
    created_at_formatted: 'Just now',
    workflow_path: ['CRM', 'Marketing Automation', 'Lead Pipeline'],
  },
  {
    id: 2,
    agent: 'content',
    category: 'content',
    what: 'Agent 2 generated SEO Blog Package: "AI in Small Business Marketing (2026 Guide)"',
    why: 'Target keyword search volume surged by 45% in current market scan.',
    chips: [['WordPress Draft', 'green'], ['SEO Score 92', 'blue']],
    created_at_formatted: '4m ago',
    workflow_path: ['Research', 'Content Creation', 'WordPress'],
  },
  {
    id: 3,
    agent: 'seo',
    category: 'ads',
    what: 'Agent 3 reviewed meta-data and audited Google Ads search terms',
    why: 'Identified 3 negative keywords to reduce cost-per-click waste.',
    chips: [['Google Ads', 'amber'], ['Audit Complete', 'green']],
    created_at_formatted: '12m ago',
    workflow_path: ['Ad Strategy', 'Budget Optimization'],
  },
  {
    id: 4,
    agent: 'assistant',
    category: 'lead',
    what: 'Inbound enquiry from Rohit Rawat qualified with Hot score 85/100',
    why: 'Customer expressed immediate budget (₹80k) and requested call.',
    chips: [['Hot Lead', 'red'], ['WhatsApp Alert', 'green']],
    created_at_formatted: '18m ago',
    workflow_path: ['Lead Capture', 'CRM Pipeline', 'Auto Follow-up'],
  },
  {
    id: 5,
    agent: 'social',
    category: 'social',
    what: 'Agent 4 prepared social media variants for LinkedIn, Instagram & Facebook',
    why: 'Repurposing top-performing blog post into visual carousel and caption briefs.',
    chips: [['Multi-Platform', 'violet'], ['Pending Review', 'amber']],
    created_at_formatted: '25m ago',
    workflow_path: ['Social Distribution', 'Human Gate'],
  },
];

export const INITIAL_ATTENTION = {
  counts: {
    approvals: 2,
    hot_leads: 1,
    escalations: 1,
  },
  approvals: [
    {
      id: 101,
      item_type: 'Blog Article',
      channel: 'WordPress',
      title: 'Top 7 AI Tools That Automate Local Business Operations in 2026',
      agent: 'content',
    },
    {
      id: 102,
      item_type: 'Budget Increase',
      channel: 'Meta Ads',
      title: 'Increase High-Performing Retargeting Campaign daily cap by ₹500',
      agent: 'ads',
    },
  ],
  hot_leads: [
    {
      id: 201,
      name: 'Rohit Rawat',
      score: 85,
      message: 'Need a quote for an e-commerce website, budget around ₹80k. Can we book a call this week?',
      source: 'website_form',
      phone: '+91 98970 12345',
      deal_value: 80000,
    },
  ],
  escalations: [
    {
      id: 301,
      channel: 'Instagram',
      sender: 'vikram_sharma',
      message: 'I paid for the consultation yesterday but did not receive the confirmation link.',
      reason: 'Payment query & dissatisfaction flagged by Sentiment Analysis',
    },
  ],
};

export const INITIAL_LEADS = [
  {
    id: 1,
    name: 'Rohit Rawat',
    score: 85,
    source: 'website_form',
    deal_value: 80000,
    stage: 'new',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    score: 72,
    source: 'google_ads',
    deal_value: 120000,
    stage: 'in_progress',
  },
  {
    id: 3,
    name: 'Amit Patel',
    score: 64,
    source: 'whatsapp',
    deal_value: 45000,
    stage: 'in_progress',
  },
  {
    id: 4,
    name: 'Kavita Reddy',
    score: 91,
    source: 'live_chat',
    deal_value: 150000,
    stage: 'in_progress',
  },
  {
    id: 5,
    name: 'Suresh Menon',
    score: 78,
    source: 'facebook',
    deal_value: 65000,
    stage: 'won',
  },
  {
    id: 6,
    name: 'Anjali Gupta',
    score: 35,
    source: 'organic',
    deal_value: 25000,
    stage: 'lost',
  },
];

export const INITIAL_GOALS_BUDGET = {
  budget: {
    spend_so_far: 31800,
    monthly_budget: 45000,
    projected_month_end: 43200,
    daily_budget: 1500,
    pace_percentage: 96,
    is_over_budget: false,
  },
  goals: [
    {
      metric_key: 'leads',
      metric_label: 'Qualified Leads',
      name: 'Qualified Leads',
      current: 184,
      target: 200,
      percentage: 92,
      status: 'on_track',
      is_currency: false,
    },
    {
      metric_key: 'bookings',
      metric_label: 'Consultations Booked',
      name: 'Consultations Booked',
      current: 38,
      target: 40,
      percentage: 95,
      status: 'on_track',
      is_currency: false,
    },
    {
      metric_key: 'traffic',
      metric_label: 'Organic Website Traffic',
      name: 'Organic Website Traffic',
      current: 6840,
      target: 8000,
      percentage: 85,
      status: 'behind',
      is_currency: false,
    },
    {
      metric_key: 'cpl',
      metric_label: 'Max Cost Per Lead (₹400)',
      name: 'Max Cost Per Lead (₹400)',
      current: 312,
      target: 400,
      percentage: 78,
      status: 'on_track',
      is_currency: true,
    },
  ],
  recommendation: {
    title: 'Boost SEO Articles for High-Volume Intent Keywords',
    desc: 'Website traffic is at 85% of monthly goal. Agent 2 has prepared 3 high-intent articles to bridge the 1,160 session gap before month end.',
  },
};

export const INITIAL_HOURLY_ANALYTICS = {
  sessions: [140, 110, 80, 50, 45, 60, 110, 240, 390, 510, 580, 620, 590, 560, 540, 570, 610, 640, 580, 490, 420, 350, 260, 180],
  leads: [2, 1, 0, 0, 0, 1, 3, 6, 9, 12, 14, 15, 13, 11, 10, 12, 14, 16, 13, 10, 8, 5, 4, 2],
};

export const INITIAL_RULES = [
  {
    rule_key: 'new_lead_instant_reply',
    when_trigger: 'New enquiry arrives from any channel',
    then_action: 'Instant AI personalized reply via Email/WhatsApp within 60s',
    done_by: 'Customer Assistant',
    user_control: 'Tone & templates customizable in settings',
    fired_count: 184,
  },
  {
    rule_key: 'hot_lead_scoring_alert',
    when_trigger: 'Enquiry score ≥ 70 (Hot Intent)',
    then_action: 'Send instant SMS/WhatsApp alert to sales owner and mark high priority',
    done_by: 'CRM Engine',
    user_control: 'Set hot score threshold (default 70)',
    fired_count: 42,
  },
  {
    rule_key: 'ad_budget_protection',
    when_trigger: 'Monthly ad pacing > 105% of budget',
    then_action: 'Automatically reduce non-converting ad group daily budgets',
    done_by: 'Ads Agent',
    user_control: 'Hard monthly budget limit ceiling',
    fired_count: 8,
  },
  {
    rule_key: 'content_human_approval',
    when_trigger: 'Agent 2 & 3 complete SEO blog draft',
    then_action: 'Stage post in WordPress strictly as draft (never publish live directly)',
    done_by: 'SEO & Content Agent',
    user_control: 'Strict human-in-the-loop review switch',
    fired_count: 36,
  },
  {
    rule_key: 'complaint_escalation',
    when_trigger: 'Customer inquiry contains negative sentiment or billing complaint',
    then_action: 'Halt AI automated replies and escalate to Business Owner attention queue',
    done_by: 'Marketing Manager',
    user_control: 'Always active for safety governance',
    fired_count: 5,
  },
  {
    rule_key: 'stale_lead_nurture',
    when_trigger: 'Lead inactive for 14 days in pipeline',
    then_action: 'Send gentle re-engagement sequence with case study',
    done_by: 'Follow-up Engine',
    user_control: 'Re-engagement interval & opt-out',
    fired_count: 29,
  },
];

export const INITIAL_AGENT_CONTENT = [
  {
    id: 1,
    topic: 'How Generative AI is Reshaping Local Business Marketing in 2026',
    audience: 'Small to Medium Business Owners & Founders',
    status: 'wp_draft_created',
    wp_post_id: 1042,
    wp_post_url: 'https://drdesigntechnology.com/?p=1042&preview=true',
    created_at_formatted: 'Today · 10:15 AM',
    draft_post: `# How Generative AI is Reshaping Local Business Marketing in 2026\n\nArtificial Intelligence is no longer just for enterprise tech giants. In 2026, local service businesses, retail stores, and agencies are leveraging autonomous multi-agent systems to streamline lead capture, publish high-ranking SEO content, and provide 24/7 customer assistance.\n\n## 1. Zero-Latency Lead Qualification\nWhen a prospect reaches out at 11 PM, traditional businesses lose them to voicemail. With autonomous AI assistants, responses happen within seconds, capturing critical budget and scope parameters.\n\n## 2. Dynamic Content Scheduling\nContinuous SEO audits identify low-competition, high-intent keywords that bring qualified traffic straight to your website.`,
    content_brief: {
      image_prompt: 'A modern, high-tech workspace showing dynamic holographic data dashboards, warm lighting, cinematic 8k resolution.',
    },
    seo_review: {
      seo_score: 94,
      meta_title: 'How AI is Reshaping Local Business Marketing in 2026 | Dr. Design',
      meta_description: 'Discover how small businesses are scaling with autonomous AI marketing agents, lead qualification, and SEO automation.',
      primary_keyword: 'ai marketing for small business',
      secondary_keywords: ['local seo automation', 'ai lead qualification', 'content marketing 2026'],
    },
    ad_strategy: {
      ad_campaign_name: 'SMB Growth AI Masterclass 2026',
      recommended_daily_budget: 650,
    },
  },
  {
    id: 2,
    topic: 'Automated Multi-Channel CRM: Turning Cold Traffic into High-Ticket Bookings',
    audience: 'Service Providers & Consultants',
    status: 'seo_reviewed',
    created_at_formatted: 'Today · 11:30 AM',
    draft_post: `# Automated Multi-Channel CRM: Turning Cold Traffic into High-Ticket Bookings\n\nCapturing leads is only half the battle. This comprehensive guide outlines the exact follow-up cadence that converts cold website traffic into committed strategy calls.`,
    content_brief: {
      image_prompt: 'Minimalist 3D isometric representation of an automated conversion pipeline with glowing conduits.',
    },
    seo_review: {
      seo_score: 88,
      meta_title: 'Automated Multi-Channel CRM Strategy Guide | Dr. Design',
      meta_description: 'Learn the exact automated CRM workflow to nurture and close high-ticket clients without manual overhead.',
      primary_keyword: 'multi-channel crm automation',
      secondary_keywords: ['lead nurture cadence', 'conversion optimization', 'sales pipeline'],
    },
    ad_strategy: {
      ad_campaign_name: 'High-Ticket CRM Funnel Retargeting',
      recommended_daily_budget: 800,
    },
  },
];

export const INITIAL_SOCIAL_DRAFTS = [
  {
    id: 1,
    platform: 'LinkedIn',
    status: 'draft',
    post_text: 'Are you still manually following up with website leads? In 2026, companies responding within 60 seconds are closing 4x more contracts. Here is how autonomous AI workflows qualify prospects before you even hop on the call.',
    hashtags: '#MarketingAutomation #AI2026 #LeadGen #B2BGrowth',
    image_prompt: 'Professional infographic showing lead conversion metrics comparing manual vs AI response times.',
  },
  {
    id: 2,
    platform: 'Instagram',
    status: 'draft',
    post_text: 'Stop letting warm leads go cold! ⚡ Our multi-agent AI system scores enquiries, drafts tailored replies, and keeps your pipeline full while you focus on delivering great work. Swipe to see the workflow in action ➡️',
    hashtags: '#DigitalMarketing #AutomationTools #EntrepreneurLife #TechTrends',
    image_prompt: 'Sleek carousel cover with typography: "The 60-Second Lead Rule That Changed Everything".',
  },
  {
    id: 3,
    platform: 'Facebook',
    status: 'approved',
    post_text: 'How much time does your team spend writing blog posts and scheduling social updates each week? Discover how our 4-agent AI marketing pipeline handles the heavy lifting with full human approval safeguards.',
    hashtags: '#SmallBusinessTips #AgencyAutomation #ContentMarketing',
    image_prompt: 'Engaging photo of a happy business owner reviewing metrics on a tablet in a modern studio.',
  },
  {
    id: 4,
    platform: 'YouTube',
    status: 'draft',
    post_text: 'NEW VIDEO: Complete Breakdown of our Multi-Agent AI Marketing Architecture built with LangGraph and Django. Watch how 4 autonomous agents coordinate research, SEO, and lead capture.',
    hashtags: '#Python #LangGraph #AIagents #SoftwareArchitecture',
    image_prompt: 'High-contrast YouTube thumbnail: Split screen with code and glowing multi-agent nodes.',
  },
];

export const INITIAL_CUSTOMER_REPLIES = [
  {
    id: 1,
    customer_name: 'Karan Mehra',
    enquiry_source: 'WhatsApp',
    priority: 'high',
    sentiment: 'positive',
    customer_message: 'Hi team, do you provide customized CRM integration with our existing WordPress site and WooCommerce store? What is the setup timeline?',
    suggested_reply: 'Hello Karan! Yes, our platform provides direct REST API integration with WordPress and WooCommerce to automatically sync customers, orders, and inquiries into your CRM. Typical setup takes between 2 to 4 business days. Would you like to schedule a quick 15-minute demo call this Thursday?',
    status: 'pending_review',
    send_status: 'not_sent_human_review_required',
  },
  {
    id: 2,
    customer_name: 'Sunita Rao',
    enquiry_source: 'Website Form',
    priority: 'normal',
    sentiment: 'neutral',
    customer_message: 'Can I test the platform with a demo account before committing to the monthly plan?',
    suggested_reply: 'Hello Sunita! Absolutely. You can test the interactive workflow simulation live directly on our dashboard or schedule a guided walkthrough with our technical team. Would you like us to provision a test workspace for you?',
    status: 'pending_review',
    send_status: 'not_sent_human_review_required',
  },
];

export const INITIAL_AGENT_TASKS = [
  {
    id: 1041,
    agent_name: 'Agent 1 (Marketing Manager)',
    task_type: 'Hourly Performance Audit',
    status: 'completed',
    priority: 'high',
    created_at_formatted: 'Today · 11:00 AM',
    execution_logs: [
      { action: 'Audit Goals', message: 'Queried MySQL CRM for current lead counts and spend targets.' },
      { action: 'Task Allocation', message: 'Dispatched Agent 2 for keyword gap analysis and Agent 3 for SEO audit.' },
    ],
  },
  {
    id: 1042,
    agent_name: 'Agent 2 (Content & Research)',
    task_type: 'SEO Blog Draft Generation',
    status: 'completed',
    priority: 'normal',
    created_at_formatted: 'Today · 11:05 AM',
    execution_logs: [
      { action: 'Web Research', message: 'Gathered top 10 search results for query: "ai marketing small business".' },
      { action: 'Draft Article', message: 'Generated 1,200-word markdown draft with header hierarchy.' },
      { action: 'DALL-E 3', message: 'Generated featured image prompt for stage review.' },
    ],
  },
  {
    id: 1043,
    agent_name: 'Agent 3 (SEO & Advertising)',
    task_type: 'SEO Optimization & Ad Strategy',
    status: 'completed',
    priority: 'high',
    created_at_formatted: 'Today · 11:10 AM',
    execution_logs: [
      { action: 'SEO Audit', message: 'Calculated 94/100 score; generated optimized meta title and schema markup.' },
      { action: 'Ad Proposal', message: 'Prepared ₹650/day targeted search campaign for review.' },
    ],
  },
  {
    id: 1044,
    agent_name: 'Agent 4 (Social & Support)',
    task_type: 'Multi-Channel Repurposing',
    status: 'completed',
    priority: 'normal',
    created_at_formatted: 'Today · 11:15 AM',
    execution_logs: [
      { action: 'Social Drafts', message: 'Crafted 4 platform-specific drafts for LinkedIn, IG, FB & YouTube.' },
      { action: 'Gate Staged', message: 'Staged for human owner approval.' },
    ],
  },
];

export const INITIAL_INTEGRATIONS = {
  agent_1: {
    google_analytics_4: { status: 'connected' },
    google_search_console: { status: 'connected' },
    meta_marketing_api: { status: 'configured' },
    google_ads_api: { status: 'configured' },
    linkedin_marketing_api: { status: 'not_configured' },
    youtube_analytics: { status: 'connected' },
  },
  agent_2: {
    openai_gpt4_turbo: { status: 'connected' },
    openai_dall_e_3: { status: 'connected' },
    tavily_web_research: { status: 'connected' },
    google_trends_api: { status: 'connected' },
    keyword_planner: { status: 'configured' },
  },
  agent_3: {
    wordpress_rest_api: { status: 'connected' },
    rank_math_seo: { status: 'connected' },
    google_pagespeed: { status: 'connected' },
    meta_ads_audit: { status: 'configured' },
  },
  agent_4: {
    facebook_graph_api: { status: 'configured' },
    instagram_graph_api: { status: 'configured' },
    linkedin_posts_api: { status: 'not_configured' },
    whatsapp_cloud_api: { status: 'connected' },
    inbound_crm_mysql: { status: 'connected' },
  },
};

export const INITIAL_WORDPRESS_STATUS = {
  connected: true,
  site_url: 'https://drdesigntechnology.com',
  account: {
    data: {
      name: 'Dr. Design Admin',
      username: 'drdesign_admin',
      roles: ['Administrator', 'Editor'],
    },
  },
  seo_plugin: {
    data: {
      detected_seo_plugin: 'rank_math',
    },
  },
  posts_summary: {
    data: {
      total_posts: 148,
    },
  },
  drafts_summary: {
    data: {
      draft_count: 7,
    },
  },
};

export const WORKFLOW_DETAILS = {
  inputs: {
    t: 'Data inputs & research',
    does: 'Everything the system learns from. Each source is a connector that runs in demo mode (simulated) or live mode (real API).',
    in: [
      'Google Analytics 4 — sessions, users, conversions',
      'Search Console — impressions, clicks, positions',
      'Competitor & keyword tools (Semrush/Ahrefs)',
      'Customer enquiries from every channel',
      'Google reviews',
      'Local market split of leads by location',
    ],
    out: ['Research data to the orchestrator', 'Keyword opportunity scores'],
    ctl: [],
    items: ['Website analytics (Google Analytics)', 'Search data (Search Console)', 'Competitor analysis', 'Industry trends', 'Customer enquiries', 'Reviews & feedback', 'Keyword research', 'Local market data'],
  },
  orch: {
    t: 'AI Marketing Manager (Orchestrator)',
    does: 'Runs a full cycle on a schedule (default every hour) or on demand. It reads goal progress, builds a plan with extra effort where goals are behind, assigns each task to an agent, then publishes, follows up and analyses results.',
    in: [
      'Research data',
      'Your goals, budgets, approvals and priorities',
      'Results from the last cycle (learnings)',
    ],
    out: ['Task plan for six agents', 'Approval queue', 'Budget enforcement', 'Recommendations & notifications'],
    ctl: ['Priorities decide how many blogs, SEO fixes and posts each cycle produces', 'Approval switches decide what waits for you'],
    items: ['Plans and coordinates all workflows', 'Analyses performance and identifies opportunities', 'Assigns tasks to specialist AI agents', 'Monitors results and recommends improvements', 'Handles approvals and budget controls'],
  },
  goals: {
    t: 'Business goals & settings (you control)',
    does: 'Your control panel. The orchestrator plans every cycle around these settings.',
    in: [
      'Monthly goals: leads, bookings, sessions, max cost per lead, top-10 keywords, content published',
      'Monthly budgets per channel',
      'Target audience, services and locations',
      'Approvals on/off · priorities per area · notification preferences',
    ],
    out: ['Goals and settings to the orchestrator'],
    ctl: [],
    items: ['Set business goals', 'Set monthly budgets', 'Approve content (optional)', 'Set target audience and locations', 'View reports and results', 'Adjust priorities', 'Receive notifications'],
  },
  research: {
    t: 'AI Research Agent',
    does: 'Scores every keyword by volume, difficulty, current position and intent; mines the words customers actually use in enquiries; tracks competitors and reviews; finds new local keyword ideas (service × location).',
    in: [],
    out: ['Top content & keyword opportunities', 'Enquiry themes, local market, competitor snapshot', 'Insights report stored each cycle'],
    ctl: [],
    items: ['Keyword research', 'Competitor analysis', 'Market trends', 'Content opportunities', 'Local SEO insights', 'Audience research'],
  },
  content: {
    t: 'AI Content Agent',
    does: 'Writes SEO blog articles for the top-opportunity keyword (with SEO title, meta description and schema), email newsletters, ad copy variants and image/video briefs, and maintains a 14-day content calendar.',
    in: [],
    out: ['Drafts into the approval queue (or straight to schedule if approvals are off)'],
    ctl: ['Uses your brand tone, audience, services and content pillars'],
    items: ['Blog articles (SEO)', 'Website content', 'Social media posts', 'Email content', 'Ad copy', 'Image and video creation', 'Content calendar'],
  },
  seo: {
    t: 'AI SEO Agent',
    does: 'Audits every page for missing or over-long titles and meta descriptions, missing H1, thin content, missing schema and weak internal linking, and scores each page out of 100. Proposes AI-written meta fixes and tracks keyword ranking movement.',
    in: [],
    out: ['Page health scores & issues', 'Meta-tag fixes for approval (applied to the page when approved)', 'Internal-link and schema recommendations'],
    ctl: [],
    items: ['On-page SEO', 'Technical SEO checks', 'Meta titles and descriptions', 'Internal linking', 'Schema markup', 'Monitor rankings', 'Recommend improvements'],
  },
  ads: {
    t: 'AI Ads Agent',
    does: 'Optimises Google and Meta campaigns: pauses ad variants with CTR well below average and launches AI-written challengers, pauses campaigns spending with zero conversions, and paces daily budgets so the month never exceeds your limit.',
    in: [],
    out: ['Optimisation actions log', 'Budget-increase requests for your approval', 'New keywords from research'],
    ctl: ['Budget cuts are automatic; increases need your approval'],
    items: ['Google Ads', 'Meta Ads (Facebook & Instagram)', 'Keyword selection', 'Ad creative generation', 'Campaign optimisation', 'Monitor spend & ROI', 'Suggest improvements'],
  },
  social: {
    t: 'AI Social Media Agent',
    does: 'Creates platform-native posts for Facebook, Instagram, LinkedIn, Google Business and YouTube, schedules them at each platform\'s best time, repurposes the latest blog, and replies to comments with AI — complaints are escalated to you. Learns which platform performs best and gives it extra posts.',
    in: [],
    out: ['Scheduled posts with image briefs', 'Comment replies', 'Platform learnings'],
    ctl: [],
    items: ['Create social posts', 'Generate images/videos', 'Schedule and publish', 'Manage Facebook, Instagram, LinkedIn etc.', 'Monitor engagement', 'Repurpose content', 'Respond to comments (AI)'],
  },
  assistant: {
    t: 'AI Customer Assistant',
    does: 'Handles live chat and WhatsApp 24/7: answers FAQs, asks qualifying questions, picks up name/email/phone and creates or updates the CRM lead, books consultations into the next free slot, and escalates complaints or anything it is unsure about.',
    in: [],
    out: ['Leads in CRM', 'Bookings with confirmations', 'Escalations to you'],
    ctl: [],
    items: ['Respond to enquiries', 'Qualify leads', 'Answer FAQs', 'Book consultations', 'Handle live chat/WhatsApp', 'Escalate complex enquiries to you', 'Update CRM'],
  },
  s_content: {
    t: 'Content creation & optimisation',
    does: 'All AI drafts land here. You can edit, approve, reject (with a note), reschedule, or publish immediately. Nothing goes out without approval when approvals are on.',
    in: [],
    out: ['Approved content to Publish & distribute'],
    ctl: [],
    items: ['Blog articles (SEO)', 'Website content updates', 'Social media posts', 'Ad copy and creatives', 'Email campaigns', 'Images and videos (AI generated)'],
  },
  s_publish: {
    t: 'Publish & distribute',
    does: 'At each item\'s scheduled time it is delivered to the right destination. WordPress posts directly through its REST API; other channels go through their API or a webhook (Zapier / Make / n8n). Reach, engagement and clicks are tracked per post.',
    in: [],
    out: ['Live posts & URLs', 'Performance metrics to reporting'],
    ctl: [],
    items: ['Website / CMS (e.g. WordPress)', 'Google Business Profile', 'Facebook', 'Instagram', 'LinkedIn', 'YouTube', 'Other platforms (optional)'],
  },
  s_ads: {
    t: 'Advertising campaigns',
    does: 'Google Ads and Meta Ads campaigns with A/B ad variations. Every new campaign starts with 3 AI-written ads. Spend, clicks, CTR, leads and cost per lead are tracked daily against the monthly budget.',
    in: [],
    out: ['Ad leads into the CRM', 'Spend & ROI to reporting'],
    ctl: [],
    items: ['Google Ads', 'Meta Ads (Facebook & Instagram)', 'Create and test ad variations', 'Monitor performance', 'Optimise automatically', 'Stay within budget limits', 'Generate reports'],
  },
  s_crm: {
    t: 'Lead capture & CRM',
    does: 'Every enquiry — website form, live chat, Facebook/Instagram lead ads, AI phone agent, WhatsApp — is de-duplicated, scored 0-100 (source, intent, urgency, budget, service area) and tagged hot/warm/cold. Drag-and-drop pipeline: New → Contacted → Qualified → Proposal → Won/Lost. Hot leads notify you instantly.',
    in: [],
    out: ['Leads into follow-up sequences', 'Pipeline value & conversions to reporting'],
    ctl: [],
    items: ['Website enquiry forms', 'Live chat (AI)', 'Facebook & Instagram enquiries', 'Phone enquiries (AI voice agent)', 'CRM (e.g. HighLevel / HubSpot)', 'Lead scoring and tagging', 'Create customer pipeline', 'Notify you of high-value leads'],
  },
  s_follow: {
    t: 'Automatic follow-up',
    does: 'Sequences trigger on events: new enquiry (instant email + WhatsApp, then nurture over 7 days), booking (confirmations), qualified (nurture), won (review request), inactive 14 days (re-engagement). Each message is written by AI for that lead.',
    in: [],
    out: ['Emails, WhatsApp and SMS sent', 'Leads nurtured until conversion'],
    ctl: [],
    items: ['Instant AI response to enquiries', 'Automated email sequences', 'SMS follow-ups (optional)', 'Booking confirmations', 'Review requests', 'Re-engagement campaigns', 'Nurture leads until conversion'],
  },
  r_sources: {
    t: 'Data sources',
    does: 'Analytics, Search Console, Google & Meta Ads, CRM, enquiries, bookings and social insights are combined into one daily dataset.',
    in: [],
    out: [],
    ctl: [],
    items: ['Google Analytics', 'Google Search Console', 'Google Ads · Meta Ads', 'CRM data', 'Website enquiries', 'Sales / bookings', 'Social media insights'],
  },
  r_reports: {
    t: 'Automated reporting',
    does: 'Live dashboards plus weekly and monthly reports generated automatically with an AI-written summary: traffic, rankings, leads by source, ad spend & ROI, cost per lead, conversion rate, social performance and top content. Exportable to CSV/PDF.',
    in: [],
    out: [],
    ctl: [],
    items: ['Website traffic and rankings', 'Leads generated', 'Advertising spend and ROI', 'Conversion rates', 'Social media performance', 'Top performing content', 'Weekly & monthly reports'],
  },
  r_ai: {
    t: 'AI analysis & recommendations',
    does: 'Each cycle finds keywords in striking distance (positions 4-15), ranking drops, campaigns with high cost per lead, the best lead source, leads waiting over 24h, the best social platform and goals behind target — each as a recommendation, many with one-click apply.',
    in: [],
    out: [],
    ctl: [],
    items: ["Identify what's working", 'Suggest improvements', 'Highlight new opportunities', 'Detect underperforming campaigns', 'Recommend content ideas', 'Provide growth strategies'],
  },
  r_results: {
    t: 'Results',
    does: 'More traffic and rankings, more enquiries and bookings, lower cost per lead, better engagement and higher return on ad spend — measured against your goals every month.',
    in: [],
    out: [],
    ctl: [],
    items: ['More website traffic', 'Higher search rankings', 'More enquiries and bookings', 'Lower cost per lead', 'Better social engagement', 'Higher return on ad spend', 'Sustainable business growth'],
  },
};

export const TOUR_STEPS = [
  {
    targetId: 's1',
    title: 'Welcome 👋',
    text: 'This page shows the AI Marketing Manager running live. The dark banner says what just happened and why. The boxes under it light up to show which part of the workflow executed.',
  },
  {
    targetId: 's2',
    title: 'Your results',
    text: 'These are your real numbers for the month loaded dynamically from MySQL. Each one has a short explanation underneath.',
  },
  {
    targetId: 's3',
    title: 'You stay in control',
    text: 'Drafts waiting for your approval show here. Click Approve on one and the live database will mark it approved.',
  },
  {
    targetId: 's4',
    title: 'Activity Log',
    text: 'Every real enquiry, scoring event, and automated action is logged here live from the Activity Log table.',
  },
  {
    targetId: 's5',
    title: 'Where every lead is',
    text: 'Every enquiry moves through your CRM pipeline stages. Hot leads notify you immediately.',
  },
  {
    targetId: 's6',
    title: 'Budget & goals',
    text: 'Live tracking of your monthly ad spend, budget limits, targets, and hourly analytics line chart.',
  },
  {
    targetId: 's7',
    title: 'Try it yourself',
    text: 'Submit a real enquiry here. It will call your Django REST API, score the lead, save it in MySQL, and tick off the steps!',
  },
];

export const INITIAL_AD_PROPOSALS = [
  {
    id: 1,
    campaign_name: 'High-Intent Search Campaign (Q4 AI Automation)',
    platform: 'Google Ads',
    target_audience: 'Small to Mid-Market Business Owners',
    daily_budget: 650,
    status: 'pending',
    ad_copies: [
      { headline: 'Automate Your Marketing with AI', desc: 'Save 20+ hours a week with autonomous lead generation.' },
      { headline: 'Turn Website Traffic Into Paying Clients', desc: 'AI-powered CRM scoring and automated instant responses.' },
    ],
    recommended_keywords: ['ai marketing automation', 'small business crm', 'automated lead generation'],
    created_at_formatted: '2h ago',
  },
  {
    id: 2,
    campaign_name: 'Retargeting High-Intent Website Visitors',
    platform: 'Meta Ads',
    target_audience: 'Visited pricing or demo page within 14 days',
    daily_budget: 500,
    status: 'pending',
    ad_copies: [
      { headline: 'Still wondering how to scale leads?', desc: 'See how our 4-agent workflow handles content, ads, and support.' },
    ],
    created_at_formatted: '5h ago',
  },
];

export const INITIAL_AGENT_LOGS = [
  {
    id: 1,
    timestamp: '2026-11-17 12:45:10',
    level: 'INFO',
    agent: 'agent_1',
    message: 'Hourly supervisor cycle started. Checked goals: Website visits +12%, leads on track.',
  },
  {
    id: 2,
    timestamp: '2026-11-17 12:45:12',
    level: 'INFO',
    agent: 'agent_2',
    message: 'Dispatched research task. Keyword trend query: "AI in Small Business Marketing" volume +45%.',
  },
  {
    id: 3,
    timestamp: '2026-11-17 12:45:18',
    level: 'WARNING',
    agent: 'agent_3',
    message: 'Meta Ads insights token expiring in 48 hours. Using graceful cached fallback.',
  },
  {
    id: 4,
    timestamp: '2026-11-17 12:45:25',
    level: 'INFO',
    agent: 'agent_4',
    message: 'Inbound enquiry from Rohit Rawat classified as hot lead. Immediate WhatsApp notification dispatched.',
  },
];

export const INITIAL_BACKGROUND_STATUS = {
  status: 'active',
  worker_type: 'ThreadPoolExecutor & Celery',
  active_tasks: 0,
  queued_tasks: 0,
  completed_cycles: 48,
  redis_connection: 'healthy',
  celery_beat: 'running',
  last_cycle_timestamp: 'Just now',
};

export const INITIAL_WORDPRESS_CATEGORIES = [
  { id: 1, name: 'AI Marketing', slug: 'ai-marketing', count: 18 },
  { id: 2, name: 'Business Automation', slug: 'business-automation', count: 14 },
  { id: 3, name: 'SEO & Content', slug: 'seo-content', count: 22 },
  { id: 4, name: 'CRM & Lead Management', slug: 'crm-lead-management', count: 11 },
];

export const INITIAL_WORDPRESS_TAGS = [
  { id: 101, name: 'LangGraph', count: 8 },
  { id: 102, name: 'SEO Optimization', count: 15 },
  { id: 103, name: 'Lead Nurturing', count: 12 },
  { id: 104, name: 'Google Ads', count: 9 },
  { id: 105, name: 'Meta Ads', count: 7 },
];

export const INITIAL_WORDPRESS_POSTS = [
  {
    id: 101,
    title: 'Top 7 AI Tools That Automate Local Business Operations in 2026',
    slug: 'top-7-ai-tools-automate-local-business-operations-2026',
    status: 'draft',
    categories: [1, 2],
    tags: [101, 102],
    created_at: '2026-11-17 10:30:00',
  },
  {
    id: 102,
    title: 'AI in Small Business Marketing: Complete 2026 Guide to Autonomous Growth',
    slug: 'ai-small-business-marketing-guide-2026',
    status: 'draft',
    categories: [1, 3],
    tags: [102, 103],
    created_at: '2026-11-17 11:15:00',
  },
];
