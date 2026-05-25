import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/common/Card';
import './ManualOverrideConsole.css';

export default function ManualOverrideConsole() {
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [overrideReason, setOverrideReason] = useState('');

  const pendingOverrides = [
    { id: 'LN-1002', borrower: 'Priya Patel', amount: '₹7,50,000', currentStatus: 'Rejected', requestedAction: 'Approve', priority: 'High' },
    { id: 'LN-1005', borrower: 'Vikram Singh', amount: '₹4,50,000', currentStatus: 'Pending', requestedAction: 'Expedite', priority: 'Medium' }
  ];

  const handleOverride = (loan) => {
    setSelectedLoan(loan);
  };

  const submitOverride = () => {
    alert(`Override submitted for ${selectedLoan.borrower}\nReason: ${overrideReason}`);
    setSelectedLoan(null);
    setOverrideReason('');
  };

  return (
    <PageWrapper title="Manual Override Console" subtitle="Override loan decisions with approval workflow">
      <div className="manual-override">
        <Card>
          <h3 className="section-title">Pending Override Requests</h3>
          <div className="override-list">
            {pendingOverrides.map(loan => (
              <div key={loan.id} className="override-item">
                <div className="override-info">
                  <div className="override-id">{loan.id}</div>
                  <div className="override-borrower">{loan.borrower}</div>
                  <div className="override-amount">{loan.amount}</div>
                  <div className={`override-priority priority-${loan.priority.toLowerCase()}`}>
                    {loan.priority}
                  </div>
                </div>
                <div className="override-details">
                  <span className="current-status">Current: {loan.currentStatus}</span>
                  <span className="requested-action">Requested: {loan.requestedAction}</span>
                </div>
                <button className="override-btn" onClick={() => handleOverride(loan)}>
                  Review Override →
                </button>
              </div>
            ))}
          </div>
        </Card>

        {selectedLoan && (
          <Card>
            <h3 className="section-title">Submit Override Decision</h3>
            <div className="override-form">
              <div className="form-group">
                <label>Loan ID</label>
                <input type="text" value={selectedLoan.id} disabled />
              </div>
              <div className="form-group">
                <label>Borrower</label>
                <input type="text" value={selectedLoan.borrower} disabled />
              </div>
              <div className="form-group">
                <label>Override Reason</label>
                <textarea
                  value={overrideReason}
                  onChange={(e) => setOverrideReason(e.target.value)}
                  placeholder="Provide detailed reason for override..."
                  rows="3"
                />
              </div>
              <div className="form-actions">
                <button className="cancel-btn" onClick={() => setSelectedLoan(null)}>Cancel</button>
                <button className="submit-btn" onClick={submitOverride} disabled={!overrideReason}>
                  Submit Override
                </button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </PageWrapper>
  );
}