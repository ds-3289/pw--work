import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import './LenderDirectory.css';

const MOCK = [
  { id: 'L-01', name: 'HDFC', status: 'Live', volume: '38%', approval: '62%' },
  { id: 'L-02', name: 'ICICI', status: 'Degraded', volume: '21%', approval: '58%' },
  { id: 'L-03', name: 'AXIS', status: 'Down', volume: '12%', approval: '—' },
];

const v = { Live: 'success', Degraded: 'warning', Down: 'danger' };

export default function LenderDirectory() {
  const [enabled, setEnabled] = useState({ 'L-01': true, 'L-02': true, 'L-03': false });

  return (
    <PageWrapper
      title="Lender Directory"
      subtitle="Screen 24 — Lenders, live status, volume contribution, on/off toggle"
      actions={<Button variant="teal" onClick={() => (window.location.href = '/lenders/config')}>+ Add Lender</Button>}
    >
      <div className="lenders-grid">
        {MOCK.map((l) => (
          <Card key={l.id} className="lender-card">
            <div className="lender-card__head">
              <h3>{l.name}</h3>
              <Badge variant={v[l.status] || 'default'}>{l.status}</Badge>
            </div>
            <div className="lender-card__meta">
              <div><span>Volume (30d)</span><strong>{l.volume}</strong></div>
              <div><span>Approval</span><strong>{l.approval}</strong></div>
            </div>
            <div className="lender-card__actions">
              <label className="lender-toggle">
                <input
                  type="checkbox"
                  checked={!!enabled[l.id]}
                  onChange={(e) => setEnabled((m) => ({ ...m, [l.id]: e.target.checked }))}
                />
                Enabled
              </label>
              <Button variant="secondary" size="sm" onClick={() => (window.location.href = '/lenders/sla')}>SLA</Button>
              <Button variant="ghost" size="sm" onClick={() => (window.location.href = '/lenders/rules')}>Rules</Button>
            </div>
          </Card>
        ))}
      </div>
    </PageWrapper>
  );
}