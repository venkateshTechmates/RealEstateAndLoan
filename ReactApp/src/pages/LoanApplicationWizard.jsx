import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const STEPS = [
  { label: 'Personal Info', icon: '👤' },
  { label: 'Employment', icon: '💼' },
  { label: 'Income', icon: '💵' },
  { label: 'Assets', icon: '💰' },
  { label: 'Property', icon: '🏠' },
  { label: 'Liabilities', icon: '📉' },
  { label: 'Review & Submit', icon: '✅' },
]

export default function LoanApplicationWizard() {
  const [step, setStep] = useState(0)
  const navigate = useNavigate()

  const next = () => { if (step < STEPS.length - 1) setStep(step + 1) }
  const prev = () => { if (step > 0) setStep(step - 1) }

  const stepContent = [
    <StepPersonal />, <StepEmployment />, <StepIncome />,
    <StepAssetsSummary navigate={navigate} />, <StepProperty />,
    <StepLiabilities />, <StepReview navigate={navigate} />,
  ]

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800 }}>Loan Application — Form 1003</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>Uniform Residential Loan Application · Application #APP-2026-001842</p>
      </div>

      {/* Step indicator */}
      <div style={{ display: 'flex', marginBottom: 32 }}>
        {STEPS.map((s, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
            {i < STEPS.length - 1 && (
              <div style={{ position: 'absolute', top: 16, left: '50%', right: '-50%', height: 2, background: i < step ? '#3b82f6' : 'var(--border)', zIndex: 0 }} />
            )}
            <div
              onClick={() => i <= step && setStep(i)}
              style={{
                width: 32, height: 32, borderRadius: '50%',
                background: i < step ? '#3b82f6' : i === step ? '#1e40af' : 'var(--bg-elevated)',
                border: `2px solid ${i <= step ? '#3b82f6' : 'var(--border)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: i < step ? 13 : 14,
                color: i < step ? '#fff' : i === step ? '#60a5fa' : 'var(--text-muted)',
                fontWeight: 700, zIndex: 1, position: 'relative',
                cursor: i <= step ? 'pointer' : 'default',
              }}
            >
              {i < step ? '✓' : s.icon}
            </div>
            <div style={{ fontSize: 10, fontWeight: i === step ? 600 : 400, color: i < step ? '#60a5fa' : i === step ? 'var(--text-primary)' : 'var(--text-muted)', marginTop: 5, textAlign: 'center', lineHeight: 1.3 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="card" style={{ minHeight: 400 }}>
        <div style={{ marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 22 }}>{STEPS[step].icon}</span>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>Step {step + 1}: {STEPS[step].label}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>Please fill in all required fields marked with *</div>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', textAlign: 'right' }}>{step + 1} of {STEPS.length}</div>
            <div className="progress-bar" style={{ width: 120, marginTop: 4 }}>
              <div className="progress-fill" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
            </div>
          </div>
        </div>
        {stepContent[step]}
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
        <div style={{ display: 'flex', gap: 10 }}>
          {step > 0 && <button className="btn btn-secondary" onClick={prev}>← Previous</button>}
          <button className="btn btn-ghost" style={{ color: 'var(--text-muted)' }}>Save & Exit</button>
        </div>
        {step < STEPS.length - 1 ? (
          <button className="btn btn-primary" onClick={next}>Save & Continue →</button>
        ) : (
          <button className="btn btn-success" onClick={() => navigate('/dashboard')}>🚀 Submit Application</button>
        )}
      </div>
    </div>
  )
}

function FormSection({ title, children }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ height: 1, width: 20, background: 'var(--border)' }} />
        {title}
        <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>
      {children}
    </div>
  )
}

function StepPersonal() {
  return (
    <div>
      <FormSection title="Primary Borrower">
        <div className="form-row-3">
          <div className="form-group"><label className="form-label">FIRST NAME *</label><input defaultValue="John" /></div>
          <div className="form-group"><label className="form-label">MIDDLE NAME</label><input placeholder="Optional" /></div>
          <div className="form-group"><label className="form-label">LAST NAME *</label><input defaultValue="Doe" /></div>
        </div>
        <div className="form-row">
          <div className="form-group"><label className="form-label">DATE OF BIRTH *</label><input type="date" defaultValue="1985-06-15" /></div>
          <div className="form-group"><label className="form-label">SOCIAL SECURITY NUMBER *</label><input placeholder="XXX-XX-XXXX" defaultValue="***-**-7890" /></div>
        </div>
        <div className="form-row">
          <div className="form-group"><label className="form-label">MARITAL STATUS</label>
            <select defaultValue="married"><option>Married</option><option>Single</option><option>Separated</option></select>
          </div>
          <div className="form-group"><label className="form-label">CITIZENSHIP</label>
            <select><option>US Citizen</option><option>Permanent Resident</option><option>Non-Permanent Resident Alien</option></select>
          </div>
        </div>
      </FormSection>
      <FormSection title="Contact Information">
        <div className="form-row">
          <div className="form-group"><label className="form-label">EMAIL ADDRESS *</label><input type="email" defaultValue="john.doe@example.com" /></div>
          <div className="form-group"><label className="form-label">PHONE NUMBER *</label><input defaultValue="+1 (555) 234-5678" /></div>
        </div>
        <div className="form-group"><label className="form-label">CURRENT ADDRESS *</label><input defaultValue="456 Oak Street, Austin, TX 78701" /></div>
        <div className="form-row">
          <div className="form-group"><label className="form-label">YEARS AT ADDRESS</label><input type="number" defaultValue="3" /></div>
          <div className="form-group"><label className="form-label">HOUSING STATUS</label>
            <select><option>Renting</option><option>Own</option><option>Living Rent-Free</option></select>
          </div>
        </div>
      </FormSection>
      <FormSection title="Co-Applicant">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <input type="checkbox" id="coapp" defaultChecked style={{ width: 'auto' }} />
          <label htmlFor="coapp" style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Add Co-Applicant (Spouse / Partner)</label>
        </div>
        <div className="form-row">
          <div className="form-group"><label className="form-label">CO-APPLICANT FIRST NAME</label><input defaultValue="Priya" /></div>
          <div className="form-group"><label className="form-label">CO-APPLICANT LAST NAME</label><input defaultValue="Doe" /></div>
        </div>
      </FormSection>
    </div>
  )
}

function StepEmployment() {
  return (
    <div>
      <FormSection title="Primary Employment">
        <div className="form-row">
          <div className="form-group"><label className="form-label">EMPLOYER NAME *</label><input defaultValue="TechCorp Inc." /></div>
          <div className="form-group"><label className="form-label">JOB TITLE *</label><input defaultValue="Senior Software Engineer" /></div>
        </div>
        <div className="form-row-3">
          <div className="form-group"><label className="form-label">START DATE *</label><input type="date" defaultValue="2019-03-01" /></div>
          <div className="form-group"><label className="form-label">EMPLOYMENT TYPE</label>
            <select><option>Full-Time W-2</option><option>Part-Time</option><option>Self-Employed</option><option>Contract</option></select>
          </div>
          <div className="form-group"><label className="form-label">YEARS IN INDUSTRY</label><input type="number" defaultValue="8" /></div>
        </div>
        <div className="form-group"><label className="form-label">EMPLOYER ADDRESS</label><input defaultValue="1000 Tech Blvd, Austin, TX 78702" /></div>
        <div className="form-row">
          <div className="form-group"><label className="form-label">HR / CONTACT PHONE</label><input placeholder="+1 (555) 000-0000" /></div>
          <div className="form-group"><label className="form-label">EMPLOYER EIN (Optional)</label><input placeholder="XX-XXXXXXX" /></div>
        </div>
      </FormSection>
      <FormSection title="Previous Employment (if < 2 years at current job)">
        <div className="alert alert-info"><span>ℹ️</span><span>Current employment is 7+ years. Previous employment not required.</span></div>
      </FormSection>
    </div>
  )
}

function StepIncome() {
  return (
    <div>
      <FormSection title="Base Income">
        <div className="form-row">
          <div className="form-group"><label className="form-label">BASE SALARY (ANNUAL) *</label><input defaultValue="$145,000" /></div>
          <div className="form-group"><label className="form-label">PAY FREQUENCY</label>
            <select><option>Bi-Weekly</option><option>Semi-Monthly</option><option>Monthly</option><option>Weekly</option></select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group"><label className="form-label">OVERTIME (ANNUAL AVG)</label><input defaultValue="$8,000" /></div>
          <div className="form-group"><label className="form-label">BONUS (ANNUAL AVG)</label><input defaultValue="$15,000" /></div>
        </div>
      </FormSection>
      <FormSection title="Other Income Sources">
        {[
          { type: 'Rental Income', amount: '$2,400/mo', verified: true },
          { type: 'Investment Dividends', amount: '$450/mo', verified: true },
        ].map((inc, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: 'var(--bg-elevated)', borderRadius: 8, marginBottom: 8, border: '1px solid var(--border)' }}>
            <span>💵</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{inc.type}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{inc.amount}</div>
            </div>
            <span className={`badge ${inc.verified ? 'badge-green' : 'badge-yellow'}`}>{inc.verified ? '✓ Verified' : 'Pending'}</span>
            <button className="btn btn-ghost btn-sm">Edit</button>
          </div>
        ))}
        <button className="btn btn-secondary btn-sm" style={{ marginTop: 8 }}>+ Add Income Source</button>
      </FormSection>
      <FormSection title="Calculated Qualifying Income">
        <div style={{ background: 'var(--bg-elevated)', borderRadius: 10, padding: 16, border: '1px solid var(--border)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            {[['Base Salary', '$12,083/mo'],['Other Income', '$2,850/mo'],['Total Qualifying', '$14,933/mo']].map(([k,v]) => (
              <div key={k}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>{k}</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: k === 'Total Qualifying' ? '#34d399' : 'var(--text-primary)' }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </FormSection>
    </div>
  )
}

function StepAssetsSummary({ navigate }) {
  return (
    <div>
      <div className="alert alert-info"><span>ℹ️</span><span>You can add detailed asset information in the dedicated Asset Declaration module. Here you can provide a quick summary.</span></div>
      <FormSection title="Asset Summary">
        {[
          { type: 'Checking Account — Chase Bank', value: '$42,000', status: 'badge-green', statusText: 'Verified' },
          { type: 'Savings Account — Chase Bank', value: '$28,000', status: 'badge-green', statusText: 'Verified' },
          { type: 'Vanguard 401(k)', value: '$185,000', status: 'badge-yellow', statusText: 'Pending' },
          { type: 'Investment Account — Fidelity', value: '$95,000', status: 'badge-yellow', statusText: 'Pending' },
        ].map((a, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: 'var(--bg-elevated)', borderRadius: 8, marginBottom: 8, border: '1px solid var(--border)' }}>
            <span>💰</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{a.type}</div>
            </div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{a.value}</div>
            <span className={`badge ${a.status}`}>{a.statusText}</span>
          </div>
        ))}
        <button className="btn btn-secondary btn-sm" onClick={() => navigate('/assets/declare')} style={{ marginTop: 8 }}>
          + Add / Manage Assets in Detail →
        </button>
      </FormSection>
    </div>
  )
}

function StepProperty() {
  return (
    <div>
      <FormSection title="Subject Property">
        <div className="form-group"><label className="form-label">PROPERTY ADDRESS *</label><input defaultValue="789 Maple Drive, Austin, TX 78750" /></div>
        <div className="form-row-3">
          <div className="form-group"><label className="form-label">PROPERTY TYPE</label>
            <select><option>Single Family</option><option>Condo</option><option>Townhouse</option><option>Multi-Family</option></select>
          </div>
          <div className="form-group"><label className="form-label">OCCUPANCY</label>
            <select><option>Primary Residence</option><option>Second Home</option><option>Investment</option></select>
          </div>
          <div className="form-group"><label className="form-label">YEAR BUILT</label><input defaultValue="2018" /></div>
        </div>
        <div className="form-row">
          <div className="form-group"><label className="form-label">PURCHASE PRICE *</label><input defaultValue="$540,000" /></div>
          <div className="form-group"><label className="form-label">APPRAISED VALUE</label><input defaultValue="$545,000" /></div>
        </div>
        <div className="form-row">
          <div className="form-group"><label className="form-label">LOAN PURPOSE</label>
            <select><option>Purchase</option><option>Refinance - Rate/Term</option><option>Refinance - Cash Out</option></select>
          </div>
          <div className="form-group"><label className="form-label">HOA MONTHLY FEE</label><input defaultValue="$0" /></div>
        </div>
      </FormSection>
      <FormSection title="Loan Details">
        <div className="form-row-3">
          <div className="form-group"><label className="form-label">LOAN AMOUNT *</label><input defaultValue="$485,000" /></div>
          <div className="form-group"><label className="form-label">DOWN PAYMENT</label><input defaultValue="$55,000" /></div>
          <div className="form-group"><label className="form-label">DOWN PAYMENT %</label><input defaultValue="10.19%" disabled style={{ color: 'var(--text-muted)' }} /></div>
        </div>
        <div className="form-row">
          <div className="form-group"><label className="form-label">LOAN PRODUCT</label>
            <select><option>Conventional 30-Year Fixed</option><option>FHA 30-Year</option><option>VA</option><option>USDA</option></select>
          </div>
          <div className="form-group"><label className="form-label">ESTIMATED RATE</label><input defaultValue="6.875%" /></div>
        </div>
      </FormSection>
    </div>
  )
}

function StepLiabilities() {
  return (
    <div>
      <FormSection title="Monthly Liabilities">
        {[
          { desc: 'Auto Loan — Toyota Camry', payment: '$420/mo', balance: '$14,200', type: 'Installment' },
          { desc: 'Chase Sapphire Credit Card', payment: '$180/mo', balance: '$4,800', type: 'Revolving' },
          { desc: 'Student Loan', payment: '$310/mo', balance: '$22,000', type: 'Installment' },
        ].map((l, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: 'var(--bg-elevated)', borderRadius: 8, marginBottom: 8, border: '1px solid var(--border)' }}>
            <span>📉</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{l.desc}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Balance: {l.balance} · {l.type}</div>
            </div>
            <div style={{ color: '#f87171', fontWeight: 600, fontSize: 13 }}>{l.payment}</div>
            <button className="btn btn-ghost btn-sm">Edit</button>
          </div>
        ))}
        <button className="btn btn-secondary btn-sm" style={{ marginTop: 8 }}>+ Add Liability</button>
      </FormSection>
      <FormSection title="DTI Summary">
        <div style={{ background: 'var(--bg-elevated)', borderRadius: 10, padding: 16, border: '1px solid var(--border)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {[
              ['Gross Income', '$14,933/mo', 'var(--text-primary)'],
              ['Front-End DTI', '21.4%', '#34d399'],
              ['Back-End DTI', '35.6%', '#34d399'],
              ['Max Allowed DTI', '43%', 'var(--text-muted)'],
            ].map(([k, v, c]) => (
              <div key={k} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: c }}>{v}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{k}</div>
              </div>
            ))}
          </div>
        </div>
      </FormSection>
    </div>
  )
}

function StepReview({ navigate }) {
  return (
    <div>
      <div className="alert alert-success"><span>✅</span><span>Your application is complete and ready to submit for lender review.</span></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {[
          { title: '👤 Borrower', items: [['Name', 'John & Priya Doe'], ['SSN', '***-**-7890'], ['Address', '456 Oak St, Austin TX']] },
          { title: '💼 Employment', items: [['Employer', 'TechCorp Inc.'], ['Title', 'Sr. Software Engineer'], ['Years', '7+ years']] },
          { title: '💵 Income', items: [['Base Salary', '$145,000/yr'], ['Other Income', '$34,200/yr'], ['Total Qualifying', '$14,933/mo']] },
          { title: '🏠 Property', items: [['Address', '789 Maple Dr, Austin TX'], ['Purchase Price', '$540,000'], ['Loan Amount', '$485,000']] },
          { title: '💰 Assets', items: [['Total Assets', '$350,000'], ['Down Payment', '$55,000'], ['Reserves', '$295,000']] },
          { title: '📊 Ratios', items: [['Front DTI', '21.4%'], ['Back DTI', '35.6%'], ['LTV', '89.8%']] },
        ].map(section => (
          <div key={section.title} className="card" style={{ padding: 14 }}>
            <div style={{ fontWeight: 700, marginBottom: 10, fontSize: 13 }}>{section.title}</div>
            {section.items.map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '4px 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ color: 'var(--text-muted)' }}>{k}</span>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{v}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 16, display: 'flex', alignItems: 'flex-start', gap: 10, padding: 14, background: 'var(--bg-elevated)', borderRadius: 8, border: '1px solid var(--border)' }}>
        <input type="checkbox" id="agree" style={{ width: 'auto', marginTop: 2 }} defaultChecked />
        <label htmlFor="agree" style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          I certify that the information provided in this application is true and correct. I acknowledge receipt of the Fair Lending Notice, Privacy Policy, and consent to credit inquiry. I understand this application will be used to evaluate my creditworthiness.
        </label>
      </div>
    </div>
  )
}
