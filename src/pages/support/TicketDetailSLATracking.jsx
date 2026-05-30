import { useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/common/Card';
import './TicketDetailSLATracking.css';

export default function TicketDetailSLATracking() {
  const [ticket] = useState({
    id: 'TKT-001',
    customer: 'Rajesh Sharma',
    subject: 'Loan Disbursal Delay',
    description: 'Customer reported that loan amount has not been disbursed even after approval 48 hours ago',
    priority: 'High',
    status: 'open',
    assignedTo: 'Support Agent A',
    created: '2024-01-15 10:30:00',
    lastUpdated: '2024-01-15 14:20:00',
    slaTarget: '2024-01-15 16:30:00',
    timeRemaining: '2h 10m',
    category: 'Disbursal',
    channel: 'Email'
  });

  const comments = [
    { id: 1, user: 'Support Agent A', message: 'Checking with disbursal team', timestamp: '2024-01-15 11:00:00', type: 'internal' },
    { id: 2, user: 'System', message: 'Ticket escalated to Level 2', timestamp: '2024-01-15 12:30:00', type: 'system' },
    { id: 3, user: 'Rajesh Sharma', message: 'Any update on this? Need urgent disbursal', timestamp: '2024-01-15 14:00:00', type: 'customer' },
  ];

  return (
    <PageWrapper title="Ticket Detail & SLA Tracking" subtitle="View and manage ticket details with SLA monitoring">
      <div className="ticket-detail">
        <div className="detail-grid">
          <div className="detail-main">
            <Card>
              <div className="ticket-header">
                <div>
                  <h3 className="ticket-id">{ticket.id}</h3>
                  <h1 className="ticket-subject">{ticket.subject}</h1>
                </div>
                <div className="ticket-badges">
                  <span className={`priority-badge priority-${ticket.priority.toLowerCase()}`}>{ticket.priority}</span>
                  <span className={`status-badge status-${ticket.status}`}>{ticket.status}</span>
                </div>
              </div>

              <div className="ticket-info-grid">
                <div className="info-item">
                  <span className="label">Customer</span>
                  <span className="value">{ticket.customer}</span>
                </div>
                <div className="info-item">
                  <span className="label">Assigned To</span>
                  <span className="value">{ticket.assignedTo}</span>
                </div>
                <div className="info-item">
                  <span className="label">Created</span>
                  <span className="value">{ticket.created}</span>
                </div>
                <div className="info-item">
                  <span className="label">Last Updated</span>
                  <span className="value">{ticket.lastUpdated}</span>
                </div>
                <div className="info-item">
                  <span className="label">Category</span>
                  <span className="value">{ticket.category}</span>
                </div>
                <div className="info-item">
                  <span className="label">Channel</span>
                  <span className="value">{ticket.channel}</span>
                </div>
              </div>

              <div className="ticket-description">
                <h4>Description</h4>
                <p>{ticket.description}</p>
              </div>

              <div className="comments-section">
                <h4>Activity Timeline</h4>
                <div className="comments-list">
                  {comments.map(comment => (
                    <div key={comment.id} className={`comment ${comment.type}`}>
                      <div className="comment-header">
                        <span className="comment-user">{comment.user}</span>
                        <span className="comment-time">{comment.timestamp}</span>
                      </div>
                      <div className="comment-message">{comment.message}</div>
                    </div>
                  ))}
                </div>
                <div className="add-comment">
                  <textarea placeholder="Add a comment..." rows="3"></textarea>
                  <button className="add-comment-btn">Add Comment</button>
                </div>
              </div>
            </Card>
          </div>

          <div className="detail-sidebar">
            <Card>
              <h4>SLA Monitoring</h4>
              <div className="sla-timer">
                <div className="sla-label">Time Remaining</div>
                <div className="sla-time">{ticket.timeRemaining}</div>
                <div className="sla-target">Target: {ticket.slaTarget}</div>
                <div className="sla-progress">
                  <div className="progress-bar" style={{ width: '65%' }}></div>
                </div>
              </div>

              <div className="quick-actions">
                <h4>Quick Actions</h4>
                <button className="action-btn escalate">Escalate to Level 2</button>
                <button className="action-btn reassign">Reassign Ticket</button>
                <button className="action-btn resolve">Mark as Resolved</button>
                <button className="action-btn close">Close Ticket</button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}