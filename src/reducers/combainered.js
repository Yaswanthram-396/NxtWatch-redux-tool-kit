import { combineReducers } from "redux";
import loginReducer from "../reducers/index";
import modePageinSavedVidReducer from "../appReducer";

const rootReducer = combineReducers({
  login: loginReducer,
  modePageinSavedVid: modePageinSavedVidReducer,
});

export default rootReducer;
