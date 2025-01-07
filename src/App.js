import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import Home from "./Home";
import VideosInHome from "../src/Home/Sidebar/sidebarSideContent";
import VideoPlayer from "./videoplayer";
import Trending from "./Trending";
import Gaming from "./Gaming";
import { useEffect } from "react";
import Saved from "./saved";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
// import { setMode, setPage, setSavedlist } from "../src/appReducer";

export default function App() {
  const navigate = useNavigate();
  // const [savedList, setSavedList] = useState(() => {
  //   const savedItems = localStorage.getItem("savedList");
  //   try {
  //     return savedItems ? JSON.parse(savedItems) : [];
  //   } catch (e) {
  //     console.error("Error parsing savedList:", e);
  //     return [];
  //   }
  // });
  // const [mode, SetMode] = useState(false);

  // const [pagein, setPage] = useState("Home");
  // const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.modePageinSavedVid);

  useEffect(() => {
    const cookieToken = Cookies.get("jwt_token");
    console.log();
    if (!cookieToken) {
      navigate("/");
    }
  }, [navigate]);

  // const handleSavedList = (newItem) => {
  //   console.log(savedList);
  //   const isAlreadySaved = savedList.some((item) => item.id === newItem.id);

  //   if (!isAlreadySaved) {
  //     const updatedList = [...savedList, newItem];
  //     dispatch(setSavedlist(updatedList));
  //     localStorage.setItem("savedList", JSON.stringify(updatedList));
  //   } else {
  //     const updatedList = savedList.filter((item) => item.id !== newItem.id);
  //     dispatch(setSavedlist(updatedList));
  //     localStorage.setItem("savedList", JSON.stringify(updatedList));
  //     console.log("Item removed from the saved list.");
  //   }
  // };

  // const handleMode = () => {
  //   dispatch(setMode(!mode));
  //   // SetMode((prevMode) => {
  //   //   return !prevMode;
  //   // });
  // };
  // const handlePage = (newItem) => {
  //   localStorage.setItem("pagein", newItem);
  //   dispatch(setPage(newItem));
  // };

  return (
    <div className={`App ${mode ? "dark-mode" : "light-mode"}`}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/NxtWatch/Home"
          element={<Home Num={<VideosInHome />} />}
        />
        <Route path="/video/:id" element={<Home Num={<VideoPlayer />} />} />
        <Route
          path="/NxtWatch/Trending"
          element={<Home Num={<Trending />} />}
        />
        <Route path="/NxtWatch/Gaming" element={<Home Num={<Gaming />} />} />
        <Route path="/NxtWatch/Saved" element={<Home Num={<Saved />} />} />
      </Routes>
    </div>
  );
}
