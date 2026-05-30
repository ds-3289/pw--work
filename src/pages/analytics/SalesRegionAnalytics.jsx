import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/common/Card';
import './SalesRegionAnalytics.css';

export default function SalesRegionAnalytics() {
  const [selectedRegion, setSelectedRegion] = useState('all');

  const regions = [
    { name: 'North', loans: 1245, amount: '₹48.2 Cr', growth: '+15%', topProduct: 'Personal Loan' },
    { name: 'South', loans: 1089, amount: '₹42.7 Cr', growth: '+18%', topProduct: 'Home Loan' },
    { name: 'East', loans: 967, amount: '₹35.4 Cr', growth: '+12%', topProduct: 'Business Loan' },
    { name: 'West', loans: 1423, amount: '₹52.9 Cr', growth: '+22%', topProduct: 'Personal Loan' },
    { name: 'Central', loans: 834, amount: '₹28.6 Cr', growth: '+10%', topProduct: 'Education Loan' },
  ];

  const topCities = [
    { city: 'Mumbai', loans: 845, amount: '₹28.4 Cr', growth: '+20%' },
    { city: 'Delhi', loans: 723, amount: '₹24.1 Cr', growth: '+18%' },
    { city: 'Bangalore', loans: 678, amount: '₹22.6 Cr', growth: '+25%' },
    { city: 'Chennai', loans: 567, amount: '₹18.9 Cr', growth: '+15%' },
    { city: 'Kolkata', loans: 456, amount: '₹15.2 Cr', growth: '+12%' },
  ];

  return (
    <PageWrapper title="Sales & Region Analytics" subtitle="Regional performance and sales insights">
      <div className="sales-analytics">
        <div className="region-summary">
          <Card>
            <div className="summary-header">
              <h3 className="section-title">Regional Overview</h3>
              <select className="region-select" value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>
                <option value="all">All Regions</option>
                {regions.map(region => <option key={region.name} value={region.name}>{region.name}</option>)}
              </select>
            </div>
            <div className="regions-grid">
              {regions.map(region => (
                <div key={region.name} className="region-card">
                  <div className="region-name">{region.name}</div>
                  <div className="region-stats">
                    <div className="stat-item">
                      <span className="stat-label">Loans</span>
                      <span className="stat-number">{region.loans}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Amount</span>
                      <span className="stat-number">{region.amount}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Growth</span>
                      <span className={`stat-number ${region.growth.includes('+') ? 'positive' : 'negative'}`}>{region.growth}</span>
                    </div>
                  </div>
                  <div className="region-top-product">Top: {region.topProduct}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="analytics-grid">
          <Card>
            <h3 className="section-title">Top Performing Cities</h3>
            <div className="cities-list">
              {topCities.map(city => (
                <div key={city.city} className="city-item">
                  <div className="city-info">
                    <div className="city-name">{city.city}</div>
                    <div className="city-stats">
                      <span>{city.loans} loans</span>
                      <span>{city.amount}</span>
                    </div>
                  </div>
                  <div className="city-growth">{city.growth}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="section-title">Monthly Performance Trend</h3>
            <div className="trend-chart">
              <div className="trend-line">
                <div className="line-point" style={{ bottom: '30px' }}>Jan</div>
                <div className="line-point" style={{ bottom: '45px' }}>Feb</div>
                <div className="line-point" style={{ bottom: '55px' }}>Mar</div>
                <div className="line-point" style={{ bottom: '50px' }}>Apr</div>
                <div className="line-point" style={{ bottom: '65px' }}>May</div>
                <div className="line-point" style={{ bottom: '75px' }}>Jun</div>
              </div>
            </div>
            <div className="insight-box">
              <div className="insight-icon">📈</div>
              <div className="insight-text">
                <strong>West region</strong> shows highest growth at 22% driven by personal loan demand
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
}