// import { configureStore } from "@reduxjs/toolkit";
// import modePageinSavedVidReducer from "../appReducer";

// const store = configureStore({
//   reducer: {
//     modePageinSavedVid: modePageinSavedVidReducer,
//   },
// });

// export default store;
// import { createStore, applyMiddleware } from "redux";
// import { thunk } from "redux-thunk";
// const store = createStore(rootReducer, applyMiddleware(thunk));

// export default store;
import rootReducer from "../reducers/combainered"; // Make sure the path is correct
import { configureStore } from "@reduxjs/toolkit";
import { api } from "../actions/videosInHomeAc"; // import the api created below
import loginReducer from "../reducers/index";
import modePageinSavedVidReducer from "../appReducer";
const store = configureStore({
  reducer: {
    login: loginReducer,
    modePageinSavedVid: modePageinSavedVidReducer, // Spread your existing rootReducer
    [api.reducerPath]: api.reducer, // Add the api reducer to the rootReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware), // Add api middleware
});

export default store;
