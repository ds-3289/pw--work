import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/common/Card';
import './WorkflowBuilder.css';

export default function WorkflowBuilder() {
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);

  const workflows = [
    { id: 'WF-001', name: 'Loan Approval Flow', status: 'active', steps: 5, lastRun: '2024-01-15', triggers: 'Application Submitted' },
    { id: 'WF-002', name: 'KYC Verification', status: 'active', steps: 3, lastRun: '2024-01-14', triggers: 'Document Upload' },
    { id: 'WF-003', name: 'Disbursal Process', status: 'inactive', steps: 4, lastRun: '2024-01-10', triggers: 'Loan Approved' },
    { id: 'WF-004', name: 'Payment Collection', status: 'active', steps: 3, lastRun: '2024-01-15', triggers: 'EMI Due Date' },
  ];

  return (
    <PageWrapper title="Workflow Builder" subtitle="Design and manage automated workflows">
      <div className="workflow-builder">
        <div className="builder-header">
          <button className="create-workflow-btn">+ Create Workflow</button>
        </div>

        <div className="workflows-list">
          {workflows.map(workflow => (
            <Card key={workflow.id}>
              <div className="workflow-card">
                <div className="workflow-header">
                  <div className="workflow-title">
                    <span className="workflow-id">{workflow.id}</span>
                    <span className="workflow-name">{workflow.name}</span>
                    <span className={`workflow-status status-${workflow.status}`}>{workflow.status}</span>
                  </div>
                  <div className="workflow-actions">
                    <button className="edit-workflow">Edit</button>
                    <button className="run-workflow">Run</button>
                  </div>
                </div>
                <div className="workflow-details">
                  <div className="detail">
                    <span className="label">Steps:</span>
                    <span className="value">{workflow.steps}</span>
                  </div>
                  <div className="detail">
                    <span className="label">Trigger:</span>
                    <span className="value">{workflow.triggers}</span>
                  </div>
                  <div className="detail">
                    <span className="label">Last Run:</span>
                    <span className="value">{workflow.lastRun}</span>
                  </div>
                </div>
                <div className="workflow-steps">
                  <div className="step">1. Application Received</div>
                  <div className="step-arrow">→</div>
                  <div className="step">2. Credit Check</div>
                  <div className="step-arrow">→</div>
                  <div className="step">3. Approval Queue</div>
                  <div className="step-arrow">→</div>
                  <div className="step">4. Final Decision</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}