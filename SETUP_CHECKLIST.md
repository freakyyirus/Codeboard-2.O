# CodeBoard - Complete Setup Guide

## 📋 API Keys Needed

### 1. CLERK (Authentication) - Required
Get from: https://dashboard.clerk.com

| Key | Where to Find | Required |
|-----|--------------|----------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | API Keys → Clerk Publishable Key | ✅ Yes |
| `CLERK_SECRET_KEY` | API Keys → Clerk Secret Key | ✅ Yes |
| `CLERK_WEBHOOK_SECRET` | Webhooks → Create Webhook → Signing Secret | ✅ Yes |

---

### 2. SUPABASE (Database) - Required
Get from: https://supabase.com/dashboard/project/_/settings/api

| Key | Where to Find | Required |
|-----|--------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL (e.g., https://xxx.supabase.co) | ✅ Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Project API Settings → anon key | ✅ Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Project API Settings → service_role key | ✅ Yes |

---

### 3. STRIPE (Payments) - Required for Paid Plans
Get from: https://dashboard.stripe.com/apikeys

| Key | Where to Find | Required |
|-----|--------------|----------|
| `STRIPE_SECRET_KEY` | API Keys → Secret Key (sk_live_...) | ✅ Yes |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | API Keys → Publishable Key (pk_live_...) | ✅ Yes |
| `STRIPE_WEBHOOK_SECRET` | Developers → Webhooks → Signing Secret | ✅ Yes |
| `STRIPE_PRO_PRICE_ID` | Products → Create Product → Price ID (monthly) | ✅ Yes |
| `STRIPE_PRO_YEARLY_PRICE_ID` | Products → Create Product → Price ID (yearly) | ✅ Yes |
| `STRIPE_TEAM_PRICE_ID` | Products → Create Product → Price ID (team monthly) | Optional |
| `STRIPE_TEAM_YEARLY_PRICE_ID` | Products → Create Product → Price ID (team yearly) | Optional |

---

### 4. GOOGLE AI - Required for AI Chat
Get from: https://aistudio.google.com/app/apikey

| Key | Where to Find | Required |
|-----|--------------|----------|
| `GOOGLE_GENERATIVE_AI_API_KEY` | AI Studio → API Key | ✅ Yes |

---

### 5. POSTHOG (Analytics) - Optional
Get from: https://app.posthog.com/settings/api-keys

| Key | Where to Find | Required |
|-----|--------------|----------|
| `NEXT_PUBLIC_POSTHOG_KEY` | Project Settings → API Keys → Public key (phc_...) | Optional |
| `POSTHOG_API_KEY` | Project Settings → API Keys → Personal API key | Optional |

---

### 6. JUDGE0 (Code Execution) - Optional
Get from: https://rapidapi.com/judge0-official/api/judge0-ce

| Key | Where to Find | Required |
|-----|--------------|----------|
| `JOB_PLATFORMS` | RapidAPI → Subscribe to Judge0 CE → API Key | Optional |
| `JUDGE0_API_KEY` | Same as above | Optional |
| `JUDGE0_API_HOST` | judge0-ce.p.rapidapi.com | Optional |

---

### 7. UPSTASH (Rate Limiting) - Optional
Get from: https://console.upstash.com/

| Key | Where to Find | Required |
|-----|--------------|----------|
| `UPSTASH_REDIS_REST_URL` | Redis → Upstash → REST API URL | Optional |
| `UPSTASH_REDIS_REST_TOKEN` | Redis → Upstash → REST API Token | Optional |

---

### 8. RESEND (Email) - Optional
Get from: https://resend.com/api-keys

| Key | Where to Find | Required |
|-----|--------------|----------|
| `RESEND_API_KEY` | API Keys → Create API Key | Optional |

---

### 9. CLIST (Contests) - Optional
Get from: https://clist.by/api/v4/

| Key | Where to Find | Required |
|-----|--------------|----------|
| `CLIST_API_USERNAME` | CLIST account username | Optional |
| `CLIST_API_KEY` | CLIST → API Keys | Optional |

---

### 10. SENTRY (Error Tracking) - Optional
Get from: https://sentry.io/settings/

| Key | Where to Find | Required |
|-----|--------------|----------|
| `NEXT_PUBLIC_SENTRY_DSN` | Project → Settings → Client Keys (DSN) | Optional |
| `SENTRY_AUTH_TOKEN` | Settings → Auth Tokens | Optional |

---

## 🔧 Environment Variables Setup in Vercel

Go to: **Vercel Dashboard → Your Project → Settings → Environment Variables**

Add each key in this format:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx...
CLERK_SECRET_KEY=sk_test_xxx...
CLERK_WEBHOOK_SECRET=whsec_xxx...

NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...

STRIPE_SECRET_KEY=sk_live_xxx...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx...
STRIPE_WEBHOOK_SECRET=whsec_xxx...
STRIPE_PRO_PRICE_ID=price_xxx...
STRIPE_PRO_YEARLY_PRICE_ID=price_xxx...

GOOGLE_GENERATIVE_AI_API_KEY=AIza...

NEXT_PUBLIC_POSTHOG_KEY=phc_xxx...
POSTHOG_API_KEY=phc_xxx...

CRON_SECRET=<generate: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))">

