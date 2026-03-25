Here's the complete extension with API specifications, database migration scripts, test cases, and UI mockup descriptions for the Asset Management module.

Asset Management Module - Complete Technical Specification
1. API Specifications
1.1 Asset Management API Endpoints
Method	Endpoint	Description	Role Access
POST	/api/v1/applications/{applicationId}/assets	Add new asset	Borrower, Loan Officer, Processor
GET	/api/v1/applications/{applicationId}/assets	List all assets	All roles with access
GET	/api/v1/assets/{assetId}	Get asset details	All roles with access
PUT	/api/v1/assets/{assetId}	Update asset	Borrower (own), Loan Officer, Processor
DELETE	/api/v1/assets/{assetId}	Delete asset	Borrower (own), Loan Officer, Admin
POST	/api/v1/assets/{assetId}/verify	Verify asset	Processor, Underwriter
POST	/api/v1/assets/{assetId}/flag	Add flag to asset	Processor, Underwriter
GET	/api/v1/assets/{assetId}/history	Get value history	All roles with access
GET	/api/v1/assets/{assetId}/trends	Get trend analysis	Underwriter, Loan Officer
POST	/api/v1/assets/{assetId}/refresh	Refresh valuation	Processor, Underwriter
GET	/api/v1/applications/{applicationId}/assets/summary	Get asset summary	All roles with access
POST	/api/v1/assets/verify-batch	Batch verify assets	Processor, Underwriter
1.2 API Request/Response Specifications
POST /api/v1/applications/{applicationId}/assets - Add Asset
Request Body - Cash/Deposit Asset:

json
{
  "asset_type": "CASH",
  "asset_subtype": "CHECKING",
  "ownership_type": "INDIVIDUAL",
  "institution_name": "Chase Bank",
  "account_number": "XXXX1234",
  "current_value": 25000.00,
  "value_as_of_date": "2026-03-25",
  "currency": "USD",
  "account_details": {
    "account_holder_name": "John Doe",
    "is_primary_account": true,
    "average_balance_3m": 23500.00,
    "purpose_of_funds": ["DOWN_PAYMENT", "RESERVES"]
  },
  "verification_preference": "PLAID",
  "documents": [
    {
      "document_type": "BANK_STATEMENT",
      "file_url": "https://storage.example.com/docs/statement1.pdf"
    }
  ]
}
Request Body - Investment Asset:

json
{
  "asset_type": "INVESTMENT",
  "asset_subtype": "STOCKS",
  "ownership_type": "INDIVIDUAL",
  "institution_name": "Vanguard",
  "account_number": "XXXX5678",
  "current_value": 65000.00,
  "value_as_of_date": "2026-03-25",
  "investment_details": {
    "brokerage_firm": "Vanguard",
    "total_market_value": 65000.00,
    "cash_available": 5000.00,
    "margin_balance": 0.00,
    "securities_held": [
      {
        "symbol": "VOO",
        "quantity": 150,
        "current_price": 433.33,
        "market_value": 65000.00
      }
    ]
  },
  "verification_preference": "BROKERAGE_STATEMENT"
}
Request Body - Cryptocurrency Asset:

json
{
  "asset_type": "CRYPTO",
  "asset_subtype": "BITCOIN",
  "ownership_type": "INDIVIDUAL",
  "institution_name": "Coinbase",
  "current_value": 25000.00,
  "value_as_of_date": "2026-03-25",
  "crypto_details": {
    "exchange": "Coinbase",
    "wallet_address": "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
    "quantity": 0.42,
    "current_value_usd": 25000.00,
    "cost_basis": 18000.00,
    "purchase_date": "2024-01-15",
    "holding_period_days": 435,
    "liquidity_status": "IMMEDIATE"
  },
  "verification_preference": "EXCHANGE_STATEMENT"
}
Request Body - Gift Funds:

json
{
  "asset_type": "GIFT",
  "asset_subtype": "GIFT_FUNDS",
  "current_value": 35000.00,
  "value_as_of_date": "2026-03-25",
  "gift_details": {
    "donor_name": "Robert Doe",
    "donor_relationship": "PARENT",
    "donor_address": "123 Main St, Anytown, USA",
    "donor_phone": "+1-555-123-4567",
    "donor_email": "robert.doe@example.com",
    "gift_amount": 35000.00,
    "gift_date": "2026-03-20",
    "funds_transfer_method": "WIRE",
    "funds_location": "IN_BORROWER_ACCOUNT",
    "purpose": "DOWN_PAYMENT",
    "is_donor_related_to_transaction": false
  },
  "documents": [
    {
      "document_type": "GIFT_LETTER",
      "file_url": "https://storage.example.com/docs/gift_letter.pdf"
    },
    {
      "document_type": "DONOR_BANK_STATEMENT",
      "file_url": "https://storage.example.com/docs/donor_statement.pdf"
    }
  ]
}
Response:

json
{
  "success": true,
  "data": {
    "asset_id": "ast_123456789",
    "application_id": "app_987654321",
    "asset_type": "CASH",
    "current_value": 25000.00,
    "verification_status": "PENDING",
    "verification_required_actions": [
      {
        "action": "UPLOAD_BANK_STATEMENT",
        "description": "Please upload last 3 months of bank statements",
        "due_date": "2026-04-01"
      }
    ],
    "created_at": "2026-03-25T10:30:00Z"
  },
  "message": "Asset added successfully"
}
GET /api/v1/applications/{applicationId}/assets/summary - Asset Summary
Response:

json
{
  "application_id": "app_987654321",
  "borrower_name": "John Doe",
  "summary": {
    "total_assets": 425000.00,
    "total_liabilities": 0.00,
    "net_worth": 425000.00,
    "liquid_assets": 185000.00,
    "qualifying_assets": 400000.00,
    "non_qualifying_assets": 25000.00,
    "available_for_down_payment": 185000.00,
    "available_for_reserves": 150000.00,
    "required_down_payment": 35000.00,
    "down_payment_coverage": "SUFFICIENT",
    "reserves_months": 6.2,
    "reserves_requirement_met": true
  },
  "breakdown": {
    "CASH": {
      "total": 170000.00,
      "verified": 170000.00,
      "count": 3
    },
    "INVESTMENT": {
      "total": 105000.00,
      "verified": 105000.00,
      "count": 3
    },
    "RETIREMENT": {
      "total": 85000.00,
      "verified": 85000.00,
      "count": 2
    },
    "CRYPTO": {
      "total": 25000.00,
      "verified": 0.00,
      "count": 1,
      "status": "QUESTIONED"
    },
    "GIFT": {
      "total": 35000.00,
      "verified": 35000.00,
      "count": 1
    }
  },
  "flags": [
    {
      "flag_type": "HIGH_VOLATILITY",
      "severity": "MEDIUM",
      "description": "Cryptocurrency assets show high volatility (30-day change: -15%)",
      "asset_id": "ast_789012345"
    },
    {
      "flag_type": "CONCENTRATION_RISK",
      "severity": "LOW",
      "description": "40% of assets concentrated in single institution (Chase Bank)",
      "asset_id": null
    }
  ],
  "verification_status": {
    "total_assets": 10,
    "verified": 8,
    "pending": 1,
    "questioned": 1,
    "rejected": 0,
    "completion_percentage": 80
  },
  "trends": {
    "total_assets_30d_change": 5.9,
    "liquid_assets_30d_change": 8.2,
    "volatility_score": 8.5,
    "risk_score": 65
  },
  "generated_at": "2026-03-25T14:30:00Z"
}
GET /api/v1/assets/{assetId}/trends - Asset Trend Analysis
Response:

json
{
  "asset_id": "ast_123456789",
  "asset_type": "INVESTMENT",
  "asset_name": "Vanguard S&P 500 ETF",
  "current_value": 65000.00,
  "valuation_history": [
    { "date": "2026-01-15", "value": 58000.00 },
    { "date": "2026-01-22", "value": 58500.00 },
    { "date": "2026-01-29", "value": 59000.00 },
    { "date": "2026-02-05", "value": 59500.00 },
    { "date": "2026-02-12", "value": 61000.00 },
    { "date": "2026-02-19", "value": 62000.00 },
    { "date": "2026-02-26", "value": 63000.00 },
    { "date": "2026-03-05", "value": 64000.00 },
    { "date": "2026-03-12", "value": 64500.00 },
    { "date": "2026-03-19", "value": 64800.00 },
    { "date": "2026-03-25", "value": 65000.00 }
  ],
  "trend_metrics": {
    "7d_change": 0.31,
    "30d_change": 5.9,
    "90d_change": 12.07,
    "ytd_change": 3.8,
    "volatility_30d": 8.5,
    "sharpe_ratio_annualized": 1.2,
    "max_drawdown_90d": -3.2,
    "recovery_days": 15
  },
  "forecast": {
    "predicted_value_30d": 67800.00,
    "confidence_interval_lower": 64410.00,
    "confidence_interval_upper": 71190.00,
    "confidence_level": 95,
    "trend_direction": "UPWARD",
    "forecast_model": "ARIMA",
    "model_accuracy": 92.5
  },
  "risk_analysis": {
    "risk_adjusted_value": 58500.00,
    "haircut_applied": 10.0,
    "volatility_rating": "MODERATE",
    "concentration_risk": "LOW",
    "liquidity_rating": "HIGH",
    "overall_risk_score": 35,
    "recommendation": "ACCEPT"
  },
  "comparison": {
    "benchmark": "S&P 500",
    "benchmark_return_30d": 5.2,
    "outperformance": 0.7,
    "correlation": 0.95
  },
  "alerts": [
    {
      "type": "POSITIVE_TREND",
      "message": "Asset showing consistent upward trend over 90 days",
      "severity": "INFO"
    }
  ],
  "last_refresh": "2026-03-25T09:00:00Z",
  "next_scheduled_refresh": "2026-03-26T09:00:00Z"
}
POST /api/v1/assets/{assetId}/verify - Verify Asset
Request Body:

json
{
  "verification_status": "VERIFIED",
  "verification_method": "MANUAL_REVIEW",
  "verification_notes": "Verified bank statements for last 3 months. No large deposits. Account in good standing.",
  "adjusted_value": null,
  "haircut_percentage": null,
  "conditions": []
}
Response:

json
{
  "success": true,
  "data": {
    "asset_id": "ast_123456789",
    "verification_status": "VERIFIED",
    "verified_by": "user_processor_001",
    "verified_at": "2026-03-25T15:45:00Z",
    "risk_adjusted_value": 25000.00
  },
  "message": "Asset verified successfully"
}
POST /api/v1/assets/{assetId}/flag - Add Flag
Request Body:

json
{
  "flag_type": "LARGE_DEPOSIT",
  "severity": "HIGH",
  "description": "Deposit of $12,000 detected on 02/01/2026. Source of funds verification required.",
  "assigned_to": "user_processor_002",
  "due_date": "2026-04-01"
}
Response:

json
{
  "success": true,
  "data": {
    "flag_id": "flag_987654321",
    "asset_id": "ast_123456789",
    "flag_type": "LARGE_DEPOSIT",
    "severity": "HIGH",
    "status": "OPEN",
    "created_at": "2026-03-25T16:00:00Z"
  },
  "message": "Flag added successfully"
}
1.3 Webhook Events
Event	Payload	Description
asset.verified	{asset_id, application_id, status, verified_by}	Asset verification completed
asset.flagged	{asset_id, flag_type, severity, description}	New flag added to asset
asset.value_changed	{asset_id, old_value, new_value, change_percentage}	Significant value change detected
asset.expiring	{asset_id, document_type, expiry_date}	Document nearing expiration
asset.refresh_completed	{asset_id, new_value, previous_value}	Automated valuation refresh complete
2. Database Migration Scripts
2.1 Full Asset Schema Migration
sql
-- Migration: 001_create_asset_tables.sql
-- Version: 1.0
-- Description: Create all asset-related tables

BEGIN;

-- ============================================
-- 1. ASSETS MASTER TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID NOT NULL,
    person_id UUID NOT NULL,
    asset_type VARCHAR(50) NOT NULL,
    asset_subtype VARCHAR(50),
    ownership_type VARCHAR(20),
    
    -- Core fields
    institution_name VARCHAR(200),
    account_number_masked VARCHAR(50),
    current_value DECIMAL(18,2) NOT NULL,
    value_as_of_date DATE NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    
    -- Verification fields
    verification_status VARCHAR(20) DEFAULT 'PENDING',
    verification_method VARCHAR(50),
    verified_by UUID,
    verified_at TIMESTAMP,
    verification_notes TEXT,
    
    -- Risk & valuation
    risk_adjusted_value DECIMAL(18,2),
    haircut_percentage DECIMAL(5,2),
    volatility_score DECIMAL(5,2),
    concentration_percentage DECIMAL(5,2),
    
    -- Trend data
    value_7d_ago DECIMAL(18,2),
    value_30d_ago DECIMAL(18,2),
    value_90d_ago DECIMAL(18,2),
    trend_7d DECIMAL(5,2),
    trend_30d DECIMAL(5,2),
    trend_90d DECIMAL(5,2),
    
    -- Metadata
    is_active BOOLEAN DEFAULT TRUE,
    created_by UUID,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_by UUID,
    updated_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP,
    
    -- Foreign keys
    CONSTRAINT fk_assets_application FOREIGN KEY (application_id) REFERENCES loan_applications(id),
    CONSTRAINT fk_assets_person FOREIGN KEY (person_id) REFERENCES persons(id),
    CONSTRAINT fk_assets_verified_by FOREIGN KEY (verified_by) REFERENCES users(id),
    CONSTRAINT fk_assets_created_by FOREIGN KEY (created_by) REFERENCES users(id),
    CONSTRAINT fk_assets_updated_by FOREIGN KEY (updated_by) REFERENCES users(id),
    
    -- Constraints
    CONSTRAINT chk_asset_type CHECK (asset_type IN ('CASH', 'INVESTMENT', 'RETIREMENT', 'REAL_ESTATE', 'CRYPTO', 'BUSINESS', 'GIFT', 'OTHER')),
    CONSTRAINT chk_ownership_type CHECK (ownership_type IN ('INDIVIDUAL', 'JOINT', 'TRUST', 'BUSINESS')),
    CONSTRAINT chk_verification_status CHECK (verification_status IN ('PENDING', 'VERIFIED', 'QUESTIONED', 'REJECTED'))
);

CREATE INDEX idx_assets_application_id ON assets(application_id);
CREATE INDEX idx_assets_person_id ON assets(person_id);
CREATE INDEX idx_assets_verification_status ON assets(verification_status);
CREATE INDEX idx_assets_asset_type ON assets(asset_type);
CREATE INDEX idx_assets_created_at ON assets(created_at);

-- ============================================
-- 2. ASSET ATTRIBUTES TABLE (JSONB flexible fields)
-- ============================================

CREATE TABLE IF NOT EXISTS asset_attributes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_id UUID NOT NULL,
    attribute_key VARCHAR(100) NOT NULL,
    attribute_value JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    
    CONSTRAINT fk_asset_attributes_asset FOREIGN KEY (asset_id) REFERENCES assets(id) ON DELETE CASCADE,
    CONSTRAINT chk_attribute_key CHECK (attribute_key IN (
        'cash_details', 'investment_details', 'retirement_details', 'crypto_details',
        'real_estate_details', 'business_details', 'gift_details', 'verification_details'
    ))
);

CREATE INDEX idx_asset_attributes_asset_id ON asset_attributes(asset_id);
CREATE INDEX idx_asset_attributes_key ON asset_attributes(attribute_key);

-- ============================================
-- 3. ASSET HISTORY TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS asset_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_id UUID NOT NULL,
    value DECIMAL(18,2) NOT NULL,
    recorded_date DATE NOT NULL,
    source VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW(),
    
    CONSTRAINT fk_asset_history_asset FOREIGN KEY (asset_id) REFERENCES assets(id) ON DELETE CASCADE,
    CONSTRAINT chk_source CHECK (source IN ('STATEMENT', 'API', 'MANUAL', 'AUTO_REFRESH'))
);

CREATE INDEX idx_asset_history_asset_id ON asset_history(asset_id);
CREATE INDEX idx_asset_history_recorded_date ON asset_history(recorded_date);
CREATE INDEX idx_asset_history_asset_date ON asset_history(asset_id, recorded_date);

-- ============================================
-- 4. ASSET FLAGS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS asset_flags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_id UUID NOT NULL,
    flag_type VARCHAR(50) NOT NULL,
    severity VARCHAR(20) NOT NULL,
    description TEXT,
    assigned_to UUID,
    due_date DATE,
    resolved BOOLEAN DEFAULT FALSE,
    resolved_by UUID,
    resolved_at TIMESTAMP,
    resolution_notes TEXT,
    created_by UUID,
    created_at TIMESTAMP DEFAULT NOW(),
    
    CONSTRAINT fk_asset_flags_asset FOREIGN KEY (asset_id) REFERENCES assets(id) ON DELETE CASCADE,
    CONSTRAINT fk_asset_flags_assigned_to FOREIGN KEY (assigned_to) REFERENCES users(id),
    CONSTRAINT fk_asset_flags_resolved_by FOREIGN KEY (resolved_by) REFERENCES users(id),
    CONSTRAINT fk_asset_flags_created_by FOREIGN KEY (created_by) REFERENCES users(id),
    CONSTRAINT chk_flag_type CHECK (flag_type IN (
        'LARGE_DEPOSIT', 'NEW_ACCOUNT', 'UNUSUAL_PATTERN', 'HIGH_VOLATILITY',
        'CONCENTRATION_RISK', 'SOURCE_OF_FUNDS', 'SEASONING_ISSUE', 'INSUFFICIENT_DOCS',
        'VALUATION_DISCREPANCY', 'FRAUD_SUSPECT'
    )),
    CONSTRAINT chk_severity CHECK (severity IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL'))
);

CREATE INDEX idx_asset_flags_asset_id ON asset_flags(asset_id);
CREATE INDEX idx_asset_flags_resolved ON asset_flags(resolved);
CREATE INDEX idx_asset_flags_assigned_to ON asset_flags(assigned_to);
CREATE INDEX idx_asset_flags_severity ON asset_flags(severity);

