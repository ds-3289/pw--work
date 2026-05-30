import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/common/Card';
import './VelocityRiskRules.css';

export default function VelocityRiskRules() {
  const [selectedRule, setSelectedRule] = useState(null);

  const rules = [
    { id: 'R001', name: 'Application Velocity', metric: 'Apps per IP/hour', threshold: '5', action: 'Flag & Review', status: 'active', priority: 'High' },
    { id: 'R002', name: 'Loan Amount Spike', metric: 'Amount increase %', threshold: '200%', action: 'Auto Decline', status: 'active', priority: 'Critical' },
    { id: 'R003', name: 'Multiple PAN Checks', metric: 'PAN checks/day', threshold: '3', action: 'Flag', status: 'inactive', priority: 'Medium' },
    { id: 'R004', name: 'Device Fingerprint', metric: 'Device changes/week', threshold: '2', action: 'Review Required', status: 'active', priority: 'High' },
    { id: 'R005', name: 'Geographical Anomaly', metric: 'Distance between apps', threshold: '500km', action: 'Flag & OTP Verify', status: 'active', priority: 'Medium' },
  ];

  const toggleStatus = (ruleId) => {
    alert(`Toggle status for rule ${ruleId}`);
  };

  return (
    <PageWrapper title="Velocity & Risk Rules" subtitle="Configure velocity limits and risk detection rules">
      <div className="velocity-rules">
        <Card>
          <div className="rules-header">
            <button className="create-rule-btn">+ Create New Rule</button>
          </div>

          <div className="rules-list">
            {rules.map(rule => (
              <div key={rule.id} className="rule-card">
                <div className="rule-header">
                  <div className="rule-title">
                    <span className="rule-id">{rule.id}</span>
                    <span className="rule-name">{rule.name}</span>
                    <span className={`rule-priority priority-${rule.priority.toLowerCase()}`}>{rule.priority}</span>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" checked={rule.status === 'active'} onChange={() => toggleStatus(rule.id)} />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <div className="rule-body">
                  <div className="rule-detail">
                    <span className="detail-label">Metric:</span>
                    <span className="detail-value">{rule.metric}</span>
                  </div>
                  <div className="rule-detail">
                    <span className="detail-label">Threshold:</span>
                    <span className="detail-value">{rule.threshold}</span>
                  </div>
                  <div className="rule-detail">
                    <span className="detail-label">Action:</span>
                    <span className="detail-value action">{rule.action}</span>
                  </div>
                </div>
                <div className="rule-footer">
                  <button className="edit-rule-btn">Edit Rule</button>
                  <button className="view-logs-btn">View Logs</button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
}