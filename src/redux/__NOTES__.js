// https://stackoverflow.com/questions/49104247/in-redux-where-does-the-state-actually-get-stored/49104335#49104335
// IMAGING THE STORE LOOKS LIKE THIS:

export function createStore(reducer, initialState) {
  let state = initialState; // <-- state is just stored in a variable that lives in memory

  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reducer(state, action); // <-- state gets updated using the returned value from the reducer

    return action;
  }

  return {
    getState,
    dispatch,
  };
}
