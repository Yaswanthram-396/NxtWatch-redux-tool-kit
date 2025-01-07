import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./index.css";
import Cookies from "js-cookie";
import { FaThumbsUp, FaThumbsDown, FaBookmark } from "react-icons/fa";

import { ThreeDots } from "react-loader-spinner";
import { setSavedlist } from "../../src/appReducer";
import { useDispatch, useSelector } from "react-redux";
export default function VideoPlayer() {
  const dispatch = useDispatch();
  const { mode, savedList } = useSelector((state) => state.modePageinSavedVid);

  const [isSaved, setIsSaved] = useState(false);
  const [disliked, setDislike] = useState(false);
  const [disLikeList, setDisLikeList] = useState(() => {
    const savedItems = localStorage.getItem("dislikeList");
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [allData, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeList, setLikeList] = useState(() => {
    const savedItems = localStorage.getItem("likeList");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  const { id } = useParams();
  const location = useLocation();

  const handleSavedList = (newItem) => {
    console.log(savedList);
    const isAlreadySaved = savedList.some((item) => item.id === newItem.id);

    if (!isAlreadySaved) {
      const updatedList = [...savedList, newItem];
      dispatch(setSavedlist(updatedList));
      localStorage.setItem("savedList", JSON.stringify(updatedList));
    } else {
      const updatedList = savedList.filter((item) => item.id !== newItem.id);
      dispatch(setSavedlist(updatedList));
      localStorage.setItem("savedList", JSON.stringify(updatedList));
      console.log("Item removed from the saved list.");
    }
  };

  const onClickHandleSavedList = () => {
    handleSavedList(allData);
    const savedList = JSON.parse(localStorage.getItem("savedList")) || [];
    const num = location.pathname.split("/").pop();
    const isAlreadySaved = savedList.some((item) => item.id === num);
    setIsSaved(isAlreadySaved);
  };

  const onClickHandleDislikeList = () => {
    const num = location.pathname.split("/").pop();
    const isAlreadyDisliked = disLikeList.some((item) => item.id === num);

    if (isAlreadyDisliked) {
      const updatedDislikeList = disLikeList.filter((item) => item.id !== num);
      setDisLikeList(updatedDislikeList);
      localStorage.setItem("dislikeList", JSON.stringify(updatedDislikeList));
      setDislike(false);
    } else {
      const updatedDislikeList = [...disLikeList, allData];
      setDisLikeList(updatedDislikeList);
      localStorage.setItem("dislikeList", JSON.stringify(updatedDislikeList));
      setDislike(true);

      const updatedLikeList = likeList.filter((item) => item.id !== num);
      setLikeList(updatedLikeList);
      localStorage.setItem("likeList", JSON.stringify(updatedLikeList));
      setLiked(false);
    }
  };

  const onClickHandleLikeList = () => {
    const num = location.pathname.split("/").pop();
    const isAlreadyLiked = likeList.some((item) => item.id === num);

    if (isAlreadyLiked) {
      const updatedLikeList = likeList.filter((item) => item.id !== num);
      setLikeList(updatedLikeList);
      localStorage.setItem("likeList", JSON.stringify(updatedLikeList));
      setLiked(false);
    } else {
      const updatedLikeList = [...likeList, allData];
      setLikeList(updatedLikeList);
      localStorage.setItem("likeList", JSON.stringify(updatedLikeList));
      setLiked(true);

      const updatedDislikeList = disLikeList.filter((item) => item.id !== num);
      setDisLikeList(updatedDislikeList);
      localStorage.setItem("dislikeList", JSON.stringify(updatedDislikeList));
      setDislike(false);
    }
  };

  const fetchData = async () => {
    const cookieToken = Cookies.get("jwt_token");
    setLoading(true);

    try {
      const response = await fetch(`https://apis.ccbp.in/videos/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${cookieToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setData(data.video_details);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem("savedList")) || [];
    const disList = JSON.parse(localStorage.getItem("dislikeList")) || [];
    const likeList = JSON.parse(localStorage.getItem("likeList")) || [];

    const num = location.pathname.split("/").pop();
    setIsSaved(savedList.some((item) => item.id === num));
    setDislike(disList.some((item) => item.id === num));
    setLiked(likeList.some((item) => item.id === num));
  }, [location]);

  const videoUrl = allData.video_url;
  const videoId = videoUrl ? videoUrl.split("=")[1] : null;

  return (
    <>
      {!loading ? (
        <div
          className="totalVideo"
          style={
            mode ? { backgroundColor: "#000" } : { backgroundColor: "#fff" }
          }
        >
          <div className="video-player">
            <iframe
              width="600"
              height="400"
              src={videoId ? `https://www.youtube.com/embed/${videoId}` : ""}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div>
              <h2>{allData.title}</h2>
              <div className="media">
                <div className="ViewCount para">
                  <p>{`${allData.view_count} views`}</p>
                  <p>{allData.published_at}</p>
                </div>
                <div className="Liked para">
                  <div
                    className="intenction"
                    onClick={onClickHandleLikeList}
                    style={{ color: liked ? "blue" : "gray" }}
                  >
                    <FaThumbsUp /> Like
                  </div>
                  <div
                    className="intenction"
                    onClick={onClickHandleDislikeList}
                    style={{ color: disliked ? "blue" : "gray" }}
                  >
                    <FaThumbsDown /> Dislike
                  </div>
                  <div
                    className="intenction"
                    onClick={onClickHandleSavedList}
                    style={{ color: isSaved ? "blue" : "gray" }}
                  >
                    <FaBookmark /> {isSaved ? "Saved" : "Save"}
                  </div>
                </div>
              </div>

              {allData.channel && (
                <div className="outer OuterIm">
                  <div className="image">
                    <img
                      src={allData.channel.profile_image_url}
                      className="profileInVideo"
                      alt="profile_image_url"
                    />
                  </div>
                  <div className="inner">
                    <h3>{allData.channel.name}</h3>
                    <p className="paragraphInThumb darkPara">
                      {allData.description}
                    </p>
                    <div className="count paragraphInThumb">
                      <p className="paragraphInThumb ">{`${allData.channel.subscriber_count} Subscribers`}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="loader-container" data-testid="loader">
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="blue"
            ariaLabel="three-dots-loading"
            visible={true}
          />
        </div>
      )}
    </>
  );
}
