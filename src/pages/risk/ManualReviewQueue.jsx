import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/common/Card';
import './ManualReviewQueue.css';

export default function ManualReviewQueue() {
  const [selectedItem, setSelectedItem] = useState(null);

  const reviewItems = [
    { id: 'REV-001', borrower: 'Rajesh Sharma', amount: '₹5,00,000', type: 'High Risk Flag', priority: 'Urgent', date: '2024-01-15', status: 'pending', reason: 'Income verification required' },
    { id: 'REV-002', borrower: 'Priya Patel', amount: '₹7,50,000', type: 'Document Mismatch', priority: 'High', date: '2024-01-14', status: 'in_review', reason: 'Address proof mismatch' },
    { id: 'REV-003', borrower: 'Amit Kumar', amount: '₹3,00,000', type: 'Manual Override', priority: 'Medium', date: '2024-01-14', status: 'pending', reason: 'Exceptional approval needed' },
    { id: 'REV-004', borrower: 'Neha Gupta', amount: '₹10,00,000', type: 'Fraud Alert', priority: 'Urgent', date: '2024-01-13', status: 'pending', reason: 'Potential identity theft' },
  ];

  const handleApprove = () => {
    alert(`Approved ${selectedItem.borrower}'s application`);
    setSelectedItem(null);
  };

  const handleReject = () => {
    alert(`Rejected ${selectedItem.borrower}'s application`);
    setSelectedItem(null);
  };

  return (
    <PageWrapper title="Manual Review Queue" subtitle="Review and process flagged applications">
      <div className="manual-review-queue">
        <div className="review-grid">
          <div className="review-list">
            <Card>
              <h3 className="section-title">Pending Reviews ({reviewItems.length})</h3>
              <div className="review-items">
                {reviewItems.map(item => (
                  <div key={item.id} className={`review-item ${selectedItem?.id === item.id ? 'selected' : ''}`} onClick={() => setSelectedItem(item)}>
                    <div className="review-header">
                      <span className="review-id">{item.id}</span>
                      <span className={`priority-badge priority-${item.priority.toLowerCase()}`}>{item.priority}</span>
                    </div>
                    <div className="review-borrower">{item.borrower}</div>
                    <div className="review-type">{item.type}</div>
                    <div className="review-date">{item.date}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="review-detail">
            {selectedItem ? (
              <Card>
                <h3 className="section-title">Review Application</h3>
                <div className="detail-content">
                  <div className="detail-row">
                    <span className="label">Application ID:</span>
                    <span className="value">{selectedItem.id}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Borrower:</span>
                    <span className="value">{selectedItem.borrower}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Amount:</span>
                    <span className="value">{selectedItem.amount}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Review Type:</span>
                    <span className="value">{selectedItem.type}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Reason:</span>
                    <span className="value">{selectedItem.reason}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Priority:</span>
                    <span className={`value priority-${selectedItem.priority.toLowerCase()}`}>{selectedItem.priority}</span>
                  </div>
                  <div className="review-actions">
                    <button className="approve-btn" onClick={handleApprove}>Approve</button>
                    <button className="reject-btn" onClick={handleReject}>Reject</button>
                    <button className="request-info-btn">Request More Info</button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card>
                <div className="no-selection">Select an application to review</div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}