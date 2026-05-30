import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/common/Card';
import './FeatureFlagsABTests.css';

export default function FeatureFlagsABTests() {
  const [activeTab, setActiveTab] = useState('flags');

  const featureFlags = [
    { id: 'FF-001', name: 'New Loan Application UI', enabled: true, rollout: '100%', environment: 'Production', owner: 'Product Team' },
    { id: 'FF-002', name: 'AI Credit Scoring', enabled: false, rollout: '25%', environment: 'Staging', owner: 'Data Science' },
    { id: 'FF-003', name: 'Instant Disbursal', enabled: true, rollout: '50%', environment: 'Production', owner: 'Engineering' },
    { id: 'FF-004', name: 'Biometric Login', enabled: false, rollout: '10%', environment: 'Beta', owner: 'Security Team' },
  ];

  const abTests = [
    { id: 'AB-001', name: 'Loan Application Flow', variantA: 'Current', variantB: 'New', winner: 'Inconclusive', status: 'running', startDate: '2024-01-01' },
    { id: 'AB-002', name: 'Interest Rate Display', variantA: 'Monthly', variantB: 'Annual', winner: 'Variant B', status: 'completed', startDate: '2023-12-15' },
    { id: 'AB-003', name: 'Email Template', variantA: 'Standard', variantB: 'Personalized', winner: 'Variant B', status: 'completed', startDate: '2023-12-01' },
  ];

  return (
    <PageWrapper title="Feature Flags & A/B Tests" subtitle="Control feature rollouts and experiment management">
      <div className="feature-flags">
        <div className="tabs">
          <button className={`tab ${activeTab === 'flags' ? 'active' : ''}`} onClick={() => setActiveTab('flags')}>Feature Flags</button>
          <button className={`tab ${activeTab === 'tests' ? 'active' : ''}`} onClick={() => setActiveTab('tests')}>A/B Tests</button>
        </div>

        {activeTab === 'flags' && (
          <Card>
            <div className="flags-header">
              <button className="create-flag-btn">+ Create Feature Flag</button>
            </div>
            <div className="flags-table">
              <div className="table-header">
                <div>Name</div>
                <div>Status</div>
                <div>Rollout</div>
                <div>Environment</div>
                <div>Owner</div>
                <div>Actions</div>
              </div>
              {featureFlags.map(flag => (
                <div key={flag.id} className="table-row">
                  <div className="flag-name">{flag.name}</div>
                  <div><span className={`status-badge ${flag.enabled ? 'enabled' : 'disabled'}`}>{flag.enabled ? 'Enabled' : 'Disabled'}</span></div>
                  <div>{flag.rollout}</div>
                  <div>{flag.environment}</div>
                  <div>{flag.owner}</div>
                  <div className="actions">
                    <label className="toggle-switch-small">
                      <input type="checkbox" checked={flag.enabled} />
                      <span className="slider"></span>
                    </label>
                    <button className="edit-flag">Edit</button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {activeTab === 'tests' && (
          <Card>
            <div className="tests-header">
              <button className="create-test-btn">+ Create A/B Test</button>
            </div>
            <div className="tests-list">
              {abTests.map(test => (
                <div key={test.id} className="test-card">
                  <div className="test-header">
                    <div className="test-name">{test.name}</div>
                    <div className={`test-status status-${test.status}`}>{test.status}</div>
                  </div>
                  <div className="test-variants">
                    <div className="variant">A: {test.variantA}</div>
                    <div className="variant">B: {test.variantB}</div>
                  </div>
                  <div className="test-meta">
                    <span>Winner: {test.winner}</span>
                    <span>Started: {test.startDate}</span>
                  </div>
                  <div className="test-actions">
                    {test.status === 'running' && <button className="stop-test">Stop Test</button>}
                    {test.status === 'completed' && <button className="view-results">View Results</button>}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </PageWrapper>
  );
}