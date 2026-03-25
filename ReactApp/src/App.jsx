import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Login from './pages/Login.jsx'
import BorrowerDashboard from './pages/BorrowerDashboard.jsx'
import LoanApplicationWizard from './pages/LoanApplicationWizard.jsx'
import AssetDeclarationWizard from './pages/AssetDeclarationWizard.jsx'
import AssetOverviewDashboard from './pages/AssetOverviewDashboard.jsx'
import DocumentCenter from './pages/DocumentCenter.jsx'
import PropertySearch from './pages/PropertySearch.jsx'
import LoanOfficerPipeline from './pages/LoanOfficerPipeline.jsx'
import UnderwriterReview from './pages/UnderwriterReview.jsx'
import AssetVerificationLender from './pages/AssetVerificationLender.jsx'
import InsuranceManagement from './pages/InsuranceManagement.jsx'
import ClosingDisbursement from './pages/ClosingDisbursement.jsx'
import LoanServicingDashboard from './pages/LoanServicingDashboard.jsx'
import AdminPortal from './pages/AdminPortal.jsx'

export default function App() {
  const [role, setRole] = useState('borrower')

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login setRole={setRole} />} />
        <Route path="/" element={<Layout role={role} setRole={setRole} />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<BorrowerDashboard />} />
          <Route path="apply" element={<LoanApplicationWizard />} />
          <Route path="assets/declare" element={<AssetDeclarationWizard />} />
          <Route path="assets/overview" element={<AssetOverviewDashboard />} />
          <Route path="documents" element={<DocumentCenter />} />
          <Route path="properties" element={<PropertySearch />} />
          <Route path="pipeline" element={<LoanOfficerPipeline />} />
          <Route path="underwriting" element={<UnderwriterReview />} />
          <Route path="asset-verification" element={<AssetVerificationLender />} />
          <Route path="insurance" element={<InsuranceManagement />} />
          <Route path="closing" element={<ClosingDisbursement />} />
          <Route path="servicing" element={<LoanServicingDashboard />} />
          <Route path="admin" element={<AdminPortal />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
