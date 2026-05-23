import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import './PermissionMatrix.css';

const MODULES = ['Merchants', 'Users', 'Lenders', 'Loans', 'Products', 'Risk', 'Analytics', 'Audit'];
const ACTIONS = ['view', 'create', 'edit', 'delete', 'approve', 'reject', 'export'];

const ROLES_COMPARE = ['Merchant Admin', 'Store Manager'];

function buildMatrix() {
  const m = {};
  MODULES.forEach((mod) => {
    m[mod] = {};
    ACTIONS.forEach((a) => { m[mod][a] = Math.random() > 0.5; });
  });
  m.Merchants.approve = true;
  m.Loans.export = true;
  return m;
}

export default function PermissionMatrix() {
  const [matrix, setMatrix] = useState(buildMatrix);
  const [selectedRole, setSelectedRole] = useState('Merchant Admin');
  const [compareMode, setCompareMode] = useState(false);
  const [compareRole, setCompareRole] = useState('Store Manager');
  const [compareMatrix] = useState(buildMatrix);
  const [showConditional, setShowConditional] = useState(false);

  const toggle = (mod, action) => {
    setMatrix((m) => ({
      ...m,
      [mod]: { ...m[mod], [action]: !m[mod][action] },
    }));
  };

  const toggleRow = (mod) => {
    const allOn = ACTIONS.every((a) => matrix[mod][a]);
    setMatrix((m) => ({
      ...m,
      [mod]: Object.fromEntries(ACTIONS.map((a) => [a, !allOn])),
    }));
  };

  const toggleCol = (action) => {
    const allOn = MODULES.every((mod) => matrix[mod][action]);
    setMatrix((m) => {
      const next = { ...m };
      MODULES.forEach((mod) => { next[mod] = { ...next[mod], [action]: !allOn }; });
      return next;
    });
  };

  const isDiff = (mod, action) => compareMode && matrix[mod][action] !== compareMatrix[mod][action];

  return (
    <PageWrapper
      title="Permission Matrix"
      subtitle="Screen 12 — Module × action RBAC with bulk toggle & diff"
      actions={
        <>
          <Button variant="secondary" onClick={() => setCompareMode(!compareMode)}>
            {compareMode ? 'Exit diff' : 'Compare roles'}
          </Button>
          <Button variant="teal">Save matrix (audit logged)</Button>
          <Button variant="ghost">Rollback to previous</Button>
        </>
      }
    >
      <Card>
        <div className="perm-toolbar">
          <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
            {['Super Admin', 'Merchant Admin', 'Store Manager', 'Lender Ops', 'Risk User'].map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          {compareMode && (
            <select value={compareRole} onChange={(e) => setCompareRole(e.target.value)}>
              {ROLES_COMPARE.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          )}
          <label className="perm-conditional">
            <input type="checkbox" checked={showConditional} onChange={(e) => setShowConditional(e.target.checked)} />
            Show conditional rules
          </label>
        </div>

        {showConditional && (
          <p className="perm-conditional-note">
            Example: Approve merchant only if amount &lt; ₹10,00,000 (configured per role on server)
          </p>
        )}

        <div className="perm-matrix-wrap">
          <table className="perm-matrix">
            <thead>
              <tr>
                <th>Module</th>
                {ACTIONS.map((a) => (
                  <th key={a}>
                    <button type="button" className="perm-col-toggle" onClick={() => toggleCol(a)}>{a}</button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MODULES.map((mod) => (
                <tr key={mod}>
                  <td>
                    <button type="button" className="perm-row-toggle" onClick={() => toggleRow(mod)}>{mod}</button>
                  </td>
                  {ACTIONS.map((a) => (
                    <td key={a} className={isDiff(mod, a) ? 'perm-cell--diff' : ''}>
                      <input type="checkbox" checked={matrix[mod][a]} onChange={() => toggle(mod, a)} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PageWrapper>
  );
}