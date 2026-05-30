import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/common/Card';
import './ComplianceReportsExports.css';

export default function ComplianceReportsExports() {
  const [reportType, setReportType] = useState('audit');
  const [dateRange, setDateRange] = useState('last30');

  const reports = [
    { id: 'RPT-001', name: 'Audit Trail Summary', type: 'audit', generated: '2024-01-15', format: 'PDF', size: '2.4 MB', status: 'ready' },
    { id: 'RPT-002', name: 'Consent Report Q4', type: 'consent', generated: '2024-01-14', format: 'Excel', size: '1.8 MB', status: 'ready' },
    { id: 'RPT-003', name: 'Fraud Detection Log', type: 'fraud', generated: '2024-01-14', format: 'CSV', size: '3.1 MB', status: 'ready' },
    { id: 'RPT-004', name: 'Regulatory Filing', type: 'regulatory', generated: '2024-01-13', format: 'PDF', size: '5.2 MB', status: 'processing' },
    { id: 'RPT-005', name: 'Loan Portfolio Analysis', type: 'analytics', generated: '2024-01-13', format: 'Excel', size: '4.5 MB', status: 'ready' },
  ];

  const filteredReports = reports.filter(report => reportType === 'all' || report.type === reportType);

  return (
    <PageWrapper title="Compliance Reports & Exports" subtitle="Generate and download compliance reports">
      <div className="compliance-reports">
        <Card>
          <div className="report-generator">
            <h3 className="section-title">Generate New Report</h3>
            <div className="generator-form">
              <select className="report-select">
                <option>Audit Trail Report</option>
                <option>Consent Log Report</option>
                <option>Fraud Detection Report</option>
                <option>Regulatory Compliance Report</option>
                <option>Custom Report</option>
              </select>
              <select className="date-select">
                <option value="last7">Last 7 days</option>
                <option value="last30">Last 30 days</option>
                <option value="last90">Last 90 days</option>
                <option value="custom">Custom Range</option>
              </select>
              <select className="format-select">
                <option>PDF</option>
                <option>Excel</option>
                <option>CSV</option>
                <option>JSON</option>
              </select>
              <button className="generate-btn">Generate Report</button>
            </div>
          </div>

          <div className="reports-list">
            <div className="list-header">
              <h3 className="section-title">Generated Reports</h3>
              <div className="report-filters">
                <button className={`filter-btn ${reportType === 'all' ? 'active' : ''}`} onClick={() => setReportType('all')}>All</button>
                <button className={`filter-btn ${reportType === 'audit' ? 'active' : ''}`} onClick={() => setReportType('audit')}>Audit</button>
                <button className={`filter-btn ${reportType === 'consent' ? 'active' : ''}`} onClick={() => setReportType('consent')}>Consent</button>
                <button className={`filter-btn ${reportType === 'fraud' ? 'active' : ''}`} onClick={() => setReportType('fraud')}>Fraud</button>
              </div>
            </div>

            <div className="reports-table">
              {filteredReports.map(report => (
                <div key={report.id} className="report-row">
                  <div className="report-info">
                    <div className="report-name">{report.name}</div>
                    <div className="report-meta">{report.generated} • {report.format} • {report.size}</div>
                  </div>
                  <div className="report-status">
                    <span className={`status-badge status-${report.status}`}>{report.status}</span>
                  </div>
                  <div className="report-actions">
                    {report.status === 'ready' && (
                      <>
                        <button className="download-btn">Download</button>
                        <button className="share-btn">Share</button>
                      </>
                    )}
                    {report.status === 'processing' && <span className="processing-text">Processing...</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="schedule-section">
            <h3 className="section-title">Scheduled Reports</h3>
            <div className="schedule-item">
              <div className="schedule-info">
                <div className="schedule-name">Monthly Compliance Summary</div>
                <div className="schedule-cron">Every 1st of month at 09:00 AM</div>
              </div>
              <button className="edit-schedule-btn">Edit Schedule</button>
            </div>
            <div className="schedule-item">
              <div className="schedule-info">
                <div className="schedule-name">Weekly Audit Log Export</div>
                <div className="schedule-cron">Every Monday at 06:00 AM</div>
              </div>
              <button className="edit-schedule-btn">Edit Schedule</button>
            </div>
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
}