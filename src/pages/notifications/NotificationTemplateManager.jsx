import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/common/Card';
import './NotificationTemplateManager.css';

export default function NotificationTemplateManager() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const templates = [
    { id: 'T001', name: 'Loan Approval', type: 'Email', channel: 'Email', status: 'active', lastModified: '2024-01-10' },
    { id: 'T002', name: 'Payment Reminder', type: 'SMS', channel: 'SMS', status: 'active', lastModified: '2024-01-09' },
    { id: 'T003', name: 'KYC Update', type: 'Push', channel: 'Push Notification', status: 'inactive', lastModified: '2024-01-08' },
    { id: 'T004', name: 'Disbursal Confirmation', type: 'Email', channel: 'Email', status: 'active', lastModified: '2024-01-07' },
    { id: 'T005', name: 'Fraud Alert', type: 'SMS', channel: 'SMS', status: 'active', lastModified: '2024-01-06' },
  ];

  return (
    <PageWrapper title="Notification Template Manager" subtitle="Manage communication templates across channels">
      <div className="template-manager">
        <div className="template-header">
          <button className="create-btn">+ Create Template</button>
        </div>

        <div className="templates-grid">
          <div className="templates-list">
            <Card>
              <h3 className="section-title">Templates ({templates.length})</h3>
              <div className="template-items">
                {templates.map(template => (
                  <div key={template.id} className={`template-item ${selectedTemplate?.id === template.id ? 'selected' : ''}`} onClick={() => setSelectedTemplate(template)}>
                    <div className="template-header-info">
                      <span className="template-id">{template.id}</span>
                      <span className={`template-status status-${template.status}`}>{template.status}</span>
                    </div>
                    <div className="template-name">{template.name}</div>
                    <div className="template-meta">{template.type} • {template.channel}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="template-editor">
            {selectedTemplate ? (
              <Card>
                <h3 className="section-title">Edit Template: {selectedTemplate.name}</h3>
                <div className="editor-form">
                  <div className="form-group">
                    <label>Template Name</label>
                    <input type="text" defaultValue={selectedTemplate.name} />
                  </div>
                  <div className="form-group">
                    <label>Subject</label>
                    <input type="text" placeholder="Email subject line" />
                  </div>
                  <div className="form-group">
                    <label>Message Body</label>
                    <textarea rows="6" placeholder="Template content with variables like {{borrower_name}}, {{loan_amount}}"></textarea>
                  </div>
                  <div className="variables-list">
                    <span>Available Variables:</span>
                    <span className="variable">{{borrower_name}}</span>
                    <span className="variable">{{loan_amount}}</span>
                    <span className="variable">{{due_date}}</span>
                    <span className="variable">{{status}}</span>
                  </div>
                  <div className="editor-actions">
                    <button className="preview-btn">Preview</button>
                    <button className="save-template-btn">Save Template</button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card>
                <div className="no-selection">Select a template to edit</div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}