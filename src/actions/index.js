// action types
export const SET_USER = 'SET_USER';
export const SET_PROJECTS = 'SET_PROJECTS';
export const SET_PROJECT = 'SET_PROJECT';

// actions
export const setUser = (user) => ({
  type: 'SET_USER',
  user,
});
export const setProjects = (projects) => ({
  type: 'SET_PROJECTS',
  projects,
});
export const setProject = (project) => ({
  type: 'SET_PROJECT',
  project,
});
