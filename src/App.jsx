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