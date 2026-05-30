import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Tabs from '../../components/common/Tabs';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import './KYCReviewWorkspace.css';

const docs = [
  { id: 'gst', name: 'GST Certificate', status: 'Verified' },
  { id: 'pan', name: 'PAN', status: 'Verified' },
  { id: 'bank', name: 'Cancelled Cheque', status: 'Pending' },
  { id: 'shop', name: 'Shop License', status: 'Pending' },
];

const verifications = [
  { label: 'GST Status', value: 'Active', ok: true },
  { label: 'PAN Status', value: 'Valid', ok: true },
  { label: 'Bank Penny-drop', value: 'Pending', ok: false },
];

const tabs = [
  { id: 'docs', label: 'Documents' },
  { id: 'verification', label: 'Verification Results' },
  { id: 'notes', label: 'Internal Notes' },
];

export default function KYCReviewWorkspace() {
  const [active, setActive] = useState('docs');
  const [decision, setDecision] = useState(null);
  const [comment, setComment] = useState('');
  const [notes, setNotes] = useState([{ by: 'Super Admin', text: 'Check bank verification before approving.', at: 'Today 10:10' }]);

  const decisionColor = decision === 'approve' ? 'success' : decision === 'reject' ? 'danger' : 'warning';

  return (
    <PageWrapper
      title="Merchant KYC Review Workspace"
      subtitle="Screen 15 — Document viewer + verification + approve/reject/re-KYC (audit stamped)"
      actions={
        <>
          <Button variant="secondary" onClick={() => setDecision('rekyc')}>Request Re-KYC</Button>
          <Button variant="danger" onClick={() => setDecision('reject')}>Reject</Button>
          <Button variant="teal" onClick={() => setDecision('approve')}>Approve</Button>
        </>
      }
    >
      <div className="kyc-grid">
        <Card title="Review Pane">
          <Tabs tabs={tabs} active={active} onChange={setActive} />
          {active === 'docs' && (
            <div className="kyc-docs">
              {docs.map((d) => (
                <div key={d.id} className="kyc-doc">
                  <div className="kyc-doc__left">
                    <strong>{d.name}</strong>
                    <span className="kyc-doc__hint">Click to preview (placeholder)</span>
                  </div>
                  <Badge variant={d.status === 'Verified' ? 'success' : 'warning'}>{d.status}</Badge>
                </div>
              ))}
              <div className="kyc-preview">
                <div className="kyc-preview__box">Document preview area (PDF/image)</div>
              </div>
            </div>
          )}

          {active === 'verification' && (
            <div className="kyc-verify">
              {verifications.map((v) => (
                <div key={v.label} className="kyc-verify__row">
                  <span>{v.label}</span>
                  <Badge variant={v.ok ? 'success' : 'warning'}>{v.value}</Badge>
                </div>
              ))}
              <div className="kyc-verify__payload">
                <div className="kyc-verify__payload-title">API payload (masked)</div>
                <pre>{`{"pan":"XXXXXX1234","gst":"22XXXX...","bank":{"account":"XXXXXX7890"}}`}</pre>
              </div>
            </div>
          )}

          {active === 'notes' && (
            <div className="kyc-notes">
              {notes.map((n, idx) => (
                <div key={idx} className="kyc-note">
                  <div className="kyc-note__head">
                    <strong>{n.by}</strong>
                    <span>{n.at}</span>
                  </div>
                  <p>{n.text}</p>
                </div>
              ))}
              <div className="kyc-note__add">
                <Input label="Add internal note" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Type note..." />
                <Button
                  variant="primary"
                  onClick={() => {
                    if (!comment.trim()) return;
                    setNotes((x) => [{ by: 'Super Admin', text: comment.trim(), at: 'Just now' }, ...x]);
                    setComment('');
                  }}
                >
                  Add
                </Button>
              </div>
            </div>
          )}
        </Card>

        <Card title="Decision Panel" subtitle="Approve / Reject / Re-KYC require reason">
          <div className="kyc-decision">
            <div className="kyc-decision__status">
              Current: <Badge variant={decision ? decisionColor : 'default'}>{decision || 'No action selected'}</Badge>
            </div>
            <Input label="Mandatory decision reason" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Reason for audit..." />
            <Button
              variant={decision === 'approve' ? 'teal' : decision === 'reject' ? 'danger' : 'secondary'}
              onClick={() => {
                if (!decision) return alert('Select an action');
                if (!comment.trim()) return alert('Reason required');
                alert(`Decision: ${decision.toUpperCase()} — Audit stamped (user/time/ip).`);
                setDecision(null);
                setComment('');
              }}
            >
              Submit Decision
            </Button>
          </div>
        </Card>
      </div>

      <Modal
        isOpen={false}
        onClose={() => {}}
        title="(Reserved)"
        footer={<div />}
      >
        <div />
      </Modal>
    </PageWrapper>
  );
}