-- ============================================
-- 5. GIFT FUNDS SPECIFIC TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS gift_funds (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_id UUID NOT NULL UNIQUE,
    donor_name VARCHAR(200) NOT NULL,
    donor_relationship VARCHAR(50),
    donor_address TEXT,
    donor_phone VARCHAR(20),
    donor_email VARCHAR(100),
    gift_amount DECIMAL(18,2) NOT NULL,
    gift_date DATE,
    funds_transfer_method VARCHAR(20),
    funds_location VARCHAR(30),
    purpose VARCHAR(50),
    is_donor_related_to_transaction BOOLEAN DEFAULT FALSE,
    gift_letter_uploaded BOOLEAN DEFAULT FALSE,
    donor_statement_uploaded BOOLEAN DEFAULT FALSE,
    verification_status VARCHAR(20) DEFAULT 'PENDING',
    verified_by UUID,
    verified_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    CONSTRAINT fk_gift_funds_asset FOREIGN KEY (asset_id) REFERENCES assets(id) ON DELETE CASCADE,
    CONSTRAINT fk_gift_funds_verified_by FOREIGN KEY (verified_by) REFERENCES users(id),
    CONSTRAINT chk_transfer_method CHECK (funds_transfer_method IN ('WIRE', 'CHECK', 'ACH', 'CASH')),
    CONSTRAINT chk_funds_location CHECK (funds_location IN ('IN_BORROWER_ACCOUNT', 'HELD_BY_DONOR', 'IN_ESCROW'))
);

CREATE INDEX idx_gift_funds_asset_id ON gift_funds(asset_id);
CREATE INDEX idx_gift_funds_verification_status ON gift_funds(verification_status);

-- ============================================
-- 6. REAL ESTATE ASSET DETAILS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS real_estate_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_id UUID NOT NULL UNIQUE,
    property_address TEXT NOT NULL,
    property_type VARCHAR(50),
    ownership_percentage DECIMAL(5,2) DEFAULT 100.00,
    purchase_date DATE,
    purchase_price DECIMAL(18,2),
    current_market_value DECIMAL(18,2),
    mortgage_balance DECIMAL(18,2),
    monthly_mortgage_payment DECIMAL(18,2),
    monthly_rental_income DECIMAL(18,2),
    vacancy_rate DECIMAL(5,2),
    monthly_property_tax DECIMAL(18,2),
    monthly_insurance DECIMAL(18,2),
    monthly_hoa_fees DECIMAL(18,2),
    net_cash_flow DECIMAL(18,2),
    is_occupied BOOLEAN,
    lease_end_date DATE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    CONSTRAINT fk_real_estate_asset FOREIGN KEY (asset_id) REFERENCES assets(id) ON DELETE CASCADE
);

CREATE INDEX idx_real_estate_asset_id ON real_estate_assets(asset_id);

-- ============================================
-- 7. BUSINESS ASSET DETAILS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS business_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_id UUID NOT NULL UNIQUE,
    business_name VARCHAR(200) NOT NULL,
    business_tin VARCHAR(50),
    ownership_percentage DECIMAL(5,2),
    business_type VARCHAR(50),
    years_owned INTEGER,
    industry VARCHAR(100),
    annual_revenue DECIMAL(18,2),
    annual_profit DECIMAL(18,2),
    business_debt DECIMAL(18,2),
    equity_value DECIMAL(18,2),
    monthly_salary_taken DECIMAL(18,2),
    business_credit_score INTEGER,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    CONSTRAINT fk_business_asset FOREIGN KEY (asset_id) REFERENCES assets(id) ON DELETE CASCADE
);

CREATE INDEX idx_business_asset_id ON business_assets(asset_id);

-- ============================================
-- 8. ASSET VERIFICATION LOGS
-- ============================================

CREATE TABLE IF NOT EXISTS asset_verification_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_id UUID NOT NULL,
    action VARCHAR(50) NOT NULL,
    previous_status VARCHAR(20),
    new_status VARCHAR(20),
    performed_by UUID NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    
    CONSTRAINT fk_verification_logs_asset FOREIGN KEY (asset_id) REFERENCES assets(id) ON DELETE CASCADE,
    CONSTRAINT fk_verification_logs_user FOREIGN KEY (performed_by) REFERENCES users(id)
);

CREATE INDEX idx_verification_logs_asset_id ON asset_verification_logs(asset_id);
CREATE INDEX idx_verification_logs_created_at ON asset_verification_logs(created_at);

-- ============================================
-- 9. TRIGGER: Update updated_at timestamp
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_assets_updated_at
    BEFORE UPDATE ON assets
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gift_funds_updated_at
    BEFORE UPDATE ON gift_funds
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_real_estate_assets_updated_at
    BEFORE UPDATE ON real_estate_assets
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_business_assets_updated_at
    BEFORE UPDATE ON business_assets
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 10. VIEW: Asset Summary View
-- ============================================

CREATE OR REPLACE VIEW asset_summary_view AS
SELECT 
    a.application_id,
    a.person_id,
    COUNT(a.id) as total_assets,
    SUM(CASE WHEN a.verification_status = 'VERIFIED' THEN a.current_value ELSE 0 END) as verified_value,
    SUM(CASE WHEN a.verification_status = 'PENDING' THEN a.current_value ELSE 0 END) as pending_value,
    SUM(CASE WHEN a.asset_type = 'CASH' THEN a.current_value ELSE 0 END) as cash_total,
    SUM(CASE WHEN a.asset_type = 'INVESTMENT' THEN a.current_value ELSE 0 END) as investment_total,
    SUM(CASE WHEN a.asset_type = 'RETIREMENT' THEN a.current_value ELSE 0 END) as retirement_total,
    SUM(CASE WHEN a.asset_type = 'CRYPTO' THEN a.current_value ELSE 0 END) as crypto_total,
    SUM(CASE WHEN a.asset_type = 'GIFT' THEN a.current_value ELSE 0 END) as gift_total,
    AVG(a.trend_30d) as avg_trend_30d,
    MAX(CASE WHEN af.id IS NOT NULL THEN 1 ELSE 0 END) as has_flags
FROM assets a
LEFT JOIN asset_flags af ON a.id = af.asset_id AND af.resolved = FALSE
WHERE a.deleted_at IS NULL
GROUP BY a.application_id, a.person_id;

COMMIT;
2.2 Seed Data for Asset Types
sql
-- Migration: 002_seed_asset_config.sql
-- Description: Seed reference data for asset configuration

BEGIN;

