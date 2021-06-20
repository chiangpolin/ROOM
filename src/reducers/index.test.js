import reducer from './index.js';
import * as types from '../constants/actionTypes.js';

const initialState = {
  authReducer: {
    messages: [],
  },
  profileReducer: {
    id: '',
    name: '',
    email: '',
    projects: [],
    sharedProjects: [],
    searchedProjects: [],
    selectedProject: {
      id: '',
      name: '',
      author_id: '',
      share_id: [],
      isEditing: false,
      type: '',
    },
    filter: {shared: true, author: true, searched: true},
    searchTargets: [],
  },
  projectReducer: {
    name: '',
    author_id: '',
    share_id: [],
    dataIsFetched: false,
    setting: {},
    information: {},
    selectedGroup: {},
    tool: '',
    ortho: false,
    instruction: {},
    dots: [],
    scale: 1,
    d_cameras: [],
    d_furnitures: [],
    d_walls: [],
    d_openings: [],
    d_coverings: [],
    d_floors: [],
    dataURL: '',
    sceneBackgroundColor: '#81c7d4',
    sceneDirectionalLight: 0.2,
    sceneHemisphereLight: 1,
  },
};

describe('reducers', () => {
  test('It should return the initial state', () => {
    const expected = initialState;
    const data = reducer(undefined, {});
    expect(data).toEqual(expected);
  });

  test('It should handle ADD_MESSAGE', () => {
    const expected = {
      ...initialState,
      authReducer: {
        messages: [{id: 'test123', text: 'hello world'}],
      },
    };
    const data = reducer(initialState, {
      type: types.ADD_MESSAGE,
      payload: {message: {id: 'test123', text: 'hello world'}},
    });
    expect(data).toEqual(expected);
  });

  test('It should handle REMOVE_MESSAGE', () => {
    const newState = {
      ...initialState,
      authReducer: {
        messages: [{id: 'test456', text: 'good morning'}],
      },
    };
    const expected = initialState;
    const data = reducer(newState, {
      type: types.REMOVE_MESSAGE,
      payload: {message: {id: 'test456', text: 'good morning'}},
    });
    expect(data).toEqual(expected);
  });

  test('It should fail to remove message when id is not matched', () => {
    const newState = {
      ...initialState,
      authReducer: {
        messages: [{id: 'test45', text: 'good morning'}],
      },
    };
    const expected = newState;
    const data = reducer(newState, {
      type: types.REMOVE_MESSAGE,
      payload: {message: {id: 'test456', text: 'good morning'}},
    });
    expect(data).toEqual(expected);
  });
});
