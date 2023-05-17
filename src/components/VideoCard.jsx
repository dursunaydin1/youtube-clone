import { Link } from "react-router-dom";
import millify from "millify";

const VideoCard = ({ video }) => {
  return (
    <Link to={`/watch/${video.video.videoId}`} className="text-decoration-none">
      <div className="text-light">
        <div>
          <img
            className="rounded img-fluid"
            src={video.video.thumbnails[0].url}
            alt=""
          />
        </div>
        <div className="d-flex gap-2 p-2">
          <img
            className="channel-img"
            src={video.video.author.avatar[0].url}
            alt=""
          />
          <div>
            <p className="fw-bold" style={{ maxWidth: "300px" }}>
              {video.video.title}
            </p>
            <div className="d-flex gap-3 align-items-center">
              <p>{video.video.author.title}</p>
              <button className="btn btn-xs p-1 bg-success text-light btn-secondary">
                Abone Ol
              </button>

              <p>{millify(video.video.stats.views)}</p>
              <p>{video.video.publishedTimeText}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
