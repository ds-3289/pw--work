import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Table from '../../components/common/Table';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import './AgreementManagement.css';

const MOCK = [
  { id: 'AGR-001', merchant: 'TechMart', version: 'v2', status: 'Sent for eSign', provider: 'Digio', updated: '2026-05-23' },
  { id: 'AGR-002', merchant: 'HomeStyle', version: 'v1', status: 'Signed', provider: 'Leegality', updated: '2026-05-19' },
];

const vMap = { Signed: 'success', 'Sent for eSign': 'info', Draft: 'warning', Expired: 'danger' };

export default function AgreementManagement() {
  const [modal, setModal] = useState(null);
  const [comment, setComment] = useState('');

  const columns = [
    { key: 'id', label: 'Agreement ID' },
    { key: 'merchant', label: 'Merchant' },
    { key: 'version', label: 'Version' },
    { key: 'provider', label: 'Provider' },
    { key: 'updated', label: 'Updated' },
    { key: 'status', label: 'Status', render: (v) => <Badge variant={vMap[v] || 'default'}>{v}</Badge> },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div className="agr-actions">
          <Button variant="secondary" size="sm" onClick={() => setModal({ type: 'preview', row })}>Preview</Button>
          <Button variant="teal" size="sm" onClick={() => setModal({ type: 'send', row })}>Send eSign</Button>
        </div>
      ),
    },
  ];

  return (
    <PageWrapper
      title="Merchant Agreement Management"
      subtitle="Screen 17 — Generate PDF, send eSign, versioning, renewal reminders"
      actions={
        <>
          <Button variant="secondary">Bulk regenerate (template change)</Button>
          <Button variant="teal" onClick={() => setModal({ type: 'generate' })}>Generate Agreement</Button>
        </>
      }
    >
      <Card>
        <Table columns={columns} data={MOCK} emptyMessage="No agreements" />
      </Card>

      <Modal
        isOpen={!!modal}
        onClose={() => setModal(null)}
        title={modal?.type === 'preview' ? 'Agreement Preview' : 'Agreement Action'}
        footer={
          <>
            <Button variant="secondary" onClick={() => setModal(null)}>Close</Button>
            {modal?.type !== 'preview' && (
              <Button
                variant="teal"
                onClick={() => {
                  if (!comment.trim()) return alert('Comment required');
                  alert('Action queued. Status polling enabled.');
                  setModal(null);
                  setComment('');
                }}
              >
                Confirm
              </Button>
            )}
          </>
        }
      >
        {modal?.type === 'preview' && <div className="agr-preview">PDF preview area (placeholder)</div>}
        {modal?.type !== 'preview' && (
          <>
            <p className="agr-hint">This action is audit logged.</p>
            <Input label="Mandatory comment" value={comment} onChange={(e) => setComment(e.target.value)} />
          </>
        )}
      </Modal>
    </PageWrapper>
  );
}