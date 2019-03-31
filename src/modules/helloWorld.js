import { ofType } from "redux-observable";
import { map, switchMap, mergeMap } from "rxjs/operators";

// acctions
const withPrefix = action => `HELLO_WORLD/${action}`;
const SAY_HELLO = withPrefix("SAY_HELLO");
const RECEIVE_CONTENT = withPrefix("RECEIVE_CONTENT");

const initState = {
  user: "",
  content: ""
};

// reducers
export default function(state = initState, action) {
  const { type, payload } = action;

  switch (type) {
    case SAY_HELLO:
      return Object.assign({}, state, {
        user: payload
      });
    case RECEIVE_CONTENT:
      return Object.assign({}, state, {
        content: payload
      });
    default:
      return state;
  }
}

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
