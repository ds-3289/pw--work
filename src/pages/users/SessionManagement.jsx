import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/common/Card';
import Table from '../../components/common/Table';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import './SessionManagement.css';

const SESSIONS = [
  { id: 1, user: 'Rajesh Kumar', role: 'Merchant Admin', ip: '103.21.45.12', device: 'Chrome / macOS', loginTime: '2026-05-23 09:12', suspicious: false },
  { id: 2, user: 'Amit Patel', role: 'Lender Ops', ip: '49.36.88.201', device: 'Safari / iPhone', loginTime: '2026-05-23 08:45', suspicious: true },
  { id: 3, user: 'Priya Sharma', role: 'Store Manager', ip: '103.21.45.99', device: 'Firefox / Windows', loginTime: '2026-05-22 22:10', suspicious: true },
];

export default function SessionManagement() {
  const [sessions, setSessions] = useState(SESSIONS);
  const [modal, setModal] = useState(null);
  const [allowlist, setAllowlist] = useState('103.21.45.0/24');
  const [denylist, setDenylist] = useState('');
  const [sessionLimit, setSessionLimit] = useState(3);

  const revoke = (id) => setSessions((s) => s.filter((x) => x.id !== id));
  const revokeAllForUser = (user) => setSessions((s) => s.filter((x) => x.user !== user));

  const columns = [
    { key: 'user', label: 'User' },
    { key: 'role', label: 'Role', render: (v) => <Badge variant="purple">{v}</Badge> },
    { key: 'ip', label: 'IP' },
    { key: 'device', label: 'Device' },
    { key: 'loginTime', label: 'Login Time' },
    {
      key: 'suspicious',
      label: 'Flag',
      render: (v) => v ? <Badge variant="danger">Suspicious</Badge> : <Badge variant="success">Normal</Badge>,
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <Button variant="danger" size="sm" onClick={() => setModal({ type: 'revoke', session: row })}>Force logout</Button>
      ),
    },
  ];

  return (
    <PageWrapper
      title="Session & Device Management"
      subtitle="Screen 13 — Active sessions, revoke, IP lists, concurrent limits"
      actions={
        <Button variant="danger" onClick={() => setModal({ type: 'revoke-all' })}>Revoke all suspicious</Button>
      }
    >
      <Card title="Active Sessions">
        <Table columns={columns} data={sessions} emptyMessage="No active sessions" />
      </Card>

      <div className="session-config">
        <Card title="IP Allowlist (per role)">
          <Input label="CIDR / IP ranges" value={allowlist} onChange={(e) => setAllowlist(e.target.value)} hint="One per line on server" />
          <Button variant="teal" style={{ marginTop: '0.75rem' }}>Save allowlist</Button>
        </Card>
        <Card title="IP Denylist">
          <Input label="Blocked IPs" value={denylist} onChange={(e) => setDenylist(e.target.value)} placeholder="e.g. 49.36.0.0/16" />
          <Button variant="secondary" style={{ marginTop: '0.75rem' }}>Save denylist</Button>
        </Card>
        <Card title="Concurrent Session Limit">
          <div className="session-limit">
            <label>Max sessions per role (Merchant Admin)</label>
            <input type="number" min={1} max={10} value={sessionLimit} onChange={(e) => setSessionLimit(Number(e.target.value))} />
          </div>
          <Button variant="primary" style={{ marginTop: '0.75rem' }}>Update limit</Button>
        </Card>
      </div>

      <Modal
        isOpen={!!modal}
        onClose={() => setModal(null)}
        title="Confirm Revoke"
        footer={
          <>
            <Button variant="secondary" onClick={() => setModal(null)}>Cancel</Button>
            <Button variant="danger" onClick={() => {
              if (modal?.type === 'revoke') revoke(modal.session.id);
              if (modal?.type === 'revoke-all') setSessions((s) => s.filter((x) => !x.suspicious));
              setModal(null);
            }}>Revoke</Button>
          </>
        }
      >
        {modal?.session && <p>Force logout <strong>{modal.session.user}</strong> from {modal.session.device}?</p>}
        {modal?.type === 'revoke-all' && <p>Revoke all sessions flagged as suspicious?</p>}
        {modal?.session && (
          <Button variant="ghost" size="sm" onClick={() => { revokeAllForUser(modal.session.user); setModal(null); }}>
            Revoke all sessions for this user
          </Button>
        )}
      </Modal>
    </PageWrapper>
  );
}