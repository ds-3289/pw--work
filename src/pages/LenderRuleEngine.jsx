import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Badge from '../../components/common/Badge';
import './LenderRuleEngine.css';

const VARS = ['credit_score', 'income', 'age', 'location', 'emi_amount', 'category'];

export default function LenderRuleEngine() {
  const [rules, setRules] = useState([
    { id: 1, ifVar: 'credit_score', op: '>=', val: '700', then: 'HDFC', active: true },
    { id: 2, ifVar: 'category', op: '==', val: 'Mobiles', then: 'ICICI', active: true },
  ]);

  const add = () => setRules((r) => [...r, { id: Date.now(), ifVar: 'income', op: '>=', val: '30000', then: 'AXIS', active: false }]);

  return (
    <PageWrapper
      title="Lender Rule Engine"
      subtitle="Screen 27 — If/then routing rules, versioning (simplified)"
      actions={
        <>
          <Button variant="secondary">Create new version</Button>
          <Button variant="teal">Publish</Button>
        </>
      }
    >
      <Card title="Rules">
        <div className="rule-list">
          {rules.map((r) => (
            <div key={r.id} className="rule-item">
              <Badge variant={r.active ? 'success' : 'warning'}>{r.active ? 'Active' : 'Draft'}</Badge>
              <div className="rule-text">
                IF <strong>{r.ifVar}</strong> {r.op} <strong>{r.val}</strong> THEN route to <strong>{r.then}</strong>
              </div>
              <Button variant="secondary" size="sm" onClick={() => setRules((x) => x.map((y) => (y.id === r.id ? { ...y, active: !y.active } : y)))}>
                Toggle
              </Button>
            </div>
          ))}
        </div>
        <div className="rule-add">
          <Input label="Quick add (placeholder)" placeholder="Define rule..." />
          <Button variant="teal" onClick={add}>Add</Button>
        </div>
        <p className="rule-hint">A/B testing + audit is handled server-side (PRD).</p>
      </Card>
    </PageWrapper>
  );
}