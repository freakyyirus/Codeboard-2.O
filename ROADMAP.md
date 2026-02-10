# CodeBoard Development Roadmap

## Current Status: Week 1, Day 3 ✅
**Already Completed:**
- ✅ Landing page (Hero, Features, CTA)
- ✅ Auth UI (Login/Signup forms)
- ✅ Dashboard skeleton with tabs
- ✅ Mobile responsive layout

---

## Week 1: Foundation (Remaining: 2-3 days)

### Day 3-4: Supabase Auth Integration
- [ ] Configure `.env.local` with Supabase credentials
- [ ] Set up Supabase client (`lib/supabase/`)
- [ ] Implement email/password authentication
- [ ] Enable GitHub OAuth in Supabase dashboard
- [ ] Enable Google OAuth in Supabase dashboard
- [ ] Session management with `@supabase/ssr`
- [ ] Protected routes (redirect to `/login` if not auth'd)

### Day 5: Database Schema
- [ ] Run SQL schema in Supabase (users table)
- [ ] Enable RLS policies
- [ ] User onboarding flow (skill quiz)
- [ ] Save preferences to DB

### Day 6-7: Polish
- [ ] PWA manifest + service worker
- [ ] Lighthouse 95+ score
- [ ] PostHog analytics setup
- [ ] Sentry error tracking
- [ ] Deploy to Vercel

---

## Week 2: DSA Aggregation (7 days)

### Day 8-9: Codeforces API
- [ ] Create `lib/scrapers/codeforces.ts`
- [ ] Fetch contests + problems
- [ ] Cache in Upstash Redis (15min TTL)

### Day 10: GitHub Trending
- [ ] GraphQL API integration
- [ ] Language filter (JS/TS/Python/Go/Rust)

### Day 11: LeetCode
- [ ] GraphQL OR weekly JSON scrape
- [ ] Problem difficulty filters

### Day 12: Social Feed
- [ ] Dev.to RSS integration
- [ ] Hashnode RSS integration
- [ ] Topic filtering

### Day 13-14: Dashboard Integration
- [ ] DEV tab: GitHub trending
- [ ] DSA tab: LeetCode + Codeforces
- [ ] SOCIAL tab: Blog posts
- [ ] Infinite scroll + filters

---

## Week 3: AI Studio (7 days)

### Day 15-16: Monaco Editor
- [ ] Editor component setup
- [ ] Problem pane (left/right split)
- [ ] Language selector

### Day 17-18: AI Integration
- [ ] LLM API (Claude/GPT)
- [ ] "Debug this code" feature
- [ ] Hint generation

### Day 19-20: DSA Sheets
- [ ] Striver's DSA sheet JSON
- [ ] NeetCode 150 JSON
- [ ] Problem tracker (solved/unsolved)

### Day 21: Tabbed Interface
- [ ] Question tab
- [ ] AI Assistant tab
- [ ] Doubt resolver
- [ ] Learning resources

---

## Week 4: Events + Roadmap (7 days)

### Day 22-23: Calendar
- [ ] React-calendar integration
- [ ] Contest data display
- [ ] Reminders

### Day 24: Hackathon Scraper
- [ ] Devfolio integration
- [ ] Unstop events

### Day 25-26: Roadmap Generator
- [ ] Daily task generator
- [ ] Streak counter
- [ ] Supabase realtime sync

### Day 27-28: Notifications
- [ ] Browser notifications
- [ ] Email digests (optional)

---

## Week 5-6: Production Hardening (14 days)

### Day 29-35
- [ ] Rate limiting (Upstash)
- [ ] Input sanitization (Zod)
- [ ] Image optimization (next/image)
- [ ] Lazy loading (dynamic imports)
- [ ] SEO (metadata API)
- [ ] OpenGraph cards
- [ ] Service worker cache

### Day 36-42
- [ ] Security audit
- [ ] Performance optimization
- [ ] Error boundaries
- [ ] Loading states
- [ ] Edge cases

---

## Week 7: Testing (7 days)

### Day 43-45
- [ ] Playwright E2E tests
- [ ] Auth flow tests
- [ ] Dashboard tests

### Day 46-47
- [ ] Load testing (Artillery)
- [ ] 10k request simulation

### Day 48-49
- [ ] User testing (3 friends)
- [ ] Reddit feedback
- [ ] Bug fixes

---

## Week 8: Launch 🚀 (7 days)

### Day 50-52: Final Polish
- [ ] Onboarding tour (react-joyride)
- [ ] Share buttons
- [ ] Feedback form

### Day 53-56: Launch Blitz
- [ ] Blog post: "Built CodeBoard in 60 days"
- [ ] r/leetcode post
- [ ] r/cscareerquestions
- [ ] Dev.to article
- [ ] LinkedIn announcement
- [ ] Twitter thread

---

## Time Estimates

| Phase | Days | Hours/Day | Total Hours |
|-------|------|-----------|-------------|
| Week 1 (remaining) | 3 | 6 | 18h |
| Week 2: DSA | 7 | 6 | 42h |
| Week 3: AI Studio | 7 | 6 | 42h |
| Week 4: Events | 7 | 5 | 35h |
| Week 5-6: Hardening | 14 | 4 | 56h |
| Week 7: Testing | 7 | 4 | 28h |
| Week 8: Launch | 7 | 3 | 21h |
| **TOTAL** | **52 days** | - | **~240 hours** |

## Realistic Timeline

**If working 6 hours/day:** ~8 weeks (56 days)  
**If working 4 hours/day:** ~10-12 weeks  
**If working 2 hours/day:** ~16-20 weeks  

## Priority Order (MVP First)

1. **Auth** (3 days) — Must have
2. **DSA Feed** (7 days) — Core value
3. **AI Studio** (7 days) — Differentiator
4. **Events** (5 days) — Nice to have
5. **Polish** (7 days) — Launch quality
