const initialState = {
  name: 'User',
  email: 'user@gmail.com',
  projects: [],
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {...state, name: action.user.name, email: action.user.email};

    case 'SET_PROJECTS':
      return {...state, projects: action.projects};

    default:
      return state;
  }
};

export default profileReducer;
