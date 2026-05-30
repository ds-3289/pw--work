import { useMemo, useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import SearchBar from '../../components/common/searchbar';
import './StoreNetworkMap.css';

const STORES = [
  { id: 'S-01', store: 'TechMart — Andheri', merchant: 'TechMart', city: 'Mumbai', status: 'Active', range: '₹5L-₹10L', last: '2h' },
  { id: 'S-02', store: 'TechMart — Bandra', merchant: 'TechMart', city: 'Mumbai', status: 'Active', range: '₹2L-₹5L', last: '1d' },
  { id: 'S-03', store: 'HomeStyle — Koramangala', merchant: 'HomeStyle', city: 'Bangalore', status: 'Inactive', range: '₹0-₹1L', last: '10d' },
];

export default function StoreNetworkMap() {
  const [q, setQ] = useState('');
  const data = useMemo(() => STORES.filter((s) => !q || s.store.toLowerCase().includes(q.toLowerCase()) || s.city.toLowerCase().includes(q.toLowerCase())), [q]);

  return (
    <PageWrapper
      title="Store Network Map"
      subtitle="Screen 20 — Cluster map + filters + drill-down (placeholder map panel)"
      actions={<Button variant="secondary">Export PNG / PDF</Button>}
    >
      <div className="storemap-grid">
        <Card title="Map">
          <div className="storemap-map">Map container (integrate Mapbox/Google later)</div>
        </Card>
        <Card title="Filters & Stores">
          <SearchBar placeholder="Search stores / city..." value={q} onChange={(e) => setQ(e.target.value)} />
          <div className="storemap-list">
            {data.map((s) => (
              <div key={s.id} className="storemap-item" onClick={() => (window.location.href = `/stores/${s.id}`)} role="button" tabIndex={0}>
                <div className="storemap-item__left">
                  <strong>{s.store}</strong>
                  <span>{s.merchant} • {s.city} • last {s.last}</span>
                </div>
                <Badge variant={s.status === 'Active' ? 'success' : 'warning'}>{s.status}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
}