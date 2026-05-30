import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/common/Card';
import './ConsentLogViewer.css';

export default function ConsentLogViewer() {
  const [selectedConsent, setSelectedConsent] = useState(null);

  const consentLogs = [
    { id: 'CON-001', customer: 'Rajesh Sharma', type: 'Data Sharing', date: '2024-01-15', method: 'Digital Signature', ip: '192.168.1.1', status: 'active', version: 'v2.0' },
    { id: 'CON-002', customer: 'Priya Patel', type: 'Credit Check', date: '2024-01-14', method: 'OTP Verified', ip: '192.168.1.2', status: 'active', version: 'v1.5' },
    { id: 'CON-003', customer: 'Amit Kumar', type: 'Marketing', date: '2024-01-14', method: 'Checkbox', ip: '192.168.1.3', status: 'revoked', version: 'v1.0' },
    { id: 'CON-004', customer: 'Neha Gupta', type: 'Data Sharing', date: '2024-01-13', method: 'Digital Signature', ip: '192.168.1.4', status: 'active', version: 'v2.0' },
    { id: 'CON-005', customer: 'Vikram Singh', type: 'Credit Check', date: '2024-01-13', method: 'OTP Verified', ip: '192.168.1.5', status: 'expired', version: 'v1.5' },
  ];

  return (
    <PageWrapper title="Consent Log Viewer" subtitle="Track customer consent records and history">
      <div className="consent-log-viewer">
        <div className="consent-grid">
          <div className="consent-list">
            <Card>
              <h3 className="section-title">Consent Records</h3>
              <div className="consent-items">
                {consentLogs.map(consent => (
                  <div key={consent.id} className={`consent-item ${selectedConsent?.id === consent.id ? 'selected' : ''}`} onClick={() => setSelectedConsent(consent)}>
                    <div className="consent-header">
                      <span className="consent-id">{consent.id}</span>
                      <span className={`consent-status status-${consent.status}`}>{consent.status}</span>
                    </div>
                    <div className="consent-customer">{consent.customer}</div>
                    <div className="consent-type">{consent.type}</div>
                    <div className="consent-date">{consent.date}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="consent-detail">
            {selectedConsent ? (
              <Card>
                <h3 className="section-title">Consent Details</h3>
                <div className="detail-content">
                  <div className="detail-row">
                    <span className="label">Consent ID:</span>
                    <span className="value">{selectedConsent.id}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Customer:</span>
                    <span className="value">{selectedConsent.customer}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Consent Type:</span>
                    <span className="value">{selectedConsent.type}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Date Given:</span>
                    <span className="value">{selectedConsent.date}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Method:</span>
                    <span className="value">{selectedConsent.method}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">IP Address:</span>
                    <span className="value">{selectedConsent.ip}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Version:</span>
                    <span className="value">{selectedConsent.version}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Status:</span>
                    <span className={`value status-${selectedConsent.status}`}>{selectedConsent.status}</span>
                  </div>
                  <div className="consent-actions">
                    <button className="view-pdf-btn">View Original Consent</button>
                    {selectedConsent.status === 'active' && <button className="revoke-btn">Revoke Consent</button>}
                  </div>
                </div>
              </Card>
            ) : (
              <Card>
                <div className="no-selection">Select a consent record to view details</div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}