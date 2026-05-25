import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/common/Card';
import './CollectionsBounceManagement.css';

export default function CollectionsBounceManagement() {
  const [selectedType, setSelectedType] = useState('overdue');

  const overdueLoans = [
    { id: 'LN-1003', borrower: 'Amit Kumar', amount: '₹3,00,000', dueDate: '10 Jan 2024', daysOverdue: 15, emi: '₹9,500', status: 'critical' },
    { id: 'LN-1006', borrower: 'Deepa Nair', amount: '₹6,00,000', dueDate: '12 Jan 2024', daysOverdue: 13, emi: '₹18,000', status: 'high' }
  ];

  const bouncedPayments = [
    { id: 'PY-2001', loanId: 'LN-1002', borrower: 'Priya Patel', amount: '₹22,500', date: '15 Jan 2024', reason: 'Insufficient Funds', status: 'pending' }
  ];

  const currentItems = selectedType === 'overdue' ? overdueLoans : bouncedPayments;

  const getStatusColor = (status) => {
    const colors = {
      critical: { bg: '#FEF4E6', color: '#F5A623' },
      high: { bg: '#FFF0F0', color: '#C94B4B' },
      pending: { bg: '#E6F7F7', color: '#00B4B8' }
    };
    return colors[status];
  };

  return (
    <PageWrapper title="Collections & Bounce Management" subtitle="Manage collections and handle bounced payments">
      <div className="collections-management">
        <Card>
          <div className="collection-tabs">
            <button
              className={`tab-btn ${selectedType === 'overdue' ? 'active' : ''}`}
              onClick={() => setSelectedType('overdue')}
            >
              Overdue Collections
            </button>
            <button
              className={`tab-btn ${selectedType === 'bounced' ? 'active' : ''}`}
              onClick={() => setSelectedType('bounced')}
            >
              Bounced Payments
            </button>
          </div>

          <div className="stats-row">
            <div className="stat-simple">
              <span className="stat-label-simple">Total Overdue</span>
              <span className="stat-value-simple">₹9,00,000</span>
            </div>
            <div className="stat-simple">
              <span className="stat-label-simple">Recovery Rate</span>
              <span className="stat-value-simple">78%</span>
            </div>
            <div className="stat-simple">
              <span className="stat-label-simple">Bounced Count</span>
              <span className="stat-value-simple">1</span>
            </div>
          </div>

          <div className="items-list">
            {currentItems.map(item => {
              const statusColor = getStatusColor(item.status);
              return (
                <div key={item.id} className="collection-item">
                  <div className="item-header">
                    <div className="item-id">{item.id}</div>
                    <div className="item-borrower">{item.borrower}</div>
                    <div className="item-status" style={{ background: statusColor?.bg, color: statusColor?.color }}>
                      {item.status || 'Pending'}
                    </div>
                  </div>
                  <div className="item-details">
                    <div className="detail-row">
                      <span className="detail-label">Amount</span>
                      <span className="detail-value">{item.amount}</span>
                    </div>
                    {selectedType === 'overdue' ? (
                      <>
                        <div className="detail-row">
                          <span className="detail-label">Due Date</span>
                          <span className="detail-value">{item.dueDate}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Days Overdue</span>
                          <span className="detail-value highlight">{item.daysOverdue} days</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">EMI Amount</span>
                          <span className="detail-value">{item.emi}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="detail-row">
                          <span className="detail-label">Loan ID</span>
                          <span className="detail-value">{item.loanId}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Bounce Date</span>
                          <span className="detail-value">{item.date}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Reason</span>
                          <span className="detail-value">{item.reason}</span>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="item-actions">
                    <button className="action-btn contact">Contact Borrower</button>
                    <button className="action-btn resolve">Resolve</button>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
}