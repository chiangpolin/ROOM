const initialState = {
  messages: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload.message],
      };

    case 'REMOVE_MESSAGE':
      return {
        ...state,
        messages: state.messages.filter(
          (message) => message.id !== action.payload.message.id
        ),
      };

    default:
      return state;
  }
};

export default authReducer;
