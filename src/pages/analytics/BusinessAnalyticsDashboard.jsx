import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/common/Card';
import './BusinessAnalyticsDashboard.css';

export default function BusinessAnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState('month');

  const metrics = [
    { label: 'Total Loan Disbursed', value: '₹45.2 Cr', change: '+12.5%', trend: 'up' },
    { label: 'Active Borrowers', value: '2,847', change: '+8.3%', trend: 'up' },
    { label: 'Avg. Loan Size', value: '₹3.2 L', change: '-2.1%', trend: 'down' },
    { label: 'Default Rate', value: '3.8%', change: '-0.5%', trend: 'down' },
  ];

  const topPerformers = [
    { lender: 'HDFC Bank', loans: 245, amount: '₹12.4 Cr', growth: '+15%' },
    { lender: 'ICICI Bank', loans: 198, amount: '₹9.8 Cr', growth: '+12%' },
    { lender: 'Axis Bank', loans: 167, amount: '₹8.2 Cr', growth: '+10%' },
    { lender: 'Bajaj Finance', loans: 145, amount: '₹7.1 Cr', growth: '+18%' },
  ];

  return (
    <PageWrapper title="Business Analytics Dashboard" subtitle="Key business metrics and performance indicators">
      <div className="business-analytics">
        <div className="time-range-selector">
          <button className={`range-btn ${timeRange === 'week' ? 'active' : ''}`} onClick={() => setTimeRange('week')}>Week</button>
          <button className={`range-btn ${timeRange === 'month' ? 'active' : ''}`} onClick={() => setTimeRange('month')}>Month</button>
          <button className={`range-btn ${timeRange === 'quarter' ? 'active' : ''}`} onClick={() => setTimeRange('quarter')}>Quarter</button>
          <button className={`range-btn ${timeRange === 'year' ? 'active' : ''}`} onClick={() => setTimeRange('year')}>Year</button>
        </div>

        <div className="metrics-grid">
          {metrics.map(metric => (
            <Card key={metric.label}>
              <div className="metric-card">
                <div className="metric-label">{metric.label}</div>
                <div className="metric-value">{metric.value}</div>
                <div className={`metric-change ${metric.trend}`}>{metric.change}</div>
              </div>
            </Card>
          ))}
        </div>

        <div className="analytics-grid">
          <Card>
            <h3 className="section-title">Loan Volume Trend</h3>
            <div className="chart-placeholder">
              <div className="bar-chart">
                <div className="bar" style={{ height: '60px' }}>Jan</div>
                <div className="bar" style={{ height: '75px' }}>Feb</div>
                <div className="bar" style={{ height: '82px' }}>Mar</div>
                <div className="bar" style={{ height: '70px' }}>Apr</div>
                <div className="bar" style={{ height: '90px' }}>May</div>
                <div className="bar" style={{ height: '95px' }}>Jun</div>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="section-title">Top Performing Lenders</h3>
            <div className="lenders-list">
              {topPerformers.map(lender => (
                <div key={lender.lender} className="lender-row">
                  <div className="lender-name">{lender.lender}</div>
                  <div className="lender-stats">
                    <span>{lender.loans} loans</span>
                    <span>{lender.amount}</span>
                    <span className="growth">{lender.growth}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
}