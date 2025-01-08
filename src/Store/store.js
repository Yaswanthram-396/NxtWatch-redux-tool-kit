import { configureStore } from "@reduxjs/toolkit";
import { api } from "../actions/videosInHomeAc";
import loginReducer from "../reducers/index";
import modePageinSavedVidReducer from "../appReducer";
const store = configureStore({
  reducer: {
    // login: loginReducer,
    modePageinSavedVid: modePageinSavedVidReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
