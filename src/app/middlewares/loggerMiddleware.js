const loggerMiddleware = (store) => (next) => (action) => {
  console.log(action.type, store.getState());
  return next(action);
};

export default loggerMiddleware;
