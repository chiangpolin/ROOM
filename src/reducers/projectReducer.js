const initialState = {
  name: '',
  author_id: '',
  share_id: [],
  groups: [],
  isFetched: false,
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PROJECT':
      return {
        ...state,
        name: action.project.name,
        author_id: action.project.author_id,
        share_id: action.project.share_id,
        groups: action.project.groups,
        isFetched: true,
      };

    case 'UPDATE_GROUPS':
      return {
        ...state,
        groups: state.groups.map((group) => {
          if (group.id === action.group.id) {
            return {
              ...group,
              position: {
                x: action.group.position.x,
                y: action.group.position.y,
              },
            };
          }
          return group;
        }),
      };

    default:
      return state;
  }
};

export default projectReducer;
