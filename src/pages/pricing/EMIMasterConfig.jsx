import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import './EMIMasterConfig.css';

export default function EMIMasterConfig() {
  const [emi, setEmi] = useState([
    { id: 1, type: 'No-cost EMI', enabled: true, min: '₹3,000', max: '₹2,00,000' },
    { id: 2, type: 'Interest-bearing EMI', enabled: true, min: '₹1,000', max: '₹5,00,000' },
    { id: 3, type: 'Deferred EMI', enabled: false, min: '₹5,000', max: '₹1,00,000' },
  ]);

  return (
    <PageWrapper
      title="EMI Master Configuration"
      subtitle="Screen 29 — Global EMI types and bounds, future-dated changes"
      actions={<Button variant="teal" onClick={() => alert('Saved')}>Save</Button>}
    >
      <Card title="EMI Types">
        <div className="emi-list">
          {emi.map((e) => (
            <div key={e.id} className="emi-item">
              <div className="emi-left">
                <strong>{e.type}</strong>
                <span>{e.min} → {e.max}</span>
              </div>
              <div className="emi-right">
                <Badge variant={e.enabled ? 'success' : 'warning'}>{e.enabled ? 'Enabled' : 'Disabled'}</Badge>
                <label className="emi-toggle">
                  <input
                    type="checkbox"
                    checked={e.enabled}
                    onChange={(ev) => setEmi((x) => x.map((y) => (y.id === e.id ? { ...y, enabled: ev.target.checked } : y)))}
                  />
                  Active
                </label>
              </div>
            </div>
          ))}
        </div>
        <p className="emi-note">Merchant portals inherit these bounds (override approvals handled in Screen 32).</p>
      </Card>
    </PageWrapper>
  );
}