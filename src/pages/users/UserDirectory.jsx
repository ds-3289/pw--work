import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/common/Card';
import Table from '../../components/common/Table';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import SearchBar from '../../components/common/searchbar';
import Modal from '../../components/common/Modal';
import Dropdown from '../../components/common/Dropdown';
import './UserDirectory.css';

const MOCK_USERS = [
  { id: 1, name: 'Rajesh Kumar', email: 'rajesh@merchant.com', role: 'Merchant Admin', merchant: 'TechMart', status: 'active', lastLogin: '2 min ago' },
  { id: 2, name: 'Priya Sharma', email: 'priya@store.com', role: 'Store Manager', merchant: 'ElectroWorld', status: 'active', lastLogin: '1 hr ago' },
  { id: 3, name: 'Amit Patel', email: 'amit@finz.com', role: 'Lender Ops', merchant: '—', status: 'disabled', lastLogin: '3 days ago' },
  { id: 4, name: 'Sneha Reddy', email: 'sneha@finz.com', role: 'Risk User', merchant: '—', status: 'active', lastLogin: '5 hr ago' },
];

export default function UserDirectory() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selected, setSelected] = useState([]);
  const [modal, setModal] = useState(null);

  const filtered = useMemo(() => MOCK_USERS.filter((u) => {
    const q = search.toLowerCase();
    const matchSearch = u.name.toLowerCase().includes(q) || u.email.includes(q);
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    const matchStatus = statusFilter === 'all' || u.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  }), [search, roleFilter, statusFilter]);

  const columns = [
    {
      key: 'select',
      label: '',
      render: (_, row) => (
        <input
          type="checkbox"
          checked={selected.includes(row.id)}
          onChange={() => setSelected((s) => s.includes(row.id) ? s.filter((id) => id !== row.id) : [...s, row.id])}
          onClick={(e) => e.stopPropagation()}
        />
      ),
    },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role', render: (v) => <Badge variant="purple">{v}</Badge> },
    { key: 'merchant', label: 'Merchant' },
    { key: 'status', label: 'Status', render: (v) => <Badge variant={v === 'active' ? 'success' : 'danger'}>{v}</Badge> },
    { key: 'lastLogin', label: 'Last Active' },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <Dropdown
          trigger={<Button variant="secondary" size="sm">⋯</Button>}
          items={[
            { label: 'Edit', onClick: () => navigate(`/users/edit/${row.id}`) },
            { label: 'View activity', onClick: () => {} },
            { label: 'Impersonate (audit)', onClick: () => setModal({ type: 'impersonate', user: row }) },
            { divider: true },
            { label: 'Disable', danger: true, onClick: () => setModal({ type: 'disable', user: row }) },
            { label: 'Reset password', onClick: () => setModal({ type: 'reset', user: row }) },
            { label: 'Force MFA', onClick: () => setModal({ type: 'mfa', user: row }) },
          ]}
        />
      ),
    },
  ];

  const bulkDisable = () => setModal({ type: 'bulk-disable', count: selected.length });
  const exportCsv = () => {
    const csv = ['name,email,role,merchant,status', ...filtered.map((u) => `${u.name},${u.email},${u.role},${u.merchant},${u.status}`)].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'users-export.csv';
    a.click();
  };

  return (
    <PageWrapper
      title="User Directory"
      subtitle="Screen 09 — All roles, filters, bulk actions, export"
      actions={
        <>
          <Button variant="secondary" onClick={exportCsv}>Export CSV</Button>
          <Button variant="secondary" onClick={bulkDisable} disabled={!selected.length}>Bulk disable</Button>
          <Button variant="primary" onClick={() => navigate('/users/create')}>+ Create User</Button>
        </>
      }
    >
      <Card>
        <div className="user-dir__filters">
          <SearchBar placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
            <option value="all">All Roles</option>
            <option value="Merchant Admin">Merchant Admin</option>
            <option value="Store Manager">Store Manager</option>
            <option value="Lender Ops">Lender Ops</option>
            <option value="Risk User">Risk User</option>
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="disabled">Disabled</option>
          </select>
        </div>
        <Table columns={columns} data={filtered} onRowClick={(row) => navigate(`/users/edit/${row.id}`)} />
      </Card>

      <Modal
        isOpen={!!modal}
        onClose={() => setModal(null)}
        title={modal?.type === 'impersonate' ? 'Impersonate User' : 'Confirm Action'}
        footer={
          <>
            <Button variant="secondary" onClick={() => setModal(null)}>Cancel</Button>
            <Button variant="danger" onClick={() => setModal(null)}>Confirm (audit logged)</Button>
          </>
        }
      >
        {modal?.user && <p>Action on <strong>{modal.user.name}</strong> — reason required for audit.</p>}
        {modal?.type === 'bulk-disable' && <p>Disable {modal.count} selected users?</p>}
        <textarea className="user-dir__reason" placeholder="Mandatory comment..." rows={3} />
      </Modal>
    </PageWrapper>
  );
}