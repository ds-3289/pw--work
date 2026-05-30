import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/common/Card';
import './SystemParametersSettings.css';

export default function SystemParametersSettings() {
  const [activeSection, setActiveSection] = useState('general');

  const parameters = {
    general: [
      { key: 'company_name', value: 'FinZ Finance', description: 'Organization display name' },
      { key: 'timezone', value: 'Asia/Kolkata', description: 'System timezone' },
      { key: 'date_format', value: 'DD/MM/YYYY', description: 'Default date format' },
    ],
    loan: [
      { key: 'min_loan_amount', value: '₹10,000', description: 'Minimum loan amount' },
      { key: 'max_loan_amount', value: '₹50,00,000', description: 'Maximum loan amount' },
      { key: 'default_interest_rate', value: '10.5%', description: 'Default interest rate' },
    ],
    security: [
      { key: 'session_timeout', value: '30 minutes', description: 'User session timeout' },
      { key: 'max_login_attempts', value: '5', description: 'Max failed login attempts' },
      { key: 'mfa_required', value: 'true', description: 'MFA for all users' },
    ],
  };

  const sections = ['general', 'loan', 'security'];

  return (
    <PageWrapper title="System Parameters & Settings" subtitle="Configure system-wide parameters">
      <div className="system-settings">
        <div className="settings-sidebar">
          {sections.map(section => (
            <button key={section} className={`section-btn ${activeSection === section ? 'active' : ''}`} onClick={() => setActiveSection(section)}>
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>

        <div className="settings-content">
          <Card>
            <h3 className="section-title">{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Settings</h3>
            <div className="parameters-list">
              {parameters[activeSection].map(param => (
                <div key={param.key} className="param-item">
                  <div className="param-info">
                    <div className="param-key">{param.key}</div>
                    <div className="param-desc">{param.description}</div>
                  </div>
                  <div className="param-value">
                    <input type="text" defaultValue={param.value} className="param-input" />
                    <button className="save-param">Save</button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="section-title">Advanced Configuration</h3>
            <div className="advanced-config">
              <div className="config-item">
                <div className="config-info">
                  <div className="config-name">Maintenance Mode</div>
                  <div className="config-desc">Put the system in maintenance mode</div>
                </div>
                <label className="toggle-switch-large">
                  <input type="checkbox" />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="config-item">
                <div className="config-info">
                  <div className="config-name">Debug Logging</div>
                  <div className="config-desc">Enable detailed debug logs</div>
                </div>
                <label className="toggle-switch-large">
                  <input type="checkbox" />
                  <span className="slider"></span>
                </label>
              </div>
              <button className="reset-defaults">Reset to Defaults</button>
            </div>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
}