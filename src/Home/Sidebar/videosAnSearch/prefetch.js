import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { api } from "../../../actions/videosInHomeAc";

export const PrefetchVideos = ({ searchInput = "" }) => {
  console.log(searchInput);
  const dispatch = useDispatch();

  // Prefetch the data when the component mounts
  useEffect(() => {
    // Prefetching data before rendering (data will be cached in Redux)
    dispatch(api.util.prefetch("videosInHome", searchInput, { force: true }));
  }, [dispatch, searchInput]);

  return null; // The component does not render anything
};
