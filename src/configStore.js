import { configureStore, getDefaultMiddleware } from "redux-starter-kit";
import { createEpicMiddleware } from "redux-observable";
import logger from 'redux-logger'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'


import {makeRequest} from './utils'

import rootReducer from "./modules/reducers";
import rootEpic from "./modules/epics";

export const history = createBrowserHistory()

const epicMiddleware = createEpicMiddleware({
  dependencies: { makeRequest, }
});

export default function configureAppStore(preloadedState) {
  const store = configureStore({
    reducer: rootReducer(history),
    middleware: [epicMiddleware, logger, routerMiddleware(history), ...getDefaultMiddleware()],
    preloadedState,
    enhancers: []
  });

  epicMiddleware.run(rootEpic);

  if (process.env.NODE_ENV !== "production" && module.hot) {
    module.hot.accept("./modules/reducers", () =>
      store.replaceReducer(rootReducer)
    );
  }

  return store;
}
