import { Activity, Menu } from 'lucide-react';

interface Props {
  onMenuToggle?: () => void;
}

export default function Header({ onMenuToggle }: Props) {
  return (
    <header className="app-header">
      <div className="header-brand">
        {onMenuToggle && (
          <button className="menu-btn" onClick={onMenuToggle} aria-label="Toggle filters">
            <Menu size={20} />
          </button>
        )}
        <Activity size={22} className="header-icon" />
        <span className="header-title">Live Dashboard</span>
      </div>
      <div className="header-meta">
        <span className="header-badge">Real-time</span>
        <span className="header-time">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'short', month: 'short', day: 'numeric',
          })}
        </span>
      </div>
    </header>
  );
}
