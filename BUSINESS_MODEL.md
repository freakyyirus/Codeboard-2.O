# CodeBoard - Business Model & Pricing Strategy

## Overview

CodeBoard is a SaaS platform for competitive programmers and developers. This document outlines our business model for both the Indian market (primary) and global market.

---

## 🎯 Target Markets

### Primary Market: India 🇮🇳
- **TAM**: 5M+ CS/IT students annually
- **SAM**: 500K+ active competitive programmers
- **SOM**: 50K paying users in Year 1

**Key Segments**:
1. **Students** (60%) - Preparing for placements, GATE, competitive programming
2. **Job Seekers** (25%) - Building profiles for resumes
3. **Working Developers** (15%) - Skill improvement, portfolio building

### Secondary Market: Global 🌍
- **TAM**: 20M+ developers globally
- **SAM**: 2M+ competitive programmers
- **SOM**: 100K paying users in Year 1

---

## 💰 Pricing Strategy

### India (INR)

| Plan | Monthly | Yearly | Target |
|------|---------|-------|--------|
| **Free** | ₹0 | ₹0 | Acquisition |
| **Pro** | ₹499/mo | ₹3,999/yr (₹333/mo) | Students & professionals |
| **Team** | ₹1,499/mo | ₹11,999/yr (₹1,000/mo) | Coaching institutes |

**India Launch Pricing (First 6 Months)**:
- Pro: ₹299/mo or ₹2,499/yr (50% off launch discount)
- Team: ₹999/mo or ₹7,999/yr

### Global (USD)

| Plan | Monthly | Yearly | Target |
|------|---------|-------|--------|
| **Free** | $0 | $0 | Acquisition |
| **Pro** | $9.99/mo | $79.99/yr | Individual developers |
| **Team** | $29.99/mo | $249.99/yr | Teams & small companies |

**Global Launch Pricing**:
- Pro: $4.99/mo or $49.99/yr
- Team: $14.99/mo or $149.99/yr

---

## 💵 Revenue Model

### Primary Revenue Streams

1. **Subscription Revenue (70%)**
   - Monthly/annual Pro subscriptions
   - Team subscriptions (5-50 seats)

2. **Enterprise Sales (15%)**
   - Custom plans for coaching institutes
   - University site licenses
   - Corporate training packages

3. **Referral Program (10%)**
   - Referrer gets 1 month free
   - Referred gets 20% off first year

4. **Data & Insights (5%)**
   - Anonymous industry benchmarks
   - Hiring analytics for recruiters (opt-in only)

---

## 📊 Unit Economics

### Customer Acquisition Cost (CAC)
- **Organic**: ₹50-100 (SEO, content, referrals)
- **Paid**: ₹200-500 (Google Ads, LinkedIn)
- **Target Blended CAC**: ₹150

### Lifetime Value (LTV)
- **Free → Pro**: 12 months average
- **Average Revenue Per User**: ₹4,000/year
- **LTV:CAC Ratio**: 26:1 (target 3:1 minimum)

### Gross Margins
- **Infrastructure**: 15% (Supabase, Vercel, Redis)
- **AI Costs**: 10% (per user quota)
- **Support**: 5%
- **Target Gross Margin**: 70%

---

## 🏆 Competitive Advantage

### India-Specific
1. **Localized** - Hindi content, India-specific roadmaps
2. **Pricing** - 10x cheaper than LeetCode (₹3,600/yr vs ₹35,000)
3. **Payment** - UPI, NetBanking, Cards support
4. **Platforms** - Focus on Indian CP platforms (InterviewBit, etc.)

### Global Differentiation
1. **AI-First** - Gemini-powered code assistance
2. **Portfolio** - Public portfolio builder
3. **Roadmaps** - Structured learning paths
4. **Social** - Community features

---

## 📈 Growth Strategy

### Year 1 Targets

| Quarter | Indian Users | Revenue | Focus |
|---------|-----------|---------|-------|
| Q1 | 10K free, 500 paid | ₹2L | Launch, feedback |
| Q2 | 50K free, 2K paid | ₹10L | Content, SEO |
| Q3 | 100K free, 5K paid | ₹25L | Paid marketing |
| Q4 | 200K free, 10K paid | ₹50L | Scale, enterprise |

### User Flow
```
Free User
    ↓ (Track progress)
Engaged User (30-day streak)
    ↓ (Upgrade prompt)
Pro Trial (14-day)
    ↓ (Conversion)
Paid Subscriber
    ↓ (Referral, team)
Team Plan / Enterprise
```

---

## 💳 Payment Infrastructure

### Supported Methods

**India**:
- Credit/Debit Cards (Visa, Mastercard, RuPay)
- UPI (Google Pay, PhonePe, Paytm)
- Net Banking
- Wallets

**Global**:
- Credit/Debit Cards
- PayPal

### Billing
- Monthly & yearly options
- Prorated upgrades
- Failed payment retry (3 attempts)

---

## 📋 Legal & Compliance

### India
- GST Registration: Required above ₹20L revenue
- TDS: Not applicable (SaaS service)
- RBI: Compliant payment processing

### Global
- Stripe Connect for payouts
- GDPR compliant (EU)
- SOC 2 Type II (planned)

---

## 🚀 Launch Checklist

### Pre-Launch
- [x] Stripe integration
- [x] Terms & Privacy Policy
- [x] Pricing page
- [ ] Payment gateway tests
- [ ] Invoice generation
- [ ] GST setup

### Post-Launch (Week 1)
- [ ] Launch announcement
- [ ] Referral program
- [ ] Community outreach
- [ ] Influencer partnerships

---

## 📊 Financial Projections (Year 1)

### Conservative Scenario
| Metric | India | Global |
|--------|-------|-------|
| Free Users | 200K | 50K |
| Paid Users | 5K | 2K |
| ARR | ₹20L | $40K |
| **Total ARR** | **₹20L + $40K = ~₹55L** |

### Optimistic Scenario
| Metric | India | Global |
|--------|-------|-------|
| Free Users | 500K | 200K |
| Paid Users | 15K | 10K |
| ARR | ₹60L | $200K |
| **Total ARR** | **₹60L + $200K = ~₹230L** |

---

## Summary

CodeBoard is positioned as an **affordable, AI-powered alternative** to existing platforms, with:
- **India**: Entry at ₹299/mo (70% cheaper than LeetCode Premium)
- **Global**: Entry at $4.99/mo (50% cheaper than competitors)

The freemium model allows us to acquire users at scale and convert high-intent users to paid plans through demonstrated value.