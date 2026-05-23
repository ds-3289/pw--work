import './StatCard.css';
import Badge from '../common/Badge';

export default function StatCard({
  label,
  value,
  change,
  changeType = 'up',
  icon,
  accent = 'primary',
  subtitle,
}) {
  return (
    <div className={`stat-card stat-card--${accent}`}>
      <div className="stat-card__top">
        <span className="stat-card__label">{label}</span>
        {icon && <span className="stat-card__icon">{icon}</span>}
      </div>
      <div className="stat-card__value">{value}</div>
      {subtitle && <p className="stat-card__subtitle">{subtitle}</p>}
      {change != null && (
        <Badge variant={changeType === 'up' ? 'success' : changeType === 'down' ? 'danger' : 'warning'}>
          {changeType === 'up' ? '↑' : changeType === 'down' ? '↓' : '•'} {change}
        </Badge>
      )}
    </div>
  );
}