import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/common/Card';
import './LenderLoanAnalytics.css';

export default function LenderLoanAnalytics() {
  const [selectedLender, setSelectedLender] = useState('all');

  const lenders = [
    { name: 'HDFC Bank', total: '₹45.2 Cr', active: 1245, avgSize: '₹3.6 L', defaultRate: '2.8%' },
    { name: 'ICICI Bank', total: '₹38.7 Cr', active: 1089, avgSize: '₹3.2 L', defaultRate: '3.1%' },
    { name: 'Axis Bank', total: '₹32.4 Cr', active: 967, avgSize: '₹3.0 L', defaultRate: '2.9%' },
    { name: 'Bajaj Finance', total: '₹28.9 Cr', active: 845, avgSize: '₹3.4 L', defaultRate: '3.5%' },
    { name: 'Kotak Bank', total: '₹24.1 Cr', active: 723, avgSize: '₹2.9 L', defaultRate: '2.7%' },
  ];

  const loanProducts = [
    { name: 'Personal Loan', count: 1245, amount: '₹38.2 Cr', growth: '+15%' },
    { name: 'Business Loan', count: 892, amount: '₹45.6 Cr', growth: '+22%' },
    { name: 'Home Loan', count: 567, amount: '₹68.9 Cr', growth: '+8%' },
    { name: 'Education Loan', count: 234, amount: '₹12.3 Cr', growth: '+5%' },
  ];

  return (
    <PageWrapper title="Lender & Loan Analytics" subtitle="Deep dive into lender performance and loan products">
      <div className="lender-analytics">
        <div className="analytics-header">
          <select className="lender-select" value={selectedLender} onChange={(e) => setSelectedLender(e.target.value)}>
            <option value="all">All Lenders</option>
            {lenders.map(lender => <option key={lender.name} value={lender.name}>{lender.name}</option>)}
          </select>
        </div>

        <div className="stats-cards">
          <Card>
            <div className="stat-card">
              <div className="stat-icon">🏦</div>
              <div className="stat-content">
                <div className="stat-label">Active Lenders</div>
                <div className="stat-value">24</div>
                <div className="stat-trend">+3 this quarter</div>
              </div>
            </div>
          </Card>
          <Card>
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <div className="stat-label">Total Disbursed</div>
                <div className="stat-value">₹169.3 Cr</div>
                <div className="stat-trend">+18.5% YoY</div>
              </div>
            </div>
          </Card>
          <Card>
            <div className="stat-card">
              <div className="stat-icon">⭐</div>
              <div className="stat-content">
                <div className="stat-label">Avg Credit Score</div>
                <div className="stat-value">742</div>
                <div className="stat-trend">+12 points</div>
              </div>
            </div>
          </Card>
        </div>

        <div className="analytics-grid">
          <Card>
            <h3 className="section-title">Lender Performance</h3>
            <div className="lender-table">
              <div className="table-header">
                <div>Lender</div>
                <div>Total Loans</div>
                <div>Active Borrowers</div>
                <div>Avg. Loan Size</div>
                <div>Default Rate</div>
              </div>
              {lenders.map(lender => (
                <div key={lender.name} className="table-row">
                  <div className="lender-name">{lender.name}</div>
                  <div>{lender.total}</div>
                  <div>{lender.active}</div>
                  <div>{lender.avgSize}</div>
                  <div className={`default-rate ${parseFloat(lender.defaultRate) > 3 ? 'high' : 'low'}`}>{lender.defaultRate}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="section-title">Loan Product Distribution</h3>
            <div className="product-list">
              {loanProducts.map(product => (
                <div key={product.name} className="product-item">
                  <div className="product-header">
                    <span className="product-name">{product.name}</span>
                    <span className="product-growth">{product.growth}</span>
                  </div>
                  <div className="product-stats">
                    <span>{product.count} loans</span>
                    <span>{product.amount}</span>
                  </div>
                  <div className="product-bar">
                    <div className="bar-fill" style={{ width: `${(product.count / 1245) * 100}%` }}></div>
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