import { useParams } from 'react-router-dom';
import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Table from '../../components/common/Table';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import { useState } from 'react';
import './StoreDetailView.css';

export default function StoreDetailView() {
  const { id } = useParams();
  const [modal, setModal] = useState(false);
  const [reason, setReason] = useState('');

  const cols = [
    { key: 'app', label: 'Application' },
    { key: 'amount', label: 'Amount' },
    { key: 'status', label: 'Status', render: (v) => <Badge variant={v === 'Stuck' ? 'danger' : 'info'}>{v}</Badge> },
    { key: 'age', label: 'Age' },
  ];
  const apps = [
    { id: 1, app: 'LN-10021', amount: '₹35,000', status: 'Stuck', age: '2h' },
    { id: 2, app: 'LN-10022', amount: '₹18,000', status: 'In Progress', age: '10m' },
  ];

  return (
    <PageWrapper
      title="Store Detail View"
      subtitle={`Screen 21 — Store deep dive (ID: ${id})`}
      actions={<Button variant="danger" onClick={() => setModal(true)}>Force Deactivate</Button>}
    >
      <div className="storedet-grid">
        <Card title="Store Identity">
          <div className="storedet-kv"><span>Store</span><strong>TechMart — Andheri</strong></div>
          <div className="storedet-kv"><span>Address</span><strong>Andheri West, Mumbai</strong></div>
          <div className="storedet-kv"><span>Status</span><Badge variant="success">Active</Badge></div>
          <div className="storedet-kv"><span>Manager</span><strong>Priya Sharma</strong></div>
        </Card>
        <Card title="Linked Products (snapshot)">
          <div className="storedet-empty">Inventory snapshot placeholder</div>
        </Card>
      </div>

      <Card title="Loan Applications (last 30/90 days)">
        <Table columns={cols} data={apps} emptyMessage="No applications" />
      </Card>

      <Modal
        isOpen={modal}
        onClose={() => setModal(false)}
        title="Force Deactivate Store"
        footer={
          <>
            <Button variant="secondary" onClick={() => setModal(false)}>Cancel</Button>
            <Button
              variant="danger"
              onClick={() => {
                if (!reason.trim()) return alert('Reason required');
                alert('Store deactivated. Merchant notified. Audit logged.');
                setModal(false);
                setReason('');
              }}
            >
              Deactivate
            </Button>
          </>
        }
      >
        <Input label="Mandatory reason" value={reason} onChange={(e) => setReason(e.target.value)} />
      </Modal>
    </PageWrapper>
  );
}