NEXT_PUBLIC_APP_URL=https://your-project.vercel.app
```

---

## 🗄️ SQL Queries to Run in Supabase

Go to: **Supabase Dashboard → SQL Editor**

### Query 1: User Subscriptions (Stripe)

```sql
-- User Subscriptions Table for Stripe Integration
CREATE TABLE IF NOT EXISTS user_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  stripe_customer_id text UNIQUE,
  stripe_subscription_id text UNIQUE,
  plan text CHECK (plan IN ('free', 'pro', 'team')) DEFAULT 'free',
  status text CHECK (status IN ('active', 'trialing', 'past_due', 'canceled', 'incomplete', 'incomplete_expired')) DEFAULT 'active',
  current_period_start timestamp with time zone,
  current_period_end timestamp with time zone,
  cancel_at_period_end boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own subscription"
  ON user_subscriptions FOR SELECT
  USING (auth.uid() = user_id);

CREATE INDEX idx_subscriptions_user_id ON user_subscriptions(user_id);
CREATE INDEX idx_subscriptions_stripe_customer ON user_subscriptions(stripe_customer_id);
CREATE INDEX idx_subscriptions_status ON user_subscriptions(status);
```

### Query 2: Notebooks

```sql
-- User Notebooks Table
CREATE TABLE IF NOT EXISTS user_notebooks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  content jsonb DEFAULT '{}',
  is_public boolean DEFAULT false,
  tags text[] DEFAULT '{}',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

ALTER TABLE user_notebooks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notebooks"
  ON user_notebooks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create notebooks"
  ON user_notebooks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own notebooks"
  ON user_notebooks FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own notebooks"
  ON user_notebooks FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view public notebooks"
  ON user_notebooks FOR SELECT
  USING (is_public = true);

CREATE INDEX idx_notebooks_user_id ON user_notebooks(user_id);
CREATE INDEX idx_notebooks_updated ON user_notebooks(updated_at DESC);
```

### Query 3: Test Cases (Optional)

```sql
-- Test Cases Table (if not already created)
CREATE TABLE IF NOT EXISTS test_cases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  problem_id uuid REFERENCES problems(id) ON DELETE CASCADE,
  input text,
  expected_output text,
  is_hidden boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE test_cases ENABLE ROW LEVEL SECURITY;
```

---

## ✅ Complete Checklist

### In Vercel:
- [ ] Add all required Environment Variables
- [ ] Generate CRON_SECRET: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

### In Supabase:
- [ ] Run Query 1 (user_subscriptions)
- [ ] Run Query 2 (user_notebooks)
- [ ] Run Query 3 (test_cases) - optional
- [ ] Verify Tables Created:
  - [ ] user_subscriptions
  - [ ] user_notebooks
  - [ ] test_cases

### In Stripe Dashboard:
- [ ] Create Products:
  - [ ] Pro Monthly (₹499/mo or $9.99/mo)
  - [ ] Pro Yearly (₹3,999/yr or $79.99/yr)
  - [ ] Team Monthly (₹1,499/mo or $29.99/mo)
- [ ] Get Price IDs and add to Vercel

### Test:
- [ ] Visit /pricing - Stripe works
- [ ] Visit /dashboard - Platform sync works
- [ ] Connect LeetCode in Settings - Data syncs
- [ ] Connect GitHub - Data syncs
- [ ] Check Sentry - No errors
- [ ] Verify Analytics - Data tracking

---

## 🚀 Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel deploy --prod
```

---

**Done!** Your CodeBoard is ready to launch! 🚀