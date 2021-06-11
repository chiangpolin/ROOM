const initialState = {
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
  shareIsToggled: false,
  searchTargets: [],
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        id: action.payload.user.id,
        name: action.payload.user.name,
        email: action.payload.user.email,
      };

    case 'SET_USER_NAME':
      return {
        ...state,
        name: action.payload.name,
      };

    case 'ADD_SEARCH_TARGET':
      return {
        ...state,
        searchTargets: [action.payload.target, ...state.searchTargets],
      };

    case 'RESET_SEARCH_TARGETS':
      return {
        ...state,
        searchTargets: [],
      };

    case 'SET_PROJECTS':
      return {...state, projects: action.payload.projects};

    case 'SET_SHARED_PROJECTS':
      return {...state, sharedProjects: action.payload.sharedProjects};

    case 'SET_SEARCHED_PROJECTS':
      return {...state, searchedProjects: action.payload.searchedProjects};

    case 'FILTER_PROJECTS':
      return {
        ...state,
        filter: {
          author: action.payload.filter.author,
          shared: action.payload.filter.shared,
          searched: action.payload.filter.searched,
        },
        selectedProject: {
          id: '',
          name: '',
          author_id: '',
          isEditing: false,
        },
      };

    case 'SELECT_PROJECT':
      return {
        ...state,
        selectedProject: {
          id: action.payload.project.id,
          name: action.payload.project.name,
          author_id: action.payload.project.author_id,
          share_id: action.payload.project.share_id
            ? action.payload.project.share_id
            : [],
          isEditing: false,
        },
      };

    case 'SET_PROJECT_NAME':
      return {
        ...state,
        selectedProject: {
          ...state.selectedProject,
          name: action.payload.name,
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

    default:
      return state;
  }
};

export default profileReducer;
