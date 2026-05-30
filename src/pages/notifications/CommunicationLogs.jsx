import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/common/Card';
import './CommunicationLogs.css';

export default function CommunicationLogs() {
  const [filter, setFilter] = useState('all');

  const logs = [
    { id: 'COM-001', recipient: 'rajesh.sharma@email.com', type: 'Email', subject: 'Loan Approval', status: 'delivered', timestamp: '2024-01-15 10:30:00' },
    { id: 'COM-002', recipient: '+91 98765 43210', type: 'SMS', subject: 'Payment Reminder', status: 'sent', timestamp: '2024-01-15 09:15:00' },
    { id: 'COM-003', recipient: 'priya.patel@email.com', type: 'Email', subject: 'KYC Update', status: 'failed', timestamp: '2024-01-14 16:45:00' },
    { id: 'COM-004', recipient: '+91 87654 32109', type: 'SMS', subject: 'Disbursal Confirmation', status: 'delivered', timestamp: '2024-01-14 14:20:00' },
    { id: 'COM-005', recipient: 'amit.kumar@email.com', type: 'Push', subject: 'Fraud Alert', status: 'sent', timestamp: '2024-01-14 11:00:00' },
  ];

  const filteredLogs = filter === 'all' ? logs : logs.filter(log => log.type.toLowerCase() === filter);

  return (
    <PageWrapper title="Communication Logs" subtitle="Track all customer communications">
      <div className="comm-logs">
        <Card>
          <div className="logs-filters">
            <div className="filter-buttons">
              <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
              <button className={`filter-btn ${filter === 'email' ? 'active' : ''}`} onClick={() => setFilter('email')}>Email</button>
              <button className={`filter-btn ${filter === 'sms' ? 'active' : ''}`} onClick={() => setFilter('sms')}>SMS</button>
              <button className={`filter-btn ${filter === 'push' ? 'active' : ''}`} onClick={() => setFilter('push')}>Push</button>
            </div>
            <input type="text" placeholder="Search by recipient..." className="search-input" />
          </div>

          <div className="logs-table">
            <div className="table-header">
              <div>Timestamp</div>
              <div>Recipient</div>
              <div>Type</div>
              <div>Subject</div>
              <div>Status</div>
              <div>Actions</div>
            </div>
            {filteredLogs.map(log => (
              <div key={log.id} className="table-row">
                <div className="timestamp">{log.timestamp}</div>
                <div className="recipient">{log.recipient}</div>
                <div className="type">
                  <span className={`type-badge type-${log.type.toLowerCase()}`}>{log.type}</span>
                </div>
                <div className="subject">{log.subject}</div>
                <div className="status">
                  <span className={`status-badge status-${log.status}`}>{log.status}</span>
                </div>
                <div className="actions">
                  <button className="view-details-btn">View</button>
                  {log.status === 'failed' && <button className="retry-btn">Retry</button>}
                </div>
              </div>
            ))}
          </div>

          <div className="logs-summary">
            <div className="summary-item">
              <span className="summary-label">Total Sent</span>
              <span className="summary-value">1,247</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Delivered</span>
              <span className="summary-value">1,198</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Failed</span>
              <span className="summary-value">49</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Delivery Rate</span>
              <span className="summary-value">96.1%</span>
            </div>
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
}