import * as actionTypes from './actionTypes';
import * as firebase from '../../app/utils/firebase.js';

// thunk
export const fetchProfileData = (user_id) => async (dispatch) => {
  const [user, projects, sharedProjects] = await Promise.all([
    firebase.getUser(user_id),
    firebase.getProjects(user_id),
    firebase.getSharedProjects(user_id),
  ]);

  dispatch(setUser(user));
  dispatch(setProjects(projects));
  dispatch(setSharedProjects(sharedProjects));
};

export const fetchProjectData = (project_id) => async (dispatch) => {
  const [project, settings] = await Promise.all([
    firebase.getProject(project_id),
    firebase.getSettingsByName('default'),
  ]);

  dispatch(setProject(project));
  dispatch(setInfo('canvas'));
  dispatch(setSettings(settings.data));
};

export const fetchSearchTarget = (email) => async (dispatch) => {
  const user = await firebase.getUserByEmail(email);
  if (!user) {
    window.alert('user not exist');
    return;
  }
  dispatch(
    setSearchTarget({id: user.id, name: user.data.name, photo: user.data.photo})
  );
};

export const createProject = (user_id) => async (dispatch) => {
  await firebase.postProject({
    id: user_id,
    name: 'Untitled',
    groups: [],
  });
  const projects = await firebase.getProjects(user_id);
  dispatch(setProjects(projects));
};

export const cloneProject = (user_id, project_id) => async (dispatch) => {
  const project = await firebase.getProject(project_id);
  await firebase.postProject({
    id: user_id,
    name: `${project.name}-clone`,
    groups: project.groups,
  });
  const projects = await firebase.getProjects(user_id);
  dispatch(setProjects(projects));
};

export const shareProject = (project_id, target_id) => async (dispatch) => {
  const {share_id} = await firebase.getProject(project_id);
  for (let i = 0; i < share_id.length; i++) {
    if (share_id[i] === target_id) {
      window.alert('project is already shared!!');
      return;
    }
  }
  share_id.push(target_id);
  firebase.putProjectShareId(project_id, {share_id: share_id});
  dispatch(closeShare());
};

export const updateProjectName =
  (name, user_id, project_id) => async (dispatch) => {
    await firebase.putProjectName(project_id, {name: name});
    const projects = await firebase.getProjects(user_id);
    dispatch(setProjects(projects));
  };

export const updateProjectGroups = (groups, project_id) => async () => {
  await firebase.putProjectGroups(project_id, {groups: groups});
};

export const deleteProject = (user_id, project_id) => async (dispatch) => {
  await firebase.deleteProject(project_id);
  const projects = await firebase.getProjects(user_id);
  dispatch(setProjects(projects));
  dispatch(selectProject(''));
};

// user
export const setUser = (user) => ({
  type: actionTypes.SET_USER,
  user,
});

export const setSearchTarget = (target) => ({
  type: actionTypes.SET_SEARCH_TARGET,
  target,
});

export const selectSearchTarget = (target) => ({
  type: actionTypes.SELECT_SEARCH_TARGET,
  target,
});

// projects
export const setProjects = (projects) => ({
  type: actionTypes.SET_PROJECTS,
  projects,
});

export const setSharedProjects = (sharedProjects) => ({
  type: actionTypes.SET_SHARED_PROJECTS,
  sharedProjects,
});

export const filterProjects = (filter) => ({
  type: actionTypes.FILTER_PROJECTS,
  filter,
});

// project
export const setProject = (project) => ({
  type: actionTypes.SET_PROJECT,
  project,
});

export const selectProject = (project) => ({
  type: actionTypes.SELECT_PROJECT,
  project,
});

export const setProjectName = (name) => ({
  type: actionTypes.SET_PROJECT_NAME,
  name,
});

export const toggleProjectName = () => ({
  type: actionTypes.TOGGLE_PROJECT_NAME,
});

export const toggleShare = () => ({
  type: actionTypes.TOGGLE_SHARE,
});

export const closeShare = () => ({
  type: actionTypes.CLOSE_SHARE,
});

// settings
export const setSettings = (settings) => ({
  type: actionTypes.SET_SETTINGS,
  settings,
});

// info
export const setInfo = (info) => ({
  type: actionTypes.SET_INFO,
  info,
});

// group
export const addGroup = (group) => ({
  type: actionTypes.ADD_GROUP,
  group,
});

export const removeGroup = (group, instruction) => ({
  type: actionTypes.REMOVE_GROUP,
  group,
  instruction,
});

export const selectGroup = (group) => ({
  type: actionTypes.SELECT_GROUP,
  group,
});

export const setGroupPosition = (group) => ({
  type: actionTypes.SET_GROUP_POSITION,
  group,
});

export const setGroupRotation = (group, instruction) => ({
  type: actionTypes.SET_GROUP_ROTATION,
  group,
  instruction,
});

export const setRoomColor = (color) => ({
  type: actionTypes.SET_ROOM_COLOR,
  color,
});

export const setFloorTexture = (path) => ({
  type: actionTypes.SET_FLOOR_TEXTURE,
  path,
});

export const setCameraPosition = (position) => ({
  type: actionTypes.SET_CAMERA_POSITION,
  position,
});

// instruction
export const setInstruction = (instruction) => ({
  type: actionTypes.SET_INSTRUCTION,
  instruction,
});
