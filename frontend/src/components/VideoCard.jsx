import {
  formatBytes,
  formatDate,
  formatDuration,
} from "../utils/formatters.js";

function StatusBadge({ children, tone = "default" }) {
  const toneClasses = {
    success: "badge-success",
    danger: "badge-danger",
    warning: "badge-warning",
    default: "badge-default",
  };
  return <span className={`badge ${toneClasses[tone]}`}>{children}</span>;
}

export function VideoCard({ video, onStream, canManage, onDelete }) {
  const sensitivityTone =
    video.sensitivityStatus === "flagged"
      ? "danger"
      : video.sensitivityStatus === "safe"
        ? "success"
        : "warning";
  const processingTone =
    video.processingStatus === "completed"
      ? "success"
      : video.processingStatus === "failed"
        ? "danger"
        : "warning";

  const isProcessing = video.processingStatus !== "completed";
  const progress = video.processingProgress || 0;

  return (
    <article className="card-interactive group space-y-5">
      {/* Header */}
      <div className="space-y-3 pb-3 border-b border-gray-700">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-50 truncate group-hover:text-primary-400 transition-colors">
              {video.title}
            </h3>
            <p className="text-sm text-muted mt-1 line-clamp-2">
              {video.description || "No description provided"}
            </p>
          </div>
          <StatusBadge tone={processingTone}>
            {video.processingStatus}
          </StatusBadge>
        </div>
      </div>

      {/* Metadata Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-dark-900/50 rounded-lg p-3 border border-gray-700/50">
          <span className="text-xs text-subtle uppercase tracking-wider">
            Category
          </span>
          <p className="text-sm font-semibold text-gray-100 mt-1">
            {video.category}
          </p>
        </div>
        <div className="bg-dark-900/50 rounded-lg p-3 border border-gray-700/50">
          <span className="text-xs text-subtle uppercase tracking-wider">
            Size
          </span>
          <p className="text-sm font-semibold text-gray-100 mt-1">
            {formatBytes(video.sizeBytes)}
          </p>
        </div>
        <div className="bg-dark-900/50 rounded-lg p-3 border border-gray-700/50">
          <span className="text-xs text-subtle uppercase tracking-wider">
            Uploaded
          </span>
          <p className="text-sm font-semibold text-gray-100 mt-1">
            {formatDate(video.createdAt)}
          </p>
        </div>
        <div className="bg-dark-900/50 rounded-lg p-3 border border-gray-700/50">
          <span className="text-xs text-subtle uppercase tracking-wider">
            Duration
          </span>
          <p className="text-sm font-semibold text-gray-100 mt-1">
            {formatDuration(video.durationSeconds)}
          </p>
        </div>
      </div>

      {/* Sensitivity & Progress */}
      <div className="space-y-3 pt-3 border-t border-gray-700">
        <div className="flex items-center justify-between gap-2">
          <StatusBadge tone={sensitivityTone}>
            {video.sensitivityStatus}
          </StatusBadge>
          <span className="text-sm font-semibold text-gray-300">
            {video.sensitivityScore || 0}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="progress-bar">
            <div
              className="progress-bar-fill transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-subtle">
            Processing:{" "}
            <span className="text-primary-400 font-semibold">{progress}%</span>
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          disabled={isProcessing}
          onClick={() => onStream(video)}
          className="flex-1 btn bg-primary-600 hover:bg-primary-700 border-primary-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? "Processing..." : "Stream"}
        </button>
        {canManage && (
          <button
            onClick={() => onDelete(video.id || video._id)}
            className="btn btn-danger"
            title="Delete this video"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
    </article>
  );
}
