const initialState = {
  name: '',
  groups: [],
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PROJECT':
      return {
        ...state,
        name: action.project.name,
        groups: action.project.groups,
      };

    default:
      return state;
  }
};

export default projectReducer;
