import { Activity, BookOpen, Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface Props {
  onMenuToggle?: () => void;
}

export default function Header({ onMenuToggle }: Props) {
  const { pathname } = useLocation();

  return (
    <header className="app-header">
      <div className="header-brand">
        {onMenuToggle && pathname === '/' && (
          <button className="menu-btn" onClick={onMenuToggle} aria-label="Toggle filters">
            <Menu size={20} />
          </button>
        )}
        <Activity size={22} className="header-icon" />
        <span className="header-title">Live Dashboard</span>
      </div>
      <div className="header-meta">
        <span className="header-badge">Real-time</span>
        <Link
          to={pathname === '/docs' ? '/' : '/docs'}
          className="header-docs-link"
        >
          <BookOpen size={15} />
          {pathname === '/docs' ? 'Dashboard' : 'Docs'}
        </Link>
        <span className="header-time">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'short', month: 'short', day: 'numeric',
          })}
        </span>
      </div>
    </header>
  );
}
