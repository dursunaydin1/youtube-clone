import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";
import ReactPlayer from "react-player/youtube";
import loading from "../assets/loading.gif";
import VideoCard from "./VideoCard";

const VideoDetail = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [relatedVideo, setRelatedVideos] = useState([]);

  useEffect(() => {
    fetchVideoDetails();
    fetchRelatedVideos();
  }, [videoId]);

  const fetchVideoDetails = () => {
    fetchDataFromApi(`video/details/?id=${videoId}`).then((res) => {
      setVideo(res);
    });
  };

  const fetchRelatedVideos = () => {
    fetchDataFromApi(`video/related-contents/?id=${videoId}`).then((res) => {
      setRelatedVideos(res.contents);
    });
  };

  return (
    <div
      className="d-flex bg-dark text-light p-3 gap-2"
      style={{ minHeight: "100vh" }}
    >
      {!video ? (
        <img className="loading" src={loading} alt="Loading" />
      ) : (
        <>
          <div className="flex-grow-1">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${videoId}`}
              controls
              playing
              width={"100%"}
              height={"50vh"}
            />
            <div>
              <h3>{video?.title}</h3>
            </div>
            <div className="d-flex gap-5">
              <img src={video.author.avatar[0].url} alt="" />
              <p>{video.author.title}</p>
              <p>{video.author.stats.subscribersText}</p>
              <p>Beğeni: {video.stats.likes}</p>
              <p>İzlenme: {video.stats.views}</p>
            </div>
          </div>
          <div>
            {relatedVideo.map((related) => {
              if (related.type !== "video") return;
              return (
                <VideoCard
                  key={related.id}
                  video={related}
                  setVideo={setVideo} // Yeni videoyu setVideo ile güncelleyin
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default VideoDetail;
