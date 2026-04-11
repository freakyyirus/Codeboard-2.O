# CodeBoard - Complete Setup Guide (Step by Step)

**Follow these steps in order. Don't skip any!**

---

## Step 1: Create Vercel Project

1. Go to: https://vercel.com
2. Click **"New Project"**
3. Import your GitHub repository: `freakyyirus/Codeboard-2.O`
4. Framework Preset: **Next.js**
5. Click **"Deploy"**

---

## Step 2: Get Clerk Keys (Authentication)

1. Go to: https://dashboard.clerk.com
2. Select your application
3. Click **"API Keys"** (left menu)
4. Copy these keys:
   - **Publishable Key** → `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - **Secret Key** → `CLERK_SECRET_KEY`
5. Click **"Webhooks"** (left menu)
6. Click **"Add Webhook"**
7. Enter URL: `https://your-project.vercel.app/api/webhooks/clerk`
8. Copy **Signing Secret** → `CLERK_WEBHOOK_SECRET`

---

## Step 3: Get Supabase Keys (Database)

1. Go to: https://supabase.com/dashboard
2. Click your project
3. Click **"Project Settings"** (gear icon)
4. Click **"API"**
5. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

---

## Step 4: Get Stripe Keys (Payments)

### 4a. Get API Keys
1. Go to: https://dashboard.stripe.com/test/apikeys
2. Copy:
   - **Secret Key** (starting with sk_live or sk_test) → `STRIPE_SECRET_KEY`
   - **Publishable Key** (starting with pk_live or pk_test) → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

### 4b. Get Webhook Secret
1. In Stripe, click **"Developers"** → **"Webhooks"**
2. Click **"Add endpoint"**
3. URL: `https://your-project.vercel.app/api/webhooks/stripe`
4. Select events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed`
5. Click **"Add endpoint"**
6. Copy signing secret → `STRIPE_WEBHOOK_SECRET`

### 4c. Create Products & Get Price IDs
1. In Stripe, click **"Products"** → **"Add product"**
2. Create **Pro Monthly** (₹499 in India, $9.99 global)
3. Save and click **"Create price"** → **"Enter price manually"**
4. Copy the **Price ID** (starts with price_xxx) → `STRIPE_PRO_PRICE_ID`

5. Repeat for **Pro Yearly** (₹3,999 or $79.99)
6. Copy **Price ID** → `STRIPE_PRO_YEARLY_PRICE_ID`

7. Repeat for **Team Monthly** (₹1,499 or $29.99)
8. Copy **Price ID** → `STRIPE_TEAM_PRICE_ID`

---

## Step 5: Get Google AI Key (AI Chat)

1. Go to: https://aistudio.google.com/app/apikey
2. Click **"Create API Key"**
3. Copy the key → `GOOGLE_GENERATIVE_AI_API_KEY`

---

## Step 6: Generate CRON_SECRET

Open your terminal and run:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Copy the result → `CRON_SECRET`

---

## Step 7: Add All Environment Variables in Vercel

1. Go to: https://vercel.com/dashboard/your-project/_settings/environment-variables
2. Add each variable in this format:

```
=== Clerk (Copy exactly from Step 2) ===
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx...
CLERK_SECRET_KEY=sk_test_xxxxx...
CLERK_WEBHOOK_SECRET=whsec_xxxxx...

=== Supabase (Copy exactly from Step 3) ===
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxxxx...

=== Stripe (Copy exactly from Step 4) ===
STRIPE_SECRET_KEY=sk_live_xxxxx...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx...
STRIPE_WEBHOOK_SECRET=whsec_xxxxx...
STRIPE_PRO_PRICE_ID=price_xxxxx...
STRIPE_PRO_YEARLY_PRICE_ID=price_xxxxx...

=== Google AI (Copy exactly from Step 5) ===
GOOGLE_GENERATIVE_AI_API_KEY=AIzaSxxxxx...

=== Cron (Copy exactly from Step 6) ===
CRON_SECRET=xxxxx...

=== App URL (Replace with your Vercel URL) ===
NEXT_PUBLIC_APP_URL=https://your-project.vercel.app
```

3. Click **"Save"**

---

## Step 8: Set Up Supabase Database (SQL Queries)

1. Go to: https://supabase.com/dashboard → Your Project → **SQL Editor**
2. Click **"New query"**
3. Copy and run each query below:

### Query 1: User Subscriptions
```sql
CREATE TABLE IF NOT EXISTS user_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  stripe_customer_id text UNIQUE,
  stripe_subscription_id text UNIQUE,
  plan text DEFAULT 'free',
  status text DEFAULT 'active',
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
4. Click **"Run"**

### Query 2: Notebooks
```sql
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

CREATE INDEX idx_notebooks_user_id ON user_notebooks(user_id);
CREATE INDEX idx_notebooks_updated ON user_notebooks(updated_at DESC);
```
5. Click **"Run"**

### Query 3: Test Cases (Optional)
```sql
CREATE TABLE IF NOT EXISTS test_cases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  problem_id uuid,
  input text,
  expected_output text,
  is_hidden boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE test_cases ENABLE ROW LEVEL SECURITY;
```
6. Click **"Run"**

---

## Step 9: Verify Setup

1. Go to your deployed site: `https://your-project.vercel.app`
2. Test these pages:

| Page | What to Check |
|------|-------------|
| `/` | Landing page loads |
| `/sign-in` | Login works |
| `/dashboard` | Dashboard loads |
| `/dashboard/settings` | Platform connections work |
| `/pricing` | Stripe checkout works |

---

## ✅ Complete Checklist

- [ ] Vercel project created
- [ ] Clerk keys added
- [ ] Supabase keys added
- [ ] Stripe keys added
- [ ] Google AI key added
- [ ] CRON_SECRET generated
- [ ] All env vars in Vercel
- [ ] SQL Query 1 (subscriptions) ran
- [ ] SQL Query 2 (notebooks) ran
- [ ] SQL Query 3 (test cases) ran (optional)
- [ ] Site deployed
- [ ] Landing page works
- [ ] Login works
- [ ] Dashboard works
- [ ] Settings works
- [ ] Pricing works

---

## 🚀 DEPLOY

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel deploy --prod
```

---

**Done!** Your CodeBoard is ready! 🎉