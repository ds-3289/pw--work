import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/common/Card';
import './LoanApplicationMonitor.css';

export default function LoanApplicationMonitor() {
  const [selectedStatus, setSelectedStatus] = useState('all');

  const applications = [
    { id: 'LN-1001', borrower: 'Rajesh Sharma', amount: '₹5,00,000', date: '15 Jan 2024', status: 'pending', score: 720 },
    { id: 'LN-1002', borrower: 'Priya Patel', amount: '₹7,50,000', date: '14 Jan 2024', status: 'approved', score: 780 },
    { id: 'LN-1003', borrower: 'Amit Kumar', amount: '₹3,00,000', date: '14 Jan 2024', status: 'review', score: 690 },
    { id: 'LN-1004', borrower: 'Neha Gupta', amount: '₹10,00,000', date: '13 Jan 2024', status: 'pending', score: 750 },
    { id: 'LN-1005', borrower: 'Vikram Singh', amount: '₹4,50,000', date: '13 Jan 2024', status: 'approved', score: 810 },
  ];

  const filteredApps = selectedStatus === 'all' ? applications : applications.filter(app => app.status === selectedStatus);

  const getStatusStyle = (status) => {
    const styles = {
      pending: { color: '#F5A623', bg: '#FEF4E6' },
      approved: { color: '#00B4B8', bg: '#E6F7F7' },
      review: { color: '#7B6FD6', bg: '#F0EEFB' },
    };
    return styles[status];
  };

  return (
    <PageWrapper title="Loan Application Monitor" subtitle="Track and manage loan applications">
      <Card>
        <div className="loan-monitor">
          <div className="filter-bar">
            <div className="status-filters">
              {['all', 'pending', 'review', 'approved'].map(status => (
                <button
                  key={status}
                  className={`filter-btn ${selectedStatus === status ? 'active' : ''}`}
                  onClick={() => setSelectedStatus(status)}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="applications-list">
            {filteredApps.map(app => {
              const statusStyle = getStatusStyle(app.status);
              return (
                <div key={app.id} className="application-row">
                  <div className="row-left">
                    <div className="app-id">{app.id}</div>
                    <div className="app-borrower">{app.borrower}</div>
                  </div>
                  <div className="row-center">
                    <div className="app-amount">{app.amount}</div>
                    <div className="app-date">{app.date}</div>
                    <div className="app-score">
                      <span className={`score-dot ${app.score >= 750 ? 'high' : app.score >= 680 ? 'medium' : 'low'}`}></span>
                      {app.score}
                    </div>
                  </div>
                  <div className="row-right">
                    <span className="status-badge" style={{ background: statusStyle.bg, color: statusStyle.color }}>
                      {app.status}
                    </span>
                    <button className="view-btn">View →</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    </PageWrapper>
  );
}