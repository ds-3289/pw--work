import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/common/Card';
import './MasterTicketQueue.css';

export default function MasterTicketQueue() {
  const [filter, setFilter] = useState('all');

  const tickets = [
    { id: 'TKT-001', customer: 'Rajesh Sharma', subject: 'Loan Disbursal Delay', priority: 'High', status: 'open', assignedTo: 'Support Agent A', created: '2024-01-15', sla: '2h' },
    { id: 'TKT-002', customer: 'Priya Patel', subject: 'Document Upload Issue', priority: 'Medium', status: 'in_progress', assignedTo: 'Support Agent B', created: '2024-01-14', sla: '4h' },
    { id: 'TKT-003', customer: 'Amit Kumar', subject: 'Payment Failed', priority: 'Critical', status: 'open', assignedTo: 'Support Agent C', created: '2024-01-14', sla: '1h' },
    { id: 'TKT-004', customer: 'Neha Gupta', subject: 'Interest Rate Query', priority: 'Low', status: 'resolved', assignedTo: 'Support Agent A', created: '2024-01-13', sla: '24h' },
    { id: 'TKT-005', customer: 'Vikram Singh', subject: 'KYC Update Required', priority: 'Medium', status: 'in_progress', assignedTo: 'Support Agent B', created: '2024-01-13', sla: '8h' },
  ];

  const filteredTickets = filter === 'all' ? tickets : tickets.filter(ticket => ticket.status === filter);

  return (
    <PageWrapper title="Master Ticket Queue" subtitle="Manage all support tickets and customer queries">
      <div className="ticket-queue">
        <div className="queue-header">
          <button className="create-ticket">+ Create Ticket</button>
        </div>

        <Card>
          <div className="ticket-stats">
            <div className="stat"><span>Open</span><strong>2</strong></div>
            <div className="stat"><span>In Progress</span><strong>2</strong></div>
            <div className="stat"><span>Resolved</span><strong>1</strong></div>
            <div className="stat"><span>SLA Breached</span><strong>0</strong></div>
          </div>

          <div className="ticket-filters">
            <button className={`filter ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
            <button className={`filter ${filter === 'open' ? 'active' : ''}`} onClick={() => setFilter('open')}>Open</button>
            <button className={`filter ${filter === 'in_progress' ? 'active' : ''}`} onClick={() => setFilter('in_progress')}>In Progress</button>
            <button className={`filter ${filter === 'resolved' ? 'active' : ''}`} onClick={() => setFilter('resolved')}>Resolved</button>
          </div>

          <div className="tickets-list">
            {filteredTickets.map(ticket => (
              <div key={ticket.id} className="ticket-item">
                <div className="ticket-main">
                  <div className="ticket-id">{ticket.id}</div>
                  <div className="ticket-subject">{ticket.subject}</div>
                  <div className={`ticket-priority priority-${ticket.priority.toLowerCase()}`}>{ticket.priority}</div>
                  <div className={`ticket-status status-${ticket.status}`}>{ticket.status.replace('_', ' ')}</div>
                </div>
                <div className="ticket-details">
                  <div className="detail">Customer: {ticket.customer}</div>
                  <div className="detail">Assigned: {ticket.assignedTo}</div>
                  <div className="detail">Created: {ticket.created}</div>
                  <div className="detail">SLA: {ticket.sla}</div>
                </div>
                <div className="ticket-actions">
                  <button className="view-ticket">View →</button>
                  <button className="assign-ticket">Assign</button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
}