-- Asset type configuration
CREATE TABLE IF NOT EXISTS asset_type_config (
    id SERIAL PRIMARY KEY,
    asset_type VARCHAR(50) NOT NULL,
    asset_subtype VARCHAR(50),
    display_name VARCHAR(100),
    default_haircut DECIMAL(5,2),
    verification_required BOOLEAN DEFAULT TRUE,
    requires_documentation BOOLEAN DEFAULT TRUE,
    max_valuation_age_days INTEGER,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO asset_type_config (asset_type, asset_subtype, display_name, default_haircut, max_valuation_age_days) VALUES
('CASH', 'CHECKING', 'Checking Account', 0, 60),
('CASH', 'SAVINGS', 'Savings Account', 0, 60),
('CASH', 'MONEY_MARKET', 'Money Market Account', 0, 60),
('CASH', 'CD', 'Certificate of Deposit', 0, 90),
('INVESTMENT', 'STOCKS', 'Stocks', 10, 30),
('INVESTMENT', 'BONDS', 'Bonds', 5, 30),
('INVESTMENT', 'MUTUAL_FUNDS', 'Mutual Funds', 10, 30),
('RETIREMENT', '401K', '401(k)', 0, 90),
('RETIREMENT', 'IRA', 'IRA', 0, 90),
('CRYPTO', 'BITCOIN', 'Bitcoin', 50, 7),
('CRYPTO', 'ETHEREUM', 'Ethereum', 50, 7),
('GIFT', 'GIFT_FUNDS', 'Gift Funds', 0, 30),
('REAL_ESTATE', 'PRIMARY', 'Primary Residence', 0, 180),
('REAL_ESTATE', 'INVESTMENT', 'Investment Property', 0, 180);

-- Flag type configuration
CREATE TABLE IF NOT EXISTS flag_type_config (
    id SERIAL PRIMARY KEY,
    flag_type VARCHAR(50) NOT NULL,
    display_name VARCHAR(100),
    default_severity VARCHAR(20),
    requires_review BOOLEAN DEFAULT TRUE,
    auto_escalate BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO flag_type_config (flag_type, display_name, default_severity) VALUES
('LARGE_DEPOSIT', 'Large Deposit Detected', 'HIGH'),
('NEW_ACCOUNT', 'New Account (<60 days)', 'MEDIUM'),
('UNUSUAL_PATTERN', 'Unusual Activity Pattern', 'MEDIUM'),
('HIGH_VOLATILITY', 'High Volatility Asset', 'MEDIUM'),
('CONCENTRATION_RISK', 'Asset Concentration Risk', 'LOW'),
('SOURCE_OF_FUNDS', 'Source of Funds Required', 'HIGH'),
('SEASONING_ISSUE', 'Funds Seasoning Issue', 'MEDIUM'),
('INSUFFICIENT_DOCS', 'Insufficient Documentation', 'MEDIUM'),
('VALUATION_DISCREPANCY', 'Valuation Discrepancy', 'HIGH'),
('FRAUD_SUSPECT', 'Fraud Suspected', 'CRITICAL');

COMMIT;
3. Test Cases
3.1 Unit Test Cases
typescript
// asset.service.test.ts
import { AssetService } from './asset.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('AssetService', () => {
  let service: AssetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssetService],
    }).compile();
    service = module.get<AssetService>(AssetService);
  });

  // ============================================
  // TEST CASE 1: Add Cash Asset
  // ============================================
  describe('addCashAsset', () => {
    it('should successfully add a cash asset with valid data', async () => {
      const input = {
        applicationId: 'app_123',
        personId: 'person_456',
        assetType: 'CASH',
        assetSubtype: 'CHECKING',
        institutionName: 'Chase Bank',
        currentValue: 25000,
        accountDetails: {
          accountNumber: 'XXXX1234',
          accountHolderName: 'John Doe'
        }
      };

      const result = await service.addAsset(input);
      
      expect(result).toBeDefined();
      expect(result.assetId).toBeDefined();
      expect(result.verificationStatus).toBe('PENDING');
      expect(result.currentValue).toBe(25000);
    });

    it('should reject negative asset value', async () => {
      const input = {
        applicationId: 'app_123',
        personId: 'person_456',
        assetType: 'CASH',
        assetSubtype: 'CHECKING',
        currentValue: -5000
      };

      await expect(service.addAsset(input)).rejects.toThrow('Asset value cannot be negative');
    });

    it('should enforce maximum value limit for cash assets', async () => {
      const input = {
        applicationId: 'app_123',
        personId: 'person_456',
        assetType: 'CASH',
        assetSubtype: 'CHECKING',
        currentValue: 1000000000 // 1 billion
      };

      await expect(service.addAsset(input)).rejects.toThrow('Value exceeds maximum limit');
    });
  });

  // ============================================
  // TEST CASE 2: Large Deposit Detection
  // ============================================
  describe('detectLargeDeposits', () => {
    it('should flag large deposits exceeding 50% of monthly income', async () => {
      const monthlyIncome = 10000;
      const assetData = {
        applicationId: 'app_123',
        assetType: 'CASH',
        transactionHistory: [
          { date: '2026-03-01', amount: 6000, type: 'DEPOSIT' }
        ]
      };

      const flags = await service.detectLargeDeposits(assetData, monthlyIncome);
      
      expect(flags).toHaveLength(1);
      expect(flags[0].flagType).toBe('LARGE_DEPOSIT');
      expect(flags[0].severity).toBe('HIGH');
    });

    it('should not flag deposits below threshold', async () => {
      const monthlyIncome = 10000;
      const assetData = {
        applicationId: 'app_123',
        assetType: 'CASH',
        transactionHistory: [
          { date: '2026-03-01', amount: 4000, type: 'DEPOSIT' }
        ]
      };

      const flags = await service.detectLargeDeposits(assetData, monthlyIncome);
      
      expect(flags).toHaveLength(0);
    });
  });

  // ============================================
  // TEST CASE 3: Crypto Asset Haircut
  // ============================================
  describe('calculateCryptoHaircut', () => {
    it('should apply 50% haircut to crypto assets', async () => {
      const cryptoAsset = {
        assetType: 'CRYPTO',
        assetSubtype: 'BITCOIN',
        currentValue: 50000
      };

      const result = await service.calculateRiskAdjustedValue(cryptoAsset);
      
      expect(result.riskAdjustedValue).toBe(25000);
      expect(result.haircutPercentage).toBe(50);
    });

    it('should increase haircut for high volatility crypto', async () => {
      const cryptoAsset = {
        assetType: 'CRYPTO',
        assetSubtype: 'ALTCOIN',
        currentValue: 10000,
        volatility30d: 80 // 80% volatility
      };

      const result = await service.calculateRiskAdjustedValue(cryptoAsset);
      
      expect(result.haircutPercentage).toBe(70); // Increased haircut
      expect(result.riskAdjustedValue).toBe(3000);
    });
  });

  // ============================================
  // TEST CASE 4: Asset Concentration Risk
  // ============================================
  describe('calculateConcentrationRisk', () => {
    it('should flag concentration when single asset > 40% of total', async () => {
      const assets = [
        { id: '1', currentValue: 400000 },
        { id: '2', currentValue: 100000 },
        { id: '3', currentValue: 50000 }
      ];

      const risk = await service.calculateConcentrationRisk(assets);
      
      expect(risk.hasConcentrationRisk).toBe(true);
      expect(risk.concentratedAssetId).toBe('1');
      expect(risk.concentrationPercentage).toBe(72.7);
    });

    it('should not flag when assets are diversified', async () => {
      const assets = [
        { id: '1', currentValue: 150000 },
        { id: '2', currentValue: 150000 },
        { id: '3', currentValue: 150000 },
        { id: '4', currentValue: 150000 }
      ];

      const risk = await service.calculateConcentrationRisk(assets);
      
      expect(risk.hasConcentrationRisk).toBe(false);
    });
  });

  // ============================================
  // TEST CASE 5: Gift Funds Verification
  // ============================================
  describe('verifyGiftFunds', () => {
    it('should verify gift funds with complete documentation', async () => {
      const giftData = {
        donorName: 'Robert Doe',
        donorRelationship: 'PARENT',
        giftAmount: 35000,
        giftLetterUploaded: true,
        donorStatementUploaded: true
      };

      const result = await service.verifyGiftFunds(giftData);
      
      expect(result.verificationStatus).toBe('VERIFIED');
      expect(result.verificationNotes).toContain('Complete documentation');
    });

    it('should flag gift funds missing donor statement', async () => {
      const giftData = {
        donorName: 'Robert Doe',
        giftAmount: 35000,
        giftLetterUploaded: true,
        donorStatementUploaded: false
      };

      const result = await service.verifyGiftFunds(giftData);
      
      expect(result.verificationStatus).toBe('QUESTIONED');
      expect(result.flags).toContainEqual(
        expect.objectContaining({
          flagType: 'SOURCE_OF_FUNDS',
          severity: 'HIGH'
        })
      );
    });

    it('should reject gift from disallowed relationship', async () => {
      const giftData = {
        donorName: 'Friend Name',
        donorRelationship: 'FRIEND',
        giftAmount: 35000,
        giftLetterUploaded: true,
        donorStatementUploaded: true
      };

      const result = await service.verifyGiftFunds(giftData);
      
      expect(result.verificationStatus).toBe('REJECTED');
      expect(result.rejectionReason).toContain('disallowed relationship');
    });
  });

  // ============================================
  // TEST CASE 6: Trend Analysis
  // ============================================
  describe('calculateTrends', () => {
    it('should correctly calculate 30-day trend', async () => {
      const history = [
        { date: '2026-02-25', value: 10000 },
        { date: '2026-03-25', value: 12000 }
      ];

      const trends = await service.calculateTrends(history);
      
      expect(trends.trend30d).toBe(20);
      expect(trends.trendDirection).toBe('UPWARD');
    });

    it('should detect negative trend', async () => {
      const history = [
        { date: '2026-02-25', value: 15000 },
        { date: '2026-03-25', value: 12000 }
      ];

      const trends = await service.calculateTrends(history);
      
      expect(trends.trend30d).toBe(-20);
      expect(trends.trendDirection).toBe('DOWNWARD');
    });
  });

  // ============================================
  // TEST CASE 7: Document Expiry
  // ============================================
  describe('checkDocumentExpiry', () => {
    it('should flag documents older than 60 days', async () => {
      const document = {
        documentType: 'BANK_STATEMENT',
        statementDate: '2026-01-15', // 69 days ago
        assetId: 'asset_123'
      };

      const result = await service.checkDocumentFreshness(document);
      
      expect(result.isExpired).toBe(true);
      expect(result.actionRequired).toBe('UPLOAD_NEW_STATEMENT');
    });

    it('should accept documents within 60 days', async () => {
      const document = {
        documentType: 'BANK_STATEMENT',
        statementDate: '2026-03-01', // 24 days ago
        assetId: 'asset_123'
      };

      const result = await service.checkDocumentFreshness(document);
      
      expect(result.isExpired).toBe(false);
      expect(result.actionRequired).toBeNull();
    });
  });
});
3.2 Integration Test Cases
typescript
// asset.integration.test.ts
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('Asset Module Integration Tests', () => {
  let app: INestApplication;
  let authToken: string;
  let applicationId: string;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Login to get auth token
    const loginResponse = await request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({
        email: 'test@example.com',
        password: 'Test123!'
      });
    
    authToken = loginResponse.body.token;
  });

  afterAll(async () => {
    await app.close();
  });

  // ============================================
  // INTEGRATION TEST 1: Complete Asset Lifecycle
  // ============================================
  describe('Complete Asset Lifecycle', () => {
    it('should create application and add assets', async () => {
      // Create application
      const appResponse = await request(app.getHttpServer())
        .post('/api/v1/applications')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          loanType: 'CONVENTIONAL',
          propertyValue: 500000,
          downPayment: 50000
        });
      
      applicationId = appResponse.body.id;
      expect(applicationId).toBeDefined();

      // Add cash asset
      const cashResponse = await request(app.getHttpServer())
        .post(`/api/v1/applications/${applicationId}/assets`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          asset_type: 'CASH',
          asset_subtype: 'CHECKING',
          institution_name: 'Chase Bank',
          current_value: 25000.00
        });
      
      expect(cashResponse.status).toBe(201);
      expect(cashResponse.body.data.asset_id).toBeDefined();
    });

    it('should retrieve asset summary', async () => {
      const response = await request(app.getHttpServer())
        .get(`/api/v1/applications/${applicationId}/assets/summary`)
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(response.status).toBe(200);
      expect(response.body.summary.total_assets).toBeGreaterThan(0);
      expect(response.body.breakdown.CASH).toBeDefined();
    });

    it('should verify asset', async () => {
      // First get asset ID
      const assetsResponse = await request(app.getHttpServer())
        .get(`/api/v1/applications/${applicationId}/assets`)
        .set('Authorization', `Bearer ${authToken}`);
      
      const assetId = assetsResponse.body.data[0].id;

      // Verify asset
      const response = await request(app.getHttpServer())
        .post(`/api/v1/assets/${assetId}/verify`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          verification_status: 'VERIFIED',
          verification_method: 'MANUAL_REVIEW',
          verification_notes: 'All documents verified'
        });
      
      expect(response.status).toBe(200);
      expect(response.body.data.verification_status).toBe('VERIFIED');
    });

    it('should track asset history', async () => {
      const assetsResponse = await request(app.getHttpServer())
        .get(`/api/v1/applications/${applicationId}/assets`)
        .set('Authorization', `Bearer ${authToken}`);
      
      const assetId = assetsResponse.body.data[0].id;

      const response = await request(app.getHttpServer())
        .get(`/api/v1/assets/${assetId}/history`)
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(response.status).toBe(200);
      expect(response.body.history).toBeDefined();
    });
  });

  // ============================================
  // INTEGRATION TEST 2: Large Deposit Flagging
  // ============================================
  describe('Large Deposit Detection', () => {
    it('should flag large deposit', async () => {
      // Add asset with large deposit
      const response = await request(app.getHttpServer())
        .post(`/api/v1/applications/${applicationId}/assets`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          asset_type: 'CASH',
          asset_subtype: 'SAVINGS',
          institution_name: 'Bank of America',
          current_value: 50000.00,
          transaction_history: [
            { date: '2026-03-20', amount: 15000, type: 'DEPOSIT', description: 'Large deposit' }
          ]
        });
      
      expect(response.status).toBe(201);
      
      // Check flags
      const assetId = response.body.data.asset_id;
      const flagsResponse = await request(app.getHttpServer())
        .get(`/api/v1/assets/${assetId}/flags`)
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(flagsResponse.body.flags).toContainEqual(
        expect.objectContaining({
          flag_type: 'LARGE_DEPOSIT',
          severity: 'HIGH'
        })
      );
    });
  });

  // ============================================
  // INTEGRATION TEST 3: Crypto Asset Processing
  // ============================================
  describe('Crypto Asset Processing', () => {
    it('should add crypto asset with 50% haircut', async () => {
      const response = await request(app.getHttpServer())
        .post(`/api/v1/applications/${applicationId}/assets`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          asset_type: 'CRYPTO',
          asset_subtype: 'BITCOIN',
          institution_name: 'Coinbase',
          current_value: 25000.00,
          crypto_details: {
            exchange: 'Coinbase',
            quantity: 0.42,
            cost_basis: 18000.00
          }
        });
      
      expect(response.status).toBe(201);
      
      // Get trends to verify haircut
      const assetId = response.body.data.asset_id;
      const trendsResponse = await request(app.getHttpServer())
        .get(`/api/v1/assets/${assetId}/trends`)
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(trendsResponse.body.risk_analysis.haircut_applied).toBe(50);
      expect(trendsResponse.body.risk_analysis.risk_adjusted_value).toBe(12500);
    });
  });

  // ============================================
  // INTEGRATION TEST 4: Gift Funds Workflow
  // ============================================
  describe('Gift Funds Workflow', () => {
    it('should add gift funds with documentation', async () => {
      const response = await request(app.getHttpServer())
        .post(`/api/v1/applications/${applicationId}/assets`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          asset_type: 'GIFT',
          asset_subtype: 'GIFT_FUNDS',
          current_value: 35000.00,
          gift_details: {
            donor_name: 'Robert Doe',
            donor_relationship: 'PARENT',
            gift_amount: 35000.00,
            gift_date: '2026-03-20',
            funds_transfer_method: 'WIRE'
          },
          documents: [
            {
              document_type: 'GIFT_LETTER',
              file_url: 'https://storage.example.com/gift_letter.pdf'
            },
            {
              document_type: 'DONOR_BANK_STATEMENT',
              file_url: 'https://storage.example.com/donor_statement.pdf'
            }
          ]
        });
      
      expect(response.status).toBe(201);
      expect(response.body.data.verification_required_actions).toHaveLength(0);
    });

    it('should flag gift funds missing donor statement', async () => {
      const response = await request(app.getHttpServer())
        .post(`/api/v1/applications/${applicationId}/assets`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          asset_type: 'GIFT',
          asset_subtype: 'GIFT_FUNDS',
          current_value: 25000.00,
          gift_details: {
            donor_name: 'Jane Smith',
            donor_relationship: 'FRIEND',
            gift_amount: 25000.00
          }
        });
      
      expect(response.status).toBe(201);
      
      const assetId = response.body.data.asset_id;
      const flagsResponse = await request(app.getHttpServer())
        .get(`/api/v1/assets/${assetId}/flags`)
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(flagsResponse.body.flags).toContainEqual(
        expect.objectContaining({
          flag_type: 'SOURCE_OF_FUNDS',
          severity: 'HIGH'
        })
      );
    });
  });
});
4. UI Mockup Descriptions
4.1 Borrower Asset Entry Screen
text
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│  Add Asset                                                    Application #APP-2026-0421 │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                          │
│  Step 1 of 3: Select Asset Type                                                          │
│  ┌────────────────────────────────────────────────────────────────────────────────────┐ │
│  │                                                                                    │ │
│  │  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐             │ │
│  │  │  💰 CASH     │ │  📈 INVEST-  │ │  🏦 RETIRE-  │ │  🏠 REAL     │             │ │
│  │  │  & DEPOSITS  │ │  MENT        │ │  MENT        │ │  ESTATE      │             │ │
│  │  │              │ │              │ │              │ │              │             │ │
│  │  │  Checking    │ │  Stocks      │ │  401(k)      │ │  Primary     │             │ │
│  │  │  Savings     │ │  Bonds       │ │  IRA         │ │  Investment  │             │ │
│  │  │  CDs         │ │  Mutual Funds│ │  Pension     │ │  Land        │             │ │
│  │  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘             │ │
│  │                                                                                    │ │
│  │  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐             │ │
│  │  │  ₿ CRYPTO    │ │  💼 BUSINESS │ │  🎁 GIFT     │ │  🏭 OTHER    │             │ │
│  │  │              │ │              │ │  FUNDS       │ │              │             │ │
│  │  │  Bitcoin     │ │  LLC         │ │  Family Gift │ │  Vehicle     │             │ │
│  │  │  Ethereum    │ │  S-Corp      │ │  Inheritance │ │  Jewelry     │             │ │
│  │  │  Altcoins    │ │  Partnership │ │  Employer    │ │  Art         │             │ │
│  │  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘             │ │
│  │                                                                                    │ │
│  └────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                          │
│  [Continue]                                                                              │
│                                                                                          │
└─────────────────────────────────────────────────────────────────────────────────────────┘
4.2 Cash Asset Entry Form
text
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│  Add Cash/Deposit Asset                                               Step 2 of 3       │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                          │
│  Account Information                                                                     │
│  ┌────────────────────────────────────────────────────────────────────────────────────┐ │
│  │                                                                                    │ │
│  │  Financial Institution *                                                           │ │
│  │  ┌────────────────────────────────────────────────────────────────────────────┐   │ │
│  │  │ Chase Bank                                                          ▼      │   │ │
│  │  └────────────────────────────────────────────────────────────────────────────┘   │ │
│  │                                                                                    │ │
│  │  Account Type *                                                                    │ │
│  │  ○ Checking    ○ Savings    ○ Money Market    ○ Certificate of Deposit (CD)       │ │
│  │                                                                                    │ │
│  │  Account Number (last 4 digits) *                                                  │ │
│  │  ┌────────────────────────────────────────────────────────────────────────────┐   │ │
│  │  │ ****1234                                                                   │   │ │
│  │  └────────────────────────────────────────────────────────────────────────────┘   │ │
│  │                                                                                    │ │
│  │  Account Holder Name *                                                            │ │
│  │  ┌────────────────────────────────────────────────────────────────────────────┐   │ │
│  │  │ John Doe                                                                   │   │ │
│  │  └────────────────────────────────────────────────────────────────────────────┘   │ │
│  │                                                                                    │ │
│  │  Ownership *                                                                      │ │
│  │  ○ Individual    ○ Joint with Spouse    ○ Joint with Other    ○ Trust             │ │
│  │                                                                                    │ │
│  └────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                          │
│  Balance Information                                                                    │
│  ┌────────────────────────────────────────────────────────────────────────────────────┐ │
│  │                                                                                    │ │
│  │  Current Balance *                                                                 │ │
│  │  ┌────────────────────────────────────────────────────────────────────────────┐   │ │
│  │  │ $25,000.00                                                                 │   │ │
│  │  └────────────────────────────────────────────────────────────────────────────┘   │ │
│  │                                                                                    │ │
│  │  Statement Date *                                                                  │ │
│  │  ┌────────────────────────────────────────────────────────────────────────────┐   │ │
│  │  │ 03/25/2026                                                          📅     │   │ │
│  │  └────────────────────────────────────────────────────────────────────────────┘   │ │
│  │                                                                                    │ │
│  │  Average Balance (last 3 months)                                                   │ │
│  │  ┌────────────────────────────────────────────────────────────────────────────┐   │ │
│  │  │ $23,500.00 (calculated from statements)                                    │   │ │
│  │  └────────────────────────────────────────────────────────────────────────────┘   │ │
│  │                                                                                    │ │
│  │  Purpose of Funds (select all that apply) *                                       │ │
│  │  ☑ Down Payment    ☑ Reserves    ☐ Closing Costs    ☐ Other                      │ │
│  │                                                                                    │ │
│  └────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                          │
│  Verification Method                                                                    │
│  ┌────────────────────────────────────────────────────────────────────────────────────┐ │
│  │                                                                                    │ │
│  │  How would you like to verify this account?                                        │ │
│  │                                                                                    │ │
│  │  ┌────────────────────────────────────────────────────────────────────────────┐   │ │
│  │  │ [Connect with Plaid]  [Upload Statements]  [Enter Manually]               │   │ │
│  │  └────────────────────────────────────────────────────────────────────────────┘   │ │
│  │                                                                                    │ │
│  │  ℹ️ Plaid connects directly to your bank for instant verification.                │ │
│  │     This is the fastest method and reduces document requests.                     │ │
│  │                                                                                    │ │
│  └────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                          │
│  [Back]  [Continue]                                                                     │
│                                                                                          │
└─────────────────────────────────────────────────────────────────────────────────────────┘
4.3 Asset Summary Dashboard (Lender View)
text
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│  Asset Verification Dashboard                                   Application #APP-2026-0421│
│  Borrower: John Doe | Loan Officer: Sarah Johnson              Status: In Review        │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                          │
│  ┌────────────────────────────────────────────────────────────────────────────────────┐ │
│  │  Asset Summary Cards                                                               │ │
│  │  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐             │ │
│  │  │ Total Assets │ │ Liquid Assets│ │ Required DP  │ │ Reserves     │             │ │
│  │  │   $425,000   │ │   $185,000   │ │   $35,000    │ │   $150,000   │             │ │
│  │  │  ▲ +5.9%     │ │  ▲ +8.2%     │ │  ✅ Covered  │ │  ✅ 6.2 mos  │             │ │
│  │  │  vs last 30d │ │  vs last 30d │ │              │ │              │             │ │
│  │  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘             │ │
│  └────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                          │
│  Verification Progress                                                                  │
│  ┌────────────────────────────────────────────────────────────────────────────────────┐ │
│  │                                                                                    │ │
│  │  Overall Progress: ████████████████████░░░░░░░░░░ 80% (8/10 assets verified)     │ │
│  │                                                                                    │ │
│  │  ┌────────────────────────────────────────────────────────────────────────────┐   │ │
│  │  │ Status Legend:  ✓ Verified   ⏳ Pending   ❓ Questioned   ✗ Rejected      │   │ │
│  │  └────────────────────────────────────────────────────────────────────────────┘   │ │
│  │                                                                                    │ │
│  └────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                          │
│  Asset List                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────────────────┐ │
│  │                                                                                    │ │
│  │  ▼ Cash & Deposits (3 assets)                                   $170,000   ✓ 80% │ │
│  │    ┌────────────────────────────────────────────────────────────────────────────┐ │ │
│  │    │ ✓ Chase Checking          $25,000     Verified 03/25  Plaid               │ │ │
│  │    │   └─ Last statement: 03/15/2026  ✅ Fresh                                │ │ │
│  │    │                                                                           │ │ │
│  │    │ ✓ Chase Savings           $85,000     Verified 03/25  Plaid               │ │ │
│  │    │   └─ Last statement: 03/15/2026  ✅ Fresh                                │ │ │
│  │    │                                                                           │ │ │
│  │    │ ✓ Marcus CD               $60,000     Verified 03/24  Statement           │ │ │
│  │    │   └─ Maturity: 09/15/2026  ✅ Active                                     │ │ │
│  │    └────────────────────────────────────────────────────────────────────────────┘ │ │
│  │                                                                                    │ │
│  │  ▼ Investment Assets (3 assets)                                 $105,000   ✓ 100%│ │
│  │    ┌────────────────────────────────────────────────────────────────────────────┐ │ │
│  │    │ ✓ Vanguard S&P 500 ETF    $65,000     Verified 03/24  Brokerage           │ │ │
│  │    │   └─ 30-day trend: +5.9%  📈 Strong growth                               │ │ │
│  │    │                                                                           │ │ │
│  │    │ ✓ Apple Stock             $25,000     Verified 03/24  Brokerage           │ │ │
│  │    │   └─ 30-day trend: -3%  📉 Declining - Monitor                           │ │ │
│  │    │                                                                           │ │ │
│  │    │ ✓ Vanguard Total Bond     $15,000     Verified 03/24  Brokerage           │ │ │
│  │    │   └─ 30-day trend: +1%  📈 Stable                                        │ │ │
│  │    └────────────────────────────────────────────────────────────────────────────┘ │ │
│  │                                                                                    │ │
│  │  ▼ Retirement Assets (2 assets)                                 $85,000    ✓ 100%│ │
│  │    ┌────────────────────────────────────────────────────────────────────────────┐ │ │
│  │    │ ✓ Fidelity 401k           $65,000     Verified 03/24  Statement           │ │ │
│  │    │   └─ Vesting: 100% │ Loan against: $0                                      │ │ │
│  │    │                                                                           │ │ │
│  │    │ ✓ Vanguard Roth IRA       $20,000     Verified 03/24  Statement           │ │ │
│  │    │   └─ Contribution YTD: $6,500                                             │ │ │
│  │    └────────────────────────────────────────────────────────────────────────────┘ │ │
│  │                                                                                    │ │
│  │  ⚠️ Cryptocurrency (1 asset)                                  $25,000    ❓ 0%   │ │
│  │    ┌────────────────────────────────────────────────────────────────────────────┐ │ │
│  │    │ ❓ Coinbase - Bitcoin       $25,000     Questioned 03/25                   │ │ │
│  │    │   └─ ⚠️ Flag: High volatility detected (-15% in 30 days)                 │ │ │
│  │    │   └─ ⚠️ Action Required: Request 90-day exchange statement               │ │ │
│  │    │   └─ [Request Docs]  [Apply Haircut]  [Reject]                            │ │ │
│  │    └────────────────────────────────────────────────────────────────────────────┘ │ │
│  │                                                                                    │ │
│  │  ✓ Gift Funds (1 asset)                                       $35,000    ✓ 100%│ │
│  │    ┌────────────────────────────────────────────────────────────────────────────┐ │ │
│  │    │ ✓ Parent Gift              $35,000     Verified 03/25  Gift Letter        │ │ │
│  │    │   └─ Donor: Robert Doe │ Relationship: Parent │ Transfer: Wire           │ │ │
│  │    │   └─ ✅ All documentation complete                                         │ │ │
│  │    └────────────────────────────────────────────────────────────────────────────┘ │ │
│  │                                                                                    │ │
│  └────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                          │
│  Risk Analysis                                                                            │
│  ┌────────────────────────────────────────────────────────────────────────────────────┐ │
│  │                                                                                    │ │
│  │  Concentration Risk:  ┌─────────────────────────────────────────────────────────┐ │ │
│  │  │ Medium - 40% in single institution (Chase Bank)                              │ │ │
│  │  └─────────────────────────────────────────────────────────────────────────────┘ │ │
│  │                                                                                    │ │
│  │  Volatility Risk:    ┌─────────────────────────────────────────────────────────┐ │ │
│  │  │ High - 25% in high-volatility assets (Crypto + Equities)                    │ │ │
│  │  └─────────────────────────────────────────────────────────────────────────────┘ │ │
│  │                                                                                    │ │
│  │  Liquidity Risk:     ┌─────────────────────────────────────────────────────────┐ │ │
│  │  │ Low - 43% liquid assets (Cash + Liquid Investments)                         │ │ │
│  │  └─────────────────────────────────────────────────────────────────────────────┘ │ │
│  │                                                                                    │ │
│  │  Overall Risk Score: 65/100  (Moderate Risk)                                     │ │
│  │  Recommendation: Accept with condition - verify crypto assets                     │ │
│  │                                                                                    │ │
│  └────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                          │
│  Actions                                                                                 │
│  ┌────────────────────────────────────────────────────────────────────────────────────┐ │
│  │                                                                                    │ │
│  │  [Verify All]  [Request Additional Docs]  [Generate Report]  [Approve Assets]    │ │
│  │                                                                                    │ │
│  └────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                          │
└─────────────────────────────────────────────────────────────────────────────────────────┘
4.4 Asset Trend Analysis Chart (Lender View)
text
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│  Asset Trend Analysis                                            Asset: Vanguard S&P 500 │
│  Asset ID: ast_123456789                                         Type: Investment       │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                          │
│  ┌────────────────────────────────────────────────────────────────────────────────────┐ │
│  │  Value Trend (Last 90 Days)                                                        │ │
│  │                                                                                    │ │
│  │  $70K ┤                                                                           │ │
│  │  $65K ┤                                          ╭───────────╮                    │ │
│  │  $60K ┤                              ╭───────────╯           ╰───────╮            │ │
│  │  $55K ┤                    ╭─────────╯                           ╭───╯            │ │
│  │  $50K ┤          ╭─────────╯                                     ╰───────╮        │ │
│  │  $45K ┤──────────╯                                                    ╰───────│ │
│  │  $40K ┤                                                                         │ │
│  │       └────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┬────┘        │ │
│  │           Jan 1  Jan 15 Feb 1 Feb 15 Mar 1 Mar 15 Mar 25                        │ │
│  │                                                                                    │ │
│  │  ─── Actual Value    ─── Forecast (95% CI)    ─── Benchmark (S&P 500)            │ │
│  │                                                                                    │ │
│  └────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                          │
│  ┌─────────────────────────────────────┐ ┌─────────────────────────────────────────────┐ │
│  │  Key Metrics                        │ │  Volatility Analysis                        │ │
│  │  ─────────────────────────────────  │ │  ─────────────────────────────────────────  │ │
│  │  Current Value:     $65,000         │ │                                              │ │
│  │  7-Day Change:      +0.31%          │ │  Historical Volatility: 8.5%                │ │
│  │  30-Day Change:     +5.9%           │ │  Implied Volatility:  9.2%                  │ │
│  │  90-Day Change:     +12.07%         │ │  Sharpe Ratio:         1.2                  │ │
│  │  YTD Change:        +3.8%           │ │  Max Drawdown (90d):   -3.2%                │ │
│  │  Risk-Adjusted:     $58,500         │ │  Recovery Days:        15                   │ │
│  │  Haircut Applied:   10%             │ │                                              │ │
│  └─────────────────────────────────────┘ └─────────────────────────────────────────────┘ │
│                                                                                          │
│  ┌─────────────────────────────────────┐ ┌─────────────────────────────────────────────┐ │
│  │  Forecast (Next 30 Days)            │ │  Risk Assessment                            │ │
│  │  ─────────────────────────────────  │ │  ─────────────────────────────────────────  │ │
│  │  Predicted Value:   $67,800         │ │                                              │ │
│  │  Confidence Lower:  $64,410         │ │  Volatility Rating:   MODERATE              │ │
│  │  Confidence Upper:  $71,190         │ │  Concentration Risk:  LOW                    │ │
│  │  Confidence Level:  95%             │ │  Liquidity Rating:    HIGH                   │ │
│  │  Trend Direction:   UPWARD          │ │  Overall Risk Score:  35/100                │ │
│  │  Model Accuracy:    92.5%           │ │  Recommendation:      ACCEPT                │ │
│  └─────────────────────────────────────┘ └─────────────────────────────────────────────┘ │
│                                                                                          │
│  Alerts & Notifications                                                                  │
│  ┌────────────────────────────────────────────────────────────────────────────────────┐ │
│  │ ℹ️ Asset showing consistent upward trend over 90 days (12.07% growth)            │ │
│  │ ℹ️ Volatility within acceptable range for this asset class                        │ │
│  │ ✓ No concentration concerns - asset well diversified                              │ │
│  └────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                          │
│  [Export Data]  [Refresh Valuation]  [Add Note]  [Close]                                │
│                                                                                          │
└─────────────────────────────────────────────────────────────────────────────────────────┘
4.5 Mobile App Asset Entry (Responsive View)
text
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│  📱 Add Asset                                                    ☰  ←  Save Draft      │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                          │
│  Select Asset Type                                                                       │
│  ┌────────────────────────────────────────────────────────────────────────────────────┐ │
│  │                                                                                    │ │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐                  │ │
│  │  │    💰      │  │    📈      │  │    🏦      │  │    🏠      │                  │ │
│  │  │   Cash     │  │ Investment │  │ Retirement │  │ Real Estate│                  │ │
│  │  └────────────┘  └────────────┘  └────────────┘  └────────────┘                  │ │
│  │                                                                                    │ │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐                  │ │
│  │  │    ₿       │  │    💼      │  │    🎁      │  │    🏭      │                  │ │
│  │  │  Crypto    │  │  Business  │  │   Gift     │  │   Other    │                  │ │
│  │  └────────────┘  └────────────┘  └────────────┘  └────────────┘                  │ │
│  │                                                                                    │ │
│  └────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                          │
│  ┌────────────────────────────────────────────────────────────────────────────────────┐ │
│  │  Bank Account Details                                                              │ │
│  │                                                                                    │ │
│  │  Bank Name                                                                         │ │
│  │  ┌────────────────────────────────────────────────────────────────────────────┐   │ │
│  │  │ Chase Bank                                                                 │   │ │
│  │  └────────────────────────────────────────────────────────────────────────────┘   │ │
│  │                                                                                    │ │
│  │  Account Type                                                                      │ │
│  │  ○ Checking    ○ Savings    ○ CD                                                   │ │
│  │                                                                                    │ │
│  │  Last 4 Digits                                                                     │ │
│  │  ┌────────────────────────────────────────────────────────────────────────────┐   │ │
│  │  │ 1234                                                                       │   │ │
│  │  └────────────────────────────────────────────────────────────────────────────┘   │ │
│  │                                                                                    │ │
│  │  Current Balance                                                                   │ │
│  │  ┌────────────────────────────────────────────────────────────────────────────┐   │ │
│  │  │ $25,000.00                                                                 │   │ │
│  │  └────────────────────────────────────────────────────────────────────────────┘   │ │
│  │                                                                                    │ │
│  └────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                          │
│  ┌────────────────────────────────────────────────────────────────────────────────────┐ │
│  │  Verification                                                                      │ │
│  │                                                                                    │ │
│  │  [🔌 Connect with Plaid]  [📎 Upload Statement]                                    │ │
│  │                                                                                    │ │
│  │  ⚡ Fastest way to verify your account                                             │ │
│  │                                                                                    │ │
│  └────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                          │
│  [← Back]                                          [Save & Continue →]                  │
│                                                                                          │
└─────────────────────────────────────────────────────────────────────────────────────────┘
This completes the comprehensive technical specification for the Asset Management module including:

