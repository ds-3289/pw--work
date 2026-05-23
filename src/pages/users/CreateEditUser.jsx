import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import './CreateEditUser.css';

const ROLES = ['Super Admin', 'Merchant Admin', 'Store Manager', 'Sales Exec', 'Lender Ops', 'Risk User'];
const MERCHANTS = ['TechMart', 'ElectroWorld', 'HomeStyle', '—'];
const STORES = ['Store A — Mumbai', 'Store B — Delhi', 'Store C — Bangalore'];

export default function CreateEditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    name: isEdit ? 'Rajesh Kumar' : '',
    email: isEdit ? 'rajesh@merchant.com' : '',
    mobile: isEdit ? '+91 98765 43210' : '',
    role: 'Merchant Admin',
    merchant: 'TechMart',
    stores: ['Store A — Mumbai'],
    forceMfa: true,
    passwordExpiry: '90',
    activeFrom: '',
    activeTo: '',
    sendInvite: true,
  });

  const update = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const toggleStore = (store) => {
    setForm((f) => ({
      ...f,
      stores: f.stores.includes(store) ? f.stores.filter((s) => s !== store) : [...f.stores, store],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(isEdit ? 'User updated' : 'Invite sent via email & SMS');
    navigate('/users');
  };

  return (
    <PageWrapper
      title={isEdit ? 'Edit User' : 'Create User'}
      subtitle="Screen 10 — Onboarding, role, scope, MFA, invite"
      actions={<Button variant="secondary" onClick={() => navigate('/users')}>Cancel</Button>}
    >
      <form onSubmit={handleSubmit}>
        <Card title="User Details">
          <div className="create-user__grid">
            <Input label="Full Name" value={form.name} onChange={(e) => update('name', e.target.value)} required />
            <Input label="Email" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} required />
            <Input label="Mobile" value={form.mobile} onChange={(e) => update('mobile', e.target.value)} required />
            <div className="create-user__field">
              <label>Role</label>
              <select value={form.role} onChange={(e) => update('role', e.target.value)}>
                {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div className="create-user__field">
              <label>Merchant scope</label>
              <select value={form.merchant} onChange={(e) => update('merchant', e.target.value)}>
                {MERCHANTS.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>
        </Card>

        <Card title="Store Assignment (multi-select)">
          <div className="create-user__stores">
            {STORES.map((s) => (
              <label key={s} className="create-user__store-chip">
                <input type="checkbox" checked={form.stores.includes(s)} onChange={() => toggleStore(s)} />
                {s}
              </label>
            ))}
          </div>
        </Card>

        <Card title="Security & Access">
          <div className="create-user__grid">
            <label className="create-user__check">
              <input type="checkbox" checked={form.forceMfa} onChange={(e) => update('forceMfa', e.target.checked)} />
              Force MFA on first login
            </label>
            <div className="create-user__field">
              <label>Password expiry (days)</label>
              <select value={form.passwordExpiry} onChange={(e) => update('passwordExpiry', e.target.value)}>
                <option value="30">30</option>
                <option value="60">60</option>
                <option value="90">90</option>
              </select>
            </div>
            <Input label="Activation date" type="date" value={form.activeFrom} onChange={(e) => update('activeFrom', e.target.value)} />
            <Input label="Deactivation date" type="date" value={form.activeTo} onChange={(e) => update('activeTo', e.target.value)} />
            <label className="create-user__check">
              <input type="checkbox" checked={form.sendInvite} onChange={(e) => update('sendInvite', e.target.checked)} />
              Send invite via Email & SMS
            </label>
          </div>
        </Card>

        <div className="create-user__footer">
          <Button type="submit" variant="primary">{isEdit ? 'Save User' : 'Create & Send Invite'}</Button>
        </div>
      </form>
    </PageWrapper>
  );
}