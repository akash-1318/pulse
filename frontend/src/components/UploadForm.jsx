import { useState } from "react";

export function UploadForm({ onUpload, loading }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "general",
  });
  const [file, setFile] = useState(null);

  function updateField(event) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!file) return;
    await onUpload({ ...form, file });
    setForm({ title: "", description: "", category: "general" });
    setFile(null);
    event.target.reset();
  }

  const fileName = file?.name
    ? `${file.name.substring(0, 20)}...`
    : "No file selected";

  return (
    <form className="card space-y-6" onSubmit={handleSubmit}>
      <div>
        <h3 className="subsection-title flex items-center gap-2">
          <svg
            className="w-6 h-6 text-primary-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M4.5 3a2.5 2.5 0 015 0v9a1.5 1.5 0 003 0V5.5a3.5 3.5 0 016.068 2.539A3.5 3.5 0 1116.5 10.5H15V5.5a1.5 1.5 0 00-3 0v6.5a3 3 0 11-6 0v-9z" />
          </svg>
          Upload Video
        </h3>
        <p className="text-muted mt-2 text-sm">
          MP4, WebM, OGG, MOV, AVI • Max 200MB
        </p>
      </div>

      <div className="form-group">
        <label htmlFor="title" className="input-label">
          Video Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={form.title}
          onChange={updateField}
          required
          placeholder="e.g., Company Presentation Q1 2024"
          maxLength={100}
        />
        <p className="text-xs text-subtle mt-1">{form.title.length}/100</p>
      </div>

      <div className="form-group">
        <label htmlFor="description" className="input-label">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows="4"
          value={form.description}
          onChange={updateField}
          placeholder="Add details about your video (optional)"
          maxLength={500}
          className="resize-none"
        />
        <p className="text-xs text-subtle mt-1">
          {form.description.length}/500
        </p>
      </div>

      <div className="form-group">
        <label htmlFor="category" className="input-label">
          Category
        </label>
        <select
          id="category"
          name="category"
          value={form.category}
          onChange={updateField}
          className="cursor-pointer"
        >
          <option value="general">General</option>
          <option value="education">Education</option>
          <option value="entertainment">Entertainment</option>
          <option value="technology">Technology</option>
          <option value="business">Business</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="video-file" className="input-label">
          Video File
        </label>
        <div className="relative">
          <input
            id="video-file"
            type="file"
            accept="video/mp4,video/webm,video/ogg,video/quicktime,video/x-msvideo"
            onChange={(event) => setFile(event.target.files?.[0] || null)}
            required
            className="hidden"
          />
          <label
            htmlFor="video-file"
            className="block p-4 border-2 border-dashed border-primary-500/50 rounded-lg hover:border-primary-400 hover:bg-primary-500/5 cursor-pointer transition-all text-center"
          >
            <svg
              className="w-10 h-10 mx-auto text-primary-400 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="text-sm font-medium text-gray-300">
              {file ? (
                <span className="text-primary-400">{fileName}</span>
              ) : (
                "Click to browse or drag & drop"
              )}
            </p>
            <p className="text-xs text-subtle mt-1">
              or drag and drop your video here
            </p>
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || !file}
        className="btn btn-primary w-full py-3 text-lg font-semibold flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4.5 3a2.5 2.5 0 015 0v9a1.5 1.5 0 003 0V5.5a3.5 3.5 0 016.068 2.539A3.5 3.5 0 1116.5 10.5H15V5.5a1.5 1.5 0 00-3 0v6.5a3 3 0 11-6 0v-9z" />
            </svg>
            Upload Video
          </>
        )}
      </button>
    </form>
  );
}
