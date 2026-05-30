import { useMemo, useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/common/Card';
import Table from '../../components/common/Table';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import SearchBar from '../../components/common/searchbar';
import Modal from '../../components/common/Modal';
import './VerificationAPILogs.css';

const MOCK = [
  { id: 'LOG-1', merchant: 'TechMart', api: 'PAN', status: 'Success', date: '2026-05-23', cost: '₹2.0', provider: 'Karza' },
  { id: 'LOG-2', merchant: 'TechMart', api: 'BANK', status: 'Failed', date: '2026-05-23', cost: '₹1.0', provider: 'Surepass' },
  { id: 'LOG-3', merchant: 'HomeStyle', api: 'GST', status: 'Success', date: '2026-05-22', cost: '₹3.0', provider: 'Karza' },
];

const v = { Success: 'success', Failed: 'danger', Pending: 'warning' };

function maskPayload(api) {
  if (api === 'PAN') return { pan: 'XXXXXX1234', name: 'MASKED' };
  if (api === 'GST') return { gst: '22XXXX...XXXX', legalName: 'MASKED' };
  return { account: 'XXXXXX7890', ifsc: 'XXXX000123', name: 'MASKED' };
}

export default function VerificationAPILogs() {
  const [q, setQ] = useState('');
  const [modal, setModal] = useState(null);

  const data = useMemo(() => {
    return MOCK.filter((x) => !q || x.merchant.toLowerCase().includes(q.toLowerCase()) || x.api.toLowerCase().includes(q.toLowerCase()));
  }, [q]);

  const columns = [
    { key: 'id', label: 'Log ID' },
    { key: 'merchant', label: 'Merchant' },
    { key: 'api', label: 'API Type' },
    { key: 'provider', label: 'Provider' },
    { key: 'date', label: 'Date' },
    { key: 'cost', label: 'Cost' },
    { key: 'status', label: 'Status', render: (s) => <Badge variant={v[s] || 'default'}>{s}</Badge> },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div className="vlog-actions">
          <Button variant="secondary" size="sm" onClick={() => setModal({ type: 'view', row })}>View</Button>
          <Button variant="teal" size="sm" onClick={() => alert('Retry queued')}>Retry</Button>
        </div>
      ),
    },
  ];

  const monthTotal = data.reduce((sum, x) => sum + Number(String(x.cost).replace('₹', '')), 0);

  return (
    <PageWrapper
      title="Verification API Logs"
      subtitle="Screen 18 — Filter logs, masked payload viewer, retry, provider switching (per call type)"
      actions={<Badge variant="info">Monthly cost: ₹{monthTotal.toFixed(1)}</Badge>}
    >
      <Card>
        <div className="vlog-toolbar">
          <SearchBar placeholder="Search merchant or API type..." value={q} onChange={(e) => setQ(e.target.value)} />
          <Button variant="secondary">Provider switchboard</Button>
        </div>
        <Table columns={columns} data={data} emptyMessage="No logs" />
      </Card>

      <Modal
        isOpen={!!modal}
        onClose={() => setModal(null)}
        title="Request / Response (masked)"
        footer={<Button variant="secondary" onClick={() => setModal(null)}>Close</Button>}
      >
        {modal?.row && (
          <>
            <div className="vlog-json">
              <div className="vlog-json__title">Request</div>
              <pre>{JSON.stringify(maskPayload(modal.row.api), null, 2)}</pre>
            </div>
            <div className="vlog-json">
              <div className="vlog-json__title">Response</div>
              <pre>{JSON.stringify({ status: modal.row.status, provider: modal.row.provider, ts: modal.row.date }, null, 2)}</pre>
            </div>
          </>
        )}
      </Modal>
    </PageWrapper>
  );
}