import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import './ReKYCSuspension.css';

const reasons = ['Fraud', 'NPA', 'Compliance', 'Voluntary', 'Other'];

export default function ReKYCSuspension() {
  const [modal, setModal] = useState(null);
  const [reason, setReason] = useState(reasons[0]);
  const [comment, setComment] = useState('');

  const submit = () => {
    if (!comment.trim()) return alert('Comment required');
    alert('Workflow triggered. Stores + logins auto-disabled if suspended. Audit stamped.');
    setModal(null);
    setComment('');
  };

  return (
    <PageWrapper
      title="Re-KYC & Suspension Workflow"
      subtitle="Screen 19 — Trigger re-KYC, suspend, reactivate with reason taxonomy"
      actions={
        <>
          <Button variant="secondary" onClick={() => setModal('rekyc')}>Trigger Re-KYC</Button>
          <Button variant="danger" onClick={() => setModal('suspend')}>Suspend Merchant</Button>
          <Button variant="teal" onClick={() => setModal('reactivate')}>Reactivate</Button>
        </>
      }
    >
      <div className="rekyc-grid">
        <Card title="Current Status">
          <div className="rekyc-status">
            <div className="rekyc-row"><span>Merchant</span><strong>TechMart</strong></div>
            <div className="rekyc-row"><span>Status</span><Badge variant="warning">Re-KYC</Badge></div>
            <div className="rekyc-row"><span>Deadline</span><strong>+14 days</strong></div>
            <div className="rekyc-row"><span>Last action</span><strong>Triggered by Super Admin</strong></div>
          </div>
        </Card>

        <Card title="Bulk Actions (cohort)">
          <p className="rekyc-hint">Example: trigger re-KYC for all merchants in a state (server side)</p>
          <Input label="Filter (state/region)" placeholder="e.g. Maharashtra" />
          <Button variant="secondary" style={{ marginTop: '0.75rem' }}>Bulk Re-KYC</Button>
        </Card>
      </div>

      <Modal
        isOpen={!!modal}
        onClose={() => setModal(null)}
        title={modal === 'rekyc' ? 'Trigger Re-KYC' : modal === 'suspend' ? 'Suspend Merchant' : 'Reactivate Merchant'}
        footer={
          <>
            <Button variant="secondary" onClick={() => setModal(null)}>Cancel</Button>
            <Button variant={modal === 'suspend' ? 'danger' : 'teal'} onClick={submit}>Confirm</Button>
          </>
        }
      >
        <div className="rekyc-modal">
          <label className="rekyc-label">Reason</label>
          <select value={reason} onChange={(e) => setReason(e.target.value)} className="rekyc-select">
            {reasons.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
          <Input label="Mandatory comment (audit)" value={comment} onChange={(e) => setComment(e.target.value)} />
          {modal === 'suspend' && <p className="rekyc-warn">Suspension disables stores & user logins automatically.</p>}
        </div>
      </Modal>
    </PageWrapper>
  );
}