const initialState = {
  name: '',
  email: '',
  projects: [],
  selectedProject: {id: '', name: '', author_id: '', isEditing: false},
  sharedProjects: [],
  filter: {shared: true, author: true},
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

    default:
      return state;
  }
};

export default profileReducer;
