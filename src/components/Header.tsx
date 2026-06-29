import { Activity } from 'lucide-react';

export default function Header() {
  return (
    <header className="app-header">
      <div className="header-brand">
        <Activity size={22} className="header-icon" />
        <span className="header-title">Live Dashboard</span>
      </div>
      <div className="header-meta">
        <span className="header-badge">Real-time</span>
        <span className="header-time">{new Date().toLocaleDateString('en-US', {
          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
        })}</span>
      </div>
    </header>
  );
}
