import { useState } from 'react';
import { useParams } from 'react-router-dom';
import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/common/Card';
import Tabs from '../../components/common/Tabs';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Table from '../../components/common/Table';
import './Merchant360Profile.css';

const tabs = [
  { id: 'profile', label: 'Profile' },
  { id: 'stores', label: 'Stores' },
  { id: 'products', label: 'Products' },
  { id: 'loans', label: 'Loans' },
  { id: 'settlements', label: 'Settlements' },
  { id: 'risk', label: 'Risk' },
  { id: 'audit', label: 'Audit' },
];

export default function Merchant360Profile() {
  const { id } = useParams();
  const [active, setActive] = useState('profile');

  const storeCols = [
    { key: 'store', label: 'Store' },
    { key: 'city', label: 'City' },
    { key: 'status', label: 'Status', render: (v) => <Badge variant={v === 'Active' ? 'success' : 'warning'}>{v}</Badge> },
    { key: 'last', label: 'Last Active' },
  ];
  const storeData = [
    { id: 1, store: 'Store A', city: 'Mumbai', status: 'Active', last: '2 hr ago' },
    { id: 2, store: 'Store B', city: 'Mumbai', status: 'Active', last: '1 day ago' },
  ];

  return (
    <PageWrapper
      title={`Merchant 360 Profile`}
      subtitle={`Screen 16 — Tabs view for ${id || 'Merchant'}`}
      actions={
        <>
          <Button variant="secondary">Send Notice</Button>
          <Button variant="danger">Suspend</Button>
          <Button variant="teal">Approve Changes</Button>
        </>
      }
    >
      <Card>
        <Tabs tabs={tabs} active={active} onChange={setActive} />
        {active === 'profile' && (
          <div className="m360-grid">
            <div className="m360-block">
              <h4>Business Info</h4>
              <div className="m360-kv"><span>Merchant</span><strong>TechMart</strong></div>
              <div className="m360-kv"><span>Status</span><Badge variant="info">Under Review</Badge></div>
              <div className="m360-kv"><span>Category</span><strong>Electronics</strong></div>
              <div className="m360-kv"><span>Region</span><strong>Mumbai</strong></div>
            </div>
            <div className="m360-block">
              <h4>Performance (90d)</h4>
              <div className="m360-kv"><span>Disbursals</span><strong>₹41,20,000</strong></div>
              <div className="m360-kv"><span>Approval rate</span><strong>68%</strong></div>
              <div className="m360-kv"><span>NPA</span><strong>0.8%</strong></div>
            </div>
          </div>
        )}
        {active === 'stores' && (
          <Table columns={storeCols} data={storeData} emptyMessage="No stores" />
        )}
        {active !== 'profile' && active !== 'stores' && (
          <div className="m360-empty">Content placeholder for {active}</div>
        )}
      </Card>
    </PageWrapper>
  );
}