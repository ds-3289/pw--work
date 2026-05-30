import PageWrapper from '../../components/layout/PageWrapper';
import Card from '../../components/common/Card';
import StatCard from '../../components/charts/StatCard';
import LineChart from '../../components/charts/LineChart';
import BarChart from '../../components/charts/BarChart';
import './LenderSLAMonitor.css';

export default function LenderSLAMonitor() {
  return (
    <PageWrapper
      title="Lender SLA & Performance Monitor"
      subtitle="Screen 28 — Latency percentiles, approval, disbursal speed, breach alerts"
    >
      <div className="sla-kpis">
        <StatCard label="P95 Latency" value="4.8s" change="0.6s" changeType="down" accent="accent" />
        <StatCard label="Approval Rate" value="61%" change="+2%" changeType="up" accent="primary" />
        <StatCard label="Disbursal Time" value="1.2d" change="-0.1d" changeType="up" accent="teal" />
        <StatCard label="Breaches (24h)" value="3" change="+1" changeType="down" accent="accent" />
      </div>

      <div className="sla-charts">
        <LineChart title="Latency trend" data={[4, 5, 4.5, 4.8, 5.2, 4.9, 4.8]} labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']} color="var(--color-sky)" />
        <BarChart
          title="Approval rate by lender"
          data={[
            { label: 'HDFC', value: 62, color: 'var(--color-teal)' },
            { label: 'ICICI', value: 58, color: 'var(--color-sky)' },
            { label: 'AXIS', value: 41, color: 'var(--color-yellow)' },
          ]}
        />
      </div>
    </PageWrapper>
  );
}