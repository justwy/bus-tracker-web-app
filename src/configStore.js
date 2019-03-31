import { configureStore, getDefaultMiddleware } from "redux-starter-kit";
import { createEpicMiddleware } from "redux-observable";
import logger from 'redux-logger'
import {makeRequest} from './utils'

import rootReducer from "./modules/reducers";
import rootEpic from "./modules/epics";

const epicMiddleware = createEpicMiddleware({
  dependencies: { makeRequest, }
});

export default function configureAppStore(preloadedState) {
  const store = configureStore({
    reducer: rootReducer,
    middleware: [epicMiddleware, logger, ...getDefaultMiddleware()],
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
