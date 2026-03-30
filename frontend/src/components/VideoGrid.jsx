import { VideoCard } from "./VideoCard.jsx";

export function VideoGrid({ videos, onStream, canManage, onDelete }) {
  if (!videos.length) {
    return (
      <div className="empty-state">
        <svg
          className="w-24 h-24 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M7 4v16m10-16v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
          />
        </svg>
        <div>
          <h3 className="subsection-title">No videos found</h3>
          <p className="text-muted mt-2">
            Try changing filters or upload a new video.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-max">
      {videos.map((video) => (
        <VideoCard
          key={video._id || video.id}
          video={video}
          onStream={onStream}
          canManage={canManage}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
