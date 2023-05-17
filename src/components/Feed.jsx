import { useContext } from "react";
import { Context } from "../context/contextApi";

import LeftNav from "./LeftNav";
import VideoCard from "./VideoCard";

const Feed = () => {
  const { searchResult } = useContext(Context);

  return (
    <div className="d-flex bg-dark" style={{ minHeight: "100vh" }}>
      <LeftNav />
      <div className="w-100 p-4 videos">
        {searchResult.map((video) => {
          if (video.type !== "video") return;
          return <VideoCard video={video} />;
        })}
      </div>
    </div>
  );
};

export default Feed;
