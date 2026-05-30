import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/common/Card';
import './BlacklistManager.css';

export default function BlacklistManager() {
  const [searchTerm, setSearchTerm] = useState('');

  const blacklist = [
    { id: 'BL-001', name: 'Ramesh Gupta', pan: 'ABCDE1234F', reason: 'Document Fraud', date: '2024-01-10', status: 'active' },
    { id: 'BL-002', name: 'Suresh Patel', pan: 'FGHIJ5678K', reason: 'Loan Default', date: '2024-01-08', status: 'active' },
    { id: 'BL-003', name: 'Anita Sharma', pan: 'KLMNO9012L', reason: 'Identity Theft', date: '2024-01-05', status: 'pending_review' },
    { id: 'BL-004', name: 'Vijay Kumar', pan: 'PQRST3456M', reason: 'Multiple Applications', date: '2024-01-03', status: 'active' },
    { id: 'BL-005', name: 'Sunita Reddy', pan: 'UVWXY7890N', reason: 'Bounced Cheques', date: '2024-01-01', status: 'expired' },
  ];

  const filteredList = blacklist.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.pan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    const badges = {
      active: { bg: '#E6F7F7', color: '#00B4B8' },
      pending_review: { bg: '#FEF4E6', color: '#F5A623' },
      expired: { bg: '#F0EEFB', color: '#7B6FD6' }
    };
    return badges[status];
  };

  return (
    <PageWrapper title="Blacklist Manager" subtitle="Manage blacklisted entities and individuals">
      <div className="blacklist-manager">
        <Card>
          <div className="blacklist-header">
            <input
              type="text"
              placeholder="Search by name or PAN..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="add-btn">+ Add to Blacklist</button>
          </div>

          <div className="stats-summary">
            <span>Total Blacklisted: {blacklist.length}</span>
            <span>Active: {blacklist.filter(b => b.status === 'active').length}</span>
          </div>

          <div className="blacklist-table">
            <div className="table-header">
              <div>ID</div>
              <div>Name</div>
              <div>PAN</div>
              <div>Reason</div>
              <div>Date</div>
              <div>Status</div>
              <div>Actions</div>
            </div>
            {filteredList.map(item => {
              const statusStyle = getStatusBadge(item.status);
              return (
                <div key={item.id} className="table-row">
                  <div className="row-id">{item.id}</div>
                  <div className="row-name">{item.name}</div>
                  <div className="row-pan">{item.pan}</div>
                  <div className="row-reason">{item.reason}</div>
                  <div className="row-date">{item.date}</div>
                  <div><span className="status-badge" style={{ background: statusStyle.bg, color: statusStyle.color }}>{item.status}</span></div>
                  <div className="row-actions">
                    <button className="action-icon edit">✏️</button>
                    <button className="action-icon delete">🗑️</button>
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