import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "./context/AuthContext.jsx";
import { api } from "./lib/api.js";
import { useSocket } from "./hooks/useSocket.js";
import { ProtectedPlayerModal } from "./components/ProtectedPlayerModal.jsx";
import { AppHeader } from "./components/AppHeader.jsx";
import { AuthLanding } from "./components/AuthLanding.jsx";
import { DashboardContent } from "./components/DashboardContent.jsx";
import { AppFooter } from "./components/AppFooter.jsx";
import { LoadingSpinner } from "./components/LoadingSpinner.jsx";

const defaultFilters = { q: "", status: "", sensitivity: "", category: "" };

export default function App() {
  const auth = useAuth();
  const [authMode, setAuthMode] = useState("login");
  const [authLoading, setAuthLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [pageLoading, setPageLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [userSaving, setUserSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const canUpload = auth.user && ["editor", "admin"].includes(auth.user.role);
  const canManageUsers = auth.user?.role === "admin";
  const canDelete = auth.user && ["editor", "admin"].includes(auth.user.role);

  const handleVideoProgress = useCallback((payload) => {
    setVideos((current) =>
      current.map((video) =>
        (video._id || video.id) === payload.videoId
          ? {
              ...video,
              processingStatus: payload.processingStatus,
              processingProgress: payload.processingProgress,
              sensitivityStatus: payload.sensitivityStatus,
              sensitivityScore: payload.sensitivityScore,
              matchedKeywords: payload.matchedKeywords,
            }
          : video,
      ),
    );
  }, []);

  useSocket(auth.token, { onVideoProgress: handleVideoProgress });

  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    return params.toString();
  }, [filters]);

  async function fetchVideos() {
    if (!auth.isAuthenticated) return;
    setPageLoading(true);
    try {
      const response = await api.get(
        `/videos${queryString ? `?${queryString}` : ""}`,
      );
      setVideos(response.data.videos);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load videos");
    } finally {
      setPageLoading(false);
    }
  }

  async function fetchUsers() {
    if (!canManageUsers) return;
    try {
      const response = await api.get("/users");
      setUsers(response.data.users);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load users");
    }
  }

  useEffect(() => {
    fetchVideos();
  }, [auth.isAuthenticated, queryString]);
  useEffect(() => {
    if (canManageUsers) fetchUsers();
  }, [canManageUsers]);

  async function handleAuth(form) {
    setAuthLoading(true);
    setError("");
    setMessage("");
    try {
      if (authMode === "login") await auth.login(form.email, form.password);
      else await auth.register(form);
      setMessage("Authentication successful");
    } catch (err) {
      setError(err.response?.data?.message || "Authentication failed");
    } finally {
      setAuthLoading(false);
    }
  }

  async function handleUpload(form) {
    setUploading(true);
    setError("");
    setMessage("");
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("category", form.category);
      formData.append("video", form.file);

      const response = await api.post("/videos", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setVideos((current) => [response.data.video, ...current]);
      setMessage("Video uploaded and processing started");
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(videoId) {
    try {
      await api.delete(`/videos/${videoId}`);
      setVideos((current) =>
        current.filter((video) => (video._id || video.id) !== videoId),
      );
      setMessage("Video deleted");
    } catch (err) {
      setError(err.response?.data?.message || "Delete failed");
    }
  }

  async function handleCreateUser(payload) {
    setUserSaving(true);
    setError("");
    setMessage("");
    try {
      await api.post("/users", payload);
      setMessage("User created successfully");
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create user");
    } finally {
      setUserSaving(false);
    }
  }

  if (auth.loading) {
    return <LoadingSpinner message="Loading your session..." />;
  }

  if (!auth.isAuthenticated) {
    return (
      <AuthLanding
        authMode={authMode}
        onAuthModeChange={setAuthMode}
        onSubmit={handleAuth}
        loading={authLoading}
        error={error}
        message={message}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-900 to-dark-800">
      <AppHeader user={auth.user} onLogout={auth.logout} />
      <DashboardContent
        canUpload={canUpload}
        canManageUsers={canManageUsers}
        videos={videos}
        users={users}
        filters={filters}
        pageLoading={pageLoading}
        error={error}
        message={message}
        onFiltersChange={setFilters}
        onUpload={handleUpload}
        onDelete={handleDelete}
        onSelectVideo={setSelectedVideo}
        onCreateUser={handleCreateUser}
        uploading={uploading}
        userSaving={userSaving}
      />
      <ProtectedPlayerModal
        video={selectedVideo}
        token={auth.token}
        onClose={() => setSelectedVideo(null)}
      />
      <AppFooter />
    </div>
  );
}
