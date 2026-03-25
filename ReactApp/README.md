# Enterprise Real Estate & Loan Management Suite — UI Mockup

A comprehensive, production-grade **React UI mockup** of a multi-tenant Enterprise Real Estate and Loan Management Platform. Built from a two-document PRD and technical specification, the application covers the **complete mortgage lending lifecycle** — from borrower pre-qualification through underwriting, asset verification, closing, servicing, and transaction management — across **10 distinct user roles** and **36 application routes**.

**Live Demo:** [venkateshTechmates.github.io/RealEstateAndLoan](https://venkateshTechmates.github.io/RealEstateAndLoan)

---

## Table of Contents

1. [Product Vision & Domain Overview](#1-product-vision--domain-overview)
2. [Business Objectives](#2-business-objectives)
3. [Strategic Pillars](#3-strategic-pillars)
4. [Target Markets](#4-target-markets)
5. [User Roles & Personas](#5-user-roles--personas)
6. [Role Hierarchy](#6-role-hierarchy)
7. [Functional Modules](#7-functional-modules)
   - 7.1 [Loan Origination System (LOS)](#71-loan-origination-system-los)
   - 7.2 [Borrower Portal](#72-borrower-portal)
   - 7.3 [Broker Portal](#73-broker-portal)
   - 7.4 [Lender / Loan Officer Portal](#74-lender--loan-officer-portal)
   - 7.5 [Underwriting & Risk Engine](#75-underwriting--risk-engine)
   - 7.6 [Asset & Income Verification](#76-asset--income-verification)
   - 7.7 [Property Management](#77-property-management)
   - 7.8 [Insurance Management](#78-insurance-management)
   - 7.9 [Document Management](#79-document-management)
   - 7.10 [Closing & Disbursement](#710-closing--disbursement)
   - 7.11 [Loan Servicing](#711-loan-servicing)
   - 7.12 [Compliance & Regulatory](#712-compliance--regulatory)
   - 7.13 [Multi-Tenant Management](#713-multi-tenant-management)
   - 7.14 [Transaction Management](#714-transaction-management)
8. [Asset Forms — Borrower Entry (BA Series)](#8-asset-forms--borrower-entry-ba-series)
9. [Asset Forms — Lender Verification (LA Series)](#9-asset-forms--lender-verification-la-series)
10. [Asset Lifecycle — End to End](#10-asset-lifecycle--end-to-end)
11. [Loan Application State Machine](#11-loan-application-state-machine)
12. [Pages & Routes Reference](#12-pages--routes-reference)
13. [Screen Inventory](#13-screen-inventory)
    - [Screen 18 — Multi-Tenant Login](#screen-18--multi-tenant-login)
    - [Screen 19 — Transaction Management](#screen-19--transaction-management)
14. [Data Model](#14-data-model)
15. [API Architecture](#15-api-architecture)
16. [Third-Party Integrations](#16-third-party-integrations)
17. [Security Architecture](#17-security-architecture)
18. [Compliance & Regulatory Coverage](#18-compliance--regulatory-coverage)
19. [Implementation Roadmap](#19-implementation-roadmap)
20. [Success Metrics (KPIs)](#20-success-metrics-kpis)
21. [Technical Stack & Architecture](#21-technical-stack--architecture)
22. [Getting Started](#22-getting-started)
23. [CSS Design System](#23-css-design-system)
24. [Deployment](#24-deployment)
25. [Glossary](#25-glossary)

---

## 1. Product Vision & Domain Overview

> *To become the leading enterprise platform that seamlessly connects real estate and lending ecosystems, enabling faster, more transparent, and compliant property transactions globally.*

The **Enterprise Real Estate + Loan Management Suite** is a cloud-native, multi-tenant SaaS platform designed to streamline end-to-end real estate transactions and mortgage lending. It serves banks, credit unions, mortgage lenders, real estate brokers, title companies, insurance providers, and builders through a single unified platform with **role-based portals** for each participant in the lending lifecycle.

This repository is a **fully functional React UI mockup** of that platform, implementing every role-based portal, every core workflow screen, and every module described in the Product Requirements Document (PRD) and Technical Specification as static, interactive React pages — with no backend dependency.

---

## 2. Business Objectives

| Objective | Description |
|---|---|
| Accelerate Loan Origination | Reduce loan processing time from 45 days to fewer than 15 days |
| Reduce Operational Costs | Automate manual workflows, reduce FTE dependency by 30% |
| Enhance Compliance | Built-in regulatory compliance for US (TRID, RESPA, ECOA) and India (RBI, NHB) |
| Improve Customer Experience | Self-service portals, real-time application status tracking |
| Enable Multi-Channel Origination | Support direct, broker, and correspondent origination channels |
| Scale to Multi-Country | United States, India, with international expansion to Canada, UK, UAE planned |

---

## 3. Strategic Pillars

| Pillar | Capabilities |
|---|---|
| Digital First | Mobile-ready portals, e-signature, real-time status tracking |
| AI-Powered | Automated underwriting, fraud detection, intelligent document processing |
| Open Platform | API-first design, ecosystem integrations, partner marketplace |
| Global Ready | Multi-country support, multi-currency, local regulatory compliance |
| Enterprise Grade | SOC2 compliant, role-based security, full audit trails |
| Data-Driven | Real-time analytics, predictive insights, custom dashboards |

---

## 4. Target Markets

| Market | Initial Focus | Expansion |
|---|---|---|
| United States | Conforming loans, FHA, VA | Non-QM, Jumbo, Commercial |
| India | Home loans, plot loans, construction loans | Affordable housing, government schemes |
| International | — | Canada, UK, UAE (planned Q4 2027) |

---

## 5. User Roles & Personas

| Persona | Role | Key Needs | Portal |
|---|---|---|---|
| Arjun (Applicant) | First-time homebuyer | Easy application, status tracking, document upload | Borrower Portal |
| Priya (Co-Applicant) | Spouse applying jointly | Joint application, income verification | Borrower Portal |
| Michael (Broker) | Independent mortgage broker | Submit applications, commissions, lender comparison | Broker Portal |
| Sarah (Loan Officer) | Bank employee | Manage pipeline, communicate with applicants | Lender Portal |
| David (Underwriter) | Risk assessment | Review applications, automated decisioning | Underwriter Portal |
| Raj (Builder) | Real estate developer | Project listing, buyer pre-approvals, payment tracking | Builder Portal |
| Lisa (Title Agent) | Title company | Title search, title insurance, closing coordination | Title Portal |
| Kevin (Insurance Agent) | Insurance provider | Quote, bind policies, manage renewals | Insurance Portal |
| Admin | System administrator | User management, configuration, audit logs, tenant config | Admin Portal |

The app supports **10 role keys**, switchable via the role selector in the sidebar footer:

| Role Key | Display Name | Color |
|---|---|---|
| `borrower` | Borrower | Blue |
| `lender` | Loan Officer | Purple |
| `broker` | Broker | Green |
| `super-admin` | Super Admin | Pink |
| `lender-admin` | Lender Admin | Light Blue |
| `brokerage-admin` | Brokerage Admin | Yellow |
| `title-admin` | Title Co Admin | Teal |
| `title-agent` | Title Agent | Teal |
| `insurance-agent` | Insurance Agent | Orange |
| `builder` | Builder | Violet |

---

## 6. Role Hierarchy

```
                    ┌─────────────────┐
                    │   SUPER ADMIN   │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
      ┌───────────┐  ┌───────────┐  ┌───────────┐
      │  Lender   │  │ Brokerage │  │  Title Co │
      │  Admin    │  │   Admin   │  │   Admin   │
      └───────────┘  └───────────┘  └───────────┘
              │              │              │
              ▼              ▼              ▼
      ┌───────────┐  ┌───────────┐  ┌───────────┐
      │   Loan    │  │  Broker   │  │   Title   │
      │  Officer  │  │           │  │   Agent   │
      └───────────┘  └───────────┘  └───────────┘
              │              │              │
              └──────────────┼──────────────┘
                             ▼
              ┌────────────────────────────┐
              │      Applicant Portal      │
              │  • Individual Applicant    │
              │  • Co-Applicant            │
              │  • Co-Signer               │
              │  • Guarantor               │
              └────────────────────────────┘
```

---

## 7. Functional Modules

### 7.1 Loan Origination System (LOS)

The core module driving the entire platform. Accepts applications via web, mobile, broker channel, or API.

**Supported Loan Products:**

| Category | Types |
|---|---|
| Conventional | Conforming, Non-conforming, Jumbo |
| Government | FHA, VA, USDA |
| ARM | 5/1, 7/1, 10/1 ARM |
| Renovation | FHA 203(k), Homestyle Renovation |
| Construction | Construction-to-permanent |
| Investment | Rental property, second home |
| Commercial | Commercial real estate, bridge loans |
| Indian Market | Home loan, plot loan, construction loan, balance transfer |

**LOS Capabilities:**
- Multi-channel intake (web, mobile, broker, API)
- Standard 1003 Uniform Residential Loan Application
- Configurable forms per loan type
- Save & resume at any step
- Pre-qualification with soft credit pull
- Rate sheet management and pricing engine
- Rate lock requests, confirmations, and extensions
- Fee calculator (origination + third-party)

---

### 7.2 Borrower Portal

Self-service portal for applicants, co-applicants, co-signers, and guarantors.

| Feature | Description |
|---|---|
| Registration & Profile | Email/phone verification, employment history, personal details |
| Multi-Applicant Support | Add co-applicant, co-signer, guarantor to same application |
| Loan Application Wizard | Guided digital application with step-by-step progress |
| Property Selection | Search properties, link to loan application |
| Document Upload | W-2, tax returns, bank statements — drag-and-drop |
| Status Dashboard | Real-time application status with milestone timeline |
| Task List | Pending actions (sign documents, upload items) |
| Secure Messaging | Communicate directly with assigned loan officer |
| E-Signature | Digitally sign disclosures and closing docs |
| Asset Declaration | Structured wizard covering 35 asset form types (BA-001 to BA-035) |
| Asset Trend View | Historical value charts per asset with 30/90-day trend indicators |
| Payment Center | Make payments, view payment history, manage escrow |
| Pre-Qual Calculator | Affordability and EMI calculators |

---

### 7.3 Broker Portal

For independent mortgage brokers submitting applications on behalf of borrowers.

| Feature | Description |
|---|---|
| Pipeline Dashboard | All submitted applications with status and commission tracking |
| Application Submission | Submit on behalf of borrowers with full document package |
| Lender Comparison | Compare rates, fees, and products across multiple lenders |
| Commission Tracking | Track earned vs. paid commissions per loan |
| Borrower Management | Maintain borrower relationship and document collection |
| Lender Scorecards | Performance metrics per lender partner |

---

### 7.4 Lender / Loan Officer Portal

For loan officers managing active pipelines and underwriters reviewing applications.

| Feature | Description |
|---|---|
| Pipeline Management | All applications organized by status stage |
| Application Detail | Full application with all documents and data |
| Credit Pull | Request tri-merge credit reports from Experian/Equifax/TransUnion |
| Income Calculation | Automated qualifying income calculation from uploaded docs |
| Condition Management | Add, track, and clear loan conditions |
| Underwriting Decision | Approve / deny with conditions |
| Asset Verification Queue | Priority-sorted queue for reviewing borrower-declared assets |
| Asset Verification Workbench | Side-by-side borrower declaration vs. verified data, fraud scoring |
| Asset Trend Analysis | 90-day value chart, ARIMA forecast, risk-adjusted value, Sharpe ratio |
| Closing Management | Coordinate with title company, track closing checklist |
| Compliance Dashboard | AML review queue, SAR tracking, sanctions monitoring |

---

### 7.5 Underwriting & Risk Engine

| Requirement | Description |
|---|---|
| Automated Underwriting | Integration with Fannie Mae DU and Freddie Mac LP |
| Configurable Rule Engine | Custom underwriting rules per loan program |
| Credit Analysis | FICO score evaluation, credit history review, DTI calculation |
| Collateral Analysis | LTV and CLTV calculation |
| Risk Scoring | Internal risk score for portfolio loans |
| Condition Management | Full condition lifecycle — add, track, clear |
| Decision Workflow | Approve, deny, or counter-offer with conditions |
| Fraud Detection | Identity verification, income and asset fraud signals |

**Underwriting Decision Matrix:**

| Criteria | Conventional | FHA | VA |
|---|---|---|---|
| Minimum FICO | 620 | 580 (3.5% down) / 500 (10% down) | No minimum (lender overlay) |
| Maximum DTI | 43–50% | 43–57% | 41–50% |
| Minimum Down Payment | 3–5% | 3.5% | 0% |
| Maximum LTV | 97% | 96.5% | 100% |
| Reserves | Varies | Not required | Not required |

---

### 7.6 Asset & Income Verification

The platform's most complex module. Borrowers declare assets using 35 structured forms (BA-001 to BA-035). Lenders independently verify using 8 parallel forms (LA-001 to LA-008) with third-party data connectors.

**Supported Income Types:**

| Income Type | Verification Method |
|---|---|
| W-2 Employment | Pay stubs + W-2 + VOE (Verification of Employment) |
| Self-Employed | 2-year tax returns + P&L statement |
| Rental Income | Schedule E + lease agreements |
| Retirement / SSA | Award letters + bank statements |
| Investment Income | Brokerage statements |
| Alimony / Child Support | Court orders + deposit evidence |

**Asset Eligibility Rules (Lender):**

| Asset Type | Down Payment | Reserves | Haircut |
|---|---|---|---|
| Checking / Savings | Yes | Yes | None (must be seasoned ≥ 60 days) |
| Gift Funds | Yes (with restrictions) | No | None (donor evidence required) |
| Stocks / Equities | Yes (post-liquidation) | Yes | 30% on volatile stocks |
| Bonds | Yes | Yes | 10% |
| Mutual Funds / ETFs | Yes | Yes | 20% |
| 401(k) / IRA | Yes (with penalty) | Yes | 40% |
| Roth IRA | Yes (contributions only) | Yes | 20% |
| Real Estate Equity | No | Conditional | Requires second appraisal |
| Crypto | No | No | 100% excluded (conventional) |
| Business Assets | Conditional | Conditional | 50% typical |
| Life Insurance CSV | Yes | Yes | 10% |
| Vehicles | No | No | Not counted |

**Asset Trend Tracking by Class:**

| Asset Class | Update Frequency | Data Source |
|---|---|---|
| Checking / Savings | Monthly (from Plaid) | Bank API |
| Stocks / ETFs / Mutual Funds | Daily | Nasdaq/NYSE market feed |
| Bonds | Daily | Bloomberg / FINRA TRACE |
| 401(k) / IRA | Quarterly | Plan administrator |
| Crypto | Real-time | CoinGecko / Binance API |
| Real Estate (Owned) | Quarterly / On-demand | CoreLogic / Zillow AVM |
| Business Equity | Annually | Business tax return |

**Asset Alert Rules:**

| Trigger | Alert Target | Action |
|---|---|---|
| Liquid assets drop >10% from verified value | Loan Officer | Re-verify before closing |
| Investment portfolio drops below reserve requirement | Underwriter | Request additional assets |
| Crypto drops >20% | Loan Officer | Exclude from eligible assets |
| Real estate AVM drops >5% (collateral) | Underwriter | Order new appraisal |
| Bank balance <declared by >5% for 30 days | Loan Officer | Request LOE + updated statements |
| Gift funds not transferred within 7 days of closing | Borrower + LO | Urgent: Confirm wire |

---

### 7.7 Property Management

| Feature | Description |
|---|---|
| Property Listing | Import listings via MLS integration |
| Property Search | Search by address, ZIP code, price range, school district |
| Property Details | Photos, specs, tax history, school ratings, walk score |
| Valuation | Automated Valuation Model (AVM) + appraisal order tracking |
| Flood Zone | FEMA flood zone determination via CoreLogic |
| Title Search | Integrated title search and commitment |
| Property Condition | Inspection reports and repair estimates |
| Comparable Sales | Recent comparable sales data (comps) |

---

### 7.8 Insurance Management

The platform covers four insurance types: **Homeowner's, Flood, Mortgage (PMI/MIP), and Title Insurance**.

**Insurance Workflow:**
```
Borrower Requests Quote
        ↓
Insurance Agent Assigned
        ↓
Quote Generated (multi-provider)
        ↓
Policy Selected by Borrower
        ↓
Policy Bound
        ↓
Proof Uploaded + Closing Required
        ↓
Escrow Account Updated
        ↓
Annual Renewal + Premium Payment
```

| Feature | Description |
|---|---|
| Provider Catalog | Manage approved insurance providers per loan program |
| Quoting Engine | Multi-provider quote generation in one request |
| Policy Binding | Bind policies and capture full policy details |
| Proof Tracking | Upload and validate certificates of insurance |
| Renewal Alerts | Automatic notifications 60/30/7 days before expiry |
| Premium Escrow | Track insurance premiums as escrow disbursements |
| Claims Integration | Track active claims on insured properties |

---

### 7.9 Document Management

| Feature | Description |
|---|---|
| Centralized Repository | Version-controlled document store with audit trail |
| Document Categories | Identity, Income, Assets, Property, Loan, Insurance, Compliance |
| OCR & Data Extraction | Auto-extract key fields from uploaded PDFs and images |
| E-Signature | DocuSign and Adobe Sign integration |
| Document Expiry | Alert for expiring documents (stale statements, expired IDs) |
| Redaction | Auto-redact SSN and sensitive PII |
| Document Generation | Generate disclosures (LE, CD), closing documents, settlement statements |

**Document Types:**

| Category | Examples |
|---|---|
| Identity | Driver's license, Passport, SSN card |
| Income | W-2, 1040, Pay stubs, 1099, K-1 |
| Assets | Bank statements, Investment statements, Gift letters, Exchange statements |
| Property | Purchase agreement, Appraisal report, Inspection report |
| Loan | Application, Loan Estimate, Closing Disclosure, Note, Deed of Trust |
| Insurance | Homeowner's policy, Flood policy, PMI certificate |
| Compliance | Flood certificate, IRS 4506-C transcripts, VOE |

---

### 7.10 Closing & Disbursement

| Feature | Description |
|---|---|
| Closing Disclosure (CD) | Generate CD, track mandatory 3-day review period |
| Closing Checklist | All requirements tracked with status — title, insurance, funds |
| Title Coordination | Coordinate scheduling and documents with title company |
| Wire Management | Initiate and track incoming/outgoing wire transfers |
| Settlement Statement | HUD-1 or ALTA settlement statement generation |
| Post-Closing | Document recording, loan delivery to investor |
| Warehouse Lines | Track warehouse line usage and availability |

---

### 7.11 Loan Servicing

| Feature | Description |
|---|---|
| Payment Processing | ACH, card, and wire payment acceptance |
| Escrow Management | Track property tax and insurance escrow balances |
| Annual Escrow Analysis | Perform annual analysis, identify shortages or surpluses |
| Payoff Processing | Generate payoff quotes, process payoffs |
| Delinquency Management | Track late payments, generate notices, run collections workflow |
| Investor Reporting | Report to Fannie Mae, Freddie Mac, or private investors |
| Tax & Insurance Tracking | Ensure tax and insurance payments are made on time |

---

### 7.12 Compliance & Regulatory

| Requirement | US Regulation | India Regulation |
|---|---|---|
| Disclosure Management | TRID, RESPA, TILA | RBI Fair Practices Code |
| HMDA Reporting | Home Mortgage Disclosure Act | — |
| Fair Lending | ECOA, Fair Housing Act | Equal Opportunity statutes |
| Privacy | GLBA, CCPA | IT Act, DPDP Bill |
| BSA / AML | Bank Secrecy Act, PATRIOT Act | PMLA |
| Audit Trail | All federal regulations | All RBI directives |
| E-Sign Compliance | ESIGN Act | IT Act (electronic signatures) |

**AML / Compliance Monitoring Dashboard covers:**
- SAR (Suspicious Activity Report) filing queue
- PEP (Politically Exposed Person) alerts
- Sanctions screening (OFAC)
- AML review queue with risk scoring
- Suspicious activity monitoring with flag management

---

### 7.13 Multi-Tenant Management

Located at `/tenant-management` (`src/pages/TenantManagement.jsx`). Accessible to the `super-admin` role.

The platform uses a **multi-tenant SaaS architecture** where each organization (bank, credit union, brokerage, title company) is an independent tenant with:
- Custom branding (logo, primary/secondary colors)
- Custom domain (e.g., `loans.fnbank.com`)
- Per-tenant SSO provider configuration (Okta, Azure AD, Google Workspace)
- Per-tenant MFA enforcement policy
- Per-tenant feature flag control (assets, origination, underwriting, compliance, reporting)
- Per-tenant session timeout and user provisioning settings

**Platform Admin Dashboard (Screen 18.12):**
- KPI cards: Total Tenants, Active Users, Total Active Loans, Platform Revenue
- Quick actions: Create New Tenant, Manage Branding, Configure Plans, View Analytics
- Tenant table: name/domain, type, status badge, user count, loan count, volume, SSO status
- Configuration panel with branding, authentication, and feature flag sections

---

### 7.14 Transaction Management

Located at `/transactions` (`src/pages/TransactionManagement.jsx`). Accessible from `borrower`, `lender`, and `lender-admin` sidebars.

Full payment and transaction management suite with 7 tabs — see [Screen 19](#screen-19--transaction-management) for complete detail.

---

## 8. Asset Forms — Borrower Entry (BA Series)

Borrowers declare assets through the **Asset Declaration Wizard** (Step 3 of the 7-step loan application). Forms are grouped into 4 categories:

### Liquid Assets (BA-001 to BA-006)

| Form | Asset Type | Key Fields | Required Docs |
|---|---|---|---|
| BA-001 | Checking Account | Institution, account #, balance, avg 3-month balance | 2–3 months bank statements |
| BA-002 | Savings Account | Institution, account #, balance, source of funds | 2–3 months bank statements |
| BA-003 | Money Market | Institution, balance, interest rate | Recent statement |
| BA-004 | Certificate of Deposit | Institution, face value, maturity date, early withdrawal penalty | CD certificate |
| BA-005 | Cash on Hand | Estimated amount, source explanation | Written explanation letter |
| BA-006 | Gift Funds | Donor name, relationship, amount, transfer date | Gift letter + donor bank statement |

### Investment & Retirement Assets (BA-010 to BA-016)

| Form | Asset Type | Key Fields | Required Docs |
|---|---|---|---|
| BA-010 | Stocks / Equities | Brokerage, ticker symbols, shares, market value | 2-month brokerage statement |
| BA-011 | Bonds | Bond type, face value, current market value, maturity date | Statement or bond certificate |
| BA-012 | Mutual Funds / ETFs | Fund name, CUSIP/ISIN, NAV, units, current value | 2-month brokerage statement |
| BA-013 | 401(k) / 403(b) | Plan administrator, vested balance, any plan loans | Most recent quarterly statement |
| BA-014 | IRA / Roth IRA | Custodian, account type, vested balance | Most recent quarterly statement |
| BA-015 | Pension Plan | Employer, monthly benefit amount, retirement date | Pension award letter |
| BA-016 | Crypto Assets | Exchange/wallet, coin type, USD equivalent at application date | Exchange statement, wallet address |

### Real Estate Assets (BA-020 to BA-023)

| Form | Asset Type | Key Fields | Required Docs |
|---|---|---|---|
| BA-020 | Primary Residence (owned) | Address, market value, mortgage balance, equity | Mortgage statement, HOA docs |
| BA-021 | Investment Property | Address, market value, rental income, loan balance | Lease agreement, mortgage statement |
| BA-022 | Vacant Land | Parcel ID, acreage, location, estimated value | Tax assessment, appraisal if available |
| BA-023 | Commercial Property | Property type, valuation, occupancy, NOI | Appraisal, lease roll |

### Business & Other Assets (BA-030 to BA-035)

| Form | Asset Type | Key Fields | Required Docs |
|---|---|---|---|
| BA-030 | Business Ownership | Business name, EIN, % ownership, estimated valuation | 2-year business tax returns, CPA letter |
| BA-031 | Life Insurance (Cash Value) | Insurer, policy number, face value, cash surrender value | Policy declaration page |
| BA-032 | Receivables / Notes | Debtor name, amount owed, due date, collectibility | Promissory note, payment history |
| BA-033 | Automobile / Vehicle | Year/Make/Model, VIN, KBB value, loan balance | Registration, loan statement |
| BA-034 | Jewelry / Art / Collectibles | Description, appraised value, appraisal date | Certified appraisal document |
| BA-035 | Trust Assets | Trust name, beneficiary status, accessible value | Trust document, trustee letter |

---

## 9. Asset Forms — Lender Verification (LA Series)

Loan officers and underwriters use a **parallel verification workspace** to independently verify and reconcile borrower-declared assets.

| Form | Function | Data Source |
|---|---|---|
| LA-001 | Bank Account Verification | Plaid / Finicity / Manual statement review |
| LA-002 | Investment Account Verification | Brokerage statement, DTC feed |
| LA-003 | Retirement Account Verification | Quarterly statement, plan administrator |
| LA-004 | Real Estate Asset Verification | CoreLogic AVM, title search, appraisal |
| LA-005 | Business Asset Verification | Business tax returns, CPA letter |
| LA-006 | Gift Fund Verification | Gift letter, bank wire confirmation |
| LA-007 | Reserve Calculation Summary | Aggregated from LA-001 to LA-006 |
| LA-008 | Asset Discrepancy Log | System comparison engine — declared vs. verified with variance % |

**Variance Logic:**
- Variance **< 5%** → Auto-approved, no action needed
- Variance **≥ 5%** → Flagged for underwriter review, condition may be added
- Borrower notified via secure message with specific document request

---

## 10. Asset Lifecycle — End to End

```
PHASE 1: DECLARATION
  Borrower completes Asset Declaration Wizard (BA-001 to BA-035)
  Uploads supporting documents → OCR extracts key fields
        ↓
PHASE 2: VERIFICATION
  Lender connects to Plaid/Finicity for bank & investment assets
  Manual review for real estate, business, retirement assets
  Eligibility rules applied → Haircuts calculated
  Variance check → Flag or Auto-Approve
        ↓
PHASE 3: UNDERWRITING INPUT
  Verified assets feed into:
  • Down payment calculation
  • Reserve requirement check (2–6 months PITI depending on loan)
  • Net worth calculation for Jumbo/Commercial loans
  • DU / LP asset data submission
        ↓
PHASE 4: TREND MONITORING (Pre-Close)
  Automated daily/weekly refresh of market-linked asset values
  Alert triggers if eligible assets drop below required threshold
  Lender notified → Borrower asked to provide additional assets
        ↓
PHASE 5: CLOSING
  Final asset re-verification (within 10 days of closing)
  Closing funds confirmed (wire / cashier's check traced)
  Asset snapshot locked at closing date
        ↓
PHASE 6: SERVICING
  Annual escrow analysis uses real estate asset values
  Collateral monitoring for HELOCs / ARMs
  Loss mitigation uses updated asset values for hardship review
```

---

## 11. Loan Application State Machine

```
DRAFT → SUBMITTED → VERIFICATION → UNDERWRITING → CONDITIONAL_APPROVAL → CLEAR_TO_CLOSE → CLOSED
              ↓                                                                    ↓
          WITHDRAWN                                                            FUNDED
              ↓                                                                    ↓
          DECLINED                                                           SERVICING
```

**Document States:**
```
PENDING → UPLOADED → VERIFIED → APPROVED
                ↓
            REJECTED → EXPIRED
```

---

## 12. Pages & Routes Reference

### Pre-Auth (Standalone — no sidebar)

| Route | Page | Description |
|---|---|---|
| `/login` | `Login.jsx` | Standard email/password login |
| `/select-org` | `OrgSelect.jsx` | Organization selection before login |
| `/multi-tenant-login` | `MultiTenantLogin.jsx` | Full multi-tenant login hub (Screen 18) |

### Borrower

| Route | Page | Description |
|---|---|---|
| `/dashboard` | `BorrowerDashboard.jsx` | Loan status overview, task list, notifications |
| `/apply` | `LoanApplicationWizard.jsx` | Multi-step loan application (1003 form equivalent) |
| `/assets` | `AssetDashboard.jsx` | Asset portfolio — all declared assets with status |
| `/assets/overview` | `AssetOverviewDashboard.jsx` | Asset summary with breakdown charts and trend graphs |
| `/assets/declare` | `AssetDeclarationWizard.jsx` | Step-by-step asset declaration (BA-001 to BA-035) |
| `/assets/detail/:id` | `AssetDetail.jsx` | Individual asset — value trend, risk assessment, history |
| `/documents` | `DocumentCenter.jsx` | Document upload, e-sign, and status center |
| `/properties` | `PropertySearch.jsx` | MLS-style property search and comparison |
| `/insurance` | `InsuranceManagement.jsx` | Insurance policy management and proof upload |
| `/servicing` | `LoanServicingDashboard.jsx` | Payments, escrow, statements, payoff |
| `/transactions` | `TransactionManagement.jsx` | Payments, wire transfers, escrow management (Screen 19) |
| `/calculator` | `PreQualCalculator.jsx` | Pre-qualification affordability calculator |

### Lender / Loan Officer

| Route | Page | Description |
|---|---|---|
| `/pipeline` | `LoanOfficerPipeline.jsx` | Active loan pipeline with stage-based kanban/list view |
| `/underwriting` | `UnderwriterReview.jsx` | Underwriting review — conditions, DTI, LTV decisioning |
| `/asset-verification` | `AssetVerificationLender.jsx` | Asset verification workbench (LA-001 to LA-008) |
| `/asset-queue` | `LenderAssetQueue.jsx` | Bulk asset verification queue with priority sorting |
| `/closing` | `ClosingDisbursement.jsx` | Closing checklist and fund disbursement tracking |
| `/compliance` | `ComplianceDashboard.jsx` | AML review queue, SAR filing, compliance audit trail |
| `/transactions` | `TransactionManagement.jsx` | Transaction monitoring with fraud alerts (Screen 19) |

### Broker

| Route | Page | Description |
|---|---|---|
| `/broker-dashboard` | `BrokerDashboard.jsx` | Pipeline overview, commissions, lender scorecards |
| `/calculator` | `PreQualCalculator.jsx` | Borrower pre-qualification calculator |

### Admin Portals

| Route | Page | Description |
|---|---|---|
| `/super-admin` | `SuperAdminDashboard.jsx` | Platform-wide KPIs, tenant health, system status |
| `/tenant-management` | `TenantManagement.jsx` | Multi-tenant config — branding, auth, feature flags (Screen 18.12) |
| `/lender-admin` | `LenderAdminDashboard.jsx` | Lender organization admin — users, loan products |
| `/brokerage-admin` | `BrokerageAdminDashboard.jsx` | Brokerage admin — broker roster, commission rules |
| `/admin` | `AdminPortal.jsx` | General platform administration |

### Title & Insurance

| Route | Page | Description |
|---|---|---|
| `/title-admin` | `TitleCoAdminDashboard.jsx` | Title company admin — orders, agents, financials |
| `/title-agent` | `TitleAgentPortal.jsx` | Title agent — open orders, title search, closing coordination |
| `/insurance-portal` | `InsuranceAgentPortal.jsx` | Insurance agent — quotes, policy binding, renewals |

### Builder

| Route | Page | Description |
|---|---|---|
| `/builder-portal` | `BuilderPortal.jsx` | Builder/developer — project listings, buyer pre-approvals |

### Shared (All Roles)

| Route | Page | Description |
|---|---|---|
| `/workflow-tracker` | `LoanWorkflowTracker.jsx` | Visual loan milestone tracker with stage status |
| `/messages` | `MessagingCenter.jsx` | Secure in-app messaging between all parties |
| `/notifications` | `NotificationsCenter.jsx` | Alerts, task reminders, system notifications |
| `/reports` | `ReportsDashboard.jsx` | Origination, underwriting, servicing, compliance reports |
| `/profile` | `ProfileSettings.jsx` | Profile, preferences, MFA, notification settings |

---

## 13. Screen Inventory

All screen designs were created from the ASCII wireframe mockup specifications in `Docs/mockscreens.md` and `Docs/api_database_sampleTests_UiMock_deepseek.md`.

### Asset Management Screens (from `mockscreens.md`)

| Screen | View | Implemented In |
|---|---|---|
| 1.1 | Asset Dashboard (Borrower) — summary cards, verification progress, asset list | `AssetDashboard.jsx` |
| 1.2 | Add Asset Modal — 3-step: type selection → details → verification method | `AssetDashboard.jsx` |
| 1.3 | Asset Detail (Borrower) — 90-day trend chart, risk assessment, history | `AssetDetail.jsx` |
| 2.1 | Asset Verification Queue (Lender) — priority queue, status counts | `LenderAssetQueue.jsx` |
| 2.2 | Asset Verification Workbench (Lender) — fraud scores, document review, decision | `AssetVerificationLender.jsx` |
| 2.3 | Asset Trend Analysis (Lender) — ARIMA forecast, volatility, benchmark comparison | `AssetVerificationLender.jsx` |
| 2.4 | Compliance & AML Dashboard — SAR queue, PEP alerts, sanctions, AML review | `ComplianceDashboard.jsx` |

---

### Screen 18 — Multi-Tenant Login

Located at `/multi-tenant-login` (`src/pages/MultiTenantLogin.jsx`). A standalone, 6-view authentication hub supporting 11 tenant organizations across all org types.

#### Views

| View | Description |
|---|---|
| `select` | 3-column tenant grid with live search filter and custom domain entry |
| `login` | Type-specific branded login form — fields vary by organization type |
| `mfa` | 6-digit MFA code entry with resend option and alternate method links |
| `sso` | Simulated SSO provider dialog (Microsoft, Okta, Google) |
| `reset` | Password reset — email input and Send Reset Link |
| `reset-sent` | Confirmation card with email tips and support links |

#### Org-Type Login Form Variants

| Org Type | Form Layout & Fields |
|---|---|
| `bank` | Email + Password, SSO buttons if configured |
| `credit-union` | Member ID + Password |
| `broker` | Broker ID + Username + Password |
| `title` | Email + Office Location dropdown + Password |
| `borrower` | Split-panel — borrower credentials (left) + lender/co-borrower (right) |
| `admin` | Tenant selector + Admin Username + Admin Password |

#### Tenants Included (11 orgs)

First National Bank, Coastal Credit Union, Premier Group Realty, Pacific Title Co, Borrower Portal, Platform Admin, Midwest Savings Bank, Mountain Credit Union, Bay Area Brokers, Sunrise Title Services, SecureBank Financial.

#### Screen 18.1 — Tenant Selection
Grid of all tenant tiles with name, abbreviation, org type badge, phone, and email. Supports live search and custom domain login entry.

#### Screen 18.12 — Tenant Management Dashboard (`TenantManagement.jsx`)

Super-admin portal for configuring the multi-tenant platform:
- **KPI cards**: Total Tenants (6), Active Users (1,847), Active Loans (12,439), Platform Revenue ($84.2M)
- **Quick actions**: Create New Tenant, Manage Branding, Configure Plans, View Analytics
- **Tenant table**: Name, type, status badge (active/trial/paused), user count, loan count, volume, SSO indicator
- **Config panel** (opens on row selection): Branding (logo abbr, primary/secondary color swatches, domain), Authentication (SSO provider, MFA policy, session timeout, user provisioning), Feature flags (assets, origination, underwriting, compliance, reporting)

---

### Screen 19 — Transaction Management

Located at `/transactions` (`src/pages/TransactionManagement.jsx`). Accessible from `borrower`, `lender`, and `lender-admin` sidebars.

#### Tab 1 — Overview
- 4 KPI stat cards: Total Paid YTD, Next Payment, Escrow Balance, Remaining Balance
- Quick action buttons: Make Payment, Transfer Funds, Download Statement
- Upcoming disbursements table
- Recent transactions table
- Monthly payment breakdown bar chart (Mortgage vs. Insurance vs. Tax by month — Recharts BarChart)

#### Tab 2 — Make Payment
3-step guided flow:
1. **Form**: Amount selection (minimum/regular/custom), payment date picker, payment method selector, payment breakdown with fees
2. **Preview**: Full payment breakdown before confirmation
3. **Confirmed**: Receipt with transaction ID, date, amount, confirmation message

#### Tab 3 — Wire Transfer
- Daily limit indicator with progress bar
- Monthly limit indicator with progress bar
- Initiate wire form (2-column: recipient info + wire details including routing number, account number, memo, purpose)
- Recent wires table with status badges
- Saved wire templates for repeat recipients

#### Tab 4 — Escrow
- 4 stat cards: Escrow Balance, Monthly Deposit, Projected Shortage/Surplus, Next Analysis Date
- Annual escrow analysis breakdown table
- Disbursement history table (property tax, homeowner's, flood insurance)
- Upcoming disbursements table with amounts and dates
- Action buttons: Request Analysis, Update Insurance, Contact Servicer

#### Tab 5 — Scheduled / AutoPay
- AutoPay status bar with enable/disable toggle
- Upcoming autopay schedule table with status
- One-time scheduled payments table
- AutoPay settings panel: payment amount, payment date, account, notification preferences

#### Tab 6 — History
- Filter bar: All / Payment / Wire / Escrow / Refund type buttons
- Text search across transaction history
- Full transaction table with columns: Date, Type, Description, Amount, Status, Reference — with pagination
- Monthly PDF statements grid (organized by year, download links)

#### Tab 7 — Lender Monitor
- 4 KPI cards: Total Volume, Pending Wires, Failed Payments, Success Rate
- Pending wire approvals table — Approve / Decline actions, fraud alert badges
- Failed payments queue — Retry / Update Account actions per record
- Payment trend line chart: Payments vs. Wires vs. Failed over 6 months (Recharts LineChart)

---

## 14. Data Model

### Core Entities

```
TENANT ──────────► USER ──────────────► PERSON
    │                                       │
    ▼                                       ▼
APPLICATION ◄──────────────────── APPLICATION_ROLE
    │                              (Primary/Co/Guarantor)
    ├──► PROPERTY
    ├──► INCOME
    ├──► ASSET (BA-001 to BA-035)
    ├──► INSURANCE
    └──► DOCUMENT
```

**Key Asset Schema Fields:**
- `asset_type` — CASH, INVESTMENT, RETIREMENT, REAL_ESTATE, CRYPTO, GIFT, BUSINESS, OTHER
- `asset_subtype` — CHECKING, SAVINGS, STOCKS, 401K, IRA, BITCOIN, etc.
- `ownership_type` — INDIVIDUAL, JOINT, TRUST
- `current_value`, `value_as_of_date`, `currency`
- `verification_status` — PENDING, VERIFIED, QUESTIONED, REJECTED
- `risk_adjusted_value`, `haircut_percentage`, `volatility_score`
- `value_7d_ago`, `value_30d_ago`, `value_90d_ago`, `trend_30d`, `trend_90d`
- `data_source` — PLAID, FINICITY, CORLOGIC, MANUAL, MARKET_FEED

**Asset Valuation Snapshot (for trend tracking):**
- `declared_value` — Borrower-stated value at application date
- `verified_value` — Lender-confirmed value
- `current_market_value` — Live API-updated price
- `trend_pct_30d`, `trend_pct_90d`, `trend_pct_1yr`
- `eligible_value` — Post-haircut amount usable for reserves
- `liquidity_tier` — T1 (immediate), T2 (30-day), T3 (90-day+)

---

## 15. API Architecture

### API Categories

| Category | Base Path | Description |
|---|---|---|
| Borrower | `/api/v1/borrower` | Borrower profile and preferences |
| Application | `/api/v1/application` | Loan application CRUD and submission |
| Assets | `/api/v1/assets` | Asset declaration, verification, trends |
| Property | `/api/v1/property` | Property search and valuation |
| Document | `/api/v1/document` | Upload, download, OCR processing |
| Insurance | `/api/v1/insurance` | Quoting and policy binding |
| Underwriting | `/api/v1/underwriting` | Decisions and conditions |
| Servicing | `/api/v1/servicing` | Payments, escrow, payoffs |
| Admin | `/api/v1/admin` | User management, tenant config |
| Webhook | `/api/v1/webhook` | Event-based notifications |

### Key Sample Endpoints

```yaml
# Loan Application
POST   /api/v1/application                        # Create application
GET    /api/v1/application/{id}                   # Get application detail
POST   /api/v1/application/{id}/submit            # Submit for processing
GET    /api/v1/application/{id}/status            # Real-time status

# Asset Management
POST   /api/v1/applications/{id}/assets           # Add asset (BA-series)
GET    /api/v1/applications/{id}/assets/summary   # Asset summary + reserve check
POST   /api/v1/assets/{assetId}/verify            # Verify asset (LA-series)
POST   /api/v1/assets/{assetId}/flag              # Add AML/fraud flag
GET    /api/v1/assets/{assetId}/trends            # 90-day trend + ARIMA forecast
POST   /api/v1/assets/{assetId}/refresh           # Trigger valuation refresh

# Documents
POST   /api/v1/application/{id}/document          # Upload document
GET    /api/v1/document/{id}/download             # Download document

# Insurance
GET    /api/v1/insurance/quotes                   # Multi-provider quotes
POST   /api/v1/insurance/policy                   # Bind policy

# Servicing / Payments
GET    /api/v1/loan/{loanId}/payment              # Payment history
POST   /api/v1/loan/{loanId}/payment              # Make payment
GET    /api/v1/loan/{loanId}/escrow               # Escrow balance
```

### Webhook Events

| Event | Description |
|---|---|
| `asset.verified` | Asset verification completed by lender |
| `asset.flagged` | New AML/fraud flag added to asset |
| `asset.value_changed` | Significant market value change detected |
| `asset.expiring` | Document approaching expiry threshold |
| `application.status_changed` | Loan application moved to new stage |
| `payment.processed` | Payment successfully processed |
| `closing.scheduled` | Closing date set and confirmed |

---

## 16. Third-Party Integrations

| Category | Provider | Purpose |
|---|---|---|
| Credit | Experian, Equifax, TransUnion | Tri-merge credit reports |
| AUS | Fannie Mae DU, Freddie Mac LP | Automated underwriting system |
| Bank Data | Plaid, Finicity, Yodlee | Real-time bank & investment asset verification |
| Employment | The Work Number | Employment and income verification |
| Tax Transcripts | IRS via 4506-C | Tax return verification |
| E-Signature | DocuSign, Adobe Sign | Legally binding e-signatures |
| Title | First American, Fidelity | Title search and title insurance |
| Flood | CoreLogic, FEMA | Flood zone determination |
| Valuation | CoreLogic, Clear Capital | AVM and appraisal management |
| MLS | Local MLS providers | Property listing import |
| Payment | Stripe, Plaid, ACH Networks | Payment processing |
| Market Data | Nasdaq/NYSE, Bloomberg | Real-time stock/bond valuations |
| Crypto | CoinGecko, Binance | Real-time crypto valuations |
| Cloud | AWS / Azure / GCP | Infrastructure |
| SSO / Auth | Okta, Azure AD, Google Workspace | Enterprise SSO for tenant users |
| Monitoring | Datadog, New Relic | Application performance observability |

---

## 17. Security Architecture

```
API GATEWAY
• Rate Limiting  • Authentication  • Request Validation
        ↓
AUTH SERVICE
• OAuth 2.0 / OIDC   • MFA (SMS / TOTP)   • JWT Tokens
• SSO (Okta / Auth0)  • Role Resolution
        ↓
APPLICATION SERVICES
• RBAC Enforcement   • Data Encryption   • Audit Logging
        ↓
DATA LAYER
• AES-256 encryption at rest
• TLS 1.3 in transit
• Column-level encryption for PII (SSN, DOB)
• HashiCorp Vault for secrets (API keys, certificates)
• Encrypted automated backups
```

| Requirement | Implementation |
|---|---|
| Authentication | OAuth 2.0 / OIDC with MFA (SMS + TOTP) |
| Authorization | RBAC with fine-grained, per-action permissions |
| Data Encryption | AES-256 at rest, TLS 1.3 in transit |
| PII Protection | Masking, redaction, access controls per row/column |
| Audit Logging | Immutable audit trail for every data access and change |
| Penetration Testing | Quarterly third-party penetration tests |

---

## 18. Compliance & Regulatory Coverage

| Certification | Timeline |
|---|---|
| SOC 2 Type II | Year 1 |
| ISO 27001 | Year 1 |
| PCI DSS | Year 1 (if storing payment card data) |
| HIPAA | Year 2 (if applicable) |

**US Regulatory Coverage:** TRID, RESPA, TILA, HMDA, ECOA, Fair Housing Act, GLBA, CCPA, BSA, PATRIOT Act, ESIGN Act

**India Regulatory Coverage:** RBI Fair Practices Code, NHB Guidelines, PMLA, IT Act, DPDP Bill

---

## 19. Implementation Roadmap

### Phase 1 — Foundation (Months 1–4)
Multi-tenant architecture, authentication, RBAC, Borrower Portal (registration, application intake, document upload), Loan Officer Portal (pipeline management), Document Management (storage, OCR, e-signature), Credit pull and basic AUS integration.

### Phase 2 — Expansion (Months 5–8)
Broker Portal (application submission, commissions), Underwriter Portal (full workflow, conditions), Insurance Module (quoting, binding, tracking), Property Module (MLS integration, valuation, flood), Asset Verification (Plaid/Finicity integration, employment verification).

### Phase 3 — Enterprise (Months 9–12)
Servicing Module (payment processing, escrow, delinquency), Closing Module (CD generation, wire management), Advanced Reporting (custom dashboards, HMDA reporting), iOS/Android native apps, Partner API marketplace.

### Phase 4 — Scale (Months 13–18)
India market launch with multi-currency support, Commercial real estate lending, AI/ML enhancements (predictive underwriting, fraud detection), Third-party app ecosystem/marketplace.

---

## 20. Success Metrics (KPIs)

### Business KPIs

| Metric | Target |
|---|---|
| Loan Processing Time | 45 days → below 15 days |
| Operational Cost per Loan | Reduce by 30% |
| Customer Satisfaction (CSAT) | Above 85% |
| Enterprise Client Adoption | 100+ clients in Year 1 |
| Loan Volume Processed | $5B+ in Year 1 |

### Technical KPIs

| Metric | Target |
|---|---|
| System Uptime | 99.9% |
| API Response Time (P95) | Below 500ms |
| Document Processing Accuracy | Above 95% (OCR) |
| Deployment Frequency | Daily deployments |
| Security Incidents | Zero critical incidents |

---

## 21. Technical Stack & Architecture

### Frontend Stack

| Layer | Library / Tool | Version |
|---|---|---|
| UI Framework | React | 18.3.1 |
| Build Tool | Vite | 5.4.x |
| Routing | react-router-dom (HashRouter) | 6.22.3 |
| Charts | Recharts | 2.12.2 |
| Icons | lucide-react | 0.368.0 |
| Deploy | gh-pages | 6.x |
| Styling | Custom CSS (single `index.css`) | — |

### Backend Stack (Production Target — not in this mockup)

| Layer | Technology |
|---|---|
| API | Node.js / Express or Python / FastAPI |
| Primary Database | PostgreSQL (per-tenant schema sharding) |
| Cache | Redis |
| Document Storage | AWS S3 / Azure Blob Storage |
| Search | Elasticsearch |
| Queue | RabbitMQ / AWS SQS |
| Auth | Auth0 / Okta or custom OAuth2 service |

### Frontend Source Tree

```
ReactApp/src/
├── App.jsx                    # Root router — all 36 routes registered
├── index.css                  # Global design system (CSS variables + utility classes)
├── components/
│   ├── Layout.jsx             # App shell — sidebar, topbar, role switcher, nav groups
│   ├── FloatingChatbot.jsx    # Persistent AI assistant widget (all in-app pages)
│   └── ThemePanel.jsx         # Theme customization panel (dark/light + color tokens)
├── contexts/
│   └── ThemeContext.jsx       # Theme state context provider
├── pages/                     # 35 page components (all self-contained mockups)
│   ├── MultiTenantLogin.jsx   # Screen 18 — 6-view multi-tenant authentication hub
│   ├── TenantManagement.jsx   # Screen 18.12 — Super-admin tenant configuration
│   ├── TransactionManagement.jsx  # Screen 19 — 7-tab transaction management suite
│   └── [32 other pages...]
└── utils/
    └── session.js             # Session guard helpers
```

### Routing Strategy

- **Pre-auth pages** (`/login`, `/select-org`, `/multi-tenant-login`) render as standalone full-page — no Layout wrapper, no sidebar
- **In-app pages** are nested under `<Layout>` and require a valid session (`isSessionValid()`)
- `HashRouter` is used for GitHub Pages compatibility (no server-side routing required)

### Nav Groups

`NAV_GROUPS` in `Layout.jsx` maps each role key to an array of `{ label, Icon, to }` entries. The sidebar renders only the active role's group. Roles are switchable at runtime via the footer role selector (mockup/demo feature — not present in production).

---

## 22. Getting Started

```bash
# Clone and install dependencies
npm install

# Start local development server
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

---

## 23. CSS Design System

All styling is in a single `index.css` using CSS custom properties for theming and utility classes for layout.

### CSS Variables (Theme Tokens)

| Variable | Description |
|---|---|
| `--bg-base` | Page background |
| `--bg-surface` | Card / panel background |
| `--bg-elevated` | Modal / dropdown background |
| `--text-primary` | Primary text |
| `--text-secondary` | Secondary / label text |
| `--text-muted` | Placeholder / hint text |
| `--border` | Border color |
| `--blue` | Primary action color |
| `--blue-light` | Hover state for primary |
| `--green` | Success / approved |
| `--red` | Error / rejected / danger |
| `--yellow` | Warning / pending |

### Utility Classes

| Class | Usage |
|---|---|
| `.card` | Standard content card with surface background and border |
| `.btn-primary` | Primary CTA button (blue) |
| `.btn-secondary` | Secondary button (ghost + border) |
| `.btn-danger` | Destructive action button (red) |
| `.btn-ghost` | Text-only button |
| `.badge-green` | Success / active status badge |
| `.badge-red` | Error / rejected status badge |
| `.badge-yellow` | Warning / pending status badge |
| `.badge-blue` | Info / in-review status badge |
| `.badge-gray` | Neutral / paused status badge |
| `.grid-2` | 2-column responsive grid |
| `.grid-3` | 3-column responsive grid |
| `.grid-4` | 4-column responsive grid |
| `.table-wrap` | Scrollable table wrapper |
| `.form-group` | Form field wrapper with spacing |
| `.form-label` | Form field label |
| `.alert-warning` | Yellow warning alert box |
| `.alert-info` | Blue info alert box |

---

## 24. Deployment

Configured for GitHub Pages via `gh-pages`:

```bash
npm run deploy
```

This runs `vite build` to produce `dist/`, then publishes `dist/` to the `gh-pages` branch of the repo defined in the `homepage` field of `package.json`.

**Note:** The app uses `HashRouter` so all routes work correctly on GitHub Pages without server-side routing configuration.

---

## 25. Glossary

| Term | Definition |
|---|---|
| AUS | Automated Underwriting System — DU (Fannie Mae) or LP (Freddie Mac) |
| AVM | Automated Valuation Model — algorithmic property value estimate |
| CD | Closing Disclosure — final loan terms statement required by TRID |
| CTC | Clear to Close — all conditions satisfied, loan approved for funding |
| DTI | Debt-to-Income Ratio — total monthly debt ÷ gross monthly income |
| DU | Desktop Underwriter — Fannie Mae's AUS |
| ECOA | Equal Credit Opportunity Act |
| FHA | Federal Housing Administration — government-backed loan program |
| FICO | Credit score issued by Fair Isaac Corporation |
| GLBA | Gramm-Leach-Bliley Act — financial data privacy |
| HMDA | Home Mortgage Disclosure Act — loan data reporting requirement |
| HOA | Homeowners Association |
| HELOC | Home Equity Line of Credit |
| LOE | Letter of Explanation — borrower-written explanation for underwriting questions |
| LOS | Loan Origination System |
| LP | Loan Prospector — Freddie Mac's AUS |
| LTV | Loan-to-Value Ratio — loan amount ÷ property value |
| MIP | Mortgage Insurance Premium — FHA equivalent of PMI |
| NOI | Net Operating Income — used for investment property analysis |
| PITI | Principal, Interest, Taxes, and Insurance — total monthly housing payment |
| PMI | Private Mortgage Insurance — required on conventional loans with LTV > 80% |
| PMLA | Prevention of Money Laundering Act (India) |
| RESPA | Real Estate Settlement Procedures Act |
| SAR | Suspicious Activity Report — required AML filing |
| TILA | Truth in Lending Act |
| TRID | TILA-RESPA Integrated Disclosure — combines LE and CD requirements |
| VA | Department of Veterans Affairs — 0% down loan program for veterans |
| VOE | Verification of Employment |
