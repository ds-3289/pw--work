import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Table from '../../components/common/Table';
import Badge from '../../components/common/Badge';
import './CategoryBrandMaster.css';

const BRANDS = [
  { id: 1, brand: 'Apple', status: 'Approved' },
  { id: 2, brand: 'Samsung', status: 'Approved' },
  { id: 3, brand: 'UnknownBrand', status: 'Pending' },
];

export default function CategoryBrandMaster() {
  const [cat, setCat] = useState('');
  const [brand, setBrand] = useState('');

  const cols = [
    { key: 'brand', label: 'Brand' },
    { key: 'status', label: 'Status', render: (v) => <Badge variant={v === 'Approved' ? 'success' : 'warning'}>{v}</Badge> },
  ];

  return (
    <PageWrapper
      title="Category & Brand Master"
      subtitle="Screen 23 — Taxonomy, brand approvals, mapping, default financing rules"
      actions={<Button variant="secondary">Import / Export</Button>}
    >
      <div className="cbm-grid">
        <Card title="Categories">
          <div className="cbm-row">
            <Input label="Add category" value={cat} onChange={(e) => setCat(e.target.value)} placeholder="e.g. Mobiles" />
            <Button variant="teal" onClick={() => { if (cat.trim()) alert('Category added'); setCat(''); }}>Add</Button>
          </div>
          <div className="cbm-tree">
            <div className="cbm-node"><strong>Electronics</strong><span>Mobiles, Laptops</span></div>
            <div className="cbm-node"><strong>Appliances</strong><span>Washing, Fridge</span></div>
            <div className="cbm-node"><strong>Furniture</strong><span>Sofa, Bed</span></div>
          </div>
          <div className="cbm-rules">
            <h4>Default financing rules (per category)</h4>
            <div className="cbm-rule"><span>Down-payment</span><strong>10%</strong></div>
            <div className="cbm-rule"><span>Tenure</span><strong>3–24 months</strong></div>
          </div>
        </Card>

        <Card title="Brand Directory">
          <div className="cbm-row">
            <Input label="Add brand" value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="e.g. Apple" />
            <Button variant="teal" onClick={() => { if (brand.trim()) alert('Brand added'); setBrand(''); }}>Add</Button>
          </div>
          <Table columns={cols} data={BRANDS} emptyMessage="No brands" />
        </Card>
      </div>
    </PageWrapper>
  );
}