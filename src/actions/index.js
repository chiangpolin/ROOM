import * as actionTypes from '../constants/actionTypes';
import * as defaultSettings from '../constants/defaultSettings';
import * as firestore from '../utils/firestore.js';
import * as auth from '../utils/auth.js';
import * as storage from '../utils/storage.js';
import {_uuid} from '../utils/general.js';

// thunk
export const alertMessage = (text) => (dispatch) => {
  const id = _uuid();
  dispatch(addMessage({text: text, id: id}));
  setTimeout(function () {
    dispatch(removeMessage({text: text, id: id}));
  }, 5000);
};

export const signUp = (name, email, password) => async () => {
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

export const signIn = (email, password) => async () => {
  const credential = await auth.signIn(email, password);
  return credential;
};

export const googleSignIn = () => async () => {
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

export const facebookSignIn = () => async () => {
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
  dispatch(setUser({id: '', name: '', email: '', photoURL: ''}));
  auth.signOut();
};

export const forgetPassword = (email) => async () => {
  auth.sendPasswordResetEmail(email);
};

export const updateUserName = (user_id, name) => async () => {
  await firestore.putUserName(user_id, name);
};

export const uploadRenderingImage = (project_id, url) => async () => {
  const downloadURL = await storage.putFile(project_id, url);
  firestore.putProjectImageURL(project_id, {imageURL: downloadURL});
};

export const fetchAuthState = (history) => async () => {
  const credentialUser = await auth.getAuthState();
  if (credentialUser.uid) {
    history.push('/profile');
  }
};

export const fetchProfileData = (history) => async (dispatch) => {
  let user;
  const credentialUser = await auth.getAuthState();
  if (credentialUser.uid) {
    user = await firestore.getUserByEmail(credentialUser.email);
    dispatch(
      setUser({
        id: user.id,
        name: user.name,
        email: user.email,
        photoURL: user.photoURL,
      })
    );
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

export const searchProjects = (name) => async (dispatch) => {
  const projects = await firestore.getSearchedProjects(name);
  dispatch(setSearchedProjects(projects));
};

export const fetchProjectData = (project_id) => async (dispatch) => {
  const [
    project,
    cameras,
    furnitures,
    walls,
    openings,
    coverings,
    floors,
    setting,
  ] = await Promise.all([
    firestore.getProject(project_id),
    firestore.getCameras(project_id),
    firestore.getFurnitures(project_id),
    firestore.getWalls(project_id),
    firestore.getOpenings(project_id),
    firestore.getCoverings(project_id),
    firestore.getFloors(project_id),
    firestore.getSettingByName('Default-Setting'),
  ]);

  const [settingPaints, settingFurnitures, settingTextures, settingOpenings] =
    await Promise.all([
      firestore.getSettingPaints(setting.id),
      firestore.getSettingFurnitures(setting.id),
      firestore.getSettingTextures(setting.id),
      firestore.getSettingOpenings(setting.id),
    ]);

  dispatch(
    setProject({
      ...project,
      cameras: cameras,
      furnitures: furnitures,
      walls: walls,
      openings: openings,
      coverings: coverings,
      floors: floors,
    })
  );
  dispatch(
    setSetting({
      ...setting.data,
      paints: settingPaints,
      furnitures: settingFurnitures,
      textures: settingTextures,
      openings: settingOpenings,
    })
  );
  dispatch(setInformation('canvas'));
};

export const fetchSearchTargets = (share_id) => async (dispatch) => {
  for (let i = 0; i < share_id.length; i++) {
    const user = await firestore.getUser(share_id[i]);
    dispatch(
      addSearchTarget({id: user.id, name: user.name, photoURL: user.photoURL})
    );
  }
};

export const fetchSearchTarget = (email) => async (dispatch) => {
  const user = await firestore.getUserByEmail(email);
  if (!user) {
    window.alert('user not exist');
    return;
  }
  dispatch(
    addSearchTarget({id: user.id, name: user.name, photoURL: user.photoURL})
  );
};

export const createProject = (history, user_id, title) => async (dispatch) => {
  dispatch(alertMessage('Loading'));
  let newSettings;
  switch (title) {
    case 'New Project':
      newSettings = defaultSettings.newProject;
      break;
    case 'Single Bedroom':
      newSettings = defaultSettings.classic;
      break;
    case 'Owners Suite':
      newSettings = defaultSettings.ownersSuite;
      break;
    case 'Jungle':
      newSettings = defaultSettings.jungle;
      break;
    case 'Living Room':
      newSettings = defaultSettings.livingRoom;
      break;
    default:
      newSettings = defaultSettings.newProject;
  }

  const id = await firestore.postProject({
    name: title,
    id: user_id,
  });

  const promises = [];

  for (let i = 0; i < newSettings.cameras.length; i++) {
    promises.push(firestore.postCamera(id, newSettings.cameras[i]));
  }

  for (let i = 0; i < newSettings.furnitures.length; i++) {
    promises.push(firestore.postFurniture(id, newSettings.furnitures[i]));
  }

  for (let i = 0; i < newSettings.walls.length; i++) {
    promises.push(firestore.postWall(id, newSettings.walls[i]));
  }

  for (let i = 0; i < newSettings.openings.length; i++) {
    promises.push(firestore.postOpening(id, newSettings.openings[i]));
  }

  for (let i = 0; i < newSettings.coverings.length; i++) {
    promises.push(firestore.postCovering(id, newSettings.coverings[i]));
  }

  for (let i = 0; i < newSettings.floors.length; i++) {
    promises.push(firestore.postFloor(id, newSettings.floors[i]));
  }

  await Promise.all(promises);
  history.push(`/project/${id}`);

  // const projects = await firestore.getProjects(user_id);
  // dispatch(setProjects(projects));
};

export const cloneProject = (user_id, project_id) => async (dispatch) => {
  const [project, cameras, furnitures, walls, openings, coverings, floors] =
    await Promise.all([
      firestore.getProject(project_id),
      firestore.getCameras(project_id),
      firestore.getFurnitures(project_id),
      firestore.getWalls(project_id),
      firestore.getOpenings(project_id),
      firestore.getCoverings(project_id),
      firestore.getFloors(project_id),
    ]);

  const id = await firestore.postProject({
    id: user_id,
    name: `${project.name}-clone`,
  });

  const promises = [];

  for (let i = 0; i < cameras.length; i++) {
    promises.push(firestore.postCamera(id, cameras[i]));
  }
  for (let i = 0; i < furnitures.length; i++) {
    promises.push(firestore.postFurniture(id, furnitures[i]));
  }
  for (let i = 0; i < walls.length; i++) {
    promises.push(firestore.postWall(id, walls[i]));
  }
  for (let i = 0; i < openings.length; i++) {
    promises.push(firestore.postOpening(id, openings[i]));
  }
  for (let i = 0; i < coverings.length; i++) {
    promises.push(firestore.postCovering(id, coverings[i]));
  }
  for (let i = 0; i < floors.length; i++) {
    promises.push(firestore.postFloor(id, floors[i]));
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
};

export const updateProject = (project_id, data) => async (dispatch) => {
  for (let i = 0; i < data.d_cameras.length; i++) {
    switch (data.d_cameras[i].method) {
      case 'post':
        firestore.postCamera(project_id, data.d_cameras[i]);
        break;
      case 'put':
        firestore.putCamera(project_id, data.d_cameras[i]);
        break;
      case 'delete':
        firestore.deleteCamera(project_id, data.d_cameras[i]);
        break;
      default:
    }
  }
  for (let i = 0; i < data.d_furnitures.length; i++) {
    switch (data.d_furnitures[i].method) {
      case 'post':
        firestore.postFurniture(project_id, data.d_furnitures[i]);
        break;
      case 'put':
        firestore.putFurniture(project_id, data.d_furnitures[i]);
        break;
      case 'delete':
        firestore.deleteFurniture(project_id, data.d_furnitures[i]);
        break;
      default:
    }
  }
  for (let i = 0; i < data.d_walls.length; i++) {
    switch (data.d_walls[i].method) {
      case 'post':
        firestore.postWall(project_id, data.d_walls[i]);
        break;
      case 'put':
        firestore.putWall(project_id, data.d_walls[i]);
        break;
      case 'delete':
        firestore.deleteWall(project_id, data.d_walls[i]);
        break;
      default:
    }
  }
  for (let i = 0; i < data.d_openings.length; i++) {
    switch (data.d_openings[i].method) {
      case 'post':
        firestore.postOpening(project_id, data.d_openings[i]);
        break;
      case 'put':
        firestore.putOpening(project_id, data.d_openings[i]);
        break;
      case 'delete':
        firestore.deleteOpening(project_id, data.d_openings[i]);
        break;
      default:
    }
  }
  for (let i = 0; i < data.d_coverings.length; i++) {
    switch (data.d_coverings[i].method) {
      case 'post':
        firestore.postCovering(project_id, data.d_coverings[i]);
        break;
      case 'put':
        firestore.putCovering(project_id, data.d_coverings[i]);
        break;
      case 'delete':
        firestore.deleteCovering(project_id, data.d_coverings[i]);
        break;
      default:
    }
  }
  for (let i = 0; i < data.d_floors.length; i++) {
    switch (data.d_floors[i].method) {
      case 'post':
        firestore.postFloor(project_id, data.d_floors[i]);
        break;
      case 'put':
        firestore.putFloor(project_id, data.d_floors[i]);
        break;
      case 'delete':
        firestore.deleteFloor(project_id, data.d_floors[i]);
        break;
      default:
    }
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
  const [furnitures, walls, openings, coverings, floors, cameras] =
    await Promise.all([
      firestore.getFurnitures(project_id),
      firestore.getWalls(project_id),
      firestore.getOpenings(project_id),
      firestore.getCoverings(project_id),
      firestore.getFloors(project_id),
      firestore.getCameras(project_id),
    ]);

  for (let i = 0; i < furnitures.length; i++) {
    firestore.deleteFurniture(project_id, furnitures[i]);
  }
  for (let i = 0; i < walls.length; i++) {
    firestore.deleteWall(project_id, walls[i]);
  }
  for (let i = 0; i < openings.length; i++) {
    firestore.deleteOpening(project_id, openings[i]);
  }
  for (let i = 0; i < coverings.length; i++) {
    firestore.deleteCovering(project_id, coverings[i]);
  }
  for (let i = 0; i < floors.length; i++) {
    firestore.deleteFloor(project_id, floors[i]);
  }
  for (let i = 0; i < cameras.length; i++) {
    firestore.deleteCamera(project_id, cameras[i]);
  }

  const projects = await firestore.getProjects(user_id);
  dispatch(setProjects(projects));
  dispatch(selectProject(''));
};

export const deselectCanvasElement = (selectedGroup) => async (dispatch) => {
  if (selectedGroup.type === 'window' || selectedGroup.type === 'door') {
    dispatch(
      setInstruction({
        tag: 'deselect',
        target: 'opening',
        group: selectedGroup,
      })
    );
  } else if (selectedGroup.type !== undefined) {
    dispatch(
      setInstruction({
        tag: 'deselect',
        target: selectedGroup.type,
        group: selectedGroup,
      })
    );
  }
};

// message
export const addMessage = (message) => ({
  type: actionTypes.ADD_MESSAGE,
  payload: {message},
});

export const removeMessage = (message) => ({
  type: actionTypes.REMOVE_MESSAGE,
  payload: {message},
});

// user
export const setUser = (user) => ({
  type: actionTypes.SET_USER,
  payload: {user},
});

export const setUserName = (name) => ({
  type: actionTypes.SET_USER_NAME,
  payload: {name},
});

export const addSearchTarget = (target) => ({
  type: actionTypes.ADD_SEARCH_TARGET,
  payload: {target},
});

export const resetSearchTargets = () => ({
  type: actionTypes.RESET_SEARCH_TARGETS,
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

export const setSearchedProjects = (searchedProjects) => ({
  type: actionTypes.SET_SEARCHED_PROJECTS,
  payload: {searchedProjects},
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

export const setProjectCollection = (key, data) => ({
  type: actionTypes.SET_PROJECT_COLLECTION,
  payload: {key, data},
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

// settings
export const setSetting = (setting) => ({
  type: actionTypes.SET_SETTING,
  payload: {setting},
});

// information
export const setInformation = (information) => ({
  type: actionTypes.SET_INFORMATION,
  payload: {information},
});

// pixi-instruction
export const setInstruction = (instruction) => ({
  type: actionTypes.SET_INSTRUCTION,
  payload: {instruction},
});

// pixi-canvas
export const addCanvasElement = (target, group) => ({
  type: actionTypes.ADD_CANVAS_ELEMENT,
  payload: {target, group, id: _uuid()},
});

export const removeCanvasElement = (target, uuid) => ({
  type: actionTypes.REMOVE_CANVAS_ELEMENT,
  payload: {target, uuid},
});

export const selectCanvasElement = (group) => ({
  type: actionTypes.SELECT_CANVAS_ELEMENT,
  payload: {group},
});

export const setCanvasTool = (type) => ({
  type: actionTypes.SET_CANVAS_TOOL,
  payload: {type},
});

export const setCanvasOrtho = () => ({
  type: actionTypes.SET_CANVAS_ORTHO,
});

export const setCanvasScale = (scale) => ({
  type: actionTypes.SET_CANVAS_SCALE,
  payload: {scale},
});

// cameras
export const setCameraPosition = (uuid, position) => ({
  type: actionTypes.SET_CAMERA_POSITION,
  payload: {uuid, position},
});

// furnitures
export const setFurniturePosition = (uuid, position) => ({
  type: actionTypes.SET_FURNITURE_POSITION,
  payload: {uuid, position},
});

export const setFurnitureRotation = (uuid, rotation) => ({
  type: actionTypes.SET_FURNITURE_ROTATION,
  payload: {uuid, rotation},
});

// walls
export const setWallColor = (uuid, color) => ({
  type: actionTypes.SET_WALL_COLOR,
  payload: {uuid, color},
});

// openings
export const setOpeningPosition = (uuid, position) => ({
  type: actionTypes.SET_OPENING_POSITION,
  payload: {uuid, position},
});
export const setOpeningRotation = (uuid, rotation) => ({
  type: actionTypes.SET_OPENING_ROTATION,
  payload: {uuid, rotation},
});

// floors
export const setCoveringTexture = (uuid, path) => ({
  type: actionTypes.SET_COVERING_TEXTURE,
  payload: {uuid, path},
});

// three-rendering
export const setRenderingDataURL = (url) => ({
  type: actionTypes.SET_RENDERING_DATAURL,
  payload: {url},
});

export const setDirectionalLight = (intensity) => ({
  type: actionTypes.SET_DIRECTIONAL_LIGHT,
  payload: {intensity},
});

export const setHemisphereLight = (intensity) => ({
  type: actionTypes.SET_HEMISPHERE_LIGHT,
  payload: {intensity},
});

export const setBackgroundColor = (color) => ({
  type: actionTypes.SET_BACKGROUND_COLOR,
  payload: {color},
});