Complete API specifications with request/response examples for all asset types

Database migration scripts with full schema, indexes, triggers, and views

Unit and integration test cases covering all critical functionality

UI mockup descriptions for borrower and lender interfaces with responsive design

Would you like me to provide additional details on any of these sections?

Yeh response AI generated hai, sirf reference ke liye.
yes
Here's the additional comprehensive content covering the remaining areas:

Asset Management Module - Additional Technical Specifications
5. Advanced Asset Valuation Algorithms
5.1 Asset Haircut Calculation Engine
typescript
// asset-haircut.service.ts
export class AssetHaircutService {
  
  /**
   * Calculate risk-adjusted value based on asset type and market conditions
   */
  calculateHaircut(asset: Asset): HaircutResult {
    const baseHaircut = this.getBaseHaircut(asset);
    const volatilityAdjustment = this.getVolatilityAdjustment(asset);
    const liquidityAdjustment = this.getLiquidityAdjustment(asset);
    const concentrationAdjustment = this.getConcentrationAdjustment(asset);
    
    const totalHaircut = Math.min(
      baseHaircut + volatilityAdjustment + liquidityAdjustment + concentrationAdjustment,
      100 // Max 100% haircut
    );
    
    return {
      haircutPercentage: totalHaircut,
      riskAdjustedValue: asset.currentValue * (1 - totalHaircut / 100),
      factors: {
        base: baseHaircut,
        volatility: volatilityAdjustment,
        liquidity: liquidityAdjustment,
        concentration: concentrationAdjustment
      }
    };
  }
  
  private getBaseHaircut(asset: Asset): number {
    const haircutMatrix = {
      CASH: {
        CHECKING: 0,
        SAVINGS: 0,
        MONEY_MARKET: 0,
        CD: asset.remainingTermDays < 90 ? 0 : 5
      },
      INVESTMENT: {
        STOCKS_LARGE_CAP: 10,
        STOCKS_SMALL_CAP: 20,
        BONDS_INVESTMENT_GRADE: 5,
        BONDS_HIGH_YIELD: 25,
        MUTUAL_FUNDS: 10,
        ETF: 10
      },
      RETIREMENT: {
        '401K': 0,
        IRA: 0,
        PENSION: 0,
        ROTH_IRA: 0
      },
      CRYPTO: {
        BITCOIN: 50,
        ETHEREUM: 50,
        ALTCOIN: 70,
        STABLECOIN: 10
      },
      REAL_ESTATE: {
        PRIMARY: 0,
        INVESTMENT: 10,
        LAND: 25
      },
      GIFT: {
        GIFT_FUNDS: 0
      }
    };
    
    return haircutMatrix[asset.assetType]?.[asset.assetSubtype] || 15;
  }
  
  private getVolatilityAdjustment(asset: Asset): number {
    if (!asset.volatilityScore) return 0;
    
    // Additional haircut for high volatility assets
    if (asset.volatilityScore > 30) return 15;
    if (asset.volatilityScore > 20) return 10;
    if (asset.volatilityScore > 10) return 5;
    return 0;
  }
  
  private getLiquidityAdjustment(asset: Asset): number {
    // Assets with withdrawal restrictions get higher haircut
    if (asset.withdrawalRestrictions?.includes('LOCKED')) return 25;
    if (asset.withdrawalRestrictions?.includes('PENALTY')) return 10;
    if (asset.withdrawalRestrictions?.includes('NOTICE_PERIOD')) return 5;
    return 0;
  }
  
  private getConcentrationAdjustment(asset: Asset): number {
    // If asset represents > 40% of total portfolio, add haircut
    if (asset.concentrationPercentage > 60) return 20;
    if (asset.concentrationPercentage > 40) return 10;
    return 0;
  }
}
5.2 Automated Valuation Model (AVM) Integration
typescript
// avm-integration.service.ts
export class AVMIntegrationService {
  
  async getPropertyValuation(property: Property): Promise<ValuationResult> {
    // Fetch from multiple AVM sources
    const valuations = await Promise.all([
      this.getCoreLogicValuation(property),
      this.getZillowValuation(property),
      this.getClearCapitalValuation(property)
    ]);
    
    // Calculate weighted average
    const weightedValue = this.calculateWeightedAverage(valuations);
    const confidenceScore = this.calculateConfidenceScore(valuations);
    
    // Determine if appraisal is needed
    const appraisalRequired = confidenceScore < 80 || 
                              this.hasSignificantDiscrepancy(valuations);
    
    return {
      estimatedValue: weightedValue,
      confidenceScore,
      range: {
        low: Math.min(...valuations.map(v => v.value)),
        high: Math.max(...valuations.map(v => v.value))
      },
      sources: valuations,
      appraisalRequired,
      recommendation: appraisalRequired ? 'ORDER_APPRAISAL' : 'ACCEPT_AVM'
    };
  }
  
  private calculateWeightedAverage(valuations: ValuationSource[]): number {
    // Weight by source reliability
    const weights = {
      CORE_LOGIC: 0.4,
      ZILLOW: 0.3,
      CLEAR_CAPITAL: 0.3
    };
    
    let total = 0;
    for (const v of valuations) {
      total += v.value * weights[v.source];
    }
    return total;
  }
  
  private hasSignificantDiscrepancy(valuations: ValuationSource[]): boolean {
    const values = valuations.map(v => v.value);
    const maxDiff = Math.max(...values) - Math.min(...values);
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    return (maxDiff / avg) > 0.15; // >15% discrepancy
  }
}
6. Event-Driven Architecture
6.1 Asset Event Schema
typescript
// asset-events.ts
export enum AssetEventType {
  ASSET_CREATED = 'asset.created',
  ASSET_UPDATED = 'asset.updated',
  ASSET_VERIFIED = 'asset.verified',
  ASSET_FLAGGED = 'asset.flagged',
  ASSET_REJECTED = 'asset.rejected',
  LARGE_DEPOSIT_DETECTED = 'asset.large_deposit',
  ASSET_EXPIRING = 'asset.expiring',
  ASSET_REFRESHED = 'asset.refreshed',
  CONCENTRATION_RISK_DETECTED = 'asset.concentration_risk'
}

export interface AssetEvent {
  id: string;
  type: AssetEventType;
  assetId: string;
  applicationId: string;
  timestamp: Date;
  data: Record<string, any>;
  metadata: {
    userId?: string;
    source: string;
    version: string;
  };
}

// Event Handlers
export class AssetEventHandlers {
  
  @EventHandler(AssetEventType.ASSET_CREATED)
  async handleAssetCreated(event: AssetEvent) {
    // Trigger automatic verification if possible
    if (event.data.assetType === 'CASH' && event.data.plaidConnected) {
      await this.triggerPlaidVerification(event.assetId);
    }
    
    // Schedule valuation refresh
    await this.scheduleValuationRefresh(event.assetId);
    
    // Update application summary
    await this.updateApplicationAssetSummary(event.applicationId);
  }
  
  @EventHandler(AssetEventType.LARGE_DEPOSIT_DETECTED)
  async handleLargeDeposit(event: AssetEvent) {
    // Create compliance flag
    await this.createComplianceFlag({
      assetId: event.assetId,
      flagType: 'SOURCE_OF_FUNDS',
      severity: 'HIGH',
      description: `Large deposit of $${event.data.amount} detected on ${event.data.date}`
    });
    
    // Notify compliance team
    await this.notifyComplianceTeam(event.assetId);
    
    // Add to QC queue
    await this.addToQualityControlQueue(event.assetId);
  }
  
  @EventHandler(AssetEventType.ASSET_EXPIRING)
  async handleAssetExpiring(event: AssetEvent) {
    // Notify borrower
    await this.notifyBorrower({
      assetId: event.assetId,
      message: `Your ${event.data.documentType} will expire in ${event.data.daysRemaining} days. Please upload a new one.`
    });
    
    // Notify loan processor
    await this.notifyProcessor({
      assetId: event.assetId,
      message: `Asset documentation expiring - action required`
    });
  }
  
  @EventHandler(AssetEventType.CONCENTRATION_RISK_DETECTED)
  async handleConcentrationRisk(event: AssetEvent) {
    // Add to underwriting notes
    await this.addUnderwritingNote({
      applicationId: event.applicationId,
      note: `Concentration risk detected: ${event.data.percentage}% in ${event.data.institution}`
    });
    
    // If high risk, flag for review
    if (event.data.percentage > 60) {
      await this.createUnderwritingFlag(event.applicationId, 'CONCENTRATION_RISK', 'HIGH');
    }
  }
}
6.2 Asset Workflow State Machine
typescript
// asset-workflow.state.ts
export class AssetWorkflowStateMachine {
  private states = {
    DRAFT: {
      transitions: ['SUBMITTED', 'DELETED']
    },
    SUBMITTED: {
      transitions: ['VERIFICATION_PENDING', 'AUTO_VERIFIED']
    },
    VERIFICATION_PENDING: {
      transitions: ['IN_REVIEW', 'AUTO_VERIFIED']
    },
    IN_REVIEW: {
      transitions: ['VERIFIED', 'QUESTIONED', 'REJECTED']
    },
    QUESTIONED: {
      transitions: ['IN_REVIEW', 'REJECTED', 'EXPIRED']
    },
    VERIFIED: {
      transitions: ['EXPIRED', 'REFRESHED']
    },
    REFRESHED: {
      transitions: ['VERIFIED', 'QUESTIONED']
    },
    REJECTED: {
      transitions: ['DELETED']
    },
    EXPIRED: {
      transitions: ['DELETED']
    },
    DELETED: {
      transitions: []
    }
  };
  
  async transition(assetId: string, newState: string, context: WorkflowContext): Promise<Asset> {
    const asset = await this.getAsset(assetId);
    const currentState = asset.workflowState;
    
    if (!this.isValidTransition(currentState, newState)) {
      throw new InvalidWorkflowTransitionError(
        `Cannot transition from ${currentState} to ${newState}`
      );
    }
    
    // Execute pre-transition hooks
    await this.executePreTransitionHooks(asset, newState, context);
    
    // Update state
    asset.workflowState = newState;
    asset.workflowHistory.push({
      fromState: currentState,
      toState: newState,
      timestamp: new Date(),
      userId: context.userId,
      reason: context.reason
    });
    
    await this.saveAsset(asset);
    
    // Execute post-transition hooks
    await this.executePostTransitionHooks(asset, currentState, context);
    
    // Emit event
    await this.eventBus.emit({
      type: 'asset.workflow.transitioned',
      assetId,
      fromState: currentState,
      toState: newState,
      timestamp: new Date()
    });
    
    return asset;
  }
  
  private async executePreTransitionHooks(asset: Asset, newState: string, context: WorkflowContext): Promise<void> {
    switch (newState) {
      case 'VERIFIED':
        // Validate all documents are present
        await this.validateDocuments(asset.id);
        // Calculate final risk-adjusted value
        await this.calculateFinalValue(asset.id);
        break;
        
      case 'QUESTIONED':
        // Create question record
        await this.createQuestionRecord(asset.id, context.question);
        // Notify borrower
        await this.notifyBorrower(asset.applicationId, asset.id, context.question);
        break;
        
      case 'REJECTED':
        // Log rejection reason
        await this.logRejection(asset.id, context.reason);
        // Update application score
        await this.updateApplicationScore(asset.applicationId);
        break;
    }
  }
}
7. Fraud Detection Engine
7.1 Asset Fraud Detection Service
typescript
// fraud-detection.service.ts
export class AssetFraudDetectionService {
  
  async analyzeAssetForFraud(asset: Asset, applicationContext: ApplicationContext): Promise<FraudAnalysisResult> {
    const checks = await Promise.all([
      this.checkDocumentTampering(asset),
      this.checkIncomeDiscrepancy(asset, applicationContext),
      this.checkEmploymentDiscrepancy(asset, applicationContext),
      this.checkAddressConsistency(asset, applicationContext),
      this.checkTransactionPatterns(asset),
      this.checkIdentityMatch(asset, applicationContext)
    ]);
    
    const fraudScore = this.calculateFraudScore(checks);
    const flags = checks.filter(c => c.isSuspicious).map(c => c.flag);
    
    return {
      fraudScore,
      riskLevel: this.getRiskLevel(fraudScore),
      flags,
      requiresManualReview: fraudScore > 50,
      recommendations: this.generateRecommendations(fraudScore, flags)
    };
  }
  
