import { useMemo } from "react";

export function ProtectedPlayerModal({ video, token, onClose }) {
  const src = useMemo(() => {
    if (!video || !token) return "";
    const baseUrl =
      import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api";
    const id = video._id || video.id;
    return `${baseUrl}/videos/${id}/stream?access_token=${encodeURIComponent(token)}`;
  }, [video, token]);

  if (!video) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-gray-700">
          <h3 className="subsection-title truncate">{video.title}</h3>
          <button
            onClick={onClose}
            className="btn btn-secondary flex-shrink-0"
            aria-label="Close video player"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="mt-4 bg-black rounded-lg overflow-hidden">
          <video
            className="player w-full"
            controls
            src={src}
            controlsList="nodownload"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}
