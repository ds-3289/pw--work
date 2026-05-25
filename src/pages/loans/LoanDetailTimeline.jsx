import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/common/Card';
import './LoanDetailTimeline.css';

export default function LoanDetailTimeline() {
  const loan = {
    id: 'LN-1001',
    borrower: 'Rajesh Sharma',
    amount: '₹5,00,000',
    purpose: 'Home Renovation',
    tenure: '36 months',
    interestRate: '10.5%',
    status: 'Under Review'
  };

  const timeline = [
    { date: '15 Jan 2024', event: 'Application Submitted', status: 'completed', description: 'Initial application received' },
    { date: '16 Jan 2024', event: 'Document Verification', status: 'completed', description: 'All documents verified' },
    { date: '17 Jan 2024', event: 'Credit Check', status: 'completed', description: 'CIBIL score: 720' },
    { date: '18 Jan 2024', event: 'Underwriting', status: 'current', description: 'Risk assessment in progress' },
    { date: '20 Jan 2024', event: 'Final Approval', status: 'pending', description: 'Awaiting committee review' }
  ];

  return (
    <PageWrapper title="Loan Detail & Timeline" subtitle="View loan details and application progress">
      <div className="loan-detail-timeline">
        <Card>
          <div className="loan-header">
            <div>
              <h3 className="loan-id">{loan.id}</h3>
              <p className="loan-borrower">{loan.borrower}</p>
            </div>
            <div className="loan-amount-badge">
              <span className="amount-label">Loan Amount</span>
              <span className="amount-value">{loan.amount}</span>
            </div>
          </div>

          <div className="loan-details-grid">
            <div className="detail-item">
              <span className="detail-label">Purpose</span>
              <span className="detail-value">{loan.purpose}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Tenure</span>
              <span className="detail-value">{loan.tenure}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Interest Rate</span>
              <span className="detail-value">{loan.interestRate}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Status</span>
              <span className="detail-value status">{loan.status}</span>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="timeline-title">Application Timeline</h3>
          <div className="timeline">
            {timeline.map((item, index) => (
              <div key={index} className={`timeline-item ${item.status}`}>
                <div className="timeline-marker">
                  <div className="timeline-dot"></div>
                  {index < timeline.length - 1 && <div className="timeline-line"></div>}
                </div>
                <div className="timeline-content">
                  <div className="timeline-date">{item.date}</div>
                  <div className="timeline-event">{item.event}</div>
                  <div className="timeline-description">{item.description}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
}