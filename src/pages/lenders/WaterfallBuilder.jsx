import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import './WaterfallBuilder.css';

const INIT = ['HDFC', 'ICICI', 'AXIS'];

export default function WaterfallBuilder() {
  const [list, setList] = useState(INIT);

  const move = (i, dir) => {
    const j = i + dir;
    if (j < 0 || j >= list.length) return;
    const next = [...list];
    [next[i], next[j]] = [next[j], next[i]];
    setList(next);
  };

  return (
    <PageWrapper
      title="Waterfall Routing Builder"
      subtitle="Screen 26 — Priority order by category/geo/time (simplified reorder UI)"
      actions={<Button variant="teal" onClick={() => alert('Waterfall saved')}>Save</Button>}
    >
      <Card title="Priority Order">
        <div className="wf-list">
          {list.map((name, i) => (
            <div key={name} className="wf-item">
              <div className="wf-rank">{i + 1}</div>
              <div className="wf-name">{name}</div>
              <div className="wf-actions">
                <Button variant="secondary" size="sm" onClick={() => move(i, -1)}>Up</Button>
                <Button variant="secondary" size="sm" onClick={() => move(i, 1)}>Down</Button>
              </div>
            </div>
          ))}
        </div>
        <div className="wf-sim">
          <h4>Simulator</h4>
          <textarea className="wf-text" rows={6} placeholder="Paste application JSON..." />
          <Button variant="secondary" onClick={() => alert(`Routed to: ${list[0]}`)}>Simulate</Button>
        </div>
      </Card>
    </PageWrapper>
  );
}