import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/common/Card';
import './FraudAlertFeed.css';

export default function FraudAlertFeed() {
  const [filter, setFilter] = useState('all');

  const alerts = [
    { id: 'FR-1001', borrower: 'Rajesh Sharma', type: 'Identity Fraud', risk: 'High', date: '2024-01-15', status: 'active', description: 'Multiple PAN cards detected' },
    { id: 'FR-1002', borrower: 'Priya Patel', type: 'Income Mismatch', risk: 'Medium', date: '2024-01-14', status: 'investigating', description: 'Salary slip vs bank statement mismatch' },
    { id: 'FR-1003', borrower: 'Amit Kumar', type: 'Document Tampering', risk: 'Critical', date: '2024-01-14', status: 'active', description: 'Modified bank statement detected' },
    { id: 'FR-1004', borrower: 'Neha Gupta', type: 'Address Fraud', risk: 'Low', date: '2024-01-13', status: 'resolved', description: 'Fake address proof submitted' },
    { id: 'FR-1005', borrower: 'Vikram Singh', type: 'Mobile Number Fraud', risk: 'Medium', date: '2024-01-13', status: 'active', description: 'Disposable number used' },
  ];

  const filteredAlerts = filter === 'all' ? alerts : alerts.filter(alert => alert.status === filter);

  const getRiskColor = (risk) => {
    const colors = { Critical: '#C94B4B', High: '#F5A623', Medium: '#7B6FD6', Low: '#00B4B8' };
    return colors[risk];
  };

  const getStatusIcon = (status) => {
    const icons = { active: '🔴', investigating: '🟡', resolved: '🟢' };
    return icons[status];
  };

  return (
    <PageWrapper title="Fraud Alert Feed" subtitle="Real-time fraud detection and monitoring">
      <div className="fraud-alert-feed">
        <Card>
          <div className="alert-stats">
            <div className="stat"><span className="stat-label">Active Alerts</span><span className="stat-value">3</span></div>
            <div className="stat"><span className="stat-label">Critical</span><span className="stat-value">1</span></div>
            <div className="stat"><span className="stat-label">Resolved</span><span className="stat-value">1</span></div>
          </div>

          <div className="alert-filters">
            <button className={`filter-chip ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
            <button className={`filter-chip ${filter === 'active' ? 'active' : ''}`} onClick={() => setFilter('active')}>Active</button>
            <button className={`filter-chip ${filter === 'investigating' ? 'active' : ''}`} onClick={() => setFilter('investigating')}>Investigating</button>
            <button className={`filter-chip ${filter === 'resolved' ? 'active' : ''}`} onClick={() => setFilter('resolved')}>Resolved</button>
          </div>

          <div className="alerts-list">
            {filteredAlerts.map(alert => (
              <div key={alert.id} className="alert-card">
                <div className="alert-header">
                  <div className="alert-id">{alert.id}</div>
                  <div className="alert-type">{alert.type}</div>
                  <div className="alert-risk" style={{ background: getRiskColor(alert.risk) }}>{alert.risk}</div>
                </div>
                <div className="alert-body">
                  <div className="alert-borrower">{alert.borrower}</div>
                  <div className="alert-description">{alert.description}</div>
                  <div className="alert-date">{alert.date}</div>
                </div>
                <div className="alert-footer">
                  <span className="alert-status">{getStatusIcon(alert.status)} {alert.status}</span>
                  <button className="investigate-btn">Investigate →</button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
}