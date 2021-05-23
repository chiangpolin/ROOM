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
  shareIsToggled: false,
  searchTarget: {id: '', name: '', photo: ''},
  selectedTarget: {id: '', name: '', photo: ''},
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {...state, name: action.user.name, email: action.user.email};

    case 'SET_SEARCH_TARGET':
      return {
        ...state,
        searchTarget: action.target,
      };

    case 'SELECT_SEARCH_TARGET':
      return {
        ...state,
        selectedTarget: action.target,
      };

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

    case 'SET_PROJECT_NAME':
      return {
        ...state,
        selectedProject: {
          ...state.selectedProject,
          name: action.name,
          isEditing: false,
        },
      };

    case 'TOGGLE_PROJECT_NAME':
      return {
        ...state,
        selectedProject: {
          ...state.selectedProject,
          isEditing: true,
        },
      };

    case 'TOGGLE_SHARE':
      return {
        ...state,
        shareIsToggled: true,
      };

    case 'CLOSE_SHARE':
      return {
        ...state,
        searchTarget: {id: '', name: '', photo: ''},
        selectedTarget: {id: '', name: '', photo: ''},
        shareIsToggled: false,
      };

    default:
      return state;
  }
};

export default profileReducer;
