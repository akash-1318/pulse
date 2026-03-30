export function FilterBar({ filters, onChange }) {
  const change = (name, value) => onChange({ ...filters, [name]: value });

  return (
    <div className="card space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <svg
          className="w-5 h-5 text-primary-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
            clipRule="evenodd"
          />
        </svg>
        <h3 className="font-semibold text-gray-100">Filter Videos</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="form-group">
          <label htmlFor="search" className="input-label">
            Search
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search by title or description..."
            value={filters.q}
            onChange={(event) => change("q", event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="status" className="input-label">
            Processing Status
          </label>
          <select
            id="status"
            value={filters.status}
            onChange={(event) => change("status", event.target.value)}
          >
            <option value="">All States</option>
            <option value="uploaded">Uploaded</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="sensitivity" className="input-label">
            Sensitivity Status
          </label>
          <select
            id="sensitivity"
            value={filters.sensitivity}
            onChange={(event) => change("sensitivity", event.target.value)}
          >
            <option value="">All States</option>
            <option value="safe">Safe</option>
            <option value="flagged">Flagged</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="category" className="input-label">
            Category
          </label>
          <input
            id="category"
            type="text"
            placeholder="Filter by category..."
            value={filters.category}
            onChange={(event) => change("category", event.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
