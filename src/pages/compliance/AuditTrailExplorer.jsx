import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/common/Card';
import './AuditTrailExplorer.css';

export default function AuditTrailExplorer() {
  const [filter, setFilter] = useState('all');

  const auditLogs = [
    { id: 'AUD-001', user: 'admin@finz.com', action: 'Loan Approved', entity: 'LN-1001', timestamp: '2024-01-15 10:30:00', ip: '192.168.1.1', status: 'success' },
    { id: 'AUD-002', user: 'risk@finz.com', action: 'User Role Changed', entity: 'Rajesh Sharma', timestamp: '2024-01-15 09:15:00', ip: '192.168.1.2', status: 'success' },
    { id: 'AUD-003', user: 'ops@finz.com', action: 'Manual Override', entity: 'LN-1002', timestamp: '2024-01-14 16:45:00', ip: '192.168.1.3', status: 'warning' },
    { id: 'AUD-004', user: 'compliance@finz.com', action: 'Report Exported', entity: 'Q4_2024_Report', timestamp: '2024-01-14 14:20:00', ip: '192.168.1.4', status: 'success' },
    { id: 'AUD-005', user: 'admin@finz.com', action: 'System Config Changed', entity: 'Interest Rate', timestamp: '2024-01-14 11:00:00', ip: '192.168.1.1', status: 'success' },
  ];

  const filteredLogs = filter === 'all' ? auditLogs : auditLogs.filter(log => log.status === filter);

  return (
    <PageWrapper title="Audit Trail Explorer" subtitle="Comprehensive audit log of all system activities">
      <div className="audit-trail">
        <Card>
          <div className="audit-filters">
            <input type="text" placeholder="Search by user, action, or entity..." className="search-input" />
            <select className="filter-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All Status</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
            <input type="date" className="date-input" />
          </div>

          <div className="audit-table">
            <div className="table-header">
              <div>Timestamp</div>
              <div>User</div>
              <div>Action</div>
              <div>Entity</div>
              <div>IP Address</div>
              <div>Status</div>
            </div>
            {filteredLogs.map(log => (
              <div key={log.id} className="table-row">
                <div className="timestamp">{log.timestamp}</div>
                <div className="user">{log.user}</div>
                <div className="action">{log.action}</div>
                <div className="entity">{log.entity}</div>
                <div className="ip">{log.ip}</div>
                <div><span className={`status-badge status-${log.status}`}>{log.status}</span></div>
              </div>
            ))}
          </div>

          <div className="audit-footer">
            <button className="export-btn">Export Audit Log</button>
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
}