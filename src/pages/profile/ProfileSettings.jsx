import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Tabs from '../../components/common/Tabs';
import Badge from '../../components/common/Badge';
import './ProfileSettings.css';

const tabs = [
  { id: 'personal', label: 'Personal' },
  { id: 'security', label: 'Security & MFA' },
  { id: 'notifications', label: 'Preferences' },
];

export default function ProfileSettings() {
  const [activeTab, setActiveTab] = useState('personal');
  const [form, setForm] = useState({
    name: 'Super Admin',
    email: 'admin@finz.com',
    mobile: '+91 98765 43210',
    timezone: 'Asia/Kolkata',
    theme: 'dark',
  });
  const [channels, setChannels] = useState({
    inapp: true, email: true, sms: false, whatsapp: false,
  });
  const [mfaEnabled, setMfaEnabled] = useState(true);

  const toggleChannel = (key) => setChannels((c) => ({ ...c, [key]: !c[key] }));

  return (
    <PageWrapper title="Profile & Personal Settings" subtitle="Screen 04 — Personal details, password, MFA, preferences">
      <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />

      {activeTab === 'personal' && (
        <Card title="Personal Details">
          <div className="profile-form">
            <div className="profile-avatar">
              <span>SA</span>
              <Button variant="secondary" size="sm">Change Photo</Button>
            </div>
            <div className="profile-grid">
              <Input label="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <Input label="Mobile" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} />
              <Input label="Email" type="email" value={form.email} disabled />
              <div className="profile-field">
                <label>Timezone</label>
                <select value={form.timezone} onChange={(e) => setForm({ ...form, timezone: e.target.value })}>
                  <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>
              <div className="profile-field">
                <label>Theme</label>
                <select value={form.theme} onChange={(e) => setForm({ ...form, theme: e.target.value })}>
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                </select>
              </div>
            </div>
            <Button variant="teal">Save Changes</Button>
          </div>
        </Card>
      )}

      {activeTab === 'security' && (
        <>
          <Card title="Change Password">
            <div className="profile-grid">
              <Input label="Current Password" type="password" />
              <Input label="New Password" type="password" hint="Min 12 chars with complexity" />
              <Input label="Confirm New Password" type="password" />
            </div>
            <Button variant="primary" style={{ marginTop: '1rem' }}>Update Password</Button>
          </Card>
          <Card title="Multi-Factor Authentication">
            <div className="profile-mfa">
              <div>
                <p>Status: {mfaEnabled ? <Badge variant="success">Enabled</Badge> : <Badge variant="danger">Disabled</Badge>}</p>
                <p className="profile-mfa__hint">MFA cannot be bypassed for Super Admin (PRD)</p>
              </div>
              <div className="profile-mfa__actions">
                <Button variant="secondary" onClick={() => setMfaEnabled(!mfaEnabled)} disabled>
                  {mfaEnabled ? 'Reconfigure MFA' : 'Enable MFA'}
                </Button>
                <Button variant="ghost">View Recovery Codes</Button>
              </div>
            </div>
          </Card>
        </>
      )}

      {activeTab === 'notifications' && (
        <Card title="Notification Channel Preferences">
          <div className="profile-channels">
            {[
              { key: 'inapp', label: 'In-app' },
              { key: 'email', label: 'Email' },
              { key: 'sms', label: 'SMS' },
              { key: 'whatsapp', label: 'WhatsApp' },
            ].map(({ key, label }) => (
              <label key={key} className="profile-channel">
                <input type="checkbox" checked={channels[key]} onChange={() => toggleChannel(key)} />
                <span>{label}</span>
              </label>
            ))}
          </div>
          <Button variant="teal" style={{ marginTop: '1rem' }}>Save Preferences</Button>
        </Card>
      )}
    </PageWrapper>
  );
}