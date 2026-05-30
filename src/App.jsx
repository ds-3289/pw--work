import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './styles/index.css';
import './styles/components.css';

import Layout from './components/layout/Layout';
import PageWrapper from './components/layout/PageWrapper';
import Card from './components/common/Card';

// Auth — Screens 01–03
import Login from './pages/auth/Login';
import MFAVerification from './pages/auth/MFAVerification';
import ForgotPassword from './pages/auth/ForgotPassword';

// Profile — Screens 04–05
import ProfileSettings from './pages/profile/ProfileSettings';
import NotificationCenter from './pages/profile/NotificationCenter';

// Users — Screens 09–13
import UserDirectory from './pages/users/UserDirectory';
import CreateEditUser from './pages/users/CreateEditUser';
import RoleManagement from './pages/users/RoleManagement';
import PermissionMatrix from './pages/users/PermissionMatrix';
import SessionManagement from './pages/users/SessionManagement';

// Loan Management — Screens 33–37
import LoanApplicationMonitor from './pages/loans/LoanApplicationMonitor';
import LoanDetailTimeline from './pages/loans/LoanDetailTimeline';
import ManualOverrideConsole from './pages/loans/ManualOverrideConsole';
import DisbursalSettlementQueue from './pages/loans/DisbursalSettlementQueue';
import CollectionsBounceManagement from './pages/loans/CollectionsBounceManagement';

// Phase 9 — Risk & Fraud — Screens 38–41
import FraudAlertFeed from './pages/risk/FraudAlertFeed';
import BlacklistManager from './pages/risk/BlacklistManager';
import VelocityRiskRules from './pages/risk/VelocityRiskRules';
import ManualReviewQueue from './pages/risk/ManualReviewQueue';

// Phase 10 — Compliance & Audit — Screens 42–44
import AuditTrailExplorer from './pages/compliance/AuditTrailExplorer';
import ConsentLogViewer from './pages/compliance/ConsentLogViewer';
import ComplianceReportsExports from './pages/compliance/ComplianceReportsExports';

// Phase 11 — Analytics & Business Intelligence — Screens 45–48
import BusinessAnalyticsDashboard from './pages/analytics/BusinessAnalyticsDashboard';
import LenderLoanAnalytics from './pages/analytics/LenderLoanAnalytics';
import SalesRegionAnalytics from './pages/analytics/SalesRegionAnalytics';
import CustomReportBuilder from './pages/analytics/CustomReportBuilder';

// Phase 12 — Notifications & Document Management — Screens 49–51
import NotificationTemplateManager from './pages/notifications/NotificationTemplateManager';
import CommunicationLogs from './pages/notifications/CommunicationLogs';
import DocumentRepository from './pages/notifications/DocumentRepository';

// Phase 13 — System & Integrations — Screens 52–55
import WorkflowBuilder from './pages/system/WorkflowBuilder';
import ThirdPartyIntegrations from './pages/system/ThirdPartyIntegrations';
import FeatureFlagsABTests from './pages/system/FeatureFlagsABTests';
import SystemParametersSettings from './pages/system/SystemParametersSettings';

// Phase 14 — Support & Helpdesk — Screens 56–57
import MasterTicketQueue from './pages/support/MasterTicketQueue';
import TicketDetailSLATracking from './pages/support/TicketDetailSLATracking';

// ─── Auth helpers ───────────────────────────────────────────
function isAuthenticated() {
  return localStorage.getItem('finz_authenticated') === 'true';
}

function logout() {
  localStorage.removeItem('finz_authenticated');
  localStorage.removeItem('finz_remember_device');
  localStorage.removeItem('finz_trusted_mfa');
}

