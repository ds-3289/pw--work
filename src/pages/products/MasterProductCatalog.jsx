import { useMemo, useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/common/Card';
import Table from '../../components/common/Table';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import SearchBar from '../../components/common/searchbar';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import './MasterProductCatalog.css';

const MOCK = [
  { id: 'SKU-001', product: 'iPhone 14', merchant: 'TechMart', category: 'Mobiles', price: '₹58,999', eligible: 'Yes', status: 'Live' },
  { id: 'SKU-002', product: 'Washing Machine', merchant: 'ElectroWorld', category: 'Appliances', price: '₹22,499', eligible: 'Yes', status: 'Live' },
  { id: 'SKU-003', product: 'Unknown Phone', merchant: 'CityGadgets', category: 'Mobiles', price: '₹5,999', eligible: 'No', status: 'Flagged' },
];

export default function MasterProductCatalog() {
  const [q, setQ] = useState('');
  const [modal, setModal] = useState(null);
  const [reason, setReason] = useState('');

  const data = useMemo(() => MOCK.filter((p) => !q || p.product.toLowerCase().includes(q.toLowerCase()) || p.id.toLowerCase().includes(q.toLowerCase())), [q]);

  const cols = [
    { key: 'id', label: 'SKU' },
    { key: 'product', label: 'Product' },
    { key: 'merchant', label: 'Merchant' },
    { key: 'category', label: 'Category' },
    { key: 'price', label: 'Price' },
    { key: 'eligible', label: 'Financing', render: (v) => <Badge variant={v === 'Yes' ? 'success' : 'danger'}>{v}</Badge> },
    { key: 'status', label: 'Status', render: (v) => <Badge variant={v === 'Live' ? 'info' : 'warning'}>{v}</Badge> },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div className="prod-actions">
          <Button variant="secondary" size="sm" onClick={() => setModal({ type: 'flag', row })}>Flag</Button>
          <Button variant="danger" size="sm" onClick={() => setModal({ type: 'delist', row })}>Force Delist</Button>
        </div>
      ),
    },
  ];

  return (
    <PageWrapper
      title="Master Product Catalog"
      subtitle="Screen 22 — Cross-merchant product oversight, flag, force-delist, eligibility toggles"
      actions={<Button variant="secondary">Bulk eligibility toggle</Button>}
    >
      <Card>
        <div className="prod-toolbar">
          <SearchBar placeholder="Search SKU / product..." value={q} onChange={(e) => setQ(e.target.value)} />
          <Button variant="secondary">Duplicate SKU detection</Button>
        </div>
        <Table columns={cols} data={data} emptyMessage="No products" />
      </Card>

      <Modal
        isOpen={!!modal}
        onClose={() => setModal(null)}
        title={modal?.type === 'delist' ? 'Force Delist Product' : 'Flag Product'}
        footer={
          <>
            <Button variant="secondary" onClick={() => setModal(null)}>Cancel</Button>
            <Button
              variant={modal?.type === 'delist' ? 'danger' : 'teal'}
              onClick={() => {
                if (!reason.trim()) return alert('Reason required');
                alert('Action applied. Audit logged.');
                setModal(null);
                setReason('');
              }}
            >
              Confirm
            </Button>
          </>
        }
      >
        <p className="prod-hint">{modal?.row ? `${modal.row.id} — ${modal.row.product}` : ''}</p>
        <Input label="Reason" value={reason} onChange={(e) => setReason(e.target.value)} />
      </Modal>
    </PageWrapper>
  );
}