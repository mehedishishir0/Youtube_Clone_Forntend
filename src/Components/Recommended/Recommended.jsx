import React, { useEffect, useState } from "react";
import "./Recommended.css";

import { API_KEY, value_convart } from "../../Data/data";
import { Link } from "react-router-dom";

const Recommended = ({ categoryId }) => {
  const [recommendedData, setRecommendedData] = useState([]);

  const fetchRecommended = async () => {
    const related_Url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=bd&videoCategoryId=${categoryId}&key=${API_KEY}`;
    const resp = await fetch(related_Url);
    const data = await resp.json();
    setRecommendedData(data.items);
  };
  useEffect(() => {
    fetchRecommended();
  }, []);
  return (
    <div className="recommended">
      {recommendedData &&
        recommendedData.map((recoVideo, i) => {
          return (
            <Link key={i} to={`/video/${recoVideo.snippet.categoryId}/${recoVideo.id}`} className="side-video-list">
              <img src={recoVideo.snippet.thumbnails.medium.url} alt="" />
              <div className="video-info">
                <h4>{recoVideo.snippet.title}</h4>
                <p>{recoVideo.snippet.channelTitle}</p>
                <p>{value_convart(recoVideo.statistics.viewCount)} Views</p>
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default Recommended;
