import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import './LenderConfiguration.css';

export default function LenderConfiguration() {
  return (
    <PageWrapper
      title="Lender Configuration"
      subtitle="Screen 25 — Credentials, endpoints, categories, commission, test connection"
      actions={<Button variant="secondary" onClick={() => window.history.back()}>Back</Button>}
    >
      <Card title="API + Credentials (stored encrypted on server)">
        <div className="lcfg-grid">
          <Input label="Lender name" placeholder="e.g. HDFC" />
          <Input label="API base URL" placeholder="https://api.lender.com" />
          <Input label="API key" placeholder="••••••••" />
          <Input label="API secret" placeholder="••••••••" />
          <Input label="Webhook URL" placeholder="https://finz.com/webhook" />
          <div className="lcfg-field">
            <label>Supported categories</label>
            <select>
              <option>Mobiles</option>
              <option>Appliances</option>
              <option>Furniture</option>
            </select>
          </div>
          <Input label="Min loan amount" placeholder="1000" />
          <Input label="Max loan amount" placeholder="500000" />
          <div className="lcfg-field">
            <label>Commission type</label>
            <select>
              <option>Percentage</option>
              <option>Flat</option>
              <option>Tiered slabs</option>
            </select>
          </div>
          <Input label="Commission value" placeholder="e.g. 1.2%" />
        </div>
        <div className="lcfg-actions">
          <Button variant="secondary">Test connection</Button>
          <Button variant="teal">Save lender</Button>
        </div>
      </Card>
    </PageWrapper>
  );
}