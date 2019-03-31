import { createReducer } from "redux-starter-kit";
import { ofType } from "redux-observable";
import { map, mergeMap } from "rxjs/operators";

// acctions
const withPrefix = action => `HELLO_WORLD/${action}`;
const SAY_HELLO = withPrefix("SAY_HELLO");
const RECEIVE_CONTENT = withPrefix("RECEIVE_CONTENT");

const initState = {
  user: "",
  content: ""
};

// reducers
export default createReducer(initState, {
  [SAY_HELLO]: (state, action) => {
      console.log('called reducer')
    state.user = action.payload;
  },
  [RECEIVE_CONTENT]: (state, action) => {
    state.content = action.payload;
  }
});

// action creators
export const sayHello = user => ({
  type: SAY_HELLO,
  payload: user
});

// epics
export const sayHelloEpic = (action$, state$, { makeRequest }) =>
  action$.pipe(
    ofType(SAY_HELLO),
    mergeMap(action =>
      makeRequest(`/v1/buses/njt/158`, "GET").pipe(
        map(response => ({
          type: RECEIVE_CONTENT,
          payload: response.response
        }))
      )
    )
  );
