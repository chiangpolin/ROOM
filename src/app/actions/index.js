// action types
export const SET_USER = 'SET_USER';
export const SET_PROJECTS = 'SET_PROJECTS';
export const SET_PROJECT = 'SET_PROJECT';
export const UPDATE_GROUPS = 'UPDATE_GROUPS';
export const CLICK_RENDER = 'CLICK_RENDER';

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
export const updateGroups = (group) => ({
  type: 'UPDATE_GROUPS',
  group,
});
export const clickRender = () => ({
  type: 'CLICK_RENDER',
});
