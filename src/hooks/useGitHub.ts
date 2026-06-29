import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { GitHubUser, GitHubRepo } from '../types';

const BASE = 'https://api.github.com';

export function useGitHubUser(username: string) {
  return useQuery<GitHubUser>({
    queryKey: ['github-user', username],
    queryFn: async () => {
      const { data } = await axios.get(`${BASE}/users/${username}`);
      return {
        login: data.login,
        name: data.name,
        avatar_url: data.avatar_url,
        public_repos: data.public_repos,
        followers: data.followers,
        following: data.following,
        bio: data.bio,
      };
    },
    enabled: !!username,
    staleTime: 60_000,
  });
}

export function useGitHubRepos(username: string) {
  return useQuery<GitHubRepo[]>({
    queryKey: ['github-repos', username],
    queryFn: async () => {
      const { data } = await axios.get(
        `${BASE}/users/${username}/repos?sort=updated&per_page=10`
      );
      return data.map((r: any) => ({
        id: r.id,
        name: r.name,
        full_name: r.full_name,
        stargazers_count: r.stargazers_count,
        forks_count: r.forks_count,
        open_issues_count: r.open_issues_count,
        language: r.language,
        description: r.description,
        updated_at: r.updated_at,
        html_url: r.html_url,
      }));
    },
    enabled: !!username,
    staleTime: 60_000,
  });
}
