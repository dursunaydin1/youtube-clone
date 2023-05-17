import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../utils/api";
import LeftNav from "./LeftNav";
import VideoCard from "./VideoCard";

const SearchResult = () => {
  const { query } = useParams();
  const [result, setResult] = useState([]);

  useEffect(() => {
    fetchDataFromApi(`search/?q=${query}`).then((res) => {
      setResult(res.contents);
    });
  }, [query]);

  if (result.length === 0) return "loading";

  return (
    <div className="d-flex bg-dark gap-5">
      <LeftNav />
      <div className="d-flex flex-column w-100">
        {result.map((video) => {
          if (video.type !== "video") return null;
          return <VideoCard video={video} key={video.video.videoId} />;
        })}
      </div>
    </div>
  );
};

export default SearchResult;
