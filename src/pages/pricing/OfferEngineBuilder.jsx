import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import './OfferEngineBuilder.css';

export default function OfferEngineBuilder() {
  const [offer, setOffer] = useState({
    type: 'cashback',
    scope: 'platform',
    start: '',
    end: '',
    budget: '100000',
    code: 'FINZNEW',
  });

  const update = (k, v) => setOffer((o) => ({ ...o, [k]: v }));

  return (
    <PageWrapper
      title="Offer Engine Builder"
      subtitle="Screen 31 — Platform offers, scope, schedule, budget cap"
      actions={<Button variant="teal" onClick={() => alert('Offer saved (draft)')}>Save</Button>}
    >
      <Card title="Create Offer">
        <div className="offer-grid">
          <div className="offer-field">
            <label>Offer type</label>
            <select value={offer.type} onChange={(e) => update('type', e.target.value)}>
              <option value="flat">Flat</option>
              <option value="percentage">Percentage</option>
              <option value="cashback">Cashback</option>
              <option value="coupon">Coupon</option>
            </select>
          </div>
          <div className="offer-field">
            <label>Scope</label>
            <select value={offer.scope} onChange={(e) => update('scope', e.target.value)}>
              <option value="platform">Platform-wide</option>
              <option value="tier">Merchant tier</option>
              <option value="category">Category</option>
              <option value="lender">Lender</option>
              <option value="geo">Geo</option>
            </select>
          </div>
          <Input label="Start date" type="date" value={offer.start} onChange={(e) => update('start', e.target.value)} />
          <Input label="End date" type="date" value={offer.end} onChange={(e) => update('end', e.target.value)} />
          <Input label="Budget cap" value={offer.budget} onChange={(e) => update('budget', e.target.value)} />
          <Input label="Coupon code" value={offer.code} onChange={(e) => update('code', e.target.value)} />
        </div>

        <div className="offer-actions">
          <Button variant="secondary">Festival template</Button>
          <Button variant="teal">Publish</Button>
        </div>
      </Card>
    </PageWrapper>
  );
}