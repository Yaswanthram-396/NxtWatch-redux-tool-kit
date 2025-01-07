// import { createSlice } from '@reduxjs/toolkit';
// //   const [savedList, setSavedList] = useState(() => {
// //     const savedItems = localStorage.getItem("savedList");
// //     try {
// //       return savedItems ? JSON.parse(savedItems) : [];
// //     } catch (e) {
// //       console.error("Error parsing savedList:", e);
// //       return [];
// //     }
// //   });
// //   const [mode, SetMode] = useState(false);

// //   const [pagein, setPage] = useState("Home");
// const modePageinSavedVid = createSlice({
//   name: 'modePageinSavedVid',
//   initialState: {mode:false,pagein:"Home",savedList:[]  },
//   reducers: {
//     setMode: (state) => {
//       state.value += 1;
//     },
//     setPage: (state) => {
//       state.value -= 1;
//     },
//     setSavedlist: (state) => {
//       state.value = 0;
//     },
//   },
// });

// export const { increment, decrement, reset } = modePageinSavedVid.actions;

// export default modePageinSavedVid.reducer;

import { createSlice } from "@reduxjs/toolkit";

const modePageinSavedVid = createSlice({
  name: "modePageinSavedVid",
  initialState: {
    mode: false,
    pagein: "Home",
    savedList: (() => {
      const savedItems = localStorage.getItem("savedList");
      try {
        return savedItems ? JSON.parse(savedItems) : [];
      } catch (e) {
        console.error("Error parsing savedList:", e);
        return [];
      }
    })(),
  },
  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    setPage: (state, action) => {
      state.pagein = action.payload;
    },
    setSavedlist: (state, action) => {
      const newList = action.payload;
      state.savedList = newList;

      try {
        localStorage.setItem("savedList", JSON.stringify(newList));
      } catch (e) {
        console.error("Error saving to local storage:", e);
      }
    },
  },
});

export const { setMode, setPage, setSavedlist } = modePageinSavedVid.actions;

export default modePageinSavedVid.reducer;