  private async checkDocumentTampering(asset: Asset): Promise<FraudCheck> {
    const documents = await this.getAssetDocuments(asset.id);
    const tamperingSignals = [];
    
    for (const doc of documents) {
      // Check for PDF manipulation
      if (doc.fileType === 'application/pdf') {
        const pdfAnalysis = await this.analyzePDF(doc.url);
        if (pdfAnalysis.hasJavaScript || pdfAnalysis.hasEncryption || pdfAnalysis.hasFormFields) {
          tamperingSignals.push({
            documentId: doc.id,
            issue: 'PDF contains potentially manipulated content'
          });
        }
      }
      
      // Check image metadata
      if (doc.fileType.startsWith('image/')) {
        const imageAnalysis = await this.analyzeImage(doc.url);
        if (imageAnalysis.hasBeenEdited) {
          tamperingSignals.push({
            documentId: doc.id,
            issue: 'Image shows signs of editing'
          });
        }
      }
      
      // OCR text analysis
      const extractedText = doc.ocrText;
      if (this.containsSuspiciousKeywords(extractedText)) {
        tamperingSignals.push({
          documentId: doc.id,
          issue: 'Document contains suspicious keywords'
        });
      }
    }
    
    return {
      checkName: 'Document Tampering',
      isSuspicious: tamperingSignals.length > 0,
      flag: tamperingSignals.length > 0 ? {
        type: 'DOCUMENT_TAMPERING',
        severity: 'CRITICAL',
        details: tamperingSignals
      } : null,
      score: tamperingSignals.length * 25
    };
  }
  
  private async checkTransactionPatterns(asset: Asset): Promise<FraudCheck> {
    const transactions = asset.transactions || [];
    const suspiciousPatterns = [];
    
    // Check for structuring (multiple deposits just under reporting threshold)
    const thresholds = [5000, 8000, 9000, 9500, 9900];
    const structuringDeposits = transactions.filter(t => 
      t.type === 'DEPOSIT' && 
      thresholds.some(th => Math.abs(t.amount - th) < 100)
    );
    
    if (structuringDeposits.length >= 3) {
      suspiciousPatterns.push({
        pattern: 'STRUCTURING',
        description: 'Multiple deposits just under reporting threshold',
        count: structuringDeposits.length,
        totalAmount: structuringDeposits.reduce((sum, t) => sum + t.amount, 0)
      });
    }
    
    // Check for circular transactions (money in, then out quickly)
    const circularPatterns = this.detectCircularTransactions(transactions);
    if (circularPatterns.length > 0) {
      suspiciousPatterns.push({
        pattern: 'CIRCULAR',
        description: 'Funds appear to be cycled through accounts',
        details: circularPatterns
      });
    }
    
    // Check for unusual velocity (sudden spike in transactions)
    const velocityScore = this.calculateVelocityScore(transactions);
    if (velocityScore > 0.8) {
      suspiciousPatterns.push({
        pattern: 'HIGH_VELOCITY',
        description: 'Unusual transaction velocity detected',
        score: velocityScore
      });
    }
    
    return {
      checkName: 'Transaction Pattern Analysis',
      isSuspicious: suspiciousPatterns.length > 0,
      flag: suspiciousPatterns.length > 0 ? {
        type: 'SUSPICIOUS_TRANSACTIONS',
        severity: 'HIGH',
        details: suspiciousPatterns
      } : null,
      score: Math.min(suspiciousPatterns.length * 20, 100)
    };
  }
  
  private async checkIdentityMatch(asset: Asset, context: ApplicationContext): Promise<FraudCheck> {
    let mismatchCount = 0;
    const mismatches = [];
    
    // Check account holder name matches borrower
    const accountHolder = asset.accountHolderName;
    const borrowerName = context.borrowerName;
    
    if (!this.namesMatch(accountHolder, borrowerName)) {
      mismatchCount++;
      mismatches.push({
        field: 'account_holder',
        expected: borrowerName,
        actual: accountHolder
      });
    }
    
    // Check address consistency
    const accountAddress = asset.accountAddress;
    const borrowerAddress = context.borrowerAddress;
    
    if (accountAddress && !this.addressesMatch(accountAddress, borrowerAddress)) {
      mismatchCount++;
      mismatches.push({
        field: 'address',
        expected: borrowerAddress,
        actual: accountAddress
      });
    }
    
    // Check SSN/TIN consistency across assets
    const tinOnAccount = asset.tin;
    const borrowerTin = context.borrowerTin;
    
    if (tinOnAccount && tinOnAccount !== borrowerTin) {
      mismatchCount++;
      mismatches.push({
        field: 'tax_id',
        expected: borrowerTin,
        actual: tinOnAccount
      });
    }
    
    return {
      checkName: 'Identity Match',
      isSuspicious: mismatchCount > 0,
      flag: mismatchCount > 0 ? {
        type: 'IDENTITY_MISMATCH',
        severity: mismatchCount > 1 ? 'CRITICAL' : 'HIGH',
        details: mismatches
      } : null,
      score: mismatchCount * 30
    };
  }
  
  private calculateFraudScore(checks: FraudCheck[]): number {
    // Weighted average of all checks
    const weights = {
      'Document Tampering': 1.5,
      'Transaction Pattern Analysis': 1.2,
      'Income Discrepancy': 1.0,
      'Employment Discrepancy': 1.0,
      'Address Consistency': 0.8,
      'Identity Match': 1.3
    };
    
    let totalScore = 0;
    let totalWeight = 0;
    
    for (const check of checks) {
      const weight = weights[check.checkName] || 1.0;
      totalScore += check.score * weight;
      totalWeight += weight;
    }
    
    return totalWeight > 0 ? totalScore / totalWeight : 0;
  }
}
8. Compliance & Regulatory Reporting
8.1 HMDA Reporting for Assets
typescript
// hmda-reporting.service.ts
export class HMDAAssetReportingService {
  
  async generateHMDAReport(application: LoanApplication): Promise<HMDARecord> {
    const assets = await this.getApplicationAssets(application.id);
    
    return {
      loanId: application.id,
      reportingYear: new Date().getFullYear(),
      
      // Asset-related HMDA fields
      applicantAssets: {
        totalAssets: this.calculateTotalAssets(assets),
        liquidAssets: this.calculateLiquidAssets(assets),
        retirementAssets: this.calculateRetirementAssets(assets),
        downPaymentAmount: application.downPayment,
        downPaymentSource: this.determineDownPaymentSource(assets),
        giftFundsUsed: this.hasGiftFunds(assets),
        giftFundsAmount: this.getGiftFundsAmount(assets)
      },
      
      // Income verification
      incomeVerified: application.incomeVerificationStatus === 'VERIFIED',
      incomeVerificationMethod: application.incomeVerificationMethod,
      
      // Employment verification
      employmentVerified: application.employmentVerificationStatus === 'VERIFIED',
      
      // Asset concentration (for fair lending analysis)
      assetConcentration: {
        cashPercentage: this.getPercentageByType(assets, 'CASH'),
        investmentPercentage: this.getPercentageByType(assets, 'INVESTMENT'),
        realEstatePercentage: this.getPercentageByType(assets, 'REAL_ESTATE'),
        cryptoPercentage: this.getPercentageByType(assets, 'CRYPTO')
      },
      
      // Demographic data (for fair lending)
      applicantDemographics: {
        race: application.applicantRace,
        ethnicity: application.applicantEthnicity,
        gender: application.applicantGender,
        age: application.applicantAge,
        income: application.applicantIncome
      }
    };
  }
  
  private determineDownPaymentSource(assets: Asset[]): string {
    const giftFunds = assets.find(a => a.assetType === 'GIFT');
    if (giftFunds) return 'GIFT';
    
    const liquidAssets = assets.filter(a => ['CASH', 'INVESTMENT'].includes(a.assetType));
    if (liquidAssets.length > 0) return 'LIQUID_ASSETS';
    
    const retirementAssets = assets.filter(a => a.assetType === 'RETIREMENT');
    if (retirementAssets.length > 0) return 'RETIREMENT_WITHDRAWAL';
    
    return 'OTHER';
  }
}
8.2 Anti-Money Laundering (AML) Checks
typescript
// aml-compliance.service.ts
export class AMLComplianceService {
  
  async performAMLCheck(asset: Asset, application: LoanApplication): Promise<AMLResult> {
    const checks = await Promise.all([
      this.checkSanctionsList(asset, application),
      this.checkPEPStatus(asset, application),
      this.checkSourceOfFunds(asset),
      this.checkTransactionMonitoring(asset),
      this.checkGeographicRisk(asset, application)
    ]);
    
    const riskScore = this.calculateAMLRiskScore(checks);
    const flags = checks.filter(c => c.flagged).map(c => c.flag);
    
    return {
      riskScore,
      riskLevel: this.getAMLRiskLevel(riskScore),
      flags,
      requiresSAR: riskScore > 80,
      requiresEnhancedDueDiligence: riskScore > 60,
      recommendations: this.getAMLRecommendations(riskScore, flags)
    };
  }
  
  private async checkSourceOfFunds(asset: Asset): Promise<AMLCheck> {
    // Check for large deposits without clear source
    const largeDeposits = asset.transactions?.filter(t => 
      t.type === 'DEPOSIT' && 
      t.amount > 10000 &&
      !t.sourceDocumented
    ) || [];
    
    // Check for cash deposits (higher risk)
    const cashDeposits = asset.transactions?.filter(t => 
      t.type === 'DEPOSIT' && 
      t.method === 'CASH' &&
      t.amount > 5000
    ) || [];
    
    // Check for foreign wire transfers
    const foreignWires = asset.transactions?.filter(t => 
      t.type === 'DEPOSIT' && 
      t.method === 'WIRE' &&
      t.originCountry !== 'USA'
    ) || [];
    
    const flagged = largeDeposits.length > 0 || cashDeposits.length > 0 || foreignWires.length > 0;
    
    return {
      checkName: 'Source of Funds',
      flagged,
      score: (largeDeposits.length * 20) + (cashDeposits.length * 30) + (foreignWires.length * 25),
      details: {
        largeDeposits: largeDeposits.length,
        cashDeposits: cashDeposits.length,
        foreignWires: foreignWires.length
      }
    };
  }
  
  private async checkSanctionsList(asset: Asset, application: LoanApplication): Promise<AMLCheck> {
    // Check all parties against sanctions lists
    const parties = [
      application.borrowerName,
      application.coBorrowerName,
      asset.accountHolderName,
      asset.donorName
    ].filter(Boolean);
    
    const sanctionsHits = [];
    
    for (const party of parties) {
      const hit = await this.checkAgainstSanctionsLists(party);
      if (hit) {
        sanctionsHits.push({ party, hit });
      }
    }
    
    return {
      checkName: 'Sanctions List',
      flagged: sanctionsHits.length > 0,
      score: sanctionsHits.length * 100,
      details: sanctionsHits
    };
  }
  
  private async checkPEPStatus(asset: Asset, application: LoanApplication): Promise<AMLCheck> {
    // Check if any party is a Politically Exposed Person
    const parties = [
      application.borrowerName,
      application.coBorrowerName,
      asset.accountHolderName,
      asset.donorName
    ].filter(Boolean);
    
    const pepHits = [];
    
    for (const party of parties) {
      const isPEP = await this.checkPEPDatabase(party);
      if (isPEP) {
        pepHits.push({ party, relationship: isPEP.relationship });
      }
    }
    
    return {
      checkName: 'PEP Status',
      flagged: pepHits.length > 0,
      score: pepHits.length * 75,
      details: pepHits
    };
  }
}
9. Performance Optimization
9.1 Asset Caching Strategy
typescript
// asset-cache.service.ts
export class AssetCacheService {
  private readonly cache = new Map<string, CachedAsset>();
  private readonly TTL = {
    ASSET_DETAILS: 5 * 60 * 1000,      // 5 minutes
    ASSET_SUMMARY: 2 * 60 * 1000,       // 2 minutes
    ASSET_TRENDS: 15 * 60 * 1000,       // 15 minutes
    ASSET_VALUATION: 60 * 60 * 1000     // 1 hour
  };
  
  async getAsset(assetId: string, options: CacheOptions): Promise<Asset> {
    const cacheKey = this.generateKey(assetId, options);
    const cached = this.cache.get(cacheKey);
    
    if (cached && !this.isExpired(cached)) {
      return cached.data;
    }
    
    const asset = await this.fetchAsset(assetId, options);
    this.cache.set(cacheKey, {
      data: asset,
      cachedAt: new Date(),
      ttl: this.getTTL(options.cacheType)
    });
    
    return asset;
  }
  
  async warmupCache(applicationId: string): Promise<void> {
    // Preload all assets for an application
    const assets = await this.getApplicationAssets(applicationId);
    
    await Promise.all(assets.map(asset => 
      this.preloadAssetData(asset.id)
    ));
    
    // Preload asset summary
    await this.preloadAssetSummary(applicationId);
    
    // Preload trend data for all assets
    await this.preloadAllTrends(applicationId);
  }
  
  private async preloadAssetData(assetId: string): Promise<void> {
    const asset = await this.fetchAsset(assetId, { includeAll: true });
    const cacheKey = this.generateKey(assetId, { includeAll: true });
    
    this.cache.set(cacheKey, {
      data: asset,
      cachedAt: new Date(),
      ttl: this.TTL.ASSET_DETAILS
    });
  }
}
9.2 Database Indexing Strategy
sql
-- Performance optimization indexes
-- Migration: 003_asset_performance_indexes.sql

BEGIN;

-- Composite indexes for common query patterns
CREATE INDEX idx_assets_application_status ON assets(application_id, verification_status) 
WHERE deleted_at IS NULL;

CREATE INDEX idx_assets_person_type ON assets(person_id, asset_type) 
WHERE deleted_at IS NULL;

CREATE INDEX idx_assets_application_verified ON assets(application_id, verification_status, verified_at DESC)
WHERE verification_status = 'VERIFIED' AND deleted_at IS NULL;

-- Partial indexes for active assets
CREATE INDEX idx_assets_active ON assets(application_id) 
WHERE deleted_at IS NULL;

-- Index for trend queries
CREATE INDEX idx_asset_history_asset_date_value ON asset_history(asset_id, recorded_date DESC) 
INCLUDE (value);

-- Index for flag queries
CREATE INDEX idx_asset_flags_resolved ON asset_flags(asset_id, resolved) 
WHERE resolved = false;

-- Index for gift funds verification
CREATE INDEX idx_gift_funds_status ON gift_funds(verification_status) 
WHERE verification_status = 'PENDING';

-- JSONB indexes for flexible attribute queries
CREATE INDEX idx_asset_attributes_cash_details ON asset_attributes USING gin (attribute_value)
WHERE attribute_key = 'cash_details';

CREATE INDEX idx_asset_attributes_investment_details ON asset_attributes USING gin (attribute_value)
WHERE attribute_key = 'investment_details';

-- BRIN indexes for time-series data
CREATE INDEX idx_asset_history_brin ON asset_history USING brin (recorded_date);

-- Analyze tables for query planner
ANALYZE assets;
ANALYZE asset_history;
ANALYZE asset_flags;

COMMIT;
10. Error Handling & Validation
10.1 Asset Validation Rules
typescript
// asset-validation.service.ts
export class AssetValidationService {
  
  validateAsset(asset: AssetInput): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];
    
    // Required fields
    if (!asset.assetType) {
      errors.push({
        field: 'assetType',
        message: 'Asset type is required',
        code: 'REQUIRED_FIELD'
      });
    }
    
    // Value validation
    if (asset.currentValue <= 0) {
      errors.push({
        field: 'currentValue',
        message: 'Asset value must be greater than 0',
        code: 'INVALID_VALUE'
      });
    }
    
    if (asset.currentValue > 100000000) {
      warnings.push({
        field: 'currentValue',
        message: 'Asset value exceeds $100M. Additional verification required.',
        code: 'VALUE_THRESHOLD_EXCEEDED',
        severity: 'HIGH'
      });
    }
    
    // Date validation
    if (asset.valueAsOfDate && new Date(asset.valueAsOfDate) > new Date()) {
      errors.push({
        field: 'valueAsOfDate',
        message: 'Value date cannot be in the future',
        code: 'INVALID_DATE'
      });
    }
    
    if (asset.valueAsOfDate && this.isOlderThanDays(asset.valueAsOfDate, 90)) {
      warnings.push({
        field: 'valueAsOfDate',
        message: 'Asset statement is over 90 days old. Please provide recent statement.',
        code: 'STALE_DOCUMENT',
        severity: 'MEDIUM'
      });
    }
    
    // Type-specific validation
    switch (asset.assetType) {
      case 'GIFT':
        errors.push(...this.validateGiftFunds(asset.giftDetails));
        break;
        
      case 'CRYPTO':
        errors.push(...this.validateCryptoAsset(asset.cryptoDetails));
        break;
        
      case 'REAL_ESTATE':
        errors.push(...this.validateRealEstate(asset.realEstateDetails));
        break;
        
      case 'BUSINESS':
        errors.push(...this.validateBusinessAsset(asset.businessDetails));
        break;
    }
    
    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }
  
  private validateGiftFunds(gift: GiftDetails): ValidationError[] {
    const errors: ValidationError[] = [];
    
    if (!gift.donorName) {
      errors.push({
        field: 'donorName',
        message: 'Donor name is required for gift funds',
        code: 'GIFT_DONOR_REQUIRED'
      });
    }
    
    if (!['PARENT', 'GRANDPARENT', 'SIBLING', 'SPOUSE'].includes(gift.donorRelationship)) {
      errors.push({
        field: 'donorRelationship',
        message: 'Gift funds only allowed from immediate family members',
        code: 'INVALID_GIFT_RELATIONSHIP'
      });
    }
    
    if (gift.giftAmount > 100000 && !gift.donorStatementUploaded) {
      errors.push({
        field: 'giftAmount',
        message: 'Gifts over $100,000 require donor bank statement',
        code: 'GIFT_LARGE_AMOUNT'
      });
    }
    
    return errors;
  }
  
  private validateCryptoAsset(crypto: CryptoDetails): ValidationError[] {
    const errors: ValidationError[] = [];
    
    if (!crypto.exchange) {
      errors.push({
        field: 'exchange',
        message: 'Cryptocurrency exchange is required',
        code: 'CRYPTO_EXCHANGE_REQUIRED'
      });
    }
    
    if (crypto.quantity <= 0) {
      errors.push({
        field: 'quantity',
        message: 'Quantity must be greater than 0',
        code: 'INVALID_QUANTITY'
      });
    }
    
    return errors;
  }
}
10.2 Error Response Format
typescript
// error-response.interface.ts
export interface ErrorResponse {
  timestamp: string;
  path: string;
  status: number;
  error: string;
  message: string;
  details?: ValidationErrorDetail[];
  requestId: string;
}

