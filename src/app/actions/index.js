import * as actionTypes from './actionTypes';
import * as defaultSettings from './defaultSettings';
import * as firestore from '../../app/utils/firestore.js';
import * as auth from '../../app/utils/auth.js';

// thunk
export const signUp = (name, email, password) => async (dispatch) => {
  const credential = await auth.signUp(email, password);
  auth.sendEmailVerification();
  const data = {name: name, email: credential.user.email};
  if (credential.user.uid) {
    const id = await firestore.postUser(data);
    return id;
  } else {
    alert('Something went wrong');
    return;
  }
};

export const signIn = (email, password) => async (dispatch) => {
  const credential = await auth.signIn(email, password);
  return credential;
};

export const googleSignIn = () => async (dispatch) => {
  const provider = auth.googleProvider();
  const result = await auth.googleSignInPopup(provider);
  const user = await firestore.getUserByEmail(result.user.email);

  if (user.id) {
    await firestore.putUser(user.id, {
      name: result.user.displayName,
      email: result.user.email,
      photoURL: result.user.photoURL,
    });
  } else {
    await firestore.postUser({
      name: result.user.displayName,
      email: result.user.email,
      photoURL: result.user.photoURL,
    });
  }

  return result;
};

export const facebookSignIn = () => async (dispatch) => {
  const provider = auth.facebookProvider();
  const result = await auth.facebookSignInPopup(provider);
  const user = await firestore.getUserByEmail(result.user.email);

  if (user.id) {
    await firestore.putUser(user.id, {
      name: result.user.displayName,
      email: result.user.email,
      photoURL: result.user.photoURL,
    });
  } else {
    await firestore.postUser({
      name: result.user.displayName,
      email: result.user.email,
      photoURL: result.user.photoURL,
    });
  }

  return result;
};

export const signOut = () => async (dispatch) => {
  dispatch(setUser({id: '', name: '', email: ''}));
  auth.signOut();
  alert('Sign out!');
};

export const forgetPassword = (email) => async (dispatch) => {
  auth.sendPasswordResetEmail(email);
};

export const fetchProfileData = (history) => async (dispatch) => {
  let user;
  const credentialUser = await auth.getAuthState();
  if (credentialUser.uid) {
    user = await firestore.getUserByEmail(credentialUser.email);
    dispatch(setUser({id: user.id, name: user.name, email: user.email}));
  } else {
    history.push('/');
    return;
  }

  const [projects, sharedProjects] = await Promise.all([
    firestore.getProjects(user.id),
    firestore.getSharedProjects(user.id),
  ]);

  dispatch(setProjects(projects));
  dispatch(setSharedProjects(sharedProjects));
  dispatch(selectProject({id: '', name: '', author_id: ''}));
  dispatch(resetProjectStatus());
};

export const fetchProjectData = (project_id) => async (dispatch) => {
  const [project, walls, furnitures, floors, cameras, setting] =
    await Promise.all([
      firestore.getProject(project_id),
      firestore.getWalls(project_id),
      firestore.getFurnitures(project_id),
      firestore.getFloors(project_id),
      firestore.getCameras(project_id),
      firestore.getSettingByName('Default-Setting'),
    ]);

  const [settingPaints, settingFurnitures, settingTextures] = await Promise.all(
    [
      firestore.getSettingPaints(setting.id),
      firestore.getSettingFurnitures(setting.id),
      firestore.getSettingTextures(setting.id),
    ]
  );

  dispatch(
    setProject({
      ...project,
      walls: walls,
      furnitures: furnitures,
      floors: floors,
      cameras: cameras,
    })
  );
  dispatch(
    setSetting({
      ...setting.data,
      paints: settingPaints,
      furnitures: settingFurnitures,
      textures: settingTextures,
    })
  );
  dispatch(setInfo('canvas'));
};

export const fetchSearchTarget = (email) => async (dispatch) => {
  const user = await firestore.getUserByEmail(email);
  if (!user) {
    window.alert('user not exist');
    return;
  }
  dispatch(
    setSearchTarget({id: user.id, name: user.data.name, photo: user.data.photo})
  );
};

export const createProject = (user_id) => async (dispatch) => {
  const id = await firestore.postProject({
    id: user_id,
    name: 'Untitled',
  });

  await Promise.all([
    firestore.postWall(id, defaultSettings.wall),
    firestore.postFurniture(id, defaultSettings.bed),
    firestore.postFloor(id, defaultSettings.floor),
    firestore.postCamera(id, defaultSettings.camera),
  ]);

  const projects = await firestore.getProjects(user_id);
  dispatch(setProjects(projects));
};

export const cloneProject = (user_id, project_id) => async (dispatch) => {
  const [project, walls, furnitures, floors, cameras] = await Promise.all([
    firestore.getProject(project_id),
    firestore.getWalls(project_id),
    firestore.getFurnitures(project_id),
    firestore.getFloors(project_id),
    firestore.getCameras(project_id),
  ]);
  const id = await firestore.postProject({
    id: user_id,
    name: `${project.name}-clone`,
  });

  const promises = [];

  for (let i = 0; i < walls.length; i++) {
    promises.push(firestore.postWall(id, walls[i]));
  }
  for (let i = 0; i < furnitures.length; i++) {
    promises.push(firestore.postFurniture(id, furnitures[i]));
  }
  for (let i = 0; i < floors.length; i++) {
    promises.push(firestore.postFloor(id, floors[i]));
  }
  for (let i = 0; i < cameras.length; i++) {
    promises.push(firestore.postCamera(id, cameras[i]));
  }

  await Promise.all(promises);

  const projects = await firestore.getProjects(user_id);
  dispatch(setProjects(projects));
};

