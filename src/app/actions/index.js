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

export const SET_INFO = 'SET_INFO';
export const INIT_SETTINGS = 'INIT_SETTINGS';
export const SELECT_GROUP = 'SELECT_GROUP';
export const ADD_NEW_GROUP = 'ADD_NEW_GROUP';
export const UPDATE_GROUP = 'UPDATE_GROUP';
export const UPDATE_GROUP_ROTATION = 'UPDATE_GROUP_ROTATION';
export const DELETE_GROUP = 'DELETE_GROUP';
export const SET_INSTRUCTION = 'SET_INSTRUCTION';

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

export const initSettings = (settings) => ({
  type: 'INIT_SETTINGS',
  settings,
});
export const setInfo = (info) => ({
  type: 'SET_INFO',
  info,
});
export const selectGroup = (group) => ({
  type: 'SELECT_GROUP',
  group,
});
export const addNewGroup = (group) => ({
  type: 'ADD_NEW_GROUP',
  group,
});
export const updateGroup = (group) => ({
  type: 'UPDATE_GROUP',
  group,
});
export const updateGroupRotation = (group, instruction) => ({
  type: 'UPDATE_GROUP_ROTATION',
  group,
  instruction,
});
export const deleteGroup = (group, instruction) => ({
  type: 'DELETE_GROUP',
  group,
  instruction,
});
export const setInstruction = (instruction) => ({
  type: 'SET_INSTRUCTION',
  instruction,
});