export interface ValidationErrorDetail {
  field: string;
  message: string;
  code: string;
  value?: any;
  suggestions?: string[];
}

// Error handler middleware
export class AssetErrorHandler {
  
  handleValidationError(error: ValidationError): ErrorResponse {
    return {
      timestamp: new Date().toISOString(),
      path: error.path,
      status: 400,
      error: 'Validation Error',
      message: 'One or more fields failed validation',
      details: error.details.map(d => ({
        field: d.field,
        message: d.message,
        code: d.code,
        suggestions: this.getSuggestions(d.code)
      })),
      requestId: error.requestId
    };
  }
  
  handleFraudDetectionError(error: FraudDetectionError): ErrorResponse {
    return {
      timestamp: new Date().toISOString(),
      path: error.path,
      status: 403,
      error: 'Fraud Risk Detected',
      message: 'Transaction flagged for fraud review',
      details: [{
        field: 'asset',
        message: error.message,
        code: 'FRAUD_RISK',
        suggestions: ['Contact compliance team', 'Request additional documentation']
      }],
      requestId: error.requestId
    };
  }
  
  handleComplianceError(error: ComplianceError): ErrorResponse {
    return {
      timestamp: new Date().toISOString(),
      path: error.path,
      status: 422,
      error: 'Compliance Violation',
      message: 'Asset does not meet regulatory requirements',
      details: [{
        field: error.field,
        message: error.message,
        code: error.code,
        suggestions: error.remediationSteps
      }],
      requestId: error.requestId
    };
  }
}
11. Deployment & Configuration
11.1 Environment Configuration
yaml
# config/asset-service.yaml
asset-service:
  # Asset validation rules
  validation:
    max_asset_value: 100000000
    max_assets_per_application: 50
    document_age_limit_days: 90
    large_deposit_threshold_percentage: 50
    gift_max_amount: 100000
    
  # Haircut configuration
  haircut:
    default: 15
    crypto: 50
    high_volatility_assets: 70
    concentrated_assets: 20
    
  # AVM configuration
  avm:
    sources:
      - name: corelogic
        weight: 0.4
        timeout_ms: 3000
      - name: zillow
        weight: 0.3
        timeout_ms: 2000
      - name: clear_capital
        weight: 0.3
        timeout_ms: 3000
    confidence_threshold: 80
    
  # Fraud detection
  fraud:
    enabled: true
    risk_threshold: 50
    sar_threshold: 80
    pep_check_enabled: true
    sanctions_check_enabled: true
    
  # Caching
  cache:
    ttl:
      asset_details: 300
      asset_summary: 120
      asset_trends: 900
      asset_valuation: 3600
    warmup_enabled: true
    
  # Integration settings
  integrations:
    plaid:
      enabled: true
      timeout_ms: 5000
      retry_count: 3
    the_work_number:
      enabled: true
      timeout_ms: 10000
    tax_irs:
      enabled: true
      timeout_ms: 15000
11.2 Kubernetes Deployment
yaml
# k8s/asset-service-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: asset-service
  namespace: loan-platform
spec:
  replicas: 3
  selector:
    matchLabels:
      app: asset-service
  template:
    metadata:
      labels:
        app: asset-service
    spec:
      containers:
      - name: asset-service
        image: loan-platform/asset-service:latest
        ports:
        - containerPort: 8080
        env:
        - name: DB_HOST
          valueFrom:
            secretKeyRef:
              name: db-secrets
              key: host
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: db-secrets
              key: password
        - name: PLAID_CLIENT_ID
          valueFrom:
            secretKeyRef:
              name: plaid-secrets
              key: client_id
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: asset-service
  namespace: loan-platform
spec:
  selector:
    app: asset-service
  ports:
  - port: 8080
    targetPort: 8080
  type: ClusterIP
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: asset-service-hpa
  namespace: loan-platform
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: asset-service
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
12. Monitoring & Alerting
12.1 Asset Service Metrics
typescript
// metrics.service.ts
export class AssetMetricsService {
  private readonly meter: Meter;
  
  constructor() {
    this.meter = new Meter();
  }
  
  // Counter metrics
  recordAssetCreated(assetType: string) {
    this.meter.createCounter('asset.created', {
      value: 1,
      tags: { asset_type: assetType }
    });
  }
  
  recordAssetVerified(assetType: string, verificationMethod: string) {
    this.meter.createCounter('asset.verified', {
      value: 1,
      tags: { 
        asset_type: assetType,
        verification_method: verificationMethod
      }
    });
  }
  
  // Histogram metrics
  recordVerificationTime(assetId: string, timeMs: number) {
    this.meter.createHistogram('asset.verification.time', {
      value: timeMs,
      tags: { asset_id: assetId }
    });
  }
  
  // Gauge metrics
  async updateAssetMetrics() {
    const pendingCount = await this.getPendingAssetsCount();
    const flaggedCount = await this.getFlaggedAssetsCount();
    const avgValue = await this.getAverageAssetValue();
    
    this.meter.setGauge('asset.pending.count', pendingCount);
    this.meter.setGauge('asset.flagged.count', flaggedCount);
    this.meter.setGauge('asset.average.value', avgValue);
  }
  
  // Error metrics
  recordFraudDetection(score: number, isFlagged: boolean) {
    this.meter.createCounter('asset.fraud.detection', {
      value: 1,
      tags: { 
        score_range: this.getScoreRange(score),
        flagged: String(isFlagged)
      }
    });
  }
}
12.2 Alert Rules
yaml
# prometheus/alerts/asset-alerts.yaml
groups:
  - name: asset_alerts
    interval: 30s
    rules:
      - alert: HighAssetVerificationFailureRate
        expr: |
          rate(asset_verification_failed_total[5m]) / 
          rate(asset_verification_attempted_total[5m]) > 0.1
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High asset verification failure rate"
          description: "{{ $value }}% of asset verifications are failing"
          
      - alert: AssetFraudScoreHigh
        expr: asset_fraud_score > 70
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "High fraud score detected for asset"
          description: "Asset {{ $labels.asset_id }} has fraud score {{ $value }}"
          
      - alert: LargeDepositFrequencyHigh
        expr: rate(asset_large_deposit_detected_total[1h]) > 5
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "High frequency of large deposits"
          description: "{{ $value }} large deposits detected in last hour"
          
      - alert: AssetRefreshFailure
        expr: rate(asset_refresh_failed_total[5m]) > 0.2
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Asset valuation refresh failing"
          description: "{{ $value }}% of refresh attempts are failing"
This completes the additional technical specifications including:

Advanced Valuation Algorithms - Haircut calculations, AVM integration

Event-Driven Architecture - Event schemas, handlers, state machine

Fraud Detection Engine - Multi-layer fraud analysis with scoring

Compliance & Reporting - HMDA, AML, sanctions screening

Performance Optimization - Caching strategy, database indexes

Error Handling - Validation rules, error responses

Deployment Configuration - Environment configs, Kubernetes manifests

Monitoring & Alerting - Metrics collection, Prometheus alerts

Would you like me to provide any additional sections such as:

API Documentation with Swagger/OpenAPI specs?

Security Testing penetration test scenarios?

Disaster Recovery procedures for asset data?

User Training materials for asset management?

Yeh response AI generated hai, sirf reference ke liye.
yes
Here's the comprehensive final extension covering API Documentation, Security Testing, Disaster Recovery, and User Training Materials:

13. API Documentation (OpenAPI/Swagger)
13.1 OpenAPI 3.0 Specification
yaml
openapi: 3.0.3
info:
  title: Asset Management API
  description: |-
    Comprehensive API for managing real estate loan assets including cash accounts, 
    investments, retirement accounts, cryptocurrency, gift funds, and real estate properties.
    
    ## Features
    - Asset lifecycle management
    - Real-time valuation and trends
    - Fraud detection and risk scoring
    - Compliance and AML checks
    - Document management and verification
  version: 1.0.0
  contact:
    name: API Support
    email: api-support@loanplatform.com
  license:
    name: Proprietary

servers:
  - url: https://api.loanplatform.com/v1
    description: Production server
  - url: https://sandbox-api.loanplatform.com/v1
    description: Sandbox server

tags:
  - name: Assets
    description: Asset management operations
  - name: Verification
    description: Asset verification workflows
  - name: Trends
    description: Asset valuation and trend analysis
  - name: Fraud
    description: Fraud detection and risk assessment
  - name: Compliance
    description: Compliance and reporting

components:
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
    ApiKeyAuth:
      type: apiKey
      in: header
      name: X-API-Key

  schemas:
    # ============================================
    # ASSET SCHEMAS
    # ============================================
    Asset:
      type: object
      required:
        - id
        - application_id
        - asset_type
        - current_value
      properties:
        id:
          type: string
          format: uuid
          example: "123e4567-e89b-12d3-a456-426614174000"
        application_id:
          type: string
          format: uuid
          example: "123e4567-e89b-12d3-a456-426614174001"
        person_id:
          type: string
          format: uuid
        asset_type:
          type: string
          enum: [CASH, INVESTMENT, RETIREMENT, REAL_ESTATE, CRYPTO, BUSINESS, GIFT, OTHER]
          example: "CASH"
        asset_subtype:
          type: string
          example: "CHECKING"
        ownership_type:
          type: string
          enum: [INDIVIDUAL, JOINT, TRUST, BUSINESS]
        institution_name:
          type: string
          example: "Chase Bank"
        account_number_masked:
          type: string
          pattern: "^XXXX[0-9]{4}$"
          example: "XXXX1234"
        current_value:
          type: number
          format: double
          minimum: 0
          maximum: 100000000
          example: 25000.00
        value_as_of_date:
          type: string
          format: date
        verification_status:
          type: string
          enum: [PENDING, VERIFIED, QUESTIONED, REJECTED]
          default: PENDING
        risk_adjusted_value:
          type: number
          format: double
          description: "Value after applying haircut for risk"
        trend_30d:
          type: number
          format: double
          description: "30-day percentage change"
        created_at:
          type: string
          format: date-time

    AssetCreateRequest:
      type: object
      required:
        - asset_type
        - current_value
      properties:
        asset_type:
          type: string
          enum: [CASH, INVESTMENT, RETIREMENT, REAL_ESTATE, CRYPTO, BUSINESS, GIFT, OTHER]
        asset_subtype:
          type: string
        ownership_type:
          type: string
        institution_name:
          type: string
        current_value:
          type: number
          format: double
          minimum: 0.01
        value_as_of_date:
          type: string
          format: date
        cash_details:
          $ref: '#/components/schemas/CashDetails'
        investment_details:
          $ref: '#/components/schemas/InvestmentDetails'
        crypto_details:
          $ref: '#/components/schemas/CryptoDetails'
        gift_details:
          $ref: '#/components/schemas/GiftDetails'
        real_estate_details:
          $ref: '#/components/schemas/RealEstateDetails'
        documents:
          type: array
          items:
            $ref: '#/components/schemas/DocumentReference'

    CashDetails:
      type: object
      properties:
        account_holder_name:
          type: string
        average_balance_3m:
          type: number
          format: double
        purpose_of_funds:
          type: array
          items:
            type: string
            enum: [DOWN_PAYMENT, RESERVES, CLOSING_COSTS, OTHER]
        is_primary_account:
          type: boolean

    CryptoDetails:
      type: object
      properties:
        exchange:
          type: string
          enum: [COINBASE, BINANCE, KRAKEN, GEMINI, OTHER]
        wallet_address:
          type: string
        quantity:
          type: number
          format: double
        current_value_usd:
          type: number
          format: double
        cost_basis:
          type: number
          format: double
        purchase_date:
          type: string
          format: date
        liquidity_status:
          type: string
          enum: [IMMEDIATE, TWENTY_FOUR_HOURS, SEVEN_DAYS, RESTRICTED]

    GiftDetails:
      type: object
      required:
        - donor_name
        - donor_relationship
        - gift_amount
      properties:
        donor_name:
          type: string
        donor_relationship:
          type: string
          enum: [PARENT, GRANDPARENT, SIBLING, SPOUSE, EMPLOYER, OTHER]
        donor_address:
          type: string
        donor_phone:
          type: string
          pattern: "^\\+?[1-9]\\d{1,14}$"
        donor_email:
          type: string
          format: email
        gift_amount:
          type: number
          format: double
        gift_date:
          type: string
          format: date
        funds_transfer_method:
          type: string
          enum: [WIRE, CHECK, ACH, CASH]
        purpose:
          type: string
          enum: [DOWN_PAYMENT, CLOSING_COSTS, RESERVES]

    # ============================================
    # VERIFICATION SCHEMAS
    # ============================================
    VerificationRequest:
      type: object
      required:
        - verification_status
      properties:
        verification_status:
          type: string
          enum: [VERIFIED, QUESTIONED, REJECTED]
        verification_method:
          type: string
          enum: [PLAID, OCR, MANUAL, THIRD_PARTY]
        verification_notes:
          type: string
          maxLength: 1000
        adjusted_value:
          type: number
          format: double
        haircut_percentage:
          type: number
          format: double
          minimum: 0
          maximum: 100
        conditions:
          type: array
          items:
            type: object
            properties:
              condition_id:
                type: string
              description:
                type: string
              due_date:
                type: string
                format: date

    VerificationResponse:
      type: object
      properties:
        asset_id:
          type: string
          format: uuid
        verification_status:
          type: string
        verified_by:
          type: string
          format: uuid
        verified_at:
          type: string
          format: date-time
        risk_adjusted_value:
          type: number
          format: double
        flags_remaining:
          type: integer
        next_action_required:
          type: string

    # ============================================
    # TREND ANALYSIS SCHEMAS
    # ============================================
    TrendAnalysisResponse:
      type: object
      properties:
        asset_id:
          type: string
          format: uuid
        current_value:
          type: number
          format: double
        valuation_history:
          type: array
          items:
            $ref: '#/components/schemas/ValuationPoint'
        trend_metrics:
          $ref: '#/components/schemas/TrendMetrics'
        forecast:
          $ref: '#/components/schemas/Forecast'
        risk_analysis:
          $ref: '#/components/schemas/RiskAnalysis'
        alerts:
          type: array
          items:
            $ref: '#/components/schemas/Alert'

    ValuationPoint:
      type: object
      properties:
        date:
          type: string
          format: date
        value:
          type: number
          format: double

    TrendMetrics:
      type: object
      properties:
        change_7d:
          type: number
          format: double
        change_30d:
          type: number
          format: double
        change_90d:
          type: number
          format: double
        volatility_30d:
          type: number
          format: double
        sharpe_ratio:
          type: number
          format: double
        max_drawdown_90d:
          type: number
          format: double

    Forecast:
      type: object
      properties:
        predicted_value_30d:
          type: number
          format: double
        confidence_interval_lower:
          type: number
          format: double
        confidence_interval_upper:
          type: number
          format: double
        confidence_level:
          type: integer
          example: 95
        trend_direction:
          type: string
          enum: [UPWARD, DOWNWARD, STABLE]
        model_accuracy:
          type: number
          format: double

    RiskAnalysis:
      type: object
      properties:
        risk_adjusted_value:
          type: number
          format: double
        haircut_applied:
          type: number
          format: double
        volatility_rating:
          type: string
          enum: [LOW, MODERATE, HIGH, EXTREME]
        concentration_risk:
          type: string
          enum: [LOW, MEDIUM, HIGH]
        liquidity_rating:
          type: string
          enum: [LOW, MEDIUM, HIGH]
        overall_risk_score:
          type: integer
          minimum: 0
          maximum: 100
        recommendation:
          type: string
          enum: [ACCEPT, REVIEW, REJECT]

    # ============================================
    # FRAUD DETECTION SCHEMAS
    # ============================================
    FraudAnalysisResponse:
      type: object
      properties:
        fraud_score:
          type: integer
          minimum: 0
          maximum: 100
        risk_level:
          type: string
          enum: [LOW, MODERATE, HIGH, CRITICAL]
        flags:
          type: array
          items:
            $ref: '#/components/schemas/FraudFlag'
        requires_manual_review:
          type: boolean
        requires_sar:
          type: boolean
        recommendations:
          type: array
          items:
            type: string

    FraudFlag:
      type: object
      properties:
        type:
          type: string
          enum: [DOCUMENT_TAMPERING, INCOME_DISCREPANCY, EMPLOYMENT_DISCREPANCY, 
                  IDENTITY_MISMATCH, SUSPICIOUS_TRANSACTIONS, SANCTIONS_HIT, PEP_STATUS]
        severity:
          type: string
          enum: [LOW, MEDIUM, HIGH, CRITICAL]
        description:
          type: string
        details:
          type: object

    # ============================================
    # ERROR SCHEMAS
    # ============================================
    ErrorResponse:
      type: object
      properties:
        timestamp:
          type: string
          format: date-time
        path:
          type: string
        status:
          type: integer
        error:
          type: string
        message:
          type: string
        request_id:
          type: string
        details:
          type: array
          items:
            $ref: '#/components/schemas/ValidationErrorDetail'

    ValidationErrorDetail:
      type: object
      properties:
        field:
          type: string
        message:
          type: string
        code:
          type: string
        suggestions:
          type: array
          items:
            type: string

