import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/common/Card';
import './CustomReportBuilder.css';

export default function CustomReportBuilder() {
  const [reportName, setReportName] = useState('');
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const [schedule, setSchedule] = useState('none');

  const availableMetrics = [
    'Loan Volume', 'Disbursal Amount', 'Borrower Count', 'Default Rate',
    'Average Loan Size', 'Regional Distribution', 'Lender Performance', 'Product Mix'
  ];

  const toggleMetric = (metric) => {
    if (selectedMetrics.includes(metric)) {
      setSelectedMetrics(selectedMetrics.filter(m => m !== metric));
    } else {
      setSelectedMetrics([...selectedMetrics, metric]);
    }
  };

  const handleSave = () => {
    alert(`Report "${reportName}" saved with ${selectedMetrics.length} metrics`);
  };

  return (
    <PageWrapper title="Custom Report Builder" subtitle="Create and schedule custom reports">
      <div className="report-builder">
        <div className="builder-grid">
          <div className="builder-form">
            <Card>
              <h3 className="section-title">Report Configuration</h3>
              <div className="form-group">
                <label>Report Name</label>
                <input type="text" value={reportName} onChange={(e) => setReportName(e.target.value)} placeholder="Enter report name" />
              </div>
              <div className="form-group">
                <label>Date Range</label>
                <select>
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last quarter</option>
                  <option>Year to date</option>
                  <option>Custom range</option>
                </select>
              </div>
              <div className="form-group">
                <label>Format</label>
                <select>
                  <option>PDF</option>
                  <option>Excel</option>
                  <option>CSV</option>
                </select>
              </div>
              <div className="form-group">
                <label>Schedule</label>
                <select value={schedule} onChange={(e) => setSchedule(e.target.value)}>
                  <option value="none">No schedule</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </Card>
          </div>

          <div className="metrics-selector">
            <Card>
              <h3 className="section-title">Select Metrics</h3>
              <div className="metrics-grid">
                {availableMetrics.map(metric => (
                  <div key={metric} className={`metric-chip ${selectedMetrics.includes(metric) ? 'selected' : ''}`} onClick={() => toggleMetric(metric)}>
                    {metric}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        <div className="preview-section">
          <Card>
            <div className="preview-header">
              <h3 className="section-title">Report Preview</h3>
              <button className="save-btn" onClick={handleSave} disabled={!reportName || selectedMetrics.length === 0}>Save Report</button>
            </div>
            {selectedMetrics.length > 0 ? (
              <div className="preview-content">
                <div className="preview-metrics">
                  {selectedMetrics.map(metric => (
                    <div key={metric} className="preview-metric">{metric}</div>
                  ))}
                </div>
                <div className="saved-reports">
                  <h4>Saved Reports</h4>
                  <div className="saved-list">
                    <div className="saved-item">
                      <div className="saved-name">Monthly Performance Report</div>
                      <div className="saved-actions">
                        <button>Run</button>
                        <button>Edit</button>
                      </div>
                    </div>
                    <div className="saved-item">
                      <div className="saved-name">Regional Analysis Q4</div>
                      <div className="saved-actions">
                        <button>Run</button>
                        <button>Edit</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="empty-preview">Select metrics to build your report</div>
            )}
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
}