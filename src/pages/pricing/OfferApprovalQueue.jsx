import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/common/Card';
import Table from '../../components/common/Table';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import './OfferApprovalQueue.css';

const MOCK = [
  { id: 'OFF-01', merchant: 'TechMart', scope: 'Category: Mobiles', budget: '₹50,000', status: 'Pending', roi: 'High' },
  { id: 'OFF-02', merchant: 'HomeStyle', scope: 'Tier: Gold', budget: '₹30,000', status: 'Pending', roi: 'Medium' },
];

export default function OfferApprovalQueue() {
  const [modal, setModal] = useState(null);
  const [comment, setComment] = useState('');

  const cols = [
    { key: 'id', label: 'Offer' },
    { key: 'merchant', label: 'Merchant' },
    { key: 'scope', label: 'Scope' },
    { key: 'budget', label: 'Budget' },
    { key: 'roi', label: 'ROI' },
    { key: 'status', label: 'Status', render: (v) => <Badge variant="warning">{v}</Badge> },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div className="oa-actions">
          <Button variant="secondary" size="sm" onClick={() => alert('Preview customer view')}>Preview</Button>
          <Button variant="danger" size="sm" onClick={() => setModal({ type: 'reject', row })}>Reject</Button>
          <Button variant="teal" size="sm" onClick={() => setModal({ type: 'approve', row })}>Approve</Button>
        </div>
      ),
    },
  ];

  return (
    <PageWrapper
      title="Offer Approval Queue"
      subtitle="Screen 32 — Review merchant-submitted offers, approve/reject, compliance checks"
    >
      <Card>
        <Table columns={cols} data={MOCK} emptyMessage="No pending offers" />
      </Card>

      <Modal
        isOpen={!!modal}
        onClose={() => setModal(null)}
        title={modal?.type === 'approve' ? 'Approve Offer' : 'Reject Offer'}
        footer={
          <>
            <Button variant="secondary" onClick={() => setModal(null)}>Cancel</Button>
            <Button
              variant={modal?.type === 'approve' ? 'teal' : 'danger'}
              onClick={() => {
                if (!comment.trim()) return alert('Reason required');
                alert('Decision saved + audit logged.');
                setModal(null);
                setComment('');
              }}
            >
              Confirm
            </Button>
          </>
        }
      >
        <p className="oa-hint">Compliance check: discount within RBI guidelines (server validated).</p>
        <Input label="Mandatory comment" value={comment} onChange={(e) => setComment(e.target.value)} />
      </Modal>
    </PageWrapper>
  );
}