// ─── Route guards ───────────────────────────────────────────
function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function PublicRoute({ children }) {
  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

// ─── Placeholder for screens not built yet (06–08) ──────────
function ComingSoon({ title, subtitle, screen }) {
  return (
    <PageWrapper title={title} subtitle={subtitle}>
      <Card title={`Screen ${screen} — Coming in Phase 1`}>
        <p style={{ color: 'var(--color-text-muted)', margin: 0 }}>
          This screen will be implemented next. Navigation and routing are already wired.
        </p>
      </Card>
    </PageWrapper>
  );
}

// ─── Layout wrapper with user + logout ──────────────────────
function AppLayout() {
  const navigate = useNavigate();

  const user = {
    name: 'Super Admin',
    role: 'Super Admin',
    email: 'admin@finz.com',
  };

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return <Layout user={user} onLogout={handleLogout} />;
}

// ─── App ────────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public auth routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/mfa"
          element={
            <PublicRoute>
              <MFAVerification />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />

        {/* Protected app routes */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          {/* Command Center — Screens 06–08 (placeholders) */}
          <Route
            path="/dashboard"
            element={
              <ComingSoon
                screen="06"
                title="Master Dashboard"
                subtitle="Platform-wide live KPIs and action tray"
              />
            }
          />
          <Route
            path="/system-health"
            element={
              <ComingSoon
                screen="07"
                title="System Health & Monitoring"
                subtitle="API uptime, queues, integrations, error feed"
              />
            }
          />
          <Route
            path="/global-search"
            element={
              <ComingSoon
                screen="08"
                title="Global Search & Command Palette"
                subtitle="Cmd+K search across all records"
              />
            }
          />

          {/* Phase 8 — Loan & Disbursal Management — Screens 33–37 */}
          <Route path="/loan-application-monitor" element={<LoanApplicationMonitor />} />
          <Route path="/loan-detail-timeline" element={<LoanDetailTimeline />} />
          <Route path="/manual-override-console" element={<ManualOverrideConsole />} />
          <Route path="/disbursal-settlement-queue" element={<DisbursalSettlementQueue />} />
          <Route path="/collections-bounce-management" element={<CollectionsBounceManagement />} />

          {/* Phase 9 — Risk & Fraud — Screens 38–41 */}
          <Route path="/fraud-alert-feed" element={<FraudAlertFeed />} />
          <Route path="/blacklist-manager" element={<BlacklistManager />} />
          <Route path="/velocity-risk-rules" element={<VelocityRiskRules />} />
          <Route path="/manual-review-queue" element={<ManualReviewQueue />} />

          {/* Phase 10 — Compliance & Audit — Screens 42–44 */}
          <Route path="/audit-trail-explorer" element={<AuditTrailExplorer />} />
          <Route path="/consent-log-viewer" element={<ConsentLogViewer />} />
          <Route path="/compliance-reports-exports" element={<ComplianceReportsExports />} />

          {/* Phase 11 — Analytics & Business Intelligence — Screens 45–48 */}
          <Route path="/business-analytics-dashboard" element={<BusinessAnalyticsDashboard />} />
          <Route path="/lender-loan-analytics" element={<LenderLoanAnalytics />} />
          <Route path="/sales-region-analytics" element={<SalesRegionAnalytics />} />
          <Route path="/custom-report-builder" element={<CustomReportBuilder />} />

          {/* Phase 12 — Notifications & Document Management — Screens 49–51 */}
          <Route path="/notification-template-manager" element={<NotificationTemplateManager />} />
          <Route path="/communication-logs" element={<CommunicationLogs />} />
          <Route path="/document-repository" element={<DocumentRepository />} />

          {/* Phase 13 — System & Integrations — Screens 52–55 */}
          <Route path="/workflow-builder" element={<WorkflowBuilder />} />
          <Route path="/third-party-integrations" element={<ThirdPartyIntegrations />} />
          <Route path="/feature-flags-ab-tests" element={<FeatureFlagsABTests />} />
          <Route path="/system-parameters-settings" element={<SystemParametersSettings />} />

          {/* Phase 14 — Support & Helpdesk — Screens 56–57 */}
          <Route path="/master-ticket-queue" element={<MasterTicketQueue />} />
          <Route path="/ticket-detail-sla-tracking" element={<TicketDetailSLATracking />} />

          {/* Profile — Screens 04–05 */}
          <Route path="/profile" element={<ProfileSettings />} />
          <Route path="/notifications" element={<NotificationCenter />} />

          {/* Users — Screens 09–13 */}
          <Route path="/users" element={<UserDirectory />} />
          <Route path="/users/create" element={<CreateEditUser />} />
          <Route path="/users/edit/:id" element={<CreateEditUser />} />
          <Route path="/users/roles" element={<RoleManagement />} />
          <Route path="/users/permissions" element={<PermissionMatrix />} />
          <Route path="/users/sessions" element={<SessionManagement />} />
        </Route>

        {/* Default redirects */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}