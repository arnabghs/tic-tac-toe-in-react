import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index";
import { usedCellMiddleware } from "../middleware/index.js";

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  storeEnhancers(applyMiddleware(usedCellMiddleware))
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
