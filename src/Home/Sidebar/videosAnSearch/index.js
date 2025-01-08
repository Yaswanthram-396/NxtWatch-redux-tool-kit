// import "./index.css";
// import { ThreeDots } from "react-loader-spinner";
// import Cookies from "js-cookie";
// import React from "react";
// import { FaSearch } from "react-icons/fa";
// import { Link } from "react-router-dom";
// // import  from "../../../context";
// import { useVideosInHomeQuery } from "../../../actions/videosInHomeAc";

// class GetApiRes extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       searchInput: "",
//       DataApi: { videos: [] },
//       loading: true,
//     };
//   }

//   componentDidMount = async () => {
//     await this.fetchData();
//   };
//   darkMode = {
//     backgroundColor: "white",
//   };
//   light = {
//     backgroundColor: "black",
//   };

//   fetchData = async () => {
//     const cookieToken = Cookies.get("jwt_token");
//     const { searchInput } = this.state;

//     this.setState({ loading: true });

//     try {
//       const response = await fetch(
//         `https://apis.ccbp.in/videos/all?search=${searchInput}`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${cookieToken}`,
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to fetch data");
//       }

//       const data = await response.json();
//       this.setState({ DataApi: data, loading: false });
//     } catch (error) {
//       console.error("Error fetching data:", error.message);
//       this.setState({ loading: false });
//     }
//   };

//   handleSearchInput = (e) => {
//     this.setState({ searchInput: e.target.value });
//   };

//   handleSubmit = (e) => {
//     e.preventDefault();
//     this.fetchData();
//   };

//   render() {
//     const { searchInput, DataApi, loading } = this.state;
//     const videosArray = DataApi.videos;

//     return (
//       <>
//         <div className="entireVideos">
//           <form className="form" onSubmit={this.handleSubmit}>
//             <input
//               className="search"
//               type="text"
//               onChange={this.handleSearchInput}
//               value={searchInput}
//               placeholder="Search"
//             />
//             <div
//               className="submitdiv"
//               type="submit"
//               onClick={this.handleSubmit}
//             >
//               <FaSearch type="submit" />
//             </div>
//           </form>

//           {loading ? (
//             <div className="loader-container" data-testid="loader">
//               <ThreeDots
//                 height="80"
//                 width="80"
//                 radius="9"
//                 color="blue"
//                 ariaLabel="three-dots-loading"
//                 visible={true}
//               />
//             </div>
//           ) : videosArray.length > 0 ? (
//             <div className="Videos">
//               {videosArray.map((item) => (
//                 <Link to={`/video/${item.id}`}>
//                   <div className="BG-container">
//                     <img
//                       src={item.thumbnail_url}
//                       alt="thumbnail_url"
//                       className="thumbnail_url"
//                     />
//                     <div className="outer">
//                       <img
//                         src={item.channel.profile_image_url}
//                         className="profile"
//                         alt="profile_image_url"
//                       />
//                       <div className="inner">
//                         <h1 className="heading">{item.title}</h1>
//                         <p
//                           style={{ color: "rgb(120,124,120)" }}
//                           className="paragraphInThumb"
//                         >
//                           {item.channel.name}
//                         </p>
//                         <div className="count paragraphInThumb">
//                           <p
//                             style={{ color: "rgb(120,124,120)" }}
//                           >{`${item.view_count} Views`}</p>
//                           <p style={{ color: "rgb(120,124,120)" }}>
//                             {item.published_at}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           ) : (
//             <div className="VideosNotFound">
//               <img
//                 src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
//                 alt="thumbnail_url"
//                 className="NotFound"
//               />

//               <div>
//                 <h3>No Search results found</h3>
//               </div>
//               <div>
//                 <h1 className="heading">
//                   Try different keywords or remove search.
//                 </h1>
//               </div>
//               <button className="retry" onClick={this.handleSubmit}>
//                 Retry
//               </button>
//             </div>
//           )}
//         </div>
//       </>
//     );
//   }
// }

// export default GetApiRes;

import "./index.css";
import { ThreeDots } from "react-loader-spinner";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useVideosInHomeQuery } from "../../../actions/videosInHomeAc";
import { useDispatch } from "react-redux";
// import { api } from "../../../actions/videosInHomeAc";

// export const PrefetchVideos = ({ searchInput = "" }) => {
//   console.log(searchInput);
//   const dispatch = useDispatch();

//   // Prefetch the data when the component mounts
//   useEffect(() => {
//     // Prefetching data before rendering (data will be cached in Redux)
//     dispatch(api.util.prefetch("videosInHome", searchInput, { force: true }));
//   }, [dispatch, searchInput]);

//   return null; // The component does not render anything
// };

const GetApiRes = () => {
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  // const cookieToken = Cookies.get("jwt_token");

  const { data, error } = useVideosInHomeQuery({
    searchInput: searchInput,
    cookieToken: Cookies.get("jwt_token"),
  });
  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
  };

  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

  let videosArray = [];
  if (data) {
    videosArray = data.data.videos;
  }
  // console.log(data);
  return (
    <>
      <div className="entireVideos">
        <form className="form" onSubmit={handleSubmit}>
          <input
            className="search"
            type="text"
            onChange={handleSearchInput}
            value={searchInput}
            placeholder="Search"
          />
          <div className="submitdiv" onClick={handleSubmit}>
            <FaSearch />
          </div>
          {/* <PrefetchVideos searchInput={searchInput} /> */}
        </form>

        {loading ? (
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
        ) : videosArray.length > 0 ? (
          <div className="Videos">
            {videosArray.map((item) => (
              <Link to={`/video/${item.id}`} key={item.id}>
                <div className="BG-container">
                  <img
                    src={item.thumbnail_url}
                    alt="thumbnail_url"
                    className="thumbnail_url"
                  />
                  <div className="outer">
                    <img
                      src={item.channel.profile_image_url}
                      className="profile"
                      alt="profile_image_url"
                    />
                    <div className="inner">
                      <h1 className="heading">{item.title}</h1>
                      <p
                        className="paragraphInThumb"
                        style={{ color: "rgb(120,124,120)" }}
                      >
                        {item.channel.name}
                      </p>
                      <div className="count paragraphInThumb">
                        <p style={{ color: "rgb(120,124,120)" }}>
                          {`${item.view_count} Views`}
                        </p>
                        <p style={{ color: "rgb(120,124,120)" }}>
                          {item.published_at}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="VideosNotFound">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              alt="thumbnail_url"
              className="NotFound"
            />
            <div>
              <h3>No Search results found</h3>
            </div>
            <div>
              <h1 className="heading">
                Try different keywords or remove search.
              </h1>
            </div>
            <button className="retry" onClick={handleSubmit}>
              Retry
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default GetApiRes;
