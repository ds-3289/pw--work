// src/components/layout/Layout.jsx
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar';
import Topbar from './Topbar';
import './Layout.css';

export default function Layout({ user, onLogout }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`app-layout ${collapsed ? 'app-layout--collapsed' : ''}`}>
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <div className="app-layout__main">
        <Topbar user={user} onLogout={onLogout} />
        <main className="app-layout__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}