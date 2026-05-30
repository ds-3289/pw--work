import { useMemo, useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/common/Card';
import Table from '../../components/common/Table';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import SearchBar from '../../components/common/searchbar';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import './MerchantDirectory.css';

const MOCK = [
  { id: 'M-1001', name: 'TechMart', region: 'Mumbai', category: 'Electronics', status: 'Submitted', stores: 12, volume: '₹28L', npa: '0.8%' },
  { id: 'M-1002', name: 'ElectroWorld', region: 'Delhi', category: 'Appliances', status: 'Under Review', stores: 5, volume: '₹11L', npa: '1.4%' },
  { id: 'M-1003', name: 'HomeStyle', region: 'Bangalore', category: 'Furniture', status: 'Approved', stores: 18, volume: '₹41L', npa: '0.6%' },
  { id: 'M-1004', name: 'QuickPhones', region: 'Pune', category: 'Mobiles', status: 'Rejected', stores: 3, volume: '₹3L', npa: '—' },
  { id: 'M-1005', name: 'CityGadgets', region: 'Hyderabad', category: 'Electronics', status: 'Re-KYC', stores: 7, volume: '₹9L', npa: '1.9%' },
  { id: 'M-1006', name: 'ValueStore', region: 'Kolkata', category: 'Appliances', status: 'Suspended', stores: 2, volume: '₹1L', npa: '—' },
];

const statusVariant = {
  Draft: 'default',
  Submitted: 'info',
  'Under Review': 'warning',
  Approved: 'success',
  Rejected: 'danger',
  'Re-KYC': 'warning',
  Suspended: 'danger',
};

const statusTabs = ['All', 'Draft', 'Submitted', 'Under Review', 'Approved', 'Rejected', 'Re-KYC', 'Suspended'];

export default function MerchantDirectory() {
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('All');
  const [selected, setSelected] = useState([]);
  const [modal, setModal] = useState(null);
  const [reason, setReason] = useState('');

  const data = useMemo(() => {
    return MOCK.filter((m) => {
      const sOk = status === 'All' || m.status === status;
      const qOk =
        !q ||
        m.name.toLowerCase().includes(q.toLowerCase()) ||
        m.id.toLowerCase().includes(q.toLowerCase()) ||
        m.region.toLowerCase().includes(q.toLowerCase());
      return sOk && qOk;
    });
  }, [q, status]);

  const columns = [
    {
      key: 'sel',
      label: '',
      width: '48px',
      render: (_, row) => (
        <input
          type="checkbox"
          checked={selected.includes(row.id)}
          onChange={() =>
            setSelected((s) => (s.includes(row.id) ? s.filter((x) => x !== row.id) : [...s, row.id]))
          }
          onClick={(e) => e.stopPropagation()}
        />
      ),
    },
    { key: 'id', label: 'Merchant ID' },
    { key: 'name', label: 'Merchant' },
    { key: 'region', label: 'Region' },
    { key: 'category', label: 'Category' },
    { key: 'stores', label: 'Stores' },
    { key: 'volume', label: 'Disbursal (30d)' },
    { key: 'npa', label: 'NPA' },
    {
      key: 'status',
      label: 'Status',
      render: (v) => <Badge variant={statusVariant[v] || 'default'}>{v}</Badge>,
    },
  ];

  const openBulk = (type) => {
    if (!selected.length) return;
    setReason('');
    setModal({ type });
  };

  const exportCsv = () => {
    const rows = data.map((m) => [m.id, m.name, m.region, m.category, m.status, m.stores, m.volume, m.npa].join(','));
    const csv = ['id,name,region,category,status,stores,volume,npa', ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'merchants.csv';
    a.click();
  };

  return (
    <PageWrapper
      title="Merchant Directory"
      subtitle="Screen 14 — Workflow list, filters, bulk approve/reject, export"
      actions={
        <>
          <Button variant="secondary" onClick={exportCsv}>Export</Button>
          <Button variant="secondary" onClick={() => openBulk('reject')} disabled={!selected.length}>Bulk Reject</Button>
          <Button variant="teal" onClick={() => openBulk('approve')} disabled={!selected.length}>Bulk Approve</Button>
        </>
      }
    >
      <Card>
        <div className="merchant-dir__toolbar">
          <SearchBar placeholder="Search merchant, ID, region..." value={q} onChange={(e) => setQ(e.target.value)} />
          <div className="merchant-dir__tabs">
            {statusTabs.map((s) => (
              <button
                key={s}
                type="button"
                className={`merchant-dir__tab ${status === s ? 'merchant-dir__tab--active' : ''}`}
                onClick={() => setStatus(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <Table
          columns={columns}
          data={data}
          onRowClick={(row) => {
            // open 360 profile as per PDF
            window.location.href = `/merchants/${row.id}`;
          }}
          emptyMessage="No merchants found"
        />
      </Card>

      <Modal
        isOpen={!!modal}
        onClose={() => setModal(null)}
        title={modal?.type === 'approve' ? 'Bulk Approve Merchants' : 'Bulk Reject Merchants'}
        footer={
          <>
            <Button variant="secondary" onClick={() => setModal(null)}>Cancel</Button>
            <Button
              variant={modal?.type === 'approve' ? 'teal' : 'danger'}
              onClick={() => {
                if (!reason.trim()) return alert('Comment is required for audit');
                alert(`${modal.type.toUpperCase()} submitted for ${selected.length} merchants. Audit logged.`);
                setModal(null);
                setSelected([]);
              }}
            >
              Confirm
            </Button>
          </>
        }
      >
        <p className="merchant-dir__modal-text">
          Selected: <strong>{selected.length}</strong>
        </p>
        <Input label="Mandatory comment (audit)" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Reason..." />
      </Modal>
    </PageWrapper>
  );
}