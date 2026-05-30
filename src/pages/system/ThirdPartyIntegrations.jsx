import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/common/Card';
import './ThirdPartyIntegrations.css';

export default function ThirdPartyIntegrations() {
  const [selectedIntegration, setSelectedIntegration] = useState(null);

  const integrations = [
    { id: 'INT-001', name: 'CIBIL', type: 'Credit Bureau', status: 'connected', lastSync: '2024-01-15 10:30:00', apiCalls: '1,245' },
    { id: 'INT-002', name: 'Razorpay', type: 'Payment Gateway', status: 'active', lastSync: '2024-01-15 09:15:00', apiCalls: '3,892' },
    { id: 'INT-003', name: 'Digilocker', type: 'Document Verification', status: 'connected', lastSync: '2024-01-14 16:45:00', apiCalls: '567' },
    { id: 'INT-004', name: 'SMS Gateway', type: 'Communication', status: 'error', lastSync: '2024-01-14 14:20:00', apiCalls: '2,134' },
    { id: 'INT-005', name: 'Email Service', type: 'Communication', status: 'active', lastSync: '2024-01-14 11:00:00', apiCalls: '4,567' },
  ];

  return (
    <PageWrapper title="Third-Party Integration Switchboard" subtitle="Manage all external service integrations">
      <div className="integrations">
        <div className="integrations-grid">
          {integrations.map(integration => (
            <Card key={integration.id}>
              <div className="integration-card">
                <div className="integration-header">
                  <div className="integration-name">{integration.name}</div>
                  <div className={`integration-status status-${integration.status}`}>{integration.status}</div>
                </div>
                <div className="integration-type">{integration.type}</div>
                <div className="integration-stats">
                  <div className="stat">
                    <span className="label">API Calls</span>
                    <span className="value">{integration.apiCalls}</span>
                  </div>
                  <div className="stat">
                    <span className="label">Last Sync</span>
                    <span className="value">{integration.lastSync}</span>
                  </div>
                </div>
                <div className="integration-actions">
                  <button className="test-conn-btn">Test Connection</button>
                  <button className="config-btn">Configure</button>
                  <button className="sync-btn">Sync Now</button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="api-keys-section">
          <Card>
            <h3 className="section-title">API Key Management</h3>
            <div className="api-keys">
              <div className="api-key-item">
                <div className="key-info">
                  <div className="key-name">Production API Key</div>
                  <div className="key-value">••••••••••••••••</div>
                </div>
                <button className="rotate-key">Rotate</button>
              </div>
              <div className="api-key-item">
                <div className="key-info">
                  <div className="key-name">Webhook Secret</div>
                  <div className="key-value">••••••••••••••••</div>
                </div>
                <button className="rotate-key">Rotate</button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
}