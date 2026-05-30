import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import './TenureInterestSlabs.css';

const TENURES = [3, 6, 9, 12, 18, 24];

export default function TenureInterestSlabs() {
  const [rows, setRows] = useState(
    TENURES.map((t) => ({ tenure: t, interest: (t <= 9 ? 8 : 10), fee: 1.5, cap: 999, tier: 'Gold lower rates' }))
  );

  const update = (i, key, val) => setRows((r) => r.map((x, idx) => (idx === i ? { ...x, [key]: val } : x)));

  return (
    <PageWrapper
      title="Tenure & Interest Slabs"
      subtitle="Screen 30 — Slab matrix, processing fees, tier overrides, import/export"
      actions={
        <>
          <Button variant="secondary">Import CSV</Button>
          <Button variant="secondary">Export CSV</Button>
          <Button variant="teal" onClick={() => alert('Saved')}>Save</Button>
        </>
      }
    >
      <Card title="Slab Matrix">
        <div className="slab-wrap">
          <table className="slab">
            <thead>
              <tr>
                <th>Tenure (months)</th>
                <th>Interest (% p.a.)</th>
                <th>Processing fee (%)</th>
                <th>Fee cap</th>
                <th>Tier override</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.tenure}>
                  <td>{r.tenure}</td>
                  <td><input value={r.interest} onChange={(e) => update(i, 'interest', e.target.value)} /></td>
                  <td><input value={r.fee} onChange={(e) => update(i, 'fee', e.target.value)} /></td>
                  <td><input value={r.cap} onChange={(e) => update(i, 'cap', e.target.value)} /></td>
                  <td><input value={r.tier} onChange={(e) => update(i, 'tier', e.target.value)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PageWrapper>
  );
}