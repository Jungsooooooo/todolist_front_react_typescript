import callTableReducer from "./tableAction_reducer";
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    callTableReducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;