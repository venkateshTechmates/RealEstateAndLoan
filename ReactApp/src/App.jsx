import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext.jsx'
import Layout from './components/Layout.jsx'
import Login from './pages/Login.jsx'
import OrgSelect from './pages/OrgSelect.jsx'
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
import AssetDashboard from './pages/AssetDashboard.jsx'
import AssetDetail from './pages/AssetDetail.jsx'
import LenderAssetQueue from './pages/LenderAssetQueue.jsx'
import NotificationsCenter from './pages/NotificationsCenter.jsx'
import ProfileSettings from './pages/ProfileSettings.jsx'
import ReportsDashboard from './pages/ReportsDashboard.jsx'
import BrokerDashboard from './pages/BrokerDashboard.jsx'
import PreQualCalculator from './pages/PreQualCalculator.jsx'
import MessagingCenter from './pages/MessagingCenter.jsx'

export default function App() {
  const [role, setRole] = useState('borrower')

  return (
    <ThemeProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/select-org" element={<OrgSelect />} />
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
          <Route path="assets" element={<AssetDashboard />} />
          <Route path="assets/detail/:id" element={<AssetDetail />} />
          <Route path="asset-queue" element={<LenderAssetQueue />} />
          <Route path="notifications" element={<NotificationsCenter />} />
          <Route path="profile" element={<ProfileSettings />} />
          <Route path="reports" element={<ReportsDashboard />} />
          <Route path="broker-dashboard" element={<BrokerDashboard />} />
          <Route path="calculator" element={<PreQualCalculator />} />
          <Route path="messages" element={<MessagingCenter />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  )
}
