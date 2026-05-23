import { useState, useMemo } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/common/Card';
import Tabs from '../../components/common/Tabs';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import SearchBar from '../../components/common/searchbar';
import Input from '../../components/common/Input';
import './NotificationCenter.css';

const MOCK = [
  { id: 1, title: 'Merchant approval pending', body: 'TechMart KYC awaiting review', type: 'approvals', priority: 'high', read: false, date: '2026-05-23', mention: false },
  { id: 2, title: 'SLA breach — Lender HDFC', body: 'P95 latency exceeded 5s', type: 'alerts', priority: 'critical', read: false, date: '2026-05-23', mention: true },
  { id: 3, title: 'System maintenance scheduled', body: 'Window: 2 AM - 4 AM IST', type: 'system', priority: 'info', read: true, date: '2026-05-22', mention: false },
  { id: 4, title: '@you Review fraud alert', body: 'Velocity rule triggered for PAN', type: 'mentions', priority: 'high', read: false, date: '2026-05-22', mention: true },
];

const tabs = [
  { id: 'all', label: 'All', count: MOCK.length },
  { id: 'approvals', label: 'Approvals', count: MOCK.filter((n) => n.type === 'approvals').length },
  { id: 'alerts', label: 'Alerts', count: MOCK.filter((n) => n.type === 'alerts').length },
  { id: 'system', label: 'System', count: MOCK.filter((n) => n.type === 'system').length },
  { id: 'mentions', label: 'Mentions', count: MOCK.filter((n) => n.type === 'mentions').length },
];

const priorityVariant = { critical: 'danger', high: 'warning', medium: 'info', info: 'default' };

export default function NotificationCenter() {
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [items, setItems] = useState(MOCK);
  const [selected, setSelected] = useState([]);

  const filtered = useMemo(() => {
    return items.filter((n) => {
      const tabMatch = activeTab === 'all' || n.type === activeTab;
      const searchMatch = n.title.toLowerCase().includes(search.toLowerCase()) || n.body.toLowerCase().includes(search.toLowerCase());
      const dateMatch = !dateFrom || n.date >= dateFrom;
      return tabMatch && searchMatch && dateMatch;
    });
  }, [items, activeTab, search, dateFrom]);

  const toggleSelect = (id) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const markRead = (ids) => setItems((list) => list.map((n) => (ids.includes(n.id) ? { ...n, read: true } : n)));
  const archive = (ids) => setItems((list) => list.filter((n) => !ids.includes(n.id)));
  const snooze = (ids) => alert(`Snoozed ${ids.length} notification(s) for 1 hour`);

  return (
    <PageWrapper
      title="Notification Center"
      subtitle="Screen 05 — Approvals, alerts, system events, mentions"
      actions={
        <>
          <Button variant="secondary" onClick={() => markRead(selected)} disabled={!selected.length}>Mark read</Button>
          <Button variant="secondary" onClick={() => snooze(selected)} disabled={!selected.length}>Snooze</Button>
          <Button variant="secondary" onClick={() => archive(selected)} disabled={!selected.length}>Archive</Button>
          <Button variant="primary" onClick={() => markRead(items.map((n) => n.id))}>Mark all read</Button>
        </>
      }
    >
      <Card>
        <div className="notif-toolbar">
          <SearchBar placeholder="Search notifications..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <Input label="From date" type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
        </div>
        <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
        <ul className="notif-list">
          {filtered.map((n) => (
            <li key={n.id} className={`notif-item ${n.read ? 'notif-item--read' : ''} notif-item--${n.priority}`}>
              <input type="checkbox" checked={selected.includes(n.id)} onChange={() => toggleSelect(n.id)} />
              <div className="notif-item__body">
                <div className="notif-item__head">
                  <strong>{n.title}</strong>
                  <Badge variant={priorityVariant[n.priority]}>{n.priority}</Badge>
                  {n.mention && <Badge variant="purple">@mention</Badge>}
                </div>
                <p>{n.body}</p>
                <span className="notif-item__date">{n.date}</span>
              </div>
              <div className="notif-item__actions">
                <Button variant="ghost" size="sm" onClick={() => markRead([n.id])}>Read</Button>
                <Button variant="ghost" size="sm">Open</Button>
              </div>
            </li>
          ))}
          {!filtered.length && <li className="notif-empty">No notifications</li>}
        </ul>
      </Card>
    </PageWrapper>
  );
}