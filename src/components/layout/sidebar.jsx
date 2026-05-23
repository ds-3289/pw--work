import { NavLink } from 'react-router-dom';
import './sidebar.css';

const navGroups = [
  {
    label: 'Command Center',
    items: [
      { to: '/dashboard', label: 'Master Dashboard', icon: '', end: true },
      { to: '/system-health', label: 'System Health', icon: '' },
      { to: '/global-search', label: 'Global Search', icon: '' },
    ],
  },
  {
    label: 'Users & Access',
    items: [
      { to: '/users', label: 'User Directory', icon: '', end: true }, // ← exact match only
      { to: '/users/create', label: 'Create User', icon: '' },
      { to: '/users/roles', label: 'Role Management', icon: '' },
      { to: '/users/permissions', label: 'Permission Matrix', icon: '' },
      { to: '/users/sessions', label: 'Sessions', icon: '' },
    ],
  },
  {
    label: 'Account',
    items: [
      { to: '/profile', label: 'Profile Settings', icon: '' },
      { to: '/notifications', label: 'Notifications', icon: '' },
    ],
  },
];

export default function Sidebar({ collapsed, onToggle }) {
  return (
    <aside className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''}`}>
      <div className="sidebar__brand">
        <img src="/logo.png" alt="FinZ" className="sidebar__logo" />
      </div>
      <nav className="sidebar__nav">
        {navGroups.map((group) => (
          <div key={group.label} className="sidebar__group">
            {!collapsed && <span className="sidebar__group-label">{group.label}</span>}
            <ul>
              {group.items.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
                    }
                  >
                    <span className="sidebar__icon">{item.icon}</span>
                    {!collapsed && <span>{item.label}</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
      <button type="button" className="sidebar__toggle" onClick={onToggle} aria-label="Toggle sidebar">
        {collapsed ? '→' : '←'}
      </button>
    </aside>
  );
}