import { useState, useCallback } from 'react'
import { HashRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { clearSession, isSessionValid } from './utils/session.js'
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
import LoanWorkflowTracker from './pages/LoanWorkflowTracker.jsx'
import SuperAdminDashboard from './pages/SuperAdminDashboard.jsx'
import LenderAdminDashboard from './pages/LenderAdminDashboard.jsx'
import BrokerageAdminDashboard from './pages/BrokerageAdminDashboard.jsx'
import TitleCoAdminDashboard from './pages/TitleCoAdminDashboard.jsx'
import TitleAgentPortal from './pages/TitleAgentPortal.jsx'
import InsuranceAgentPortal from './pages/InsuranceAgentPortal.jsx'
import BuilderPortal from './pages/BuilderPortal.jsx'
import ComplianceDashboard from './pages/ComplianceDashboard.jsx'
import MultiTenantLogin from './pages/MultiTenantLogin.jsx'
import TenantManagement from './pages/TenantManagement.jsx'
import TransactionManagement from './pages/TransactionManagement.jsx'

function AppRoutes({ role, setRole }) {
  const navigate = useNavigate()
  const handleLogout = useCallback(() => {
    clearSession()
    navigate('/login', { replace: true })
  }, [navigate])

  return (
    <Routes>
      <Route path="/select-org" element={<OrgSelect />} />
      <Route path="/login" element={<Login setRole={setRole} />} />
      <Route path="/multi-tenant-login" element={<MultiTenantLogin />} />
      <Route path="/" element={
        isSessionValid()
          ? <Layout role={role} setRole={setRole} onLogout={handleLogout} />
          : <Navigate to="/login" replace />
      }>
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
          <Route path="workflow-tracker" element={<LoanWorkflowTracker />} />
          <Route path="super-admin" element={<SuperAdminDashboard />} />
          <Route path="lender-admin" element={<LenderAdminDashboard />} />
          <Route path="brokerage-admin" element={<BrokerageAdminDashboard />} />
          <Route path="title-admin" element={<TitleCoAdminDashboard />} />
          <Route path="title-agent" element={<TitleAgentPortal />} />
          <Route path="insurance-portal" element={<InsuranceAgentPortal />} />
          <Route path="builder-portal" element={<BuilderPortal />} />
          <Route path="compliance" element={<ComplianceDashboard />} />
          <Route path="tenant-management" element={<TenantManagement />} />
          <Route path="transactions" element={<TransactionManagement />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default function App() {
  const [role, setRole] = useState('borrower')
  return (
    <ThemeProvider>
      <HashRouter>
        <AppRoutes role={role} setRole={setRole} />
      </HashRouter>
    </ThemeProvider>
  )
}