# ============================================
# API PATHS
# ============================================
paths:
  /applications/{applicationId}/assets:
    post:
      tags: [Assets]
      summary: Create a new asset
      description: Add a new asset to a loan application
      security:
        - BearerAuth: []
      parameters:
        - name: applicationId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/AssetCreateRequest'
            examples:
              cash:
                summary: Cash Asset Example
                value:
                  asset_type: "CASH"
                  asset_subtype: "CHECKING"
                  institution_name: "Chase Bank"
                  current_value: 25000.00
                  cash_details:
                    account_holder_name: "John Doe"
                    purpose_of_funds: ["DOWN_PAYMENT", "RESERVES"]
              crypto:
                summary: Cryptocurrency Example
                value:
                  asset_type: "CRYPTO"
                  asset_subtype: "BITCOIN"
                  current_value: 25000.00
                  crypto_details:
                    exchange: "COINBASE"
                    quantity: 0.42
                    current_value_usd: 25000.00
                    liquidity_status: "IMMEDIATE"
              gift:
                summary: Gift Funds Example
                value:
                  asset_type: "GIFT"
                  current_value: 35000.00
                  gift_details:
                    donor_name: "Robert Doe"
                    donor_relationship: "PARENT"
                    gift_amount: 35000.00
                    funds_transfer_method: "WIRE"
      responses:
        '201':
          description: Asset created successfully
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                  data:
                    type: object
                    properties:
                      asset_id:
                        type: string
                        format: uuid
                      verification_status:
                        type: string
                      verification_required_actions:
                        type: array
                      created_at:
                        type: string
                        format: date-time
        '400':
          description: Validation error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
        '401':
          description: Unauthorized
        '403':
          description: Forbidden
        '404':
          description: Application not found

    get:
      tags: [Assets]
      summary: List all assets
      description: Get all assets for a loan application
      security:
        - BearerAuth: []
      parameters:
        - name: applicationId
          in: path
          required: true
          schema:
            type: string
            format: uuid
        - name: asset_type
          in: query
          schema:
            type: string
            enum: [CASH, INVESTMENT, RETIREMENT, REAL_ESTATE, CRYPTO, BUSINESS, GIFT, OTHER]
        - name: verification_status
          in: query
          schema:
            type: string
            enum: [PENDING, VERIFIED, QUESTIONED, REJECTED]
        - name: limit
          in: query
          schema:
            type: integer
            default: 20
            maximum: 100
        - name: offset
          in: query
          schema:
            type: integer
            default: 0
      responses:
        '200':
          description: Assets retrieved successfully
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: array
                    items:
                      $ref: '#/components/schemas/Asset'
                  pagination:
                    type: object
                    properties:
                      total:
                        type: integer
                      limit:
                        type: integer
                      offset:
                        type: integer

  /applications/{applicationId}/assets/summary:
    get:
      tags: [Assets]
      summary: Get asset summary
      description: Get aggregated summary of all assets for the application
      security:
        - BearerAuth: []
      parameters:
        - name: applicationId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '200':
          description: Summary retrieved successfully
          content:
            application/json:
              schema:
                type: object
                properties:
                  application_id:
                    type: string
                  summary:
                    type: object
                    properties:
                      total_assets:
                        type: number
                      liquid_assets:
                        type: number
                      qualifying_assets:
                        type: number
                      available_for_down_payment:
                        type: number
                      reserves_months:
                        type: number
                  breakdown:
                    type: object
                  flags:
                    type: array
                  verification_status:
                    type: object

  /assets/{assetId}:
    get:
      tags: [Assets]
      summary: Get asset details
      security:
        - BearerAuth: []
      parameters:
        - name: assetId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '200':
          description: Asset details retrieved
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Asset'

    put:
      tags: [Assets]
      summary: Update asset
      security:
        - BearerAuth: []
      parameters:
        - name: assetId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/AssetCreateRequest'
      responses:
        '200':
          description: Asset updated successfully

    delete:
      tags: [Assets]
      summary: Delete asset
      security:
        - BearerAuth: []
      parameters:
        - name: assetId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '204':
          description: Asset deleted successfully

  /assets/{assetId}/verify:
    post:
      tags: [Verification]
      summary: Verify asset
      description: Verify an asset after document review
      security:
        - BearerAuth: []
      parameters:
        - name: assetId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/VerificationRequest'
      responses:
        '200':
          description: Asset verified successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/VerificationResponse'

  /assets/{assetId}/trends:
    get:
      tags: [Trends]
      summary: Get asset trend analysis
      description: Get historical valuation trends and forecasts
      security:
        - BearerAuth: []
      parameters:
        - name: assetId
          in: path
          required: true
          schema:
            type: string
            format: uuid
        - name: days
          in: query
          schema:
            type: integer
            default: 90
            maximum: 365
      responses:
        '200':
          description: Trend analysis retrieved
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TrendAnalysisResponse'

  /assets/{assetId}/fraud-analysis:
    get:
      tags: [Fraud]
      summary: Get fraud analysis
      description: Perform fraud detection analysis on asset
      security:
        - BearerAuth: []
      parameters:
        - name: assetId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '200':
          description: Fraud analysis completed
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/FraudAnalysisResponse'

  /assets/{assetId}/flags:
    get:
      tags: [Assets]
      summary: Get asset flags
      description: Get all flags associated with an asset
      security:
        - BearerAuth: []
      parameters:
        - name: assetId
          in: path
          required: true
          schema:
            type: string
            format: uuid
        - name: resolved
          in: query
          schema:
            type: boolean
            default: false
      responses:
        '200':
          description: Flags retrieved
          content:
            application/json:
              schema:
                type: object
                properties:
                  flags:
                    type: array
                    items:
                      $ref: '#/components/schemas/AssetFlag'

    post:
      tags: [Assets]
      summary: Add flag to asset
      security:
        - BearerAuth: []
      parameters:
        - name: assetId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                flag_type:
                  type: string
                  enum: [LARGE_DEPOSIT, NEW_ACCOUNT, HIGH_VOLATILITY, 
                         CONCENTRATION_RISK, SOURCE_OF_FUNDS, FRAUD_SUSPECT]
                severity:
                  type: string
                  enum: [LOW, MEDIUM, HIGH, CRITICAL]
                description:
                  type: string
                assigned_to:
                  type: string
                  format: uuid
                due_date:
                  type: string
                  format: date
      responses:
        '201':
          description: Flag added successfully
14. Security Testing
14.1 Penetration Test Scenarios
typescript
// security/penetration-tests/asset-api.test.ts
describe('Asset API Security Tests', () => {
  let app: INestApplication;
  let authToken: string;
  let testAssetId: string;

  beforeAll(async () => {
    app = await setupTestApp();
    authToken = await getTestUserToken('admin@test.com');
  });

  // ============================================
  // TEST 1: SQL Injection Prevention
  // ============================================
  describe('SQL Injection Prevention', () => {
    const maliciousInputs = [
      "'; DROP TABLE assets; --",
      "1' OR '1'='1",
      "1; UPDATE assets SET current_value = 999999; --",
      "' UNION SELECT * FROM users--",
      "1' AND 1=1; EXEC xp_cmdshell('dir'); --"
    ];

    maliciousInputs.forEach(input => {
      it(`should reject malicious input: ${input.substring(0, 30)}...`, async () => {
        const response = await request(app.getHttpServer())
          .post('/api/v1/applications/test-app/assets')
          .set('Authorization', `Bearer ${authToken}`)
          .send({
            asset_type: 'CASH',
            institution_name: input,
            current_value: 1000
          });

        // Should either reject or sanitize, but never execute
        expect(response.status).not.toBe(500);
        
        // Verify no data corruption
        const checkResponse = await request(app.getHttpServer())
          .get('/api/v1/applications/test-app/assets')
          .set('Authorization', `Bearer ${authToken}`);
        
        expect(checkResponse.body.data).not.toContainEqual(
          expect.objectContaining({ institution_name: input })
        );
      });
    });
  });

  // ============================================
  // TEST 2: XSS Prevention
  // ============================================
  describe('XSS Prevention', () => {
    const xssPayloads = [
      "<script>alert('XSS')</script>",
      "<img src=x onerror=alert('XSS')>",
      "javascript:alert('XSS')",
      "'; alert('XSS'); //",
      "><svg/onload=alert('XSS')>"
    ];

    xssPayloads.forEach(payload => {
      it(`should sanitize XSS payload: ${payload.substring(0, 30)}...`, async () => {
        const response = await request(app.getHttpServer())
          .post('/api/v1/applications/test-app/assets')
          .set('Authorization', `Bearer ${authToken}`)
          .send({
            asset_type: 'CASH',
            institution_name: payload,
            current_value: 1000
          });

        const assetId = response.body.data.asset_id;
        
        // Retrieve the asset and verify content is sanitized
        const getResponse = await request(app.getHttpServer())
          .get(`/api/v1/assets/${assetId}`)
          .set('Authorization', `Bearer ${authToken}`);
        
        expect(getResponse.body.institution_name).not.toContain('<script>');
        expect(getResponse.body.institution_name).not.toContain('onerror=');
      });
    });
  });

  // ============================================
  // TEST 3: Authorization Bypass
  // ============================================
  describe('Authorization Bypass Prevention', () => {
    it('should prevent unauthorized access to another user\'s asset', async () => {
      // Create asset with user A
      const userAToken = await getTestUserToken('userA@test.com');
      const createResponse = await request(app.getHttpServer())
        .post('/api/v1/applications/app-userA/assets')
        .set('Authorization', `Bearer ${userAToken}`)
        .send({
          asset_type: 'CASH',
          current_value: 5000
        });
      
      const assetId = createResponse.body.data.asset_id;
      
      // Try to access with user B
      const userBToken = await getTestUserToken('userB@test.com');
      const getResponse = await request(app.getHttpServer())
        .get(`/api/v1/assets/${assetId}`)
        .set('Authorization', `Bearer ${userBToken}`);
      
      expect(getResponse.status).toBe(403);
      expect(getResponse.body.error).toContain('Forbidden');
    });

    it('should prevent unauthorized update of asset', async () => {
      const assetId = await createTestAsset('userA@test.com');
      const userBToken = await getTestUserToken('userB@test.com');
      
      const response = await request(app.getHttpServer())
        .put(`/api/v1/assets/${assetId}`)
        .set('Authorization', `Bearer ${userBToken}`)
        .send({
          current_value: 999999
        });
      
      expect(response.status).toBe(403);
    });

    it('should prevent unauthorized deletion of asset', async () => {
      const assetId = await createTestAsset('userA@test.com');
      const userBToken = await getTestUserToken('userB@test.com');
      
      const response = await request(app.getHttpServer())
        .delete(`/api/v1/assets/${assetId}`)
        .set('Authorization', `Bearer ${userBToken}`);
      
      expect(response.status).toBe(403);
    });
  });

  // ============================================
  // TEST 4: Rate Limiting
  // ============================================
  describe('Rate Limiting', () => {
    it('should enforce rate limits on asset creation', async () => {
      const requests = [];
      
      // Attempt to create 100 assets rapidly
      for (let i = 0; i < 100; i++) {
        requests.push(
          request(app.getHttpServer())
            .post('/api/v1/applications/test-app/assets')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
              asset_type: 'CASH',
              current_value: 1000
            })
        );
      }
      
      const responses = await Promise.all(requests);
      const rateLimited = responses.filter(r => r.status === 429);
      
      expect(rateLimited.length).toBeGreaterThan(0);
    });
  });

  // ============================================
  // TEST 5: JWT Token Security
  // ============================================
  describe('JWT Token Security', () => {
    it('should reject expired tokens', async () => {
      const expiredToken = generateExpiredToken();
      const response = await request(app.getHttpServer())
        .get('/api/v1/applications/test-app/assets')
        .set('Authorization', `Bearer ${expiredToken}`);
      
      expect(response.status).toBe(401);
    });

    it('should reject tampered tokens', async () => {
      const validToken = authToken;
      const tamperedToken = validToken.slice(0, -5) + 'xxxxx';
      
      const response = await request(app.getHttpServer())
        .get('/api/v1/applications/test-app/assets')
        .set('Authorization', `Bearer ${tamperedToken}`);
      
      expect(response.status).toBe(401);
    });

    it('should reject tokens with invalid signature', async () => {
      const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
      
      const response = await request(app.getHttpServer())
        .get('/api/v1/applications/test-app/assets')
        .set('Authorization', `Bearer ${invalidToken}`);
      
      expect(response.status).toBe(401);
    });
  });

  // ============================================
  // TEST 6: Input Validation & Sanitization
  // ============================================
  describe('Input Validation & Sanitization', () => {
    it('should reject negative asset values', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/applications/test-app/assets')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          asset_type: 'CASH',
          current_value: -1000
        });
      
      expect(response.status).toBe(400);
      expect(response.body.details).toContainEqual(
        expect.objectContaining({ field: 'current_value' })
      );
    });

    it('should reject extremely large values', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/applications/test-app/assets')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          asset_type: 'CASH',
          current_value: 1e12 // 1 trillion
        });
      
      expect(response.status).toBe(400);
    });

    it('should validate enum values', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/applications/test-app/assets')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          asset_type: 'INVALID_TYPE',
          current_value: 1000
        });
      
      expect(response.status).toBe(400);
      expect(response.body.details).toContainEqual(
        expect.objectContaining({ field: 'asset_type' })
      );
    });
  });

  // ============================================
  // TEST 7: Data Encryption Verification
  // ============================================
  describe('Data Encryption', () => {
    it('should encrypt sensitive PII data at rest', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/applications/test-app/assets')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          asset_type: 'CASH',
          account_number: '1234567890123456',
          current_value: 1000
        });
      
      const assetId = response.body.data.asset_id;
      
      // Query database directly (test environment only)
      const dbResult = await db.query(
        'SELECT account_number FROM assets WHERE id = $1',
        [assetId]
      );
      
      // Account number should be encrypted in database
      expect(dbResult.rows[0].account_number).not.toBe('1234567890123456');
      expect(dbResult.rows[0].account_number).toMatch(/^[A-Fa-f0-9]{64,}$/); // Looks like hash
    });
  });
});
15. Disaster Recovery Procedures
15.1 Asset Data Backup Strategy
yaml
# disaster-recovery/backup-strategy.yaml
backup_strategy:
  asset_database:
    full_backup:
      schedule: "0 2 * * 0"  # Weekly on Sunday at 2 AM
      retention_days: 90
      storage: "s3://loan-platform-backups/asset-db/"
      encryption: "AES-256"
    
    incremental_backup:
      schedule: "0 */6 * * *"  # Every 6 hours
      retention_days: 30
      
    transaction_logs:
      schedule: "*/15 * * * *"  # Every 15 minutes
      retention_days: 7

  asset_documents:
    backup:
      schedule: "0 3 * * *"  # Daily at 3 AM
      type: "incremental"
      storage: "s3://loan-platform-documents-backup/"
      versioning: true

  verification_logs:
    backup:
      schedule: "0 4 * * *"  # Daily at 4 AM
      retention_days: 365  # Compliance requirement
15.2 Disaster Recovery Runbook
markdown
# Asset Service Disaster Recovery Runbook

## 1. Incident Severity Levels

| Level | Description | Response Time | Recovery Time Objective (RTO) |
|-------|-------------|---------------|-------------------------------|
| P0 | Complete service outage | Immediate | < 1 hour |
| P1 | Partial service degradation | < 15 minutes | < 4 hours |
| P2 | Performance issues | < 1 hour | < 24 hours |
| P3 | Non-critical failures | < 24 hours | < 72 hours |

## 2. Recovery Procedures

### 2.1 Database Failure Recovery

