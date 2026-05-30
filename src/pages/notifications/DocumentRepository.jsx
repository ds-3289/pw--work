import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/common/Card';
import './DocumentRepository.css';

export default function DocumentRepository() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const documents = [
    { id: 'DOC-001', name: 'Aadhaar Card.pdf', category: 'KYC', size: '1.2 MB', uploadedBy: 'Rajesh Sharma', date: '2024-01-15' },
    { id: 'DOC-002', name: 'PAN Card.pdf', category: 'KYC', size: '0.8 MB', uploadedBy: 'Rajesh Sharma', date: '2024-01-15' },
    { id: 'DOC-003', name: 'Bank Statement.xlsx', category: 'Financial', size: '2.3 MB', uploadedBy: 'Priya Patel', date: '2024-01-14' },
    { id: 'DOC-004', name: 'Salary Slip.pdf', category: 'Income', size: '0.5 MB', uploadedBy: 'Amit Kumar', date: '2024-01-14' },
    { id: 'DOC-005', name: 'Loan Agreement.pdf', category: 'Legal', size: '1.5 MB', uploadedBy: 'System', date: '2024-01-13' },
    { id: 'DOC-006', name: 'Property Papers.pdf', category: 'Legal', size: '3.2 MB', uploadedBy: 'Neha Gupta', date: '2024-01-13' },
  ];

  const categories = ['all', 'KYC', 'Financial', 'Income', 'Legal'];
  const filteredDocs = selectedCategory === 'all' ? documents : documents.filter(doc => doc.category === selectedCategory);

  return (
    <PageWrapper title="Document Repository" subtitle="Centralized document management system">
      <div className="document-repo">
        <div className="repo-header">
          <button className="upload-btn">+ Upload Document</button>
        </div>

        <Card>
          <div className="category-filters">
            {categories.map(cat => (
              <button key={cat} className={`category-btn ${selectedCategory === cat ? 'active' : ''}`} onClick={() => setSelectedCategory(cat)}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          <div className="stats-bar">
            <div>Total Documents: {documents.length}</div>
            <div>Total Size: 9.5 MB</div>
            <div>Last Upload: Today</div>
          </div>

          <div className="documents-grid">
            {filteredDocs.map(doc => (
              <div key={doc.id} className="doc-card">
                <div className="doc-icon">📄</div>
                <div className="doc-info">
                  <div className="doc-name">{doc.name}</div>
                  <div className="doc-meta">
                    <span className="doc-category">{doc.category}</span>
                    <span className="doc-size">{doc.size}</span>
                  </div>
                  <div className="doc-uploader">by {doc.uploadedBy} • {doc.date}</div>
                </div>
                <div className="doc-actions">
                  <button className="download-doc">↓</button>
                  <button className="delete-doc">🗑️</button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
}