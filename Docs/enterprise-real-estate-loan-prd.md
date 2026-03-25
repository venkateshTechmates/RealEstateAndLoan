# Product Requirements Document (PRD)
# Enterprise Real Estate + Loan Management Suite

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-03-25 | Product Team | Initial Draft |
| 1.1 | 2026-03-25 | Product Team | Added Asset Forms (Borrower + Lender), Asset Trends & Valuation, Asset Lifecycle Flowcharts |

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Product Vision & Strategy](#2-product-vision--strategy)
3. [Target Users & Personas](#3-target-users--personas)
4. [Functional Requirements](#4-functional-requirements)
   - 4.1 [Core Platform Modules](#41-core-platform-modules)
   - 4.2 [Role-Based Portals](#42-role-based-portals)
   - 4.3 [Loan Origination System (LOS)](#43-loan-origination-system-los)
   - 4.4 [Property Management](#44-property-management)
   - 4.5 [Insurance Management](#45-insurance-management)
   - 4.6 [Asset & Income Verification](#46-asset--income-verification)
     - 4.6A [Asset Forms — Borrower Entry](#46a-asset-forms--borrower-entry)
     - 4.6B [Asset Forms — Lender Entry & Review](#46b-asset-forms--lender-entry--review)
     - 4.6C [Asset Trends & Valuation Tracking](#46c-asset-trends--valuation-tracking)
   - 4.7 [Document Management](#47-document-management)
   - 4.8 [Underwriting & Risk Engine](#48-underwriting--risk-engine)
   - 4.9 [Closing & Disbursement](#49-closing--disbursement)
   - 4.10 [Loan Servicing](#410-loan-servicing)
   - 4.11 [Compliance & Regulatory](#411-compliance--regulatory)
5. [Non-Functional Requirements](#5-non-functional-requirements)
6. [Integration Requirements](#6-integration-requirements)
7. [Data Model](#7-data-model)
8. [API Architecture](#8-api-architecture)
9. [Security & Compliance](#9-security--compliance)
10. [User Interface Guidelines](#10-user-interface-guidelines)
11. [Reporting & Analytics](#11-reporting--analytics)
12. [Implementation Roadmap](#12-implementation-roadmap)
13. [Success Metrics (KPIs)](#13-success-metrics-kpis)
14. [Risks & Mitigations](#14-risks--mitigations)
15. [Glossary](#15-glossary)
16. [Appendix](#appendix)

---

## 1. Executive Summary

### 1.1 Overview

The **Enterprise Real Estate + Loan Management Suite** is a comprehensive, cloud-native platform designed to streamline the end-to-end lifecycle of real estate transactions and mortgage lending. The suite serves banks, credit unions, mortgage lenders, real estate brokers, title companies, and insurance providers by providing a unified, role-based experience.

### 1.2 Business Objectives

| Objective | Description |
|-----------|-------------|
| Accelerate Loan Origination | Reduce loan processing time from 45 days to <15 days |
| Reduce Operational Costs | Automate manual workflows, reduce FTE dependency by 30% |
| Enhance Compliance | Built-in regulatory compliance for US (TRID, RESPA, ECOA) and India (RBI, NHB) |
| Improve Customer Experience | Self-service portals, real-time status tracking |
| Enable Multi-Channel Origination | Support direct, broker, and correspondent channels |
| Scale to Multi-Country | Support US, India, and expandable to other markets |

### 1.3 Key Capabilities

- Role-based portals for Applicants, Co-Applicants, Brokers, Loan Officers, Underwriters, Title Companies, Insurance Agents
- Loan Origination System (LOS) with configurable workflows
- Property Management with MLS integration
- Insurance Management with policy tracking and renewal alerts
- Asset & Income Verification with third-party integrations (Plaid, Finicity, The Work Number)
- Document Management with OCR, e-signature, and secure storage
- Underwriting Engine with automated decisioning rules
- Servicing Module for payment processing, escrow, and collections
- Compliance Engine with audit trails and regulatory reporting

---

## 2. Product Vision & Strategy

### 2.1 Vision Statement

> To become the leading enterprise platform that seamlessly connects real estate and lending ecosystems, enabling faster, more transparent, and compliant property transactions globally.

### 2.2 Strategic Pillars

```
┌─────────────────────────────────────────────────────────────┐
│                    STRATEGIC PILLARS                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  📱 DIGITAL FIRST          🤖 AI-POWERED                   │
│  • Mobile-ready portals    • Automated underwriting        │
│  • E-signature             • Fraud detection               │
│  • Real-time tracking      • Intelligent doc processing    │
│                                                              │
│  🔌 OPEN PLATFORM          🌍 GLOBAL READY                 │
│  • API-first design        • Multi-country support         │
│  • Ecosystem integrations  • Multi-currency                │
│  • Marketplace for add-ons • Local regulatory compliance   │
│                                                              │
│  🔒 ENTERPRISE GRADE       📊 DATA-DRIVEN                  │
│  • SOC2 compliant          • Real-time analytics           │
│  • Role-based security     • Predictive insights           │
│  • Audit trails            • Custom dashboards             │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 2.3 Target Markets

| Market | Initial Focus | Expansion |
|--------|---------------|-----------|
| United States | Conforming loans, FHA, VA | Non-QM, Jumbo, Commercial |
| India | Home loans, plot loans, construction loans | Affordable housing, government schemes |
| International | — | Canada, UK, UAE (planned Q4 2027) |

---

## 3. Target Users & Personas

### 3.1 User Personas

| Persona | Role | Key Needs | Portal Access |
|---------|------|-----------|---------------|
| Arjun (Applicant) | First-time homebuyer | Easy application, status tracking, document upload | Borrower Portal |
| Priya (Co-Applicant) | Spouse applying jointly | Joint application, income verification | Borrower Portal |
| Michael (Broker) | Independent mortgage broker | Submit applications, track commissions, lender comparison | Broker Portal |
| Sarah (Loan Officer) | Bank employee | Manage pipeline, communicate with applicants | Loan Officer Portal |
| David (Underwriter) | Risk assessment | Review applications, automated decisioning, conditional approvals | Underwriter Portal |
| Raj (Builder) | Real estate developer | Project listing, buyer pre-approvals, payment tracking | Builder Portal |
| Lisa (Title Agent) | Title company | Title search, title insurance, closing coordination | Title Portal |
| Kevin (Insurance Agent) | Insurance provider | Quote, bind policies, manage renewals | Insurance Portal |
| Admin | System administrator | User management, configuration, audit logs | Admin Portal |

### 3.2 Role Hierarchy

```
                    ┌─────────────────┐
                    │    SUPER ADMIN  │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
      ┌───────────┐  ┌───────────┐  ┌───────────┐
      │ Lender    │  │ Brokerage │  │ Title Co  │
      │ Admin     │  │ Admin     │  │ Admin     │
      └───────────┘  └───────────┘  └───────────┘
              │              │              │
              ▼              ▼              ▼
      ┌───────────┐  ┌───────────┐  ┌───────────┐
      │ Loan      │  │ Broker    │  │ Title     │
      │ Officer   │  │           │  │ Agent     │
      └───────────┘  └───────────┘  └───────────┘
              │              │              │
              └──────────────┼──────────────┘
                             ▼
              ┌───────────────────────────┐
              │     Applicant Portal      │
              │  • Individual Applicant   │
              │  • Co-Applicant           │
              │  • Co-Signer              │
              │  • Guarantor              │
              └───────────────────────────┘
```

---

## 4. Functional Requirements

### 4.1 Core Platform Modules

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     ENTERPRISE SUITE ARCHITECTURE                       │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐ │
│  │   Borrower   │  │    Broker    │  │    Lender    │  │   Partner   │ │
│  │    Portal    │  │    Portal    │  │    Portal    │  │    Portal   │ │
│  └──────────────┘  └──────────────┘  └──────────────┘  └─────────────┘ │
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                    APPLICATION LAYER                              │   │
│  │  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐   │   │
│  │  │ LOS        │ │ Property   │ │ Insurance  │ │ Servicing  │   │   │
│  │  │ Module     │ │ Module     │ │ Module     │ │ Module     │   │   │
│  │  └────────────┘ └────────────┘ └────────────┘ └────────────┘   │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                    SERVICE LAYER                                  │   │
│  │  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐   │   │
│  │  │ Workflow   │ │ Document   │ │ Integration│ │ Compliance │   │   │
│  │  │ Engine     │ │ Service    │ │ Gateway    │ │ Engine     │   │   │
│  │  └────────────┘ └────────────┘ └────────────┘ └────────────┘   │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                    DATA LAYER                                     │   │
│  │  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐   │   │
│  │  │ PostgreSQL │ │   Redis    │ │    S3      │ │  Elastic   │   │   │
│  │  │ (Primary)  │ │  (Cache)   │ │ (Documents)│ │  Search    │   │   │
│  │  └────────────┘ └────────────┘ └────────────┘ └────────────┘   │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

### 4.2 Role-Based Portals

#### 4.2.1 Borrower Portal

| Feature | Description | Priority |
|---------|-------------|----------|
| User Registration | Self-registration with email/phone verification | P0 |
| Profile Management | Personal details, contact info, employment history | P0 |
| Multi-Applicant Support | Add co-applicant, co-signer, guarantor | P0 |
| Loan Application | Digital application with guided workflow | P0 |
| Property Selection | Search properties, link to application | P0 |
| Document Upload | Upload W-2, tax returns, bank statements | P0 |
| Status Dashboard | Real-time application status with timeline | P0 |
| Task List | Pending actions (sign docs, upload docs) | P0 |
| Secure Messaging | Communicate with loan officer | P1 |
| E-Signature | Digitally sign disclosures and closing docs | P0 |
| Payment Center | Make payments, view payment history (servicing) | P1 |
| Mobile App | iOS/Android native app | P1 |

#### 4.2.2 Broker Portal

| Feature | Description | Priority |
|---------|-------------|----------|
| Broker Dashboard | Pipeline overview, commission tracking | P0 |
| Application Submission | Submit applications on behalf of borrowers | P0 |
| Lender Comparison | Compare rates, fees, products across lenders | P0 |
| Commission Tracking | Track earned and paid commissions | P0 |
| Borrower Management | Manage borrower relationships | P0 |
| Document Collection | Collect and upload borrower documents | P0 |
| Lender Scorecards | Performance metrics per lender | P1 |
| Marketing Materials | Co-branded flyers, rate sheets | P2 |

#### 4.2.3 Lender Portal (Loan Officer & Underwriter)

| Feature | Description | Priority |
|---------|-------------|----------|
| Pipeline Management | View all applications by status | P0 |
| Application Detail | Full application view with all documents | P0 |
| Credit Pull | Request tri-merge credit report | P0 |
| Income Calculation | Automated income calculation from docs | P0 |
| Condition Management | Add, track, clear conditions | P0 |
| Underwriting Decision | Approve/deny with conditions | P0 |
| Closing Management | Coordinate closing with title company | P0 |
| Task Assignment | Assign tasks to team members | P1 |
| Reporting | Custom reports and dashboards | P1 |

#### 4.2.4 Title & Insurance Portals

| Feature | Description | Priority |
|---------|-------------|----------|
| Title Order Management | Receive and manage title orders | P0 |
| Title Search | Integrated title search tools | P0 |
| Title Insurance | Issue lender's and owner's policies | P0 |
| Closing Coordination | Schedule closing, prepare closing disclosure | P0 |
| Insurance Quoting | Generate insurance quotes | P0 |
| Policy Binding | Bind policies, upload proof | P0 |
| Renewal Management | Track and notify renewals | P1 |

---

### 4.3 Loan Origination System (LOS)

#### 4.3.1 Application Intake

| Requirement | Description |
|-------------|-------------|
| Multi-Channel Intake | Accept applications via web, mobile, broker, or API |
| 1003 Form | Standard Uniform Residential Loan Application |
| Configurable Forms | Custom fields for different loan types |
| Save & Resume | Save progress, resume later |
| Pre-Qualification | Soft credit pull for pre-qualification letters |

#### 4.3.2 Loan Products

| Product Category | Supported Types |
|-----------------|----------------|
| Conventional | Conforming, Non-conforming, Jumbo |
| Government | FHA, VA, USDA |
| ARM | 5/1 ARM, 7/1 ARM, 10/1 ARM |
| Renovation | FHA 203(k), Homestyle Renovation |
| Construction | Construction-to-permanent |
| Investment | Rental property, second home |
| Commercial | Commercial real estate, bridge loans |
| Indian Market | Home loan, plot loan, construction loan, balance transfer |

#### 4.3.3 Pricing & Rate Management

| Requirement | Description |
|-------------|-------------|
| Rate Sheet Management | Upload and manage lender rate sheets |
| Pricing Engine | Calculate rates based on LTV, FICO, loan type |
| Lock Management | Rate lock requests, confirmations, extensions |
| Fee Calculator | Calculate origination fees, third-party fees |

---

### 4.4 Property Management

| Requirement | Description | Priority |
|-------------|-------------|----------|
| Property Listing | Import listings via MLS integration | P0 |
| Property Search | Search by address, zip code, price range | P0 |
| Property Details | Photos, specs, tax history, school ratings | P0 |
| Valuation | Automated valuation models (AVM), appraisal tracking | P0 |
| Flood Zone | FEMA flood zone determination | P0 |
| Title Search | Integrated title search and commitment | P0 |
| Property Condition | Inspection reports, repair estimates | P1 |
| Comparable Sales | Recent comparable sales data | P1 |

---

### 4.5 Insurance Management

| Requirement | Description | Priority |
|-------------|-------------|----------|
| Insurance Types | Homeowner's, Flood, Mortgage (PMI/MIP), Title | P0 |
| Provider Catalog | Manage approved insurance providers | P0 |
| Quoting Engine | Generate quotes from multiple providers | P0 |
| Policy Binding | Bind policies, capture policy details | P0 |
| Proof Tracking | Upload and validate insurance certificates | P0 |
| Renewal Alerts | Automatic notifications for renewals | P0 |
| Premium Escrow | Track insurance premiums in escrow accounts | P1 |
| Claims Integration | Track claims related to insured properties | P2 |

#### 4.5.1 Insurance Workflow

```
┌─────────────────────────────────────────────────────────────────────┐
│                      INSURANCE WORKFLOW                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐     │
│  │ Borrower │───▶│ Insurance│───▶│  Quote   │───▶│  Policy  │     │
│  │ Requests │    │  Agent   │    │ Generated│    │ Selected │     │
│  │ Quote    │    │ Assigned │    │          │    │          │     │
│  └──────────┘    └──────────┘    └──────────┘    └──────────┘     │
│                                                         │           │
│                                                         ▼           │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐     │
│  │ Escrow   │◀───│ Closing  │◀───│  Proof   │◀───│  Policy  │     │
│  │ Account  │    │ Required │    │ Uploaded │    │  Bound   │     │
│  │ Updated  │    │          │    │          │    │          │     │
│  └──────────┘    └──────────┘    └──────────┘    └──────────┘     │
│                                                         │           │
│                                                         ▼           │
│                                              ┌──────────────────┐   │
│                                              │ Annual Renewal   │   │
│                                              │ + Payment        │   │
│                                              └──────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

---

### 4.6 Asset & Income Verification

| Requirement | Description | Priority |
|-------------|-------------|----------|
| Document Upload | Upload W-2, tax returns, pay stubs, bank statements | P0 |
| OCR Extraction | Auto-extract data from uploaded documents | P0 |
| Bank Integration | Connect to bank accounts via Plaid/Finicity | P0 |
| Employment Verification | Integration with The Work Number | P0 |
| Tax Transcripts | IRS tax transcript retrieval (4506-C) | P0 |
| Asset Calculation | Calculate total assets, reserves | P0 |
| Income Calculation | Calculate qualifying income (salary, self-employed, rental) | P0 |
| Fraud Detection | Anomaly detection on documents | P1 |
| Asset Trend Tracking | Historical valuation trends per asset class | P1 |
| Asset Dashboard | Visual summary of all assets with current values | P0 |
| Multi-Party Asset Entry | Separate entry flows for Borrower vs Lender | P0 |

#### 4.6.1 Supported Income Types

| Income Type | Verification Method |
|-------------|---------------------|
| W-2 Employee | Pay stubs + W-2 + VOE |
| Self-Employed | Tax returns (2 years) + P&L |
| Rental Income | Schedule E + lease agreements |
| Retirement/SSA | Award letters + bank statements |
| Investment Income | Brokerage statements |
| Alimony/Child Support | Court orders + deposit evidence |

---

### 4.6A Asset Forms — Borrower Entry

The Borrower Portal surfaces a structured, guided **Asset Declaration Wizard** split into the following asset categories. Each form captures current value, account details, and supporting evidence.

#### 4.6A.1 Liquid Assets (Borrower Entry Forms)

| Form ID | Asset Type | Fields Captured | Supporting Docs Required |
|---------|-----------|----------------|--------------------------|
| BA-001 | Checking Account | Institution name, account number (last 4), current balance, avg 3-month balance | 2–3 months bank statements |
| BA-002 | Savings Account | Institution name, account number (last 4), current balance, source of funds | 2–3 months bank statements |
| BA-003 | Money Market Account | Institution, balance, interest rate, maturity date if applicable | Recent statement |
| BA-004 | Certificate of Deposit (CD) | Institution, face value, maturity date, penalty for early withdrawal | CD certificate |
| BA-005 | Cash on Hand | Estimated amount, source of cash explanation | Written explanation letter |
| BA-006 | Gift Funds | Donor name, relationship, amount, transfer date | Gift letter, donor bank statement, transfer proof |

#### 4.6A.2 Investment & Retirement Assets (Borrower Entry Forms)

| Form ID | Asset Type | Fields Captured | Supporting Docs Required |
|---------|-----------|----------------|--------------------------|
| BA-010 | Stocks / Equities | Brokerage name, number of shares, ticker symbols, current market value | 2-month brokerage statement |
| BA-011 | Bonds | Bond type (govt/corporate/muni), face value, current market value, maturity date | Statement or bond certificate |
| BA-012 | Mutual Funds / ETFs | Fund name, CUSIP/ISIN, NAV, number of units, current value | 2-month brokerage statement |
| BA-013 | 401(k) / 403(b) | Plan administrator, vested balance, loan against plan (if any) | Most recent quarterly statement |
| BA-014 | IRA / Roth IRA | Custodian, account type, vested balance, contribution year | Most recent quarterly statement |
| BA-015 | Pension Plan | Employer name, monthly benefit amount, retirement date | Pension award letter |
| BA-016 | Crypto Assets | Exchange/wallet, coin type, USD equivalent at application date | Exchange statement (PDF), wallet address |

#### 4.6A.3 Real Estate Assets (Borrower Entry Forms)

| Form ID | Asset Type | Fields Captured | Supporting Docs Required |
|---------|-----------|----------------|--------------------------|
| BA-020 | Primary Residence (owned) | Address, estimated market value, mortgage balance, equity | Mortgage statement, HOA docs |
| BA-021 | Investment Property | Address, current market value, rental income, loan balance | Lease agreement, mortgage statement |
| BA-022 | Vacant Land | Parcel ID, acreage, location, estimated value | Tax assessment, appraisal if available |
| BA-023 | Commercial Property | Property type, address, valuation, occupancy, NOI | Appraisal, lease roll |

#### 4.6A.4 Business & Other Assets (Borrower Entry Forms)

| Form ID | Asset Type | Fields Captured | Supporting Docs Required |
|---------|-----------|----------------|--------------------------|
| BA-030 | Business Ownership | Business name, EIN, % ownership, estimated valuation | Business tax returns (2 yrs), CPA letter |
| BA-031 | Life Insurance (Cash Value) | Insurer, policy number, face value, cash surrender value | Insurance policy declaration page |
| BA-032 | Receivables / Notes | Debtor name, amount owed, due date, collectibility | Promissory note, payment history |
| BA-033 | Automobile / Vehicle | Year/Make/Model, VIN, KBB estimated value, loan balance | Registration, loan statement |
| BA-034 | Jewelry / Art / Collectibles | Description, appraised value, appraisal date | Certified appraisal document |
| BA-035 | Trust Assets | Trust name, beneficiary status, accessible value | Trust document, trustee letter |

#### 4.6A.5 Borrower Asset Entry Flowchart

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                        BORROWER ASSET ENTRY FLOW                                │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│   ┌──────────────┐                                                               │
│   │   Borrower   │                                                               │
│   │   Logs In    │                                                               │
│   └──────┬───────┘                                                               │
│          │                                                                       │
│          ▼                                                                       │
│   ┌──────────────────────────────────────────────────────────────────────┐      │
│   │              ASSET DECLARATION WIZARD  (Step 3 of 7)                │      │
│   │  ┌────────────┐ ┌─────────────┐ ┌──────────────┐ ┌──────────────┐  │      │
│   │  │  Liquid    │ │ Investment  │ │  Real Estate │ │  Business /  │  │      │
│   │  │  Assets    │ │ & Retirement│ │   Owned      │ │    Other     │  │      │
│   │  └─────┬──────┘ └──────┬──────┘ └──────┬───────┘ └──────┬───────┘  │      │
│   └────────┼───────────────┼───────────────┼────────────────┼──────────┘      │
│            │               │               │                │                  │
│            ▼               ▼               ▼                ▼                  │
│   ┌──────────────────────────────────────────────────────────────────────┐      │
│   │               FILL FORM PER ASSET (BA-001 to BA-035)                │      │
│   │   • Institution / Account Details                                    │      │
│   │   • Current Balance / Market Value                                   │      │
│   │   • Source of Funds Declaration                                      │      │
│   └───────────────────────────────┬──────────────────────────────────────┘      │
│                                   │                                              │
│                                   ▼                                              │
│   ┌───────────────────────────────────────────────────────────────────────┐     │
│   │                    UPLOAD SUPPORTING DOCUMENTS                        │     │
│   │   Drag-and-drop PDF / Image  →  OCR Extraction  →  Auto-fill Fields  │     │
│   └───────────────────────────────┬───────────────────────────────────────┘     │
│                                   │                                              │
│                                   ▼                                              │
│   ┌────────────────┐    ┌─────────────────────┐    ┌────────────────────────┐  │
│   │  Validation    │───▶│  Asset Total         │───▶│  Submit for Lender     │  │
│   │  (Required     │    │  Calculated +        │    │  Review                │  │
│   │   Fields,      │    │  Trend Graph Shown   │    │                        │  │
│   │   Doc Expiry)  │    │                      │    │                        │  │
│   └────────────────┘    └─────────────────────┘    └────────────────────────┘  │
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

### 4.6B Asset Forms — Lender Entry & Review

The Lender Portal provides a **parallel asset verification workspace** where Loan Officers and Underwriters independently enter, verify, and reconcile borrower-declared assets against third-party sources.

#### 4.6B.1 Lender-Side Asset Entry & Verification Forms

| Form ID | Function | Fields | Data Source |
|---------|----------|--------|-------------|
| LA-001 | Bank Account Verification | Institution, ABA routing, account #, verified balance, variance flag | Plaid / Finicity / Manual statement review |
| LA-002 | Investment Account Verification | Brokerage, portfolio value, liquidation value (80% for reserves), margin loans | Brokerage statement, DTC feed |
| LA-003 | Retirement Account Verification | Plan type, vested balance, 60% usable for reserves (before penalty), loan against plan | Quarterly statement, plan administrator |
| LA-004 | Real Estate Asset Verification | AVM value, appraisal value, outstanding liens, net equity, rental income | CoreLogic AVM, title search, appraisal |
| LA-005 | Business Asset Verification | % ownership x business value, liquidity assessment, CPA-certified value | Business returns, CPA letter |
| LA-006 | Gift Fund Verification | Gift amount, donor bank evidence, seasoned vs unseasoned, transfer confirmation | Gift letter, bank wire / transfer docs |
| LA-007 | Reserve Calculation Summary | Total liquid assets, total retirement (haircut applied), total real estate equity, total eligible reserves | Aggregated from LA-001 to LA-006 |
| LA-008 | Asset Discrepancy Log | Declared value, verified value, variance %, analyst notes, resolution action | System comparison engine |

#### 4.6B.2 Asset Eligibility Rules (Lender Configuration)

| Asset Type | Eligible for Down Payment | Eligible for Reserves | Haircut Applied | Notes |
|-----------|--------------------------|----------------------|-----------------|-------|
| Checking / Savings | Yes | Yes | None | Must be seasoned ≥ 60 days |
| Money Market | Yes | Yes | None | Seasoning required |
| Gift Funds | Yes (with restrictions) | No | None | Donor must provide evidence |
| Stocks / Equities | Yes (after liquidation) | Yes | 30% haircut on volatile stocks | Post-liquidation value used |
| Bonds | Yes | Yes | 10% haircut | |
| Mutual Funds / ETFs | Yes | Yes | 20% haircut | |
| 401(k) / IRA | Yes (with penalty) | Yes | 40% haircut | Penalty + tax considered |
| Roth IRA | Yes (contributions) | Yes | 20% haircut | Earnings excluded |
| Real Estate Equity | No (cannot liquidate quickly) | Conditional | Requires second appraisal | Bridge scenarios only |
| Crypto | No (conventional) | No | 100% excluded (most lenders) | Non-QM only |
| Business Assets | Conditional | Conditional | 50% haircut typical | CPA letter required |
| Life Insurance CSV | Yes | Yes | 10% haircut | |
| Vehicles | No | No | Not counted | Depreciating asset |

#### 4.6B.3 Lender Asset Verification Flowchart

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                        LENDER ASSET VERIFICATION FLOW                            │
├──────────────────────────────────────────────────────────────────────────────────┤
│                                                                                   │
│   ┌───────────────────────────────────────────────────┐                          │
│   │  Borrower Submits Asset Declaration               │                          │
│   └───────────────────────────┬───────────────────────┘                          │
│                               │                                                   │
│                               ▼                                                   │
│   ┌───────────────────────────────────────────────────┐                          │
│   │  Loan Officer Assigns to Asset Verification Queue │                          │
│   └───────────────────────────┬───────────────────────┘                          │
│                               │                                                   │
│           ┌───────────────────┴──────────────────────┐                           │
│           ▼                                          ▼                            │
│   ┌───────────────────┐                  ┌───────────────────────┐               │
│   │  Auto-Verify via  │                  │  Manual Document      │               │
│   │  Plaid / Finicity │                  │  Review by LO         │               │
│   │  (Bank / Invest.) │                  │  (RE, Business, etc.) │               │
│   └────────┬──────────┘                  └────────────┬──────────┘               │
│            │                                          │                           │
│            └──────────────────┬───────────────────────┘                          │
│                               │                                                   │
│                               ▼                                                   │
│   ┌───────────────────────────────────────────────────┐                          │
│   │          Apply Eligibility Rules & Haircuts        │                          │
│   │   (Per asset type per loan program: Conv/FHA/VA)  │                          │
│   └───────────────────────────┬───────────────────────┘                          │
│                               │                                                   │
│                               ▼                                                   │
│   ┌────────────────────────────────────────────────────────────────────────┐     │
│   │                     Variance Check                                     │     │
│   │   ┌───────────────────────────┐    ┌───────────────────────────────┐   │     │
│   │   │  Variance < 5%            │    │  Variance ≥ 5%                │   │     │
│   │   │  ✅ Auto-Approved         │    │  ⚠️ Flag for Underwriter      │   │     │
│   │   └───────────────────────────┘    └──────────────┬────────────────┘   │     │
│   └───────────────────────────────────────────────────┼────────────────────┘     │
│                                                       │                           │
│                                                       ▼                           │
│                                        ┌──────────────────────────┐              │
│                                        │  Underwriter Review      │              │
│                                        │  • Add Condition         │              │
│                                        │  • Request LOE           │              │
│                                        │  • Clear or Decline      │              │
│                                        └──────────────┬───────────┘              │
│                                                       │                           │
│                               ┌───────────────────────┴─────────────────────┐    │
│                               ▼                                             ▼    │
│                   ┌───────────────────────┐                  ┌─────────────────┐ │
│                   │  Assets Verified       │                  │  Condition Added │ │
│                   │  → Reserve Calc Done  │                  │  → Borrower      │ │
│                   │  → Eligible for CTC   │                  │    Notified      │ │
│                   └───────────────────────┘                  └─────────────────┘ │
│                                                                                   │
└──────────────────────────────────────────────────────────────────────────────────┘
```

---

### 4.6C Asset Trends & Valuation Tracking

The platform tracks **asset value trends** over the loan lifecycle — from application through servicing — enabling both borrowers and lenders to monitor portfolio health and reserve adequacy.

#### 4.6C.1 Asset Value Trend Categories

| Asset Class | Trend Data Points | Update Frequency | Source |
|-------------|------------------|-----------------|--------|
| Checking / Savings | Monthly ending balance | Monthly (from Plaid) | Bank API |
| Stocks / ETFs / Mutual Funds | NAV per unit, portfolio total | Daily (market open) | Market data feed (Nasdaq/NYSE) |
| Bonds | Market price, yield, duration | Daily | Bloomberg / FINRA TRACE |
| 401(k) / IRA | Quarterly NAV, contributions, employer match | Quarterly | Plan administrator |
| Crypto | Spot price per coin, portfolio USD value | Real-time | CoinGecko / Binance API |
| Real Estate (Owned) | AVM value, last appraisal, tax assessed value | Quarterly / On-demand | CoreLogic, Zillow AVM |
| Investment Properties | Rental yield, cap rate, NOI trend | Monthly / Quarterly | Internal + Schedule E |
| Business Equity | CPA-certified or estimated value | Annually | Business tax return |
| Life Insurance CSV | Cash surrender value growth | Annually | Insurance provider |

#### 4.6C.2 Asset Trend Dashboard — Screen Spec

```
┌────────────────────────────────────────────────────────────────────────────────────┐
│  ASSET OVERVIEW DASHBOARD                                         [Borrower View]  │
├────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  ┌─────────────────┐  ┌──────────────────┐  ┌──────────────────┐  ┌─────────────┐ │
│  │  Total Assets   │  │  Liquid Assets   │  │  Investment      │  │  Real       │ │
│  │  $842,500       │  │  $124,200        │  │  Assets          │  │  Estate     │ │
│  │  ↑ +3.2% (QoQ) │  │  ↑ +1.1% (MoM)  │  │  $418,300        │  │  $300,000   │ │
│  └─────────────────┘  └──────────────────┘  │  ↑ +5.4% (QoQ)  │  │  Equity     │ │
│                                              └──────────────────┘  └─────────────┘ │
│                                                                                     │
│  ┌─────────────────────────────────────────────────────────────────────────────┐   │
│  │  ASSET VALUE TREND — 12 MONTHS                                              │   │
│  │                                                                              │   │
│  │  $900K ─ ╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌    │   │
│  │  $850K ─         ●────●                                         ●────●      │   │
│  │  $800K ─ ●────●        ●────●────●────●────●────●────●────●             │   │
│  │  $750K ─                                                                     │   │
│  │          Mar  Apr  May  Jun  Jul  Aug  Sep  Oct  Nov  Dec  Jan  Feb  Mar     │   │
│  │                                                                              │   │
│  │  ── Total  ── Liquid  ── Investments  ── Real Estate                        │   │
│  └─────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                     │
│  ┌───────────────────────────────────────┐  ┌────────────────────────────────┐    │
│  │  ASSET BREAKDOWN (Current)            │  │  RESERVE ADEQUACY              │    │
│  │                                       │  │                                │    │
│  │  Liquid          ██████░░░░  14.7%    │  │  Required Reserves:  $18,400   │    │
│  │  Stocks/ETFs     █████████░  32.1%    │  │  Eligible Assets:    $67,200   │    │
│  │  Retirement      ████████░░  28.4%    │  │  Status:  ✅ 3.65x covered    │    │
│  │  Real Estate     ██████░░░░  22.3%    │  │                                │    │
│  │  Other           █░░░░░░░░░   2.5%    │  │  [View Reserve Calculation]    │    │
│  └───────────────────────────────────────┘  └────────────────────────────────┘    │
│                                                                                     │
└────────────────────────────────────────────────────────────────────────────────────┘
```

#### 4.6C.3 Asset Valuation Snapshot Table — Data Model

| Field | Description | Tracked For |
|-------|-------------|-------------|
| `asset_id` | Unique identifier per asset | All |
| `snapshot_date` | Date of value capture | All |
| `declared_value` | Borrower-declared value at application | All |
| `verified_value` | Lender-verified value | All |
| `current_market_value` | Live market price (API-updated) | Stocks, RE, Crypto |
| `trend_pct_30d` | % change over last 30 days | Stocks, Crypto |
| `trend_pct_90d` | % change over last 90 days | All liquid/investment |
| `trend_pct_1yr` | % change over last 12 months | All |
| `eligible_value` | Post-haircut eligible amount for reserves | All |
| `liquidity_tier` | T1 = immediate, T2 = 30-day, T3 = 90-day+ | All |
| `data_source` | Plaid, CoreLogic, Manual, Market Feed | All |
| `last_updated` | Timestamp of last refresh | All |

#### 4.6C.4 Full Asset Lifecycle Flowchart

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│                          ASSET LIFECYCLE — END TO END                                │
├──────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                       │
│   PHASE 1: DECLARATION                                                                │
│   ┌─────────────────────────────────────────────────────────────────────┐            │
│   │  Borrower completes Asset Declaration Wizard (BA-001 to BA-035)     │            │
│   │  Uploads supporting documents → OCR extracts key fields             │            │
│   └─────────────────────────────────┬───────────────────────────────────┘            │
│                                     │                                                 │
│   PHASE 2: VERIFICATION                                                               │
│                                     ▼                                                 │
│   ┌─────────────────────────────────────────────────────────────────────┐            │
│   │  Lender connects to Plaid / Finicity for bank & investment assets   │            │
│   │  Manual review for RE, business, retirement assets                  │            │
│   │  Eligibility rules applied → Haircuts calculated                    │            │
│   │  Variance check → Flag or Auto-Approve                              │            │
│   └─────────────────────────────────┬───────────────────────────────────┘            │
│                                     │                                                 │
│   PHASE 3: UNDERWRITING INPUT                                                         │
│                                     ▼                                                 │
│   ┌─────────────────────────────────────────────────────────────────────┐            │
│   │  Verified assets feed into:                                          │            │
│   │  • Down Payment calculation                                          │            │
│   │  • Reserve requirement check (2–6 months PITI depending on loan)    │            │
│   │  • Net Worth calculation for Jumbo / Commercial loans               │            │
│   │  • DU / LP asset data submission                                     │            │
│   └─────────────────────────────────┬───────────────────────────────────┘            │
│                                     │                                                 │
│   PHASE 4: TREND MONITORING (Pre-Close)                                               │
│                                     ▼                                                 │
│   ┌─────────────────────────────────────────────────────────────────────┐            │
│   │  Automated daily/weekly refresh of market-linked asset values       │            │
│   │  Alert triggers if eligible assets drop below required threshold    │            │
│   │  Lender notified → Borrower asked to provide additional assets      │            │
│   └─────────────────────────────────┬───────────────────────────────────┘            │
│                                     │                                                 │
│   PHASE 5: CLOSING                                                                    │
│                                     ▼                                                 │
│   ┌─────────────────────────────────────────────────────────────────────┐            │
│   │  Final asset re-verification (within 10 days of closing)            │            │
│   │  Closing funds confirmed (wire / cashier's check traced)            │            │
│   │  Asset snapshot locked at closing date                              │            │
│   └─────────────────────────────────┬───────────────────────────────────┘            │
│                                     │                                                 │
│   PHASE 6: SERVICING                                                                  │
│                                     ▼                                                 │
│   ┌─────────────────────────────────────────────────────────────────────┐            │
│   │  Annual escrow analysis uses real estate asset values               │            │
│   │  Collateral monitoring for HELOCs / ARMs                           │            │
│   │  Loss mitigation uses updated asset values for hardship review      │            │
│   └─────────────────────────────────────────────────────────────────────┘            │
│                                                                                       │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

#### 4.6C.5 Alert & Notification Rules for Asset Value Changes

| Trigger Condition | Alert Target | Action Required |
|------------------|-------------|----------------|
| Liquid assets drop > 10% from verified value | Loan Officer | Re-verify before closing |
| Investment portfolio drops below reserve requirement | Underwriter | Request additional reserves or assets |
| Crypto asset value drops > 20% | Loan Officer | Exclude from eligible assets (Non-QM) |
| Real estate AVM drops > 5% (collateral property) | Underwriter | Order new appraisal |
| Bank account balance < declared by > 5% for 30 days | Loan Officer | Request LOE + updated statements |
| Gift funds not yet transferred within 7 days of closing | Borrower + LO | Urgent: Confirm wire |
| Retirement account withdrawal detected | Loan Officer | Re-calculate reserves post-withdrawal |

---

### 4.7 Document Management

| Requirement | Description | Priority |
|-------------|-------------|----------|
| Document Repository | Centralized storage with version control | P0 |
| Document Categories | Predefined categories (income, asset, property, etc.) | P0 |
| OCR & Data Extraction | Extract key fields from documents | P0 |
| E-Signature | Integrated e-signature (DocuSign, Adobe Sign) | P0 |
| Document Expiry | Track and alert for expiring documents | P0 |
| Audit Trail | Complete history of document access and changes | P0 |
| Redaction | Auto-redact sensitive information | P1 |
| Document Generation | Generate disclosures, closing documents | P0 |

#### 4.7.1 Document Types

| Category | Documents |
|----------|-----------|
| Identity | Driver's license, Passport, SSN card |
| Income | W-2, 1040, Pay stubs, 1099, K-1 |
| Assets | Bank statements, Investment statements, Gift letters |
| Property | Purchase agreement, Appraisal, Inspection report |
| Loan | Application, Disclosures, Closing disclosure, Note, Deed |
| Insurance | Homeowner's policy, Flood policy, Mortgage insurance |
| Compliance | Flood cert, Tax transcripts, VOE |

---

### 4.8 Underwriting & Risk Engine

| Requirement | Description | Priority |
|-------------|-------------|----------|
| Automated Underwriting | Integration with DU (Fannie Mae) and LP (Freddie Mac) | P0 |
| Rule Engine | Configurable underwriting rules | P0 |
| Credit Analysis | FICO score, credit history, DTI calculation | P0 |
| Collateral Analysis | LTV, CLTV calculation | P0 |
| Risk Scoring | Internal risk score for portfolio loans | P1 |
| Condition Management | Add, track, clear conditions | P0 |
| Decision Workflow | Approve, deny, counter-offer with conditions | P0 |
| Fraud Detection | Identity verification, income fraud detection | P1 |

#### 4.8.1 Underwriting Decision Matrix

| Criteria | Conventional | FHA | VA |
|----------|-------------|-----|----|
| Min FICO | 620 | 580 (3.5% down) / 500 (10% down) | No min (lender overlay) |
| Max DTI | 43–50% | 43–57% | 41–50% |
| Min Down Payment | 3–5% | 3.5% | 0% |
| Max LTV | 97% | 96.5% | 100% |
| Reserves | Varies | Not required | Not required |

---

### 4.9 Closing & Disbursement

| Requirement | Description | Priority |
|-------------|-------------|----------|
| Closing Disclosure | Generate CD, track 3-day review period | P0 |
| Closing Checklist | Track all closing requirements | P0 |
| Title Coordination | Coordinate with title company | P0 |
| Wire Management | Initiate and track wire transfers | P0 |
| Settlement Statement | Generate HUD-1 or ALTA statement | P0 |
| Post-Closing | Document recording, loan delivery | P0 |
| Warehouse Lines | Track warehouse line usage | P1 |

---

### 4.10 Loan Servicing

| Requirement | Description | Priority |
|-------------|-------------|----------|
| Payment Processing | Accept payments via ACH, card, wire | P0 |
| Escrow Management | Track taxes and insurance escrow | P0 |
| Annual Escrow Analysis | Perform annual escrow analysis | P0 |
| Payoff Processing | Generate payoff quotes, process payoffs | P0 |
| Delinquency Management | Track late payments, generate notices | P0 |
| Collections | Collections workflow, loss mitigation | P1 |
| Investor Reporting | Report to investors (Fannie, Freddie, private) | P1 |
| Tax & Insurance Tracking | Ensure tax/insurance payments | P0 |

---

### 4.11 Compliance & Regulatory

| Requirement | Description | US Regulation | India Regulation |
|-------------|-------------|---------------|-----------------|
| Disclosure Management | Timely delivery of disclosures | TRID, RESPA, TILA | RBI Fair Practices |
| HMDA Reporting | Collect and report HMDA data | HMDA | — |
| Fair Lending | Ensure non-discriminatory practices | ECOA, FHA | Equal Opportunity |
| Privacy | Protect consumer data | GLBA, CCPA | IT Act, DPDP |
| BSA/AML | Anti-money laundering checks | BSA, Patriot Act | PMLA |
| Audit Trail | Complete activity logs | All | All |
| E-Sign Compliance | Legally binding electronic signatures | ESIGN Act | IT Act |

---

## 5. Non-Functional Requirements

### 5.1 Performance

| Metric | Target |
|--------|--------|
| Page Load Time | < 3 seconds |
| API Response Time (P95) | < 500 ms |
| Document Upload | < 10 seconds for 10MB |
| Concurrent Users | 10,000+ |
| Transaction Throughput | 1,000+ loans/day |

### 5.2 Availability

| Metric | Target |
|--------|--------|
| Uptime | 99.9% (excluding planned maintenance) |
| RTO (Recovery Time Objective) | < 4 hours |
| RPO (Recovery Point Objective) | < 15 minutes |
| Maintenance Window | Sunday 2–4 AM EST |

### 5.3 Scalability

- Horizontal scaling for all microservices
- Database sharding by tenant (enterprise)
- Auto-scaling based on load
- CDN for static assets

### 5.4 Security

| Requirement | Description |
|-------------|-------------|
| Authentication | OAuth 2.0 / OIDC, MFA support |
| Authorization | RBAC with fine-grained permissions |
| Data Encryption | AES-256 at rest, TLS 1.3 in transit |
| PII Protection | Masking, redaction, access controls |
| Audit Logging | Complete audit trail for compliance |
| Penetration Testing | Quarterly third-party penetration tests |

---

## 6. Integration Requirements

### 6.1 Third-Party Integrations

| Category | Provider | Purpose |
|----------|----------|---------|
| Credit | Experian, Equifax, TransUnion | Tri-merge credit reports |
| AUS | Fannie Mae DU, Freddie Mac LP | Automated underwriting |
| Bank Data | Plaid, Finicity, Yodlee | Asset verification |
| Employment | The Work Number | Employment verification |
| Tax Transcripts | IRS (via 4506-C) | Tax return verification |
| E-Signature | DocuSign, Adobe Sign | Digital signatures |
| Title | First American, Fidelity, Local | Title search, insurance |
| Flood | CoreLogic, FEMA | Flood determination |
| Valuation | CoreLogic, Clear Capital | AVM, appraisal management |
| MLS | Local MLS providers | Property listings |
| Payment | Stripe, Plaid, ACH networks | Payment processing |
| Cloud | AWS/Azure/GCP | Infrastructure |
| Monitoring | Datadog, New Relic | Observability |

### 6.2 API Requirements

| Requirement | Description |
|-------------|-------------|
| RESTful APIs | All services expose REST APIs |
| OpenAPI Spec | Complete OpenAPI 3.0 documentation |
| Webhooks | Event-based notifications |
| Rate Limiting | Per API key rate limiting |
| API Versioning | Semantic versioning (/v1/, /v2/) |
| Partner API | White-labeled API for partners |

---

## 7. Data Model

### 7.1 Core Entities

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           CORE ENTITIES                                 │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌─────────────────┐          ┌─────────────────┐                       │
│  │    TENANT       │          │    USER         │                       │
│  │─────────────────│          │─────────────────│                       │
│  │ id (PK)         │◄────────│ tenant_id (FK)  │                       │
│  │ name            │          │ id (PK)         │                       │
│  │ config          │          │ email           │                       │
│  │ region          │          │ role            │                       │
│  └─────────────────┘          └─────────────────┘                       │
│           │                            │                                 │
│           ▼                            ▼                                 │
│  ┌─────────────────┐          ┌─────────────────┐                       │
│  │   APPLICATION   │          │    PERSON       │                       │
│  │─────────────────│          │─────────────────│                       │
│  │ id (PK)         │          │ id (PK)         │                       │
│  │ tenant_id (FK)  │          │ user_id (FK)    │                       │
│  │ loan_type       │          │ first_name      │                       │
│  │ status          │          │ last_name       │                       │
│  │ submitted_date  │          │ ssn             │                       │
│  └─────────────────┘          │ dob             │                       │
│           │                   │ credit_score    │                       │
│           │                   └─────────────────┘                       │
│           │                            │                                 │
│           ▼                            ▼                                 │
│  ┌─────────────────┐          ┌─────────────────┐                       │
│  │    PROPERTY     │          │ APPLICATION_    │                       │
│  │─────────────────│          │    ROLE         │                       │
│  │ id (PK)         │          │─────────────────│                       │
│  │ application_id  │◄────────│ application_id  │                       │
│  │ address         │          │ person_id (FK)  │                       │
│  │ parcel_id       │          │ role_type       │                       │
│  │ appraised_value │          │ (Primary/Co/    │                       │
│  └─────────────────┘          │  Guarantor)     │                       │
│                               └─────────────────┘                       │
│                                                                          │
│  ┌─────────────────┐          ┌─────────────────┐                       │
│  │   INCOME        │          │    ASSET        │                       │
│  │─────────────────│          │─────────────────│                       │
│  │ id (PK)         │          │ id (PK)         │                       │
│  │ application_id  │          │ application_id  │                       │
│  │ type            │          │ type            │                       │
│  │ amount          │          │ institution     │                       │
│  │ verified        │          │ balance         │                       │
│  └─────────────────┘          └─────────────────┘                       │
│                                                                          │
│  ┌─────────────────┐          ┌─────────────────┐                       │
│  │   INSURANCE     │          │    DOCUMENT     │                       │
│  │─────────────────│          │─────────────────│                       │
│  │ id (PK)         │          │ id (PK)         │                       │
│  │ application_id  │          │ application_id  │                       │
│  │ type            │          │ category        │                       │
│  │ provider        │          │ file_url        │                       │
│  │ policy_number   │          │ status          │                       │
│  │ premium         │          │ uploaded_date   │                       │
│  │ effective_date  │          └─────────────────┘                       │
│  │ expiry_date     │                                                     │
│  └─────────────────┘                                                     │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 7.2 State Machines

**Loan Application States**

```
DRAFT → SUBMITTED → VERIFICATION → UNDERWRITING → CONDITIONAL_APPROVAL → CLEAR_TO_CLOSE → CLOSED
              ↓                                                                 ↓
          WITHDRAWN                                                         FUNDED
              ↓                                                                 ↓
          DECLINED                                                       SERVICING
```

**Document States**

```
PENDING → UPLOADED → VERIFIED → APPROVED
                ↓
            REJECTED
                ↓
            EXPIRED
```

---

## 8. API Architecture

### 8.1 API Categories

| Category | Base Path | Description |
|----------|-----------|-------------|
| Borrower | /api/v1/borrower | Borrower-facing APIs |
| Application | /api/v1/application | Loan application management |
| Property | /api/v1/property | Property management |
| Document | /api/v1/document | Document upload and management |
| Insurance | /api/v1/insurance | Insurance quoting and binding |
| Underwriting | /api/v1/underwriting | Underwriting decisions |
| Servicing | /api/v1/servicing | Payment processing, escrow |
| Admin | /api/v1/admin | System administration |
| Webhook | /api/v1/webhook | Event notifications |

### 8.2 Sample API Endpoints

```yaml
# Loan Application
POST    /api/v1/application                    # Create application
GET     /api/v1/application/{id}               # Get application
PUT     /api/v1/application/{id}               # Update application
POST    /api/v1/application/{id}/submit        # Submit for processing
GET     /api/v1/application/{id}/status        # Get application status

# Documents
POST    /api/v1/application/{id}/document      # Upload document
GET     /api/v1/application/{id}/document      # List documents
GET     /api/v1/document/{id}/download         # Download document
DELETE  /api/v1/document/{id}                  # Delete document

# Insurance
GET     /api/v1/insurance/quotes               # Get insurance quotes
POST    /api/v1/insurance/policy               # Bind insurance policy
GET     /api/v1/insurance/policy/{id}          # Get policy details

# Payments (Servicing)
GET     /api/v1/loan/{loanId}/payment          # Get payment history
POST    /api/v1/loan/{loanId}/payment          # Make payment
GET     /api/v1/loan/{loanId}/escrow           # Get escrow balance
```

---

## 9. Security & Compliance

### 9.1 Security Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        SECURITY ARCHITECTURE                            │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                    API GATEWAY                                   │    │
│  │  • Rate Limiting    • Authentication    • Request Validation    │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                    │                                     │
│                                    ▼                                     │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                    AUTH SERVICE                                  │    │
│  │  • OAuth 2.0 / OIDC   • MFA (SMS/TOTP)   • JWT Tokens          │    │
│  │  • SSO (Okta/Auth0)   • Role Resolution                         │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                    │                                     │
│                                    ▼                                     │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                    APPLICATION SERVICES                          │    │
│  │  • RBAC Enforcement    • Data Encryption    • Audit Logging     │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                    │                                     │
│                                    ▼                                     │
│  ┌─────────────────────────────────────────────────────────────────┐    │
│  │                    DATA LAYER                                    │    │
│  │  • Column-level encryption (PII)   • Encrypted backups          │    │
│  │  • Vault for secrets (API keys, certificates)                   │    │
│  └─────────────────────────────────────────────────────────────────┘    │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 9.2 Compliance Certifications (Target)

| Certification | Timeline |
|--------------|----------|
| SOC 2 Type II | Year 1 |
| ISO 27001 | Year 1 |
| HIPAA (if applicable) | Year 2 |
| PCI DSS | Year 1 (if storing payment info) |

---

## 10. User Interface Guidelines

### 10.1 Design Principles

| Principle | Description |
|-----------|-------------|
| Clarity | Simple, intuitive interfaces with clear next steps |
| Efficiency | Minimize clicks, automate repetitive tasks |
| Consistency | Uniform design patterns across all portals |
| Accessibility | WCAG 2.1 AA compliance |
| Responsive | Desktop, tablet, mobile optimized |

### 10.2 Key UI Components

| Component | Description |
|-----------|-------------|
| Application Dashboard | Status cards, task lists, progress timeline |
| Document Uploader | Drag-and-drop, batch upload, status indicators |
| Form Builder | Dynamic forms based on loan type |
| Calculator | EMI/affordability calculators |
| Notification Center | In-app, email, SMS notifications |
| Search | Global search with filters |

---

## 11. Reporting & Analytics

### 11.1 Report Categories

| Category | Reports |
|----------|---------|
| Origination | Pipeline report, application volume, conversion rates, pull-through rates |
| Underwriting | Approval/decline rates, condition aging, turn times |
| Servicing | Delinquency report, prepayment rates, escrow analysis |
| Compliance | HMDA LAR, fair lending analysis, audit trail reports |
| Financial | Loan volume, revenue, commission tracking |
| Operational | User activity, system performance, error rates |

### 11.2 Lender Dashboard Example

```
┌─────────────────────────────────────────────────────────────────────────┐
│  LENDER DASHBOARD                                      Jan 1-15, 2026  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │
│  │ Applications│  │  Funded     │  │  Pipeline   │  │  Pull-      │   │
│  │    342      │  │   156       │  │    $45.2M   │  │  Through    │   │
│  │  +12% vs LY │  │  +8% vs LY  │  │  +15% vs LY │  │   68%       │   │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  PIPELINE BY STAGE                                               │   │
│  │  ████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │   │
│  │  Submitted (89)  Underwriting (67)  CTC (34)  Closed (156)      │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  ┌──────────────────────────────┐  ┌──────────────────────────────┐   │
│  │  APPLICATIONS BY LOAN TYPE   │  │  AVERAGE TURN TIME (DAYS)    │   │
│  │  Conventional: 45%           │  │  Submission → CTC: 18        │   │
│  │  FHA: 28%                    │  │  CTC → Funding: 3            │   │
│  │  VA: 15%                     │  │  Total: 21 days              │   │
│  │  Jumbo: 12%                  │  │  Target: 15 days             │   │
│  └──────────────────────────────┘  └──────────────────────────────┘   │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 12. Implementation Roadmap

### Phase 1: Foundation (Months 1–4)

| Deliverable | Description |
|-------------|-------------|
| Core Platform | Multi-tenant architecture, authentication, RBAC |
| Borrower Portal | Registration, application intake, document upload |
| Loan Officer Portal | Pipeline management, basic workflow |
| Document Management | Storage, OCR, e-signature integration |
| Integration | Credit pull, basic AUS |

### Phase 2: Expansion (Months 5–8)

| Deliverable | Description |
|-------------|-------------|
| Broker Portal | Application submission, commission tracking |
| Underwriter Portal | Full underwriting workflow, condition management |
| Insurance Module | Quoting, binding, policy tracking |
| Property Module | MLS integration, valuation, flood |
| Asset Verification | Bank integrations, employment verification |

### Phase 3: Enterprise (Months 9–12)

| Deliverable | Description |
|-------------|-------------|
| Servicing Module | Payment processing, escrow, delinquency |
| Closing Module | CD generation, wire management |
| Advanced Reporting | Custom dashboards, HMDA reporting |
| Mobile Apps | iOS/Android native apps |
| API Marketplace | Partner API access, documentation |

### Phase 4: Scale (Months 13–18)

| Deliverable | Description |
|-------------|-------------|
| International | India market launch, multi-currency |
| Commercial Loans | Commercial real estate lending |
| AI/ML Enhancements | Predictive underwriting, fraud detection |
| Marketplace | Third-party app ecosystem |

---

## 13. Success Metrics (KPIs)

### Business KPIs

| Metric | Target |
|--------|--------|
| Loan Processing Time | 45 days → 15 days |
| Operational Cost per Loan | Reduce by 30% |
| Customer Satisfaction (CSAT) | > 85% |
| Broker/Lender Adoption | 100+ enterprise clients in Year 1 |
| Loan Volume Processed | $5B+ in Year 1 |

### Technical KPIs

| Metric | Target |
|--------|--------|
| System Uptime | 99.9% |
| API Response Time (P95) | < 500ms |
| Document Processing Accuracy | > 95% |
| Time to Deploy | Daily deployments |
| Security Incidents | Zero critical incidents |

---

## 14. Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|-----------|------------|
| Regulatory Non-Compliance | Critical | Medium | Dedicated compliance team, automated compliance checks, regular audits |
| Data Breach | Critical | Low | Encryption at rest/in transit, penetration testing, SOC2 certification |
| Integration Failures | High | Medium | Robust error handling, fallback processes, vendor SLAs |
| Adoption Resistance | Medium | Medium | User training, change management, intuitive UX |
| Scalability Issues | High | Medium | Horizontal architecture, load testing, auto-scaling |
| Third-Party API Changes | Medium | High | Abstraction layer, multiple vendor options |

---

## 15. Glossary

| Term | Definition |
|------|-----------|
| AUS | Automated Underwriting System (DU/LP) |
| CD | Closing Disclosure — final loan terms disclosure |
| DTI | Debt-to-Income Ratio — total monthly debt ÷ gross monthly income |
| FICO | Fair Isaac Corporation credit score |
| LTV | Loan-to-Value Ratio — loan amount ÷ property value |
| LOS | Loan Origination System |
| MIP | Mortgage Insurance Premium (FHA) |
| PMI | Private Mortgage Insurance (Conventional) |
| RESPA | Real Estate Settlement Procedures Act |
| TILA | Truth in Lending Act |
| TRID | TILA-RESPA Integrated Disclosure rule |
| VOE | Verification of Employment |
| VOR | Verification of Rent |
| ARM | Adjustable-Rate Mortgage |
| HMDA | Home Mortgage Disclosure Act |
| ECOA | Equal Credit Opportunity Act |
| GLBA | Gramm-Leach-Bliley Act |

---

## Appendix

### A. User Stories

| ID | User Story |
|----|-----------|
| US-001 | As an applicant, I want to apply for a loan online so that I don't have to visit a branch |
| US-002 | As an applicant, I want to add my spouse as a co-applicant so that their income is considered |
| US-003 | As a broker, I want to submit applications on behalf of my clients and track commissions |
| US-004 | As an underwriter, I want to see all conditions in one place and clear them efficiently |
| US-005 | As a loan officer, I want to see my pipeline sorted by priority |
| US-006 | As a title agent, I want to receive title orders and upload title commitments |
| US-007 | As an insurance agent, I want to provide quotes and bind policies within the platform |
| US-008 | As an admin, I want to configure loan products and underwriting rules |

### B. Acceptance Criteria Example

**US-001: Online Loan Application**

```
Given I am a registered borrower
When I start a new loan application
Then I should:
  1. Select loan type (Conventional/FHA/VA/etc.)
  2. Enter property details
  3. Enter personal information (all applicants)
  4. Enter employment and income details
  5. Enter asset information
  6. Upload required documents
  7. Review and submit

Acceptance:
  - Application can be saved and resumed
  - All fields validated
  - Confirmation email sent on submission
```

### C. US vs India Market Comparison

| Aspect | India | USA |
|--------|-------|-----|
| Loan Types | Home loan, plot loan, construction loan | Conforming, FHA, VA, USDA, Jumbo |
| Interest Rates | Mostly floating (linked to repo rate) | Fixed-rate (15/30-year) and ARM |
| Credit Scoring | CIBIL (300–900) | FICO Score (300–850) |
| Down Payment | 10–20% typical | 3–20% depending on loan type |
| Tax Benefits | Section 80C, 24(b) | Mortgage Interest Deduction, Property Tax Deduction |
| Entities | Banks, NBFCs | Banks, Credit Unions, Mortgage Brokers, Non-QM Lenders |

---

*Document Control*

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-03-25 | Product Team | Initial PRD |
