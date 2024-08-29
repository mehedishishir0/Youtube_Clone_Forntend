import React, { useEffect, useState } from "react";
import "./Palyvide.css";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import { API_KEY, value_convart } from "../../Data/data";
import moment from "moment";
import { useParams } from "react-router-dom";

const Playvideo = () => {
  const { videoId } = useParams();

  const [apidata, setApidata] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentsData, setCommentsData] = useState([]);

  // video data fetching
  const fetchVideoData = async () => {
    const videoDetails = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    const resp = await fetch(videoDetails);
    const data = await resp.json();
    setApidata(data.items[0]);
  };
  //Channel Data fetching
  const channelDataFetch = async () => {
    const channelData_Url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apidata && apidata.snippet.channelId}&key=${API_KEY}`;
   try {
    const resp = await fetch(channelData_Url);
    const data = await resp.json();
    setChannelData(channelData && data.items[0]);
   } catch (error) {
    console.log(error)
   }
  };
  // Comment data fetching
  const commentsDataFatching = async () => {
    const comments_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=100&videoId=${videoId}&key=${API_KEY} `;
    const resp = await fetch(comments_url);
    const data = await resp.json();
    setCommentsData(data.items);
  };
  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    channelDataFetch();
  }, [apidata]);

  useEffect(() => {
    commentsDataFatching();
  }, [apidata]);

  return (
    <div className="play-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"

      ></iframe>
      <h3>{apidata ? apidata.snippet.title : "Title Here"}</h3>
      <div className="play-video-info">
        <p>
          {apidata ? value_convart(apidata.statistics.viewCount) : "16K"} Views
          &bull;{apidata ? moment(apidata.snippet.publishedAt).fromNow() : ""}
        </p>
        <div>
          <span>
            <img src={like} alt="" />
            {apidata ? value_convart(apidata.statistics.likeCount) : ""}
          </span>
          <span>
            <img src={dislike} alt="" />
          </span>
          <span>
            <img src={share} alt="" />
            Share
          </span>
          <span>
            <img src={save} alt="" />
            Save
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img
          src={channelData && channelData.snippet.thumbnails.default.url}
          alt=""
        />
        <div>
          <p>{apidata && apidata.snippet.channelTitle}</p>
          <span>
            {channelData &&
              value_convart(channelData.statistics.subscriberCount)}{" "}
            Subscribers
          </span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="description">
        <p>{apidata && apidata.snippet.description.slice(0, 250)}</p>
        <hr />
        <h4>
          {apidata && value_convart(apidata.statistics.commentCount)} comment
        </h4>
        {commentsData &&
          commentsData.map((comment, i) => {
            return (
              <div key={i} className="comment">
                <img
                  src={
                    comment.snippet.topLevelComment.snippet
                      .authorProfileImageUrl
                  }
                  alt=""
                />
                <div>
                  <h3>
                    {comment.snippet.topLevelComment.snippet.authorDisplayName}{" "}
                    <span>
                      {moment(
                        comment.snippet.topLevelComment.snippet.publishedAt
                      ).fromNow()}
                    </span>
                  </h3>
                  <p>{comment.snippet.topLevelComment.snippet.textDisplay}</p>
                  <div className="comment-action">
                    <img src={like} alt="" />
                    <span>
                      {value_convart(
                        comment.snippet.topLevelComment.snippet.likeCount
                      )}
                    </span>
                    <img src={dislike} alt="" />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Playvideo;
