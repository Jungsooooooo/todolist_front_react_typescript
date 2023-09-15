import callTableReducer from "./tableAction_reducer";
import loginSet from "./loginAction_reducer";
import { combineReducers } from "redux";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  callTableReducer,
  loginSet,
});

const persisConfig = {
  key: "todo",
  storage,
};

export default persistReducer(persisConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
