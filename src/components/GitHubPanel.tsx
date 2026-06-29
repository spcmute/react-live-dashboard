import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { Star, GitFork, AlertCircle, ExternalLink } from 'lucide-react';
import { useGitHubUser, useGitHubRepos } from '../hooks/useGitHub';

const COLORS = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe',
  '#818cf8', '#7c3aed', '#5b21b6', '#4c1d95', '#e879f9'];

interface Props { username: string }

export default function GitHubPanel({ username }: Props) {
  const { data: user, isLoading: loadingUser, error: errUser } = useGitHubUser(username);
  const { data: repos, isLoading: loadingRepos } = useGitHubRepos(username);

  if (loadingUser) return <PanelSkeleton title="GitHub" />;
  if (errUser) return <PanelError title="GitHub" message="User not found" />;
  if (!user) return null;

  const chartData = repos?.map(r => ({
    name: r.name.length > 12 ? r.name.slice(0, 12) + '…' : r.name,
    stars: r.stargazers_count,
  })) ?? [];

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-tag github">GitHub</span>
        <h3 className="card-title">@{user.login}</h3>
      </div>

      <div className="gh-profile">
        <img src={user.avatar_url} alt={user.login} className="gh-avatar" />
        <div>
          <p className="gh-name">{user.name || user.login}</p>
          {user.bio && <p className="gh-bio">{user.bio}</p>}
          <div className="gh-stats">
            <span>{user.public_repos} repos</span>
            <span>{user.followers} followers</span>
            <span>{user.following} following</span>
          </div>
        </div>
      </div>

      {!loadingRepos && chartData.length > 0 && (
        <div className="chart-wrap">
          <p className="chart-label">Stars by repo</p>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <Tooltip
                contentStyle={{ background: '#1e293b', border: 'none', borderRadius: 8, fontSize: 12 }}
                labelStyle={{ color: '#e2e8f0' }}
                itemStyle={{ color: '#a78bfa' }}
              />
              <Bar dataKey="stars" radius={[4, 4, 0, 0]}>
                {chartData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="repo-list">
        {repos?.slice(0, 5).map(r => (
          <a key={r.id} href={r.html_url} target="_blank" rel="noopener" className="repo-item">
            <div className="repo-name">
              {r.name}
              <ExternalLink size={11} />
            </div>
            <div className="repo-meta">
              {r.language && <span className="repo-lang">{r.language}</span>}
              <span><Star size={11} /> {r.stargazers_count}</span>
              <span><GitFork size={11} /> {r.forks_count}</span>
              <span><AlertCircle size={11} /> {r.open_issues_count}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

function PanelSkeleton({ title: _ }: { title: string }) {
  return (
    <div className="card skeleton-card">
      <div className="skeleton-tag" />
      <div className="skeleton-line wide" />
      <div className="skeleton-line" />
      <div className="skeleton-line medium" />
      <div className="skeleton-bar" />
    </div>
  );
}

function PanelError({ title, message }: { title: string; message: string }) {
  return (
    <div className="card error-card">
      <span className="card-tag github">{title}</span>
      <p className="error-msg">{message}</p>
    </div>
  );
}