export const shareProject = (project_id, target_id) => async (dispatch) => {
  const {share_id} = await firestore.getProject(project_id);
  for (let i = 0; i < share_id.length; i++) {
    if (share_id[i] === target_id) {
      window.alert('project is already shared!!');
      return;
    }
  }
  share_id.push(target_id);
  firestore.putProjectShareId(project_id, {share_id: share_id});
  dispatch(closeShare());
};

export const updateProject = (project_id, data) => async () => {
  for (let i = 0; i < data.walls.length; i++) {
    firestore.putWall(project_id, data.walls[i]);
  }
  for (let i = 0; i < data.furnitures.length; i++) {
    firestore.putFurniture(project_id, data.furnitures[i]);
  }
  for (let i = 0; i < data.floors.length; i++) {
    firestore.putFloor(project_id, data.floors[i]);
  }
  for (let i = 0; i < data.cameras.length; i++) {
    firestore.putCamera(project_id, data.cameras[i]);
  }
};

export const updateProjectName =
  (name, user_id, project_id) => async (dispatch) => {
    await firestore.putProjectName(project_id, {name: name});
    const projects = await firestore.getProjects(user_id);
    dispatch(setProjects(projects));
  };

export const deleteProject = (user_id, project_id) => async (dispatch) => {
  await firestore.deleteProject(project_id);
  const [walls, furnitures, floors, cameras] = await Promise.all([
    firestore.getWalls(project_id),
    firestore.getFurnitures(project_id),
    firestore.getFloors(project_id),
    firestore.getCameras(project_id),
  ]);
  for (let i = 0; i < walls.length; i++) {
    firestore.deleteWall(project_id, walls[i].id);
  }
  for (let i = 0; i < furnitures.length; i++) {
    firestore.deleteFurniture(project_id, furnitures[i].id);
  }
  for (let i = 0; i < floors.length; i++) {
    firestore.deleteFloor(project_id, floors[i].id);
  }
  for (let i = 0; i < cameras.length; i++) {
    firestore.deleteCamera(project_id, cameras[i].id);
  }
  const projects = await firestore.getProjects(user_id);
  dispatch(setProjects(projects));
  dispatch(selectProject(''));
};

export const createFurniture = (project_id, data) => async (dispatch) => {
  const furniture_id = await firestore.postFurniture(project_id, data);
  const furniture = {...data, id: furniture_id};
  dispatch(addFurniture(furniture, {type: 'add', furniture}));
};

export const deleteFurniture = (project_id, furniture) => async (dispatch) => {
  await firestore.deleteFurniture(project_id, furniture.id);
  dispatch(removeFurniture(furniture, {type: 'remove', furniture}));
};

// user
export const setUser = (user) => ({
  type: actionTypes.SET_USER,
  payload: {user},
});

export const setSearchTarget = (target) => ({
  type: actionTypes.SET_SEARCH_TARGET,
  payload: {target},
});

export const selectSearchTarget = (target) => ({
  type: actionTypes.SELECT_SEARCH_TARGET,
  payload: {target},
});

// projects
export const setProjects = (projects) => ({
  type: actionTypes.SET_PROJECTS,
  payload: {projects},
});

export const setSharedProjects = (sharedProjects) => ({
  type: actionTypes.SET_SHARED_PROJECTS,
  payload: {sharedProjects},
});

export const filterProjects = (filter) => ({
  type: actionTypes.FILTER_PROJECTS,
  payload: {filter},
});

// project
export const setProject = (project) => ({
  type: actionTypes.SET_PROJECT,
  payload: {project},
});

export const selectProject = (project) => ({
  type: actionTypes.SELECT_PROJECT,
  payload: {project},
});

export const resetProjectStatus = () => ({
  type: actionTypes.RESET_PROJECT_STATUS,
});

export const setProjectName = (name) => ({
  type: actionTypes.SET_PROJECT_NAME,
  payload: {name},
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
export const setSetting = (setting) => ({
  type: actionTypes.SET_SETTING,
  payload: {setting},
});

// info
export const setInfo = (info) => ({
  type: actionTypes.SET_INFO,
  payload: {info},
});

// walls
export const setWallColor = (color) => ({
  type: actionTypes.SET_WALL_COLOR,
  payload: {color},
});

// furnitures
export const addFurniture = (furniture, instruction) => ({
  type: actionTypes.ADD_FURNITURE,
  payload: {furniture, instruction},
});

export const removeFurniture = (furniture, instruction) => ({
  type: actionTypes.REMOVE_FURNITURE,
  payload: {furniture, instruction},
});

export const selectFurniture = (furniture) => ({
  type: actionTypes.SELECT_FURNITURE,
  payload: {furniture},
});

export const setFurniturePosition = (furniture) => ({
  type: actionTypes.SET_FURNITURE_POSITION,
  payload: {furniture},
});

export const setFurnitureRotation = (furniture, instruction) => ({
  type: actionTypes.SET_FURNITURE_ROTATION,
  payload: {furniture, instruction},
});

// floors
export const setFloorTexture = (path) => ({
  type: actionTypes.SET_FLOOR_TEXTURE,
  payload: {path},
});

// cameras
export const setCameraPosition = (position) => ({
  type: actionTypes.SET_CAMERA_POSITION,
  payload: {position},
});

// instruction
export const setInstruction = (instruction) => ({
  type: actionTypes.SET_INSTRUCTION,
  payload: {instruction},
});

// canvas
export const addCanvasElement = (type, dots) => ({
  type: actionTypes.ADD_CANVAS_ELEMENT,
  payload: {type, dots},
});

export const setCanvasTool = (type) => ({
  type: actionTypes.SET_CANVAS_TOOL,
  payload: {type},
});

export const setCanvasScale = (scale) => ({
  type: actionTypes.SET_CANVAS_SCALE,
  payload: {scale},
});
