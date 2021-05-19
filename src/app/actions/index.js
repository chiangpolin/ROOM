// action types
export const SET_USER = 'SET_USER';
export const SET_PROJECT = 'SET_PROJECT';
export const SET_PROJECTS = 'SET_PROJECTS';
export const SET_SHARED_PROJECTS = 'SET_SHARED_PROJECTS';
export const FILTER_PROJECTS = 'FILTER_PROJECTS';
export const SELECT_PROJECT = 'SELECT_PROJECT';
export const TOGGLE_EDIT_NAME = 'TOGGLE_EDIT_NAME';
export const UPDATE_EDIT_NAME = 'UPDATE_EDIT_NAME';
export const TOGGLE_SHARE_PROJECT = 'TOGGLE_SHARE_PROJECT';
export const CLOSE_SHARE_PROJECT = 'CLOSE_SHARE_PROJECT';
export const SET_SEARCH_TARGET = 'SET_SEARCH_TARGET';
export const SELECT_TARGET = 'SELECT_TARGET';

export const UPDATE_GROUP = 'UPDATE_GROUP';

// actions
export const setUser = (user) => ({
  type: 'SET_USER',
  user,
});
export const setProject = (project) => ({
  type: 'SET_PROJECT',
  project,
});
export const setProjects = (projects) => ({
  type: 'SET_PROJECTS',
  projects,
});
export const setSharedProjects = (sharedProjects) => ({
  type: 'SET_SHARED_PROJECTS',
  sharedProjects,
});
export const filterProjects = (filter) => ({
  type: 'FILTER_PROJECTS',
  filter,
});
export const selectProject = (project) => ({
  type: 'SELECT_PROJECT',
  project,
});
export const toggleEditName = () => ({
  type: 'TOGGLE_EDIT_NAME',
});
export const updateEditName = (name) => ({
  type: 'UPDATE_EDIT_NAME',
  name,
});
export const toggleShareProject = () => ({
  type: 'TOGGLE_SHARE_PROJECT',
});
export const closeShareProject = () => ({
  type: 'CLOSE_SHARE_PROJECT',
});
export const setSearchTarget = (target) => ({
  type: 'SET_SEARCH_TARGET',
  target,
});
export const selectTarget = (target) => ({
  type: 'SELECT_TARGET',
  target,
});

export const updateGroup = (group) => ({
  type: 'UPDATE_GROUP',
  group,
});
