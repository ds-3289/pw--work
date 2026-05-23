import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import './RoleManagement.css';

const ROLES = [
  { id: 1, name: 'Super Admin', description: 'Full platform access', users: 2, builtin: true, modified: '2026-05-01' },
  { id: 2, name: 'Merchant Admin', description: 'Merchant portal scope', users: 48, builtin: true, modified: '2026-05-10' },
  { id: 3, name: 'Store Manager', description: 'Store-level operations', users: 120, builtin: true, modified: '2026-05-15' },
  { id: 4, name: 'Sales Exec', description: 'Merchant onboarding', users: 35, builtin: true, modified: '2026-05-18' },
  { id: 5, name: 'Lender Ops', description: 'Lender-scoped access', users: 12, builtin: true, modified: '2026-05-20' },
  { id: 6, name: 'Risk User', description: 'Risk module permissions', users: 8, builtin: true, modified: '2026-05-22' },
  { id: 7, name: 'Customer', description: 'End customer app', users: 0, builtin: true, modified: '—' },
];

export default function RoleManagement() {
  const [roles, setRoles] = useState(ROLES);
  const [modal, setModal] = useState(null);
  const [newRole, setNewRole] = useState({ name: '', description: '' });

  const cloneRole = (role) => {
    setNewRole({ name: `${role.name} (Copy)`, description: role.description });
    setModal({ type: 'clone', source: role });
  };

  const archiveRole = (role) => setModal({ type: 'archive', role });

  const saveClone = () => {
    setRoles([...roles, { id: Date.now(), name: newRole.name, description: newRole.description, users: 0, builtin: false, modified: 'Today' }]);
    setModal(null);
  };

  return (
    <PageWrapper
      title="Role Management"
      subtitle="Screen 11 — Built-in roles, clone, archive, user counts"
      actions={<Button variant="primary" onClick={() => setModal({ type: 'create' })}>+ Create Role</Button>}
    >
      <div className="roles-grid">
        {roles.map((role) => (
          <Card key={role.id} className="role-card">
            <div className="role-card__head">
              <h3>{role.name}</h3>
              {role.builtin && <Badge variant="info">Built-in</Badge>}
            </div>
            <p className="role-card__desc">{role.description}</p>
            <div className="role-card__meta">
              <span>{role.users} users</span>
              <span>Modified: {role.modified}</span>
            </div>
            <div className="role-card__actions">
              <Button variant="secondary" size="sm">Edit</Button>
              <Button variant="ghost" size="sm" onClick={() => cloneRole(role)}>Clone</Button>
              {!role.builtin && (
                <Button variant="danger" size="sm" onClick={() => archiveRole(role)}>Archive</Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={!!modal}
        onClose={() => setModal(null)}
        title={modal?.type === 'archive' ? 'Archive Role' : 'Clone / Create Role'}
        footer={
          <>
            <Button variant="secondary" onClick={() => setModal(null)}>Cancel</Button>
            <Button variant="primary" onClick={saveClone}>Save</Button>
          </>
        }
      >
        {modal?.type === 'archive' && (
          <p>Archive <strong>{modal.role.name}</strong>? Users must be reassigned first.</p>
        )}
        {(modal?.type === 'clone' || modal?.type === 'create') && (
          <>
            <Input label="Role name" value={newRole.name} onChange={(e) => setNewRole({ ...newRole, name: e.target.value })} />
            <Input label="Description" value={newRole.description} onChange={(e) => setNewRole({ ...newRole, description: e.target.value })} />
            {modal?.type === 'clone' && <p className="role-modal__inherit">Inherits permissions from {modal.source.name}</p>}
          </>
        )}
      </Modal>
    </PageWrapper>
  );
}