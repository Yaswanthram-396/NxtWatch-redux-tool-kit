// import { configureStore } from "@reduxjs/toolkit";
// import modePageinSavedVidReducer from "../appReducer";

// const store = configureStore({
//   reducer: {
//     modePageinSavedVid: modePageinSavedVidReducer,
//   },
// });

// export default store;
import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "../reducers/combainered";

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
