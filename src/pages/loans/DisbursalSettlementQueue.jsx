import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/common/Card';
import './DisbursalSettlementQueue.css';

export default function DisbursalSettlementQueue() {
  const [selectedTab, setSelectedTab] = useState('disbursal');

  const disbursals = [
    { id: 'LN-1001', borrower: 'Rajesh Sharma', amount: '₹5,00,000', date: '20 Jan 2024', method: 'Bank Transfer', account: 'XXXX1234', status: 'ready' },
    { id: 'LN-1004', borrower: 'Neha Gupta', amount: '₹10,00,000', date: '21 Jan 2024', method: 'Cheque', account: 'XXXX5678', status: 'pending' }
  ];

  const settlements = [
    { id: 'LN-1002', borrower: 'Priya Patel', amount: '₹7,50,000', dueDate: '25 Jan 2024', emi: '₹22,500', status: 'upcoming' }
  ];

  const currentItems = selectedTab === 'disbursal' ? disbursals : settlements;

  return (
    <PageWrapper title="Disbursal & Settlement Queue" subtitle="Process loan disbursals and settlements">
      <div className="disbursal-queue">
        <Card>
          <div className="queue-tabs">
            <button
              className={`tab-btn ${selectedTab === 'disbursal' ? 'active' : ''}`}
              onClick={() => setSelectedTab('disbursal')}
            >
              Disbursal Queue
            </button>
            <button
              className={`tab-btn ${selectedTab === 'settlement' ? 'active' : ''}`}
              onClick={() => setSelectedTab('settlement')}
            >
              Settlement Queue
            </button>
          </div>

          <div className="queue-list">
            {currentItems.map(item => (
              <div key={item.id} className="queue-item">
                <div className="queue-header">
                  <div className="queue-id">{item.id}</div>
                  <div className={`queue-status status-${item.status}`}>
                    {item.status === 'ready' ? 'Ready for Disbursal' : item.status === 'pending' ? 'Pending Approval' : 'Upcoming'}
                  </div>
                </div>
                <div className="queue-details">
                  <div className="detail-group">
                    <span className="detail-label">Borrower</span>
                    <span className="detail-value">{item.borrower}</span>
                  </div>
                  <div className="detail-group">
                    <span className="detail-label">Amount</span>
                    <span className="detail-value amount">{item.amount}</span>
                  </div>
                  {selectedTab === 'disbursal' ? (
                    <>
                      <div className="detail-group">
                        <span className="detail-label">Date</span>
                        <span className="detail-value">{item.date}</span>
                      </div>
                      <div className="detail-group">
                        <span className="detail-label">{item.method}</span>
                        <span className="detail-value">{item.account}</span>
                      </div>
                      <button className="process-btn">Process Disbursal →</button>
                    </>
                  ) : (
                    <>
                      <div className="detail-group">
                        <span className="detail-label">Due Date</span>
                        <span className="detail-value">{item.dueDate}</span>
                      </div>
                      <div className="detail-group">
                        <span className="detail-label">EMI Amount</span>
                        <span className="detail-value">{item.emi}</span>
                      </div>
                      <button className="process-btn">Schedule Settlement →</button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
}