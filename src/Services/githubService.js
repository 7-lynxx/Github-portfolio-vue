import axios from 'axios'

// Use your GitHub token here
const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_APP_GITHUB_TOKEN}` // Replace with your GitHub token
  }
})

export const getRepos = (username, page = 1, perPage = 3) => {
  return api.get(`/users/${username}/repos`, { params: { page, per_page: perPage } })
}

export const getRepoDetails = (owner, repo) => {
  return api.get(`/repos/${owner}/${repo}`)
}

export const createRepo = (data) => {
  return api.post('/user/repos', data)
}

export const updateRepo = (owner, repo, data) => {
  return api.patch(`/repos/${owner}/${repo}`, data)
}

export const deleteRepo = (owner, repo) => {
  return api.delete(`/repos/${owner}/${repo}`)
}