```bash
#!/bin/bash
# recover-asset-db.sh

set -e

BACKUP_DATE=$1
RESTORE_LOCATION="/tmp/asset-db-restore"

echo "Starting asset database recovery from backup date: $BACKUP_DATE"

# Step 1: Stop application traffic
echo "Step 1: Redirecting traffic to maintenance page"
kubectl scale deployment asset-service --replicas=0
kubectl apply -f maintenance-page.yaml

# Step 2: Download latest backup
echo "Step 2: Downloading backup from S3"
aws s3 cp s3://loan-platform-backups/asset-db/full-backup-$BACKUP_DATE.dump $RESTORE_LOCATION/

# Step 3: Restore database
echo "Step 3: Restoring database"
pg_restore -h $DB_HOST -U $DB_USER -d asset_db -c $RESTORE_LOCATION/full-backup-$BACKUP_DATE.dump

# Step 4: Apply transaction logs
echo "Step 4: Applying transaction logs"
for log in $(aws s3 ls s3://loan-platform-backups/asset-db/wal/ --recursive | sort | tail -n 100); do
    pg_receivewal -h $DB_HOST -U $DB_USER -D /var/lib/postgresql/data/ -f $log
done

# Step 5: Verify data integrity
echo "Step 5: Verifying data integrity"
psql -h $DB_HOST -U $DB_USER -d asset_db -c "SELECT COUNT(*) FROM assets;"
psql -h $DB_HOST -U $DB_USER -d asset_db -c "SELECT COUNT(*) FROM asset_history;"

# Step 6: Restart services
echo "Step 6: Restarting services"
kubectl scale deployment asset-service --replicas=3
kubectl delete -f maintenance-page.yaml

echo "Recovery completed successfully"
2.2 Document Storage Failure
bash
#!/bin/bash
# recover-asset-documents.sh

set -e

echo "Starting asset document recovery"

# Step 1: Check current S3 bucket status
aws s3api head-bucket --bucket loan-platform-documents

# Step 2: If primary bucket is unavailable, switch to replica
if [ $? -ne 0 ]; then
    echo "Primary bucket unavailable, switching to replica"
    
    # Update environment to use replica bucket
    kubectl set env deployment/asset-service DOCUMENT_BUCKET=loan-platform-documents-replica
    
    # Verify replica has data
    aws s3 ls s3://loan-platform-documents-replica/ --recursive | wc -l
fi

# Step 3: Initiate cross-region replication if needed
aws s3api put-bucket-replication \
    --bucket loan-platform-documents \
    --replication-configuration file://cross-region-replication.json

echo "Document recovery completed"
2.3 Service Restart Procedure
yaml
# restart-procedure.yaml
phases:
  - name: "Pre-Restart Checks"
    actions:
      - verify_database_connectivity
      - verify_document_storage
      - check_disk_space
      - validate_configuration

  - name: "Graceful Shutdown"
    actions:
      - set_health_check_degraded
      - drain_existing_connections
      - wait_for_in_flight_requests: 60s
      - stop_asset_service

  - name: "Restart"
    actions:
      - start_asset_service
      - wait_for_health_check: 30s
      - verify_api_endpoints
      - check_error_logs

  - name: "Post-Restart Verification"
    actions:
      - run_smoke_tests
      - verify_asset_crud_operations
      - check_metrics_recovery
      - clear_health_check_degraded

rollback:
  condition: "failure_after_retry"
  timeout: 300s
  actions:
    - revert_to_previous_version
    - restore_database_if_corrupted
    - notify_oncall_team
2.4 DR Test Schedule
yaml
dr_test_schedule:
  quarterly:
    - type: "Tabletop Exercise"
      duration: 2 hours
      participants: ["Engineering", "SRE", "Compliance"]
      scenarios:
        - "Database primary failure"
        - "Region availability zone outage"
        
  semi_annual:
    - type: "Full Recovery Drill"
      duration: 4 hours
      participants: ["All Teams"]
      scenarios:
        - "Complete region failure"
        - "Data corruption recovery"
        - "Point-in-time recovery"
        
  annual:
    - type: "Chaos Engineering"
      duration: 8 hours
      participants: ["SRE", "Security"]
      scenarios:
        - "Simulated ransomware attack"
        - "Multi-region failover"
        - "Load testing under recovery"
16. User Training Materials
16.1 Asset Management Training - Borrower Guide
markdown
# Asset Management Training Guide
## For Borrowers

### Overview
This guide will help you understand how to add and manage your financial assets during the loan application process.

---

### Lesson 1: Adding Your First Asset

#### Video Walkthrough (5 min)
[Link to training video]

#### Step-by-Step Instructions

**Step 1: Access Asset Section**
1. Log into your borrower portal
2. Navigate to "My Application" → "Assets"
3. Click the "+ Add Asset" button

**Step 2: Select Asset Type**
Choose from the following categories:
- 💰 **Cash & Deposits**: Checking, savings, money market accounts, CDs
- 📈 **Investments**: Stocks, bonds, mutual funds, ETFs
- 🏦 **Retirement**: 401(k), IRA, pension
- 🏠 **Real Estate**: Additional properties (not the one you're buying)
- ₿ **Cryptocurrency**: Bitcoin, Ethereum, etc.
- 💼 **Business**: Business ownership or business accounts
- 🎁 **Gift Funds**: Money gifted for down payment
- 🏭 **Other**: Vehicles, jewelry, art

**Step 3: Enter Asset Details**

*Example: Adding a Bank Account*
Bank Name: Chase Bank
Account Type: Checking
Last 4 Digits: 1234
Current Balance: $25,000
Statement Date: 03/25/2026

text

**Step 4: Verify Your Asset**

Choose one of these verification methods:

| Method | Best For | Time |
|--------|----------|------|
| 🔌 Connect with Plaid | Most bank accounts | 2 minutes |
| 📎 Upload Statement | Any asset | 5 minutes |
| ✍️ Enter Manually | When you have statements ready | 3 minutes |

**Pro Tip**: Using Plaid is the fastest way to verify your accounts!

---

### Lesson 2: Understanding Gift Funds

#### What Are Gift Funds?
Money given to you by a family member to help with your down payment.

#### Requirements:
- ✅ Donor must be immediate family (parent, grandparent, sibling, spouse)
- ✅ Signed gift letter required
- ✅ Donor must provide proof of funds
- ✅ Gift cannot be a loan

#### How to Add Gift Funds:
1. Select "Gift Funds" as asset type
2. Enter donor information
3. Upload gift letter (template provided)
4. Upload donor's bank statement showing funds

**Sample Gift Letter:**
Date: [Date]
I, [Donor Name], confirm that I am gifting $[Amount] to
[Borrower Name] for the purchase of property at [Address].
This is a true gift with no expectation of repayment.

Signed: _____________________

text

---

### Lesson 3: Cryptocurrency Assets

#### Important Notes:
- Crypto assets require additional documentation
- We may apply a valuation adjustment (haircut) due to volatility
- You'll need to provide 90 days of exchange statements

#### Steps to Add Crypto:
1. Select "Cryptocurrency" as asset type
2. Choose exchange (Coinbase, Binance, etc.)
3. Enter wallet address and quantity
4. Upload exchange statements (last 90 days)
5. Provide transaction history showing source of funds

---

### Lesson 4: Tracking Your Verification Status

#### Status Meanings:

| Status | Icon | What It Means | What To Do |
|--------|------|---------------|------------|
| PENDING | ⏳ | Waiting for verification | None - we're reviewing |
| VERIFIED | ✅ | Asset accepted | Nothing needed |
| QUESTIONED | ❓ | Need more information | Check messages, upload requested docs |
| REJECTED | ✗ | Cannot accept this asset | Contact your loan officer |

#### Common Reasons for Questioned Status:
- 🔍 Large deposit needs explanation
- 📄 Statement is older than 60 days
- 👤 Account name doesn't match borrower
- 💰 Gift funds missing donor statement

---

### Lesson 5: Troubleshooting

#### Issue: "Plaid Connection Failed"

**Solution:**
1. Check your login credentials
2. Ensure your bank supports Plaid
3. Try the "Upload Statement" method instead

#### Issue: "Statement Too Old"

**Solution:**
- Bank statements must be within 60 days
- Upload the most recent statement available

#### Issue: "Large Deposit Flag"

**Solution:**
- Provide source of funds documentation
- Example: If deposit was from gift, provide gift letter and donor statement
- Example: If deposit was from salary, provide pay stubs showing deposit

---

### Best Practices Summary

✅ **DO:**
- Add all assets, even if not needed for down payment
- Upload statements within 60 days
- Use Plaid when available for fastest verification
- Keep copies of all documentation
- Respond quickly to questions

❌ **DON'T:**
- Combine multiple accounts into one entry
- Add assets you don't plan to use
- Upload blurry or incomplete statements
- Ignore questions from your loan processor

---

### Need Help?

| Contact Method | Response Time |
|----------------|---------------|
| In-app chat | < 2 hours |
| Email: asset-help@loanplatform.com | < 24 hours |
| Phone: 1-800-555-1234 | Immediate (M-F 9am-6pm) |

---

### Quiz: Test Your Knowledge

1. **What's the fastest way to verify a bank account?**
   - [ ] Upload statement
   - [x] Connect with Plaid
   - [ ] Manual entry

2. **Who can give gift funds?**
   - [x] Parent
   - [ ] Friend
   - [ ] Employer

3. **How old can a bank statement be?**
   - [ ] 30 days
   - [x] 60 days
   - [ ] 90 days

4. **What does "Questioned" status mean?**
   - [ ] Asset is accepted
   - [ ] Asset is rejected
   - [x] More information needed

[Answer Key: 1-B, 2-A, 3-B, 4-C]
16.2 Asset Management Training - Lender/Processor Guide
markdown
# Asset Management Training Guide
## For Loan Processors & Underwriters

### Overview
This guide covers the complete asset verification workflow, including fraud detection, risk assessment, and compliance requirements.

---

### Lesson 1: Asset Verification Workflow

#### Verification Dashboard Overview
┌─────────────────────────────────────────────────────────────────┐
│ VERIFICATION QUEUE 45 items pending │
├─────────────────────────────────────────────────────────────────┤
│ Priority | Asset Type | Value | Flags | Time in Queue │
│───────────|────────────|──────────|──────────|─────────────────│
│ HIGH | CRYPTO | $25,000 | 2 flags | 2 days ⚠️ │
│ MEDIUM | GIFT | $35,000 | 1 flag | 1 day │
│ LOW | CASH | $5,000 | 0 flags | 3 days │
└─────────────────────────────────────────────────────────────────┘

text

#### Step-by-Step Verification Process

**Step 1: Review Asset Details**
- Verify account holder name matches borrower
- Check statement date (within 60 days)
- Validate balance matches entry

**Step 2: Flag Assessment**
- Review flagged items
- Determine if additional documentation needed
- Document findings

**Step 3: Source of Funds Verification**
- Trace large deposits (>50% of monthly income)
- Verify gift funds with donor documentation
- Document all sources

**Step 4: Risk Assessment**
- Apply appropriate haircut based on asset type
- Evaluate concentration risk
- Calculate qualifying assets

**Step 5: Final Decision**
- Verified: Accept as-is
- Questioned: Request additional docs
- Rejected: Document reason and communicate

---

### Lesson 2: Fraud Detection Indicators

#### Red Flags to Watch For

| Indicator | What to Look For | Action |
|-----------|------------------|--------|
| **Document Tampering** | PDF editing artifacts, inconsistent fonts, missing metadata | Request original or verified source |
| **Identity Mismatch** | Account name differs from borrower, address inconsistencies | Verify identity, request explanation |
| **Transaction Patterns** | Structuring deposits, circular transactions, unusual velocity | Escalate to compliance team |
| **Income Discrepancy** | Deposits don't match stated income | Verify source of deposits |

#### Fraud Risk Levels

| Level | Score | Response |
|-------|-------|----------|
| 🟢 Low | 0-30 | Standard review |
| 🟡 Moderate | 31-60 | Enhanced review |
| 🟠 High | 61-80 | Manager review required |
| 🔴 Critical | 81-100 | Compliance review, possible SAR |

---

### Lesson 3: Asset Haircut Guidelines

#### Standard Haircut Rates

| Asset Type | Base Haircut | Volatility Adjustment | Total |
|------------|--------------|----------------------|-------|
| Cash/Deposits | 0% | 0% | 0% |
| Large Cap Stocks | 10% | +0-15% | 10-25% |
| Small Cap Stocks | 20% | +0-20% | 20-40% |
| Investment Grade Bonds | 5% | +0-10% | 5-15% |
| High Yield Bonds | 25% | +0-15% | 25-40% |
| Bitcoin/Ethereum | 50% | +0-20% | 50-70% |
| Altcoins | 70% | +0-20% | 70-90% |
| Investment Property | 10% | +0-15% | 10-25% |

#### When to Apply Additional Haircut

- **Concentration Risk**: +10% if asset >40% of portfolio, +20% if >60%
- **Liquidity Issues**: +5-25% based on withdrawal restrictions
- **Volatility**: +5-15% based on 30-day volatility score

---

### Lesson 4: Gift Funds Verification

#### Acceptable Donors

| ✅ Allowed | ❌ Not Allowed |
|------------|---------------|
| Parent | Friend |
| Grandparent | Co-worker |
| Sibling | Business partner |
| Spouse | Seller |

#### Required Documentation

**Gift Letter Requirements:**
- Donor name, address, phone
- Borrower name
- Gift amount
- Property address
- Statement that no repayment is expected
- Donor signature

**Donor Proof of Funds:**
- Bank statement showing funds
- Statement date within 60 days
- Balance sufficient for gift amount
- Account in donor's name

#### Verification Checklist

- [ ] Gift letter signed and dated
- [ ] Donor bank statement shows funds
- [ ] Funds transferred to borrower account
- [ ] Large deposit explained if needed
- [ ] No evidence of repayment arrangement

---

### Lesson 5: Complex Asset Cases

#### Case Study 1: Self-Employed Borrower

**Scenario:** Borrower owns a business and uses business accounts for down payment.

**Verification Steps:**
1. Verify business ownership (tax returns, K-1)
2. Obtain 2 years of business bank statements
3. Document separation of personal vs business funds
4. Ensure distributions are properly documented

**Documentation Required:**
- Business tax returns (2 years)
- Business bank statements (12 months)
- K-1 or corporate tax return
- Letter from CPA confirming ownership

#### Case Study 2: Multiple Large Deposits

**Scenario:** Borrower shows several $10,000+ deposits from various sources.

**Verification Approach:**
1. Categorize each deposit
2. Request source documentation for each:
   - Salary: Pay stubs showing deposit
   - Gift: Gift letter + donor statement
   - Asset sale: Sale documentation
   - Inheritance: Estate documents

**Documentation Matrix:**

| Deposit Type | Required Docs |
|--------------|---------------|
| Salary | Pay stub, bank statement showing direct deposit |
| Gift | Gift letter, donor statement |
| Asset Sale | Sales contract, closing statement |
| Inheritance | Will, estate statement, bank statement |

---

### Lesson 6: Compliance & Reporting

#### HMDA Reporting Requirements

Assets must be reported for:
- Total assets value
- Liquid assets
- Down payment source
- Gift funds used

#### AML Monitoring Triggers

**Automatic SAR Filing Triggers:**
- Suspicious transaction patterns
- Known sanctioned party involvement
- Unexplained large cash deposits
- Identity fraud indicators

**Enhanced Due Diligence Triggers:**
- PEP (Politically Exposed Person) status
- Foreign source of funds
- Complex ownership structures
- Unusual transaction velocity

---

### Lesson 7: System Tools & Shortcuts

#### Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Verify asset | Ctrl + V |
| Question asset | Ctrl + Q |
| Reject asset | Ctrl + R |
| Add flag | Ctrl + F |
| View history | Ctrl + H |
| Next asset | Ctrl + → |

#### Batch Operations

**Batch Verify:**
1. Select multiple assets
2. Click "Batch Actions" → "Verify"
3. Apply common verification notes
4. Confirm batch operation

**Bulk Document Request:**
1. Filter assets needing docs
2. Select all
3. "Request Documents"
4. Customize request message

---

### Best Practices Summary

✅ **DO:**
- Complete verification within 24 hours of submission
- Document all decisions with clear notes
- Escalate suspicious activity immediately
- Use batch operations for efficiency
- Follow up on pending items within 48 hours

❌ **DON'T:**
- Skip flag review
- Accept incomplete documentation
- Ignore large deposit patterns
- Delay suspicious activity reporting

---

### Performance Metrics

| Metric | Target |
|--------|--------|
| Time to verify | < 2 hours |
| First-pass verification rate | > 80% |
| Fraud detection rate | > 95% |
| Compliance accuracy | 100% |
| Documentation completeness | > 90% |

---

### Quiz: Test Your Knowledge

1. **What's the maximum age for a bank statement?**
   - [ ] 30 days
   - [x] 60 days
   - [ ] 90 days

2. **What haircut applies to Bitcoin?**
   - [ ] 25%
   - [x] 50%
   - [ ] 75%

3. **Which relationship is NOT allowed for gift funds?**
   - [ ] Parent
   - [ ] Grandparent
   - [x] Friend

4. **When should a SAR be filed?**
   - [ ] For any gift > $10,000
   - [x] For suspicious transaction patterns
   - [ ] For any crypto asset

5. **What additional documentation is needed for large deposits?**
   - [ ] None
   - [ ] Just a note
   - [x] Source of funds documentation

[Answer Key: 1-B, 2-B, 3-C, 4-B, 5-C]
16.3 Quick Reference Cards
markdown
# Asset Management Quick Reference Cards

## Card 1: Asset Types & Haircuts
┌─────────────────────────────────────────────────────────────┐
│ ASSET TYPE │ BASE HAIRCUT │ MAX HAIRCUT │
├─────────────────────────────────────────────────────────────┤
│ 💰 Cash/Deposits │ 0% │ 0% │
│ 📈 Large Cap Stocks │ 10% │ 25% │
│ 📈 Small Cap Stocks │ 20% │ 40% │
│ 📈 Bonds - IG │ 5% │ 15% │
│ 📈 Bonds - HY │ 25% │ 40% │
│ ₿ Bitcoin/Ethereum │ 50% │ 70% │
│ ₿ Altcoins │ 70% │ 90% │
│ 🏠 Investment Prop │ 10% │ 25% │
│ 🎁 Gift Funds │ 0% │ 0% │
└─────────────────────────────────────────────────────────────┘

text

## Card 2: Verification Checklist
┌─────────────────────────────────────────────────────────────┐
│ VERIFICATION CHECKLIST │
├─────────────────────────────────────────────────────────────┤
│ [ ] Document date within 60 days │
│ [ ] Account name matches borrower │
│ [ ] Balance matches entry │
│ [ ] No suspicious transactions │
│ [ ] Large deposits explained │
│ [ ] Gift funds have donor statement │
│ [ ] Crypto has exchange statements │
│ [ ] All pages included │
│ [ ] No signs of tampering │
└─────────────────────────────────────────────────────────────┘

text

## Card 3: Flag Types & Actions
┌─────────────────────────────────────────────────────────────┐
│ FLAG TYPE │ SEVERITY │ ACTION │
├─────────────────────────────────────────────────────────────┤
│ LARGE_DEPOSIT │ HIGH │ Verify source of funds │
│ NEW_ACCOUNT │ MEDIUM │ Require seasoning docs │
│ HIGH_VOLATILITY │ MEDIUM │ Apply higher haircut │
│ CONCENTRATION_RISK │ LOW │ Note in file │
│ SOURCE_OF_FUNDS │ HIGH │ Trace funds │
│ DOCUMENT_TAMPERING │ CRITICAL │ Escalate to compliance │
│ IDENTITY_MISMATCH │ CRITICAL │ Verify identity │
└─────────────────────────────────────────────────────────────┘

text

## Card 4: Gift Funds Requirements
┌─────────────────────────────────────────────────────────────┐
│ GIFT FUNDS REQUIREMENTS │
├─────────────────────────────────────────────────────────────┤
│ ACCEPTABLE DONORS: │
│ • Parent • Grandparent │
│ • Sibling • Spouse │
│ │
│ REQUIRED DOCUMENTS: │
│ ☑ Signed gift letter │
│ ☑ Donor bank statement showing funds │
│ ☑ Transfer confirmation (if wired) │
│ │
│ GIFT LETTER MUST INCLUDE: │
│ • Donor contact info │
│ • Gift amount │
│ • Property address │
│ • Statement of no repayment expectation │
│ • Donor signature │
└─────────────────────────────────────────────────────────────┘

text

## Card 5: Fraud Detection Red Flags
┌─────────────────────────────────────────────────────────────┐
│ FRAUD RED FLAGS │
├─────────────────────────────────────────────────────────────┤
│ 🔴 DOCUMENT ISSUES: │
│ • Inconsistent fonts/sizes │
│ • Missing PDF metadata │
│ • Editing artifacts │
│ │
│ 🔴 PATTERN ISSUES: │
│ • Structuring deposits (just under $10k) │
│ • Circular transactions │
│ • Rapid account activity │
│ │
│ 🔴 IDENTITY ISSUES: │
│ • Account name mismatch │
│ • Address inconsistency │
│ • Multiple accounts with same pattern │
│ │
│ 🔴 SOURCE ISSUES: │
│ • Unexplained large deposits │
│ • Foreign wires with unclear source │
│ • Cash deposits > $5,000 │
└─────────────────────────────────────────────────────────────┘

text

## Card 6: System Hotkeys
┌─────────────────────────────────────────────────────────────┐
│ HOTKEY │ ACTION │
├─────────────────────────────────────────────────────────────┤
│ Ctrl+V │ Verify asset │
│ Ctrl+Q │ Question asset │
│ Ctrl+R │ Reject asset │
│ Ctrl+F │ Add flag │
│ Ctrl+H │ View history │
│ Ctrl+D │ View documents │
│ Ctrl+→ │ Next asset │
│ Ctrl+← │ Previous asset │
│ Ctrl+S │ Save notes │
│ Ctrl+E │ Export data │
└─────────────────────────────────────────────────────────────┘

text

---

This completes the comprehensive final extension with:

1. **Complete OpenAPI/Swagger Specification** - Full API documentation with schemas, examples, and endpoints
2. **Security Testing Suite** - Penetration test scenarios covering SQL injection, XSS, authorization, rate limiting, token security, and data encryption
3. **Disaster Recovery Procedures** - Backup strategy, recovery runbooks, DR test schedules
4. **User Training Materials** - Comprehensive guides for both borrowers and lenders/processors, including quick reference cards

The documentation now provides a complete enterprise-ready solution with all necessary components for successful deployment and operation of the Asset Management module.