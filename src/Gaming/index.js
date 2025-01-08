import { FaGamepad } from "react-icons/fa";
import { useEffect, useState } from "react";
import "./index.css";
import { ThreeDots } from "react-loader-spinner";
import Cookies from "js-cookie";
import React from "react";
// import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useVideosInGamingQuery } from "../actions/videosInHomeAc";

import { useSelector } from "react-redux";

export default function Gaming() {
  const [allData, setData] = useState([]);
  const [loading, setloading] = useState(true);

  const { data, error } = useVideosInGamingQuery(Cookies.get("jwt_token"));
  const { mode } = useSelector((state) => state.modePageinSavedVid);
  const dark = {
    backgroundColor: "rgb(24,24,24)",
  };
  const light = {
    backgroundColor: "rgb(241,241,241)",
  };

  useEffect(() => {
    if (data) {
      setData(data.data.videos);
      setloading(false);
    }
  }, [data]);
  return (
    <>
      <div className="trendingVIdeos">
        <div className="tendingIcon" style={mode ? dark : light}>
          <div
            className="iconback"
            style={
              mode
                ? { backgroundColor: "rgb(15,15,15)" }
                : { backgroundColor: "rgb(224, 233, 240)" }
            }
          >
            <FaGamepad title="Trending Icon" className="trendingImg" />
          </div>
          <h1 className="text-trend">Gaming</h1>
        </div>
        {!loading ? (
          allData.length > 0 && (
            <div
              className="gaming-video"
              style={mode ? { backgroundColor: "rgb(0,0,0)" } : null}
            >
              {console.log(mode)}
              {allData.map((item) => (
                <Link to={`/video/${item.id}`}>
                  <div className="BG-container-gaming">
                    <img
                      src={item.thumbnail_url}
                      alt="thumbnail_url"
                      className="game-Video_photo"
                    />
                    <div className="outer">
                      <div className="inner">
                        <h1 className="heading changeHead">{item.title}</h1>
                        <div className="count paragraphInThumb">
                          <p>{`${item.view_count} Watching Worldwide`}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )
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
      </div>
    </>
  );
}
