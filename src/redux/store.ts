import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import markersReducer from "redux/reducers/markersReducers";

const rootReducer = combineReducers({
    markers: markersReducer,
})

export type RootState = ReturnType<typeof rootReducer>;

export default createStore(rootReducer, composeWithDevTools());