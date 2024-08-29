import React, { useEffect, useState } from "react";
import "./Feed.css";
import {Link} from "react-router-dom"

import { API_KEY } from "../../Data/data";
import { value_convart } from "../../Data/data";
import moment from 'moment'

const Feed = ({category}) => {

  const [data,setData] = useState([])
 
  const fetchData = async () => {
  const videoList_url =  `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=200&regionCode=bd&videoCategoryId=${category}&key=${API_KEY}`                   
  try {
    const resp =  await fetch(videoList_url)
  const jsndata = await resp.json()
  setData(jsndata.items)
  } catch (error) {
    console.log(error)
  }
}

useEffect(()=>{
fetchData()
},[category])

  return (
    <div className="feed">
     {data && data.map((item,i)=>{
      return (
        <Link key={i} to={`video/${item.snippet.categoryId}/${item.id}`} className="card">
        <img src={item.snippet.thumbnails.medium.url} alt="" />
        <h2>{item.snippet.title}</h2>
        <h3>{item.snippet.channelTitle}</h3>
        <p>{value_convart(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()} </p>
      </Link>
      )
     })}
   
    </div>
  );
};

export default Feed;
