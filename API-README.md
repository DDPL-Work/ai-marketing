# AI Marketing Automation & Autonomous CRM Platform

An enterprise-grade, multi-agent AI marketing and autonomous CRM platform built with **Django 5.2**, **Django REST Framework (DRF)**, **LangGraph**, **MySQL**, and **OpenAI**. 

The platform coordinates **four specialized AI agents** under an autonomous supervisor to automate business research, SEO blog creation, advertising strategies, social media distribution, customer inquiry handling, and WordPress publishing—while maintaining **strict human-in-the-loop safety gates**.

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [The Four AI Agents & Their Direct External APIs](#2-the-four-ai-agents--their-direct-external-apis)
   - [Agent 1 — AI Marketing Manager & Observer](#agent-1--ai-marketing-manager--dashboard-observer)
   - [Agent 2 — Research & Content Agent](#agent-2--research--content-agent)
   - [Agent 3 — SEO & Advertising Agent](#agent-3--seo--advertising-agent)
   - [Agent 4 — Social Media & Customer Assistant](#agent-4--social-media--customer-assistant)
   - [Workflow Orchestrator](#workflow-orchestrator)
3. [Complete Django REST API Reference](#3-complete-django-rest-api-reference)
   - [Core CRM & Dashboard APIs](#a-core-crm--dashboard-apis)
   - [Multi-Agent Execution & Management APIs](#b-multi-agent-execution--management-apis)
   - [Dedicated WordPress REST APIs](#c-dedicated-wordpress-rest-apis)
4. [Strict Safety & Governance Guardrails](#4-strict-safety--governance-guardrails)
5. [Environment Variables Reference (.env)](#5-environment-variables-reference-env)
6. [Quickstart & Installation](#6-quickstart--installation)
7. [Testing & Verification](#7-testing--verification)

---

## 1. Architecture Overview

In strict compliance with modular agent architecture:
- **Zero Centralized `integrations/` Folder**: External API integrations are co-located directly inside the specific agent file that uses them.
- **`common.py`**: Reserved strictly for shared OpenAI initialization, environment loading, and safe utility helpers.
- **`agent_orchestrator.py`**: Functions solely as the LangGraph state controller and conditional routing gate, not as an agent.

```text
AI_Automation/
├── ai_app/
│   ├── agent1.py              # Agent 1: Marketing Manager (Analytics, Governance, WP Monitor)
│   ├── agent2.py              # Agent 2: Content & Research (Web Search, LLM Writing, WP Gaps)
│   ├── agent3.py              # Agent 3: SEO & Ads (SEO Audits, Ad Strategy, WP Draft Creation)
│   ├── agent4.py              # Agent 4: Social & Support (Social Drafts, Inbound CRM, WP Comments)
│   ├── agent_orchestrator.py  # LangGraph Workflow Controller & Safety Gate
│   ├── common.py              # Shared LLM, Safe Auth & Config Utilities
│   ├── models.py              # MySQL ORM Models (AgentContent, Lead, Approval, WpPosts, etc.)
│   ├── serializers.py         # DRF Serializers
│   ├── views.py               # REST API Views for Dashboard, Agents & WordPress
│   ├── urls.py                # URL Routing Configuration
│   ├── tasks.py               # Celery & ThreadPool Background Task Execution
│   └── tests.py               # 32 Automated Unit Tests (100% Pass)
├── templates/
│   └── ai-marketing-workflow.html # Live Dynamic Dashboard (Kanban, Workflow Visualizer, Integrations)
├── docs/
│   └── WORDPRESS_INTEGRATION_GUIDE.md # WordPress REST API Guide
├── .env                       # Live Environment Configuration
├── .env.example               # Clean Template Configuration
└── manage.py                  # Django Management Script
```

---

## 2. The Four AI Agents & Their Direct External APIs

```text
                           ┌───────────────────────────┐
                           │      OPENAI_API_KEY       │
                           └─────────────┬─────────────┘
                                         │
         ┌──────────────────┬────────────┴───────┬──────────────────┐
         ▼                  ▼                    ▼                  ▼
   ┌───────────┐      ┌───────────┐        ┌───────────┐      ┌───────────┐
   │  AGENT 1  │      │  AGENT 2  │        │  AGENT 3  │      │  AGENT 4  │
   │ Marketing │      │ Content & │        │   SEO &   │      │ Social &  │
   │  Manager  │      │ Research  │        │    Ads    │      │  Support  │
   │(agent1.py)│      │(agent2.py)│        │(agent3.py)│      │(agent4.py)│
   └───────────┘      └───────────┘        └───────────┘      └───────────┘
   • GA4 Analytics    • DALL-E 3 Images    • PageSpeed Core   • Facebook Graph
   • Search Console   • Tavily/SerpAPI       Web Vitals       • Instagram Graph
   • Meta Ads Perf      Search Provider    • Search Console   • LinkedIn Posts
   • Google Ads Perf  • Google Trends      • Meta Ads Audit   • YouTube Threads
   • LinkedIn Ads     • Keyword Planner    • WP Rank Math /   • WhatsApp Cloud
   • YouTube Stats    • WP Content Gaps      Yoast Detection  • WP Comments
   • WP Health Test   • WP Post Taxonomies • WP Media Upload  • Inbound CRM
                                           • WP Draft Create    Sync (MySQL)
```

---

### Agent 1 — AI Marketing Manager & Dashboard Observer
**File:** `ai_app/agent1.py`  
**Role:** Central supervisor, performance analyzer, task dispatcher, and approval gatekeeper.

| Integration | File Function | Environment Variables | Upstream Endpoint / Service |
| :--- | :--- | :--- | :--- |
| **OpenAI LLM** | `analyze_marketing_performance()`, `generate_marketing_plan()` | `OPENAI_API_KEY`, `OPENAI_MODEL` | `https://api.openai.com/v1/chat/completions` |
| **Google Analytics 4** | `get_google_analytics_data()` | `GA4_PROPERTY_ID`, `GOOGLE_ACCESS_TOKEN` | `https://analyticsdata.googleapis.com/v1beta/{property_id}:runReport` |
| **Google Search Console** | `get_search_console_data()` | `GOOGLE_SEARCH_CONSOLE_SITE_URL`, `GOOGLE_ACCESS_TOKEN` | `https://searchconsole.googleapis.com/webmasters/v3/sites/.../searchAnalytics/query` |
| **Meta Marketing API** | `get_meta_ads_insights()` | `META_ACCESS_TOKEN`, `META_AD_ACCOUNT_ID` | `https://graph.facebook.com/v20.0/act_{ad_account_id}/insights` |
| **Google Ads API** | `get_google_ads_insights()` | `GOOGLE_ADS_CUSTOMER_ID`, `GOOGLE_ADS_DEVELOPER_TOKEN`, `GOOGLE_ACCESS_TOKEN` | `https://googleads.googleapis.com/v17/customers/{customer_id}/googleAds:searchStream` |
| **LinkedIn Marketing API** | `get_linkedin_campaign_insights()` | `LINKEDIN_ACCESS_TOKEN`, `LINKEDIN_ORGANIZATION_ID` | `https://api.linkedin.com/v2/adAnalyticsV2` |
| **YouTube Analytics** | `get_youtube_analytics()` | `YOUTUBE_API_KEY`, `YOUTUBE_CHANNEL_ID` | `https://www.googleapis.com/youtube/v3/channels` |
| **WordPress Connection & Health** | `check_wordpress_connection()`, `get_wordpress_account_status()`, `get_wordpress_posts_status()`, `get_wordpress_draft_status()`, `get_wordpress_categories()`, `get_wordpress_tags()` | `WORDPRESS_SITE_URL`, `WORDPRESS_USERNAME`, `WORDPRESS_APPLICATION_PASSWORD` | `{WORDPRESS_SITE_URL}/wp-json/wp/v2/users/me`, `/posts`, `/categories`, `/tags` |

---

### Agent 2 — Research & Content Agent
**File:** `ai_app/agent2.py`  
**Role:** Researches topics, analyzes existing content gaps, drafts full SEO blog packages, and creates AI banner prompts.

| Integration | File Function | Environment Variables | Upstream Endpoint / Service |
| :--- | :--- | :--- | :--- |
| **OpenAI Blog Writing** | `generate_blog_draft()` | `OPENAI_API_KEY`, `OPENAI_MODEL` | `https://api.openai.com/v1/chat/completions` |
| **OpenAI DALL-E 3** | `generate_ai_image()` | `OPENAI_API_KEY` | `https://api.openai.com/v1/images/generations` |
| **Live Web Research** | `research_market()`, `research_competitors()` | `RESEARCH_PROVIDER` (tavily / serpapi / google), `RESEARCH_API_KEY` | `https://api.tavily.com/search` or SerpAPI / Perplexity |
| **Google Trends** | `get_trending_topics()` | `SERPAPI_API_KEY` or `TRENDS_API_KEY` | SerpAPI Google Trends Engine |
| **Google Keyword Planner** | `get_keyword_planner_ideas()`, `research_keywords()` | `GOOGLE_ADS_CUSTOMER_ID`, `GOOGLE_ADS_DEVELOPER_TOKEN`, `GOOGLE_ACCESS_TOKEN` | Google Ads `KeywordPlanIdeaService` |
| **WordPress Content Research & Gaps** | `fetch_existing_wordpress_posts()`, `fetch_wordpress_pages()`, `fetch_wordpress_categories()`, `fetch_wordpress_tags()`, `research_existing_content()`, `identify_content_gaps()`, `prepare_wordpress_content_package()` | `WORDPRESS_SITE_URL`, `WORDPRESS_USERNAME`, `WORDPRESS_APPLICATION_PASSWORD` | `{WORDPRESS_SITE_URL}/wp-json/wp/v2/posts`, `/pages`, `/categories`, `/tags` |

---

### Agent 3 — SEO & Advertising Agent
**File:** `ai_app/agent3.py`  
**Role:** Conducts comprehensive SEO audits, optimizes headings and metadata, generates advertising proposals, and stages approved drafts in WordPress.

| Integration | File Function | Environment Variables | Upstream Endpoint / Service |
| :--- | :--- | :--- | :--- |
| **OpenAI SEO Optimizer** | `evaluate_and_optimize_content()` | `OPENAI_API_KEY`, `OPENAI_MODEL` | `https://api.openai.com/v1/chat/completions` |
| **Google PageSpeed Insights** | `check_page_speed()` | `PAGESPEED_API_KEY` | `https://www.googleapis.com/pagespeedonline/v5/runPagespeed` |
| **Google Search Console** | `analyze_search_keywords()` | `GOOGLE_SEARCH_CONSOLE_SITE_URL`, `GOOGLE_ACCESS_TOKEN` | Search Console `searchAnalytics/query` |
| **Google Analytics 4** | `analyze_website_traffic()` | `GA4_PROPERTY_ID`, `GOOGLE_ACCESS_TOKEN` | GA4 `:runReport` |
| **Google Ads Insights** | `analyze_google_ads()` | `GOOGLE_ADS_CUSTOMER_ID`, `GOOGLE_ADS_DEVELOPER_TOKEN`, `GOOGLE_ACCESS_TOKEN` | Google Ads `:searchStream` |
| **Meta Ads Reporting** | `analyze_meta_ads()` | `META_ACCESS_TOKEN`, `META_AD_ACCOUNT_ID` | Meta Graph API `/insights` |
| **WordPress Plugin Detection** | `check_wordpress_seo_plugin()` | `WORDPRESS_SITE_URL`, `WORDPRESS_USERNAME`, `WORDPRESS_APPLICATION_PASSWORD` | `{WORDPRESS_SITE_URL}/wp-json/` (Namespace probe: `rankmath/v1`, `yoast/v1`, `elementor/v1`) |
| **WordPress Media Library** | `upload_wordpress_featured_image()` | `WORDPRESS_SITE_URL`, `WORDPRESS_USERNAME`, `WORDPRESS_APPLICATION_PASSWORD` | `{WORDPRESS_SITE_URL}/wp-json/wp/v2/media` (Binary image attachment) |
| **WordPress Draft Creation** | `create_wordpress_draft()`, `update_wordpress_draft()`, `verify_wordpress_draft()` | `WORDPRESS_SITE_URL`, `WORDPRESS_USERNAME`, `WORDPRESS_APPLICATION_PASSWORD`, `WORDPRESS_DRAFT_ONLY=true` | `{WORDPRESS_SITE_URL}/wp-json/wp/v2/posts` (**Strictly `status="draft"`**) |

---

### Agent 4 — Social Media & Customer Assistant
**File:** `ai_app/agent4.py`  
**Role:** Repurposes approved articles into platform-native social media drafts, ingests customer queries and blog comments, and generates AI reply suggestions.

| Integration | File Function | Environment Variables | Upstream Endpoint / Service |
| :--- | :--- | :--- | :--- |
| **OpenAI Copy & Reply Engine** | `generate_reply_suggestion()`, `generate_wordpress_reply_suggestion()` | `OPENAI_API_KEY`, `OPENAI_MODEL` | `https://api.openai.com/v1/chat/completions` |
| **Facebook Graph API** | `fetch_facebook_comments()` | `FACEBOOK_PAGE_ACCESS_TOKEN`, `FACEBOOK_PAGE_ID` | `https://graph.facebook.com/v20.0/{page_id}/feed` |
| **Instagram Graph API** | `fetch_instagram_comments()` | `INSTAGRAM_ACCESS_TOKEN`, `INSTAGRAM_BUSINESS_ACCOUNT_ID` | `https://graph.facebook.com/v20.0/{ig_id}/media` |
| **LinkedIn Page API** | `fetch_linkedin_engagement()` | `LINKEDIN_ACCESS_TOKEN`, `LINKEDIN_ORGANIZATION_ID` | `https://api.linkedin.com/v2/organizationalEntityAcls` |
| **YouTube Data API v3** | `fetch_youtube_comments()` | `YOUTUBE_API_KEY`, `YOUTUBE_CHANNEL_ID` | `https://www.googleapis.com/youtube/v3/commentThreads` |
| **WhatsApp Business Cloud API** | `fetch_whatsapp_enquiries()` | `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_ACCESS_TOKEN` | `https://graph.facebook.com/v20.0/{phone_id}` (Read-only ingest mode) |
| **WordPress Comments API** | `fetch_wordpress_comments()`, `fetch_wordpress_comment_details()`, `identify_comment_post()`, `analyze_wordpress_comment()`, `save_wordpress_reply_suggestion()` | `WORDPRESS_SITE_URL`, `WORDPRESS_USERNAME`, `WORDPRESS_APPLICATION_PASSWORD` | `{WORDPRESS_SITE_URL}/wp-json/wp/v2/comments` (Saved with `not_sent_human_review_required`) |
| **CRM Inbound Adapter** | `sync_lead_to_crm()` | `CRM_PROVIDER`, `CRM_API_BASE_URL`, `CRM_API_TOKEN` | Local MySQL `Lead` model or external CRM webhook |

---

### Workflow Orchestrator
**File:** `ai_app/agent_orchestrator.py`  
**Role:** Manages the LangGraph execution flow:
1. Dispatches Agent 1 (Analysis & Strategy)
2. Dispatches Agent 2 (Research & Blog Draft)
3. Dispatches Agent 3 (SEO Review & Ad Proposals)
4. **Enforces Review Gate**: Content halts until human approval is recorded in MySQL.
5. On approval: Agent 3 stages WordPress Draft and Agent 4 generates social media drafts.
6. Operates an independent, isolated workflow for Customer Enquiry processing.

---

## 3. Complete Django REST API Reference

All endpoints are configured in `ai_app/urls.py` and served at `http://127.0.0.1:8000/`.

### A. Core CRM & Dashboard APIs

| Method | Endpoint | Description | Sample Request / Query |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/dashboard/stats/` | Retrieves live aggregated KPI metrics (Leads, Spend, Approvals, ROI). | — |
| `GET` | `/api/leads/` | Lists CRM leads with filtering by stage, score category, or search term. | `?stage=new&score_category=hot` |
| `GET` | `/api/leads/<id>/` | Retrieves complete details and message history for a single lead. | — |
| `POST` | `/api/leads/enquiry/` | Ingests a new customer enquiry, scores intent, and logs activity. | `{"name":"Alex","email":"alex@example.com","message":"Demo request"}` |
| `PATCH` | `/api/leads/<id>/stage/` | Updates a lead's CRM pipeline stage (Kanban drag-and-drop). | `{"stage":"contacted"}` (new, contacted, qualified, proposal, won, lost) |
| `GET` | `/api/attention/` | Lists urgent attention items (high-friction queries, high-value leads). | — |
| `GET` | `/api/approvals/` | Lists items pending human approval (blog content, ad budgets). | `?status=pending` |
| `GET` | `/api/approvals/<id>/` | Retrieves approval item details and associated payload. | — |
| `POST` | `/api/approvals/<id>/action/` | Approves or rejects a pending item. | `{"action":"approve"}` or `{"action":"reject"}` |
| `POST` | `/api/approvals/approve-all/` | Bulk approves all pending content items (excluding budget changes). | `{}` |
| `POST` | `/api/escalations/<id>/resolve/` | Resolves an escalated customer issue. | `{}` |
| `GET` | `/api/activity-feed/` | Returns the real-time audit trail of all agent actions and leads. | `?category=content&limit=25` |
| `GET` | `/api/goals-budget/` | Returns monthly budget limits, actual ad spend, and target goals. | — |
| `GET` | `/api/analytics/hourly/` | Returns 24-hour session and lead conversion data for chart rendering. | — |
| `GET` | `/api/rules/` | Returns status and execution count of autonomous automation rules. | — |

---

### B. Multi-Agent Execution & Management APIs

| Method | Endpoint | Description | Sample Request / Query |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/agents/run-cycle/` | Triggers a full 4-agent cycle (Agent 1 → Agent 2 → Agent 3 → Approval Gate). | `{"sync": true}` (runs synchronously or as background task) |
| `POST` | `/api/agents/agent<1-4>/run/` | Executes an individual agent independently. | `{"topic": "Marketing Automation"}` |
| `GET` | `/api/agents/tasks/` | Lists all dispatched agent tasks, statuses, priorities, and execution times. | `?status=completed&agent_name=agent_2` |
| `GET` | `/api/agents/tasks/<id>/` | Retrieves task input parameters, output data, and traceback logs. | — |
| `GET` | `/api/agents/logs/` | Retrieves granular audit logs for agent actions and warning traces. | `?level=WARNING` |
| `GET` | `/api/agents/content/` | Lists generated blog content packages, drafts, and SEO scores. | — |
| `GET` | `/api/agents/content/<id>/` | Retrieves full markdown body, brief, image prompts, and SEO review. | — |
| `POST` | `/api/agents/content/<id>/action/` | **Approval Gate**: Approving stages WordPress draft and unlocks Agent 4 social drafts. | `{"action":"approve"}` or `{"action":"reject"}` |
| `GET` | `/api/agents/social-drafts/` | Lists platform-specific social media drafts (FB, IG, LinkedIn, YouTube). | `?platform=LinkedIn` |
| `PATCH` | `/api/agents/social-drafts/<id>/` | Updates post copy, hashtags, or approval status. | `{"post_text": "Updated text", "status": "approved"}` |
| `GET` | `/api/agents/customer-replies/` | Lists AI-suggested customer inquiry responses awaiting human review. | — |
| `PATCH` | `/api/agents/customer-replies/<id>/` | Records owner decision on an inquiry response suggestion. | `{"status":"approved_to_send"}` or `{"status":"dismissed"}` |
| `GET` | `/api/agents/ad-proposals/` | Lists proposed advertising strategies and daily budget allocations. | — |
| `POST` | `/api/agents/ad-proposals/<id>/action/` | Approves or rejects an advertising strategy proposal. | `{"decision":"approve"}` or `{"decision":"reject"}` |
| `POST` | `/api/agents/customer-enquiries/process/` | Triggers isolated customer message analysis and reply generation. | `{"enquiries": [{"from": "User", "message": "Pricing?"}]}` |
| `GET` | `/api/agents/background-status/` | Diagnostics on background worker (Celery, Redis, ThreadPoolExecutor). | — |
| `GET` | `/api/agents/integrations/status/` | Real-time diagnostic connection status for all external APIs across all 4 agents. | — |

---

### C. Dedicated WordPress REST APIs

| Method | Endpoint | Description | Sample Output |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/wordpress/status/` | Diagnostic health overview: connection, user role, SEO plugin, post/draft counts. | `{"status":"success","connected":true,"seo_plugin":{"detected":"rank_math"}}` |
| `POST` | `/api/wordpress/test-connection/` | Immediate live probe via `/wp-json/wp/v2/users/me` with capability check. | `{"success":true,"status":"connected","data":{"user":{"name":"Admin"}}}` |
| `GET` | `/api/wordpress/categories/` | Lists WordPress categories with post counts. | `[{"id":5,"name":"Marketing","count":12}]` |
| `GET` | `/api/wordpress/tags/` | Lists WordPress tags with post counts. | `[{"id":18,"name":"CRM","count":7}]` |
| `GET` | `/api/wordpress/posts/` | Returns existing WordPress articles with slugs and statuses. | `[{"id":101,"title":"Guide","status":"draft"}]` |

---

## 4. Strict Safety & Governance Guardrails

1. **Draft-Only Mode (`WORDPRESS_DRAFT_ONLY=true`)**:
   - Posts created in WordPress are strictly assigned `post_status="draft"`.
   - The platform strictly blocks automatic publishing. The Business Owner must review and click "Publish" inside WordPress Admin (`wp-admin/edit.php`).
2. **Approval Gate Requirement**:
   - `create_wordpress_draft()` unconditionally rejects requests where `approved=False` with status `permission_required`.
   - Content flows from Agent 2 → Agent 3 → Owner Review Queue. Only after the owner records approval can a WordPress draft be staged.
3. **Idempotency & Deduplication**:
   - If `content.wp_post_id` already exists, `create_wordpress_draft()` verifies the existing post and returns it with `"reused": True`. It never creates duplicate posts.
4. **Customer Comment Protection**:
   - Customer replies generated by Agent 4 are strictly suggestions.
   - All reply records are persisted with `send_status="not_sent_human_review_required"`. The system never posts automated replies back to WordPress without human review.
5. **Credential Security**:
   - Application Passwords are never returned in REST API responses, never rendered in dashboard HTML, and never logged in console outputs.
6. **Graceful Fallbacks**:
   - Missing optional credentials (e.g. Meta Ads, Google Analytics) never crash the system; endpoints return `"status": "not_configured"`, and agents fall back to local intelligence and internal database metrics.

---

## 5. Environment Variables Reference (.env)

Configure your `.env` file in the `AI_Automation/` root directory:

```env
# ==============================================================================
# 1. WORDPRESS BUSINESS WEBSITE (Connects all 4 AI Agents)
# ==============================================================================
WORDPRESS_SITE_URL=https://your-wordpress-site.com
WORDPRESS_USERNAME=your_wordpress_username
WORDPRESS_APPLICATION_PASSWORD=abcd efgh ijkl mnop qrst uvwx
WORDPRESS_DRAFT_ONLY=true

# ==============================================================================
# 2. OPENAI LLM & DALL-E 3 (Primary AI Brain for All 4 Agents)
# ==============================================================================
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
OPENAI_MODEL=gpt-4o-mini

# ==============================================================================
# 3. OPTIONAL RESEARCH & TRENDS APIS (Agent 2)
# ==============================================================================
RESEARCH_PROVIDER=tavily
RESEARCH_API_KEY=
SERPAPI_API_KEY=

# ==============================================================================
# 4. OPTIONAL SOCIAL MEDIA & ADS APIS (Agents 1, 3, 4)
# ==============================================================================
GA4_PROPERTY_ID=
GOOGLE_SEARCH_CONSOLE_SITE_URL=
GOOGLE_ACCESS_TOKEN=
GOOGLE_ADS_CUSTOMER_ID=
GOOGLE_ADS_DEVELOPER_TOKEN=
META_ACCESS_TOKEN=
META_AD_ACCOUNT_ID=
YOUTUBE_API_KEY=
YOUTUBE_CHANNEL_ID=
WHATSAPP_PHONE_NUMBER_ID=
WHATSAPP_ACCESS_TOKEN=

# ==============================================================================
# 5. MYSQL DATABASE & BACKEND CONFIGURATION
# ==============================================================================
DB_NAME=u847401794_pdmfp_data
DB_USER=root
DB_PASSWORD=root
DB_HOST=127.0.0.1
DB_PORT=3306

DJANGO_API_BASE_URL=http://127.0.0.1:8000
DJANGO_API_TOKEN=
LANGCHAIN_TRACING_V2=false
```

---

## 6. Quickstart & Installation

### 1. Prerequisites
- Python 3.10+
- MySQL Server (version 8.0+)
- Virtual Environment (`venv`)

### 2. Activate Virtual Environment
```powershell
# Windows PowerShell
& "c:\Users\Dell Pc\Desktop\AI Authomations\venv\Scripts\Activate.ps1"
```

### 3. Install Dependencies
```powershell
pip install -r requirements.txt
```

### 4. Run Database Migrations
```powershell
python manage.py makemigrations ai_app
python manage.py migrate
```

### 5. Launch Development Server
```powershell
python manage.py runserver 127.0.0.1:8000
```
Open `http://127.0.0.1:8000/` in your browser.

---

## 7. Testing & Verification

The project includes an automated test suite verifying all 4 agents, approval workflows, database persistence, and WordPress integrations.

To run the complete test suite:
```powershell
python manage.py test ai_app
```

### Verified Test Results:
```text
System check identified no issues.
----------------------------------------------------------------------
Ran 32 tests in 10.229s

OK (0 failures, 0 errors)
```

**Tested Scenarios Include:**
- ✅ Agent 1 task planning and deduplication.
- ✅ Agent 2 output validation, deterministic fallback labeling, and content gap analysis.
- ✅ Agent 3 SEO audit, plugin detection (Rank Math / Yoast / Standard), and post metadata mapping.
- ✅ Agent 3 WordPress draft creation enforcing `status='draft'` only (never publishes).
- ✅ Agent 3 approval gate blocking unapproved draft generation.
- ✅ Agent 3 idempotency preventing duplicate post generation.
- ✅ Agent 3 featured image upload to `/wp-json/wp/v2/media`.
- ✅ Agent 4 multi-channel comment ingestion and intent classification.
- ✅ Agent 4 reply suggestions saved with `not_sent_human_review_required` (never auto-posted).
- ✅ All 27+ Django REST API endpoints returning valid HTTP 200 responses.
