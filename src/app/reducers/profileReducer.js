const initialState = {
  name: '',
  email: '',
  projects: [],
  sharedProjects: [],
  selectedProject: {
    id: '',
    name: '',
    author_id: '',
    isEditing: false,
  },
  filter: {shared: true, author: true},
  toggleShareProject: false,
  searchTarget: {id: '', name: '', photo: ''},
  selectedTarget: {id: '', name: '', photo: ''},
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {...state, name: action.user.name, email: action.user.email};

    case 'SET_PROJECTS':
      return {...state, projects: action.projects};

    case 'SET_SHARED_PROJECTS':
      return {...state, sharedProjects: action.sharedProjects};

    case 'FILTER_PROJECTS':
      return {
        ...state,
        filter: {
          shared: action.filter.shared,
          author: action.filter.author,
        },
      };

    case 'SELECT_PROJECT':
      return {
        ...state,
        selectedProject: {
          id: action.project.id,
          name: action.project.name,
          author_id: action.project.author_id,
          isEditing: false,
        },
      };

    case 'TOGGLE_EDIT_NAME':
      return {
        ...state,
        selectedProject: {
          ...state.selectedProject,
          isEditing: !state.selectedProject.isEditing,
        },
      };

    case 'UPDATE_EDIT_NAME':
      return {
        ...state,
        selectedProject: {
          ...state.selectedProject,
          name: action.name,
        },
      };

    case 'TOGGLE_SHARE_PROJECT':
      return {
        ...state,
        toggleShareProject: true,
      };

    case 'CLOSE_SHARE_PROJECT':
      return {
        ...state,
        searchTarget: {id: '', name: '', photo: ''},
        selectedTarget: {id: '', name: '', photo: ''},
        toggleShareProject: false,
      };

    case 'SET_SEARCH_TARGET':
      return {
        ...state,
        searchTarget: action.target,
      };

    case 'SELECT_TARGET':
      return {
        ...state,
        selectedTarget: action.target,
      };

    default:
      return state;
  }
};

export default profileReducer;
