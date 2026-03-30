import { UploadForm } from "./UploadForm.jsx";
import { FilterBar } from "./FilterBar.jsx";
import { VideoGrid } from "./VideoGrid.jsx";
import { UserManagement } from "./UserManagement.jsx";
import { AlertMessage } from "./AlertMessage.jsx";

export function DashboardContent({
  canUpload,
  canManageUsers,
  videos,
  users,
  filters,
  pageLoading,
  error,
  message,
  onFiltersChange,
  onUpload,
  onDelete,
  onSelectVideo,
  onCreateUser,
  uploading,
  userSaving,
}) {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Alert Messages */}
      <AlertMessage type="error" message={error} />
      <AlertMessage type="success" message={message} />

      {/* Top Section - Upload & Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Upload Form */}
        {canUpload && (
          <div className="lg:col-span-1">
            <UploadForm onUpload={onUpload} loading={uploading} />
          </div>
        )}

        {/* Filters & Videos */}
        <div className={canUpload ? "lg:col-span-3" : "lg:col-span-4"}>
          <div className="space-y-6">
            <FilterBar filters={filters} onChange={onFiltersChange} />

            {/* Videos Grid */}
            {pageLoading ? (
              <div className="card flex items-center justify-center py-16">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-600/20 border border-primary-600/50 animate-spin">
                    <div className="w-8 h-8 rounded-full border-2 border-primary-600/30 border-t-primary-400" />
                  </div>
                  <p className="text-gray-400">Loading videos...</p>
                </div>
              </div>
            ) : (
              <VideoGrid
                videos={videos}
                onStream={onSelectVideo}
                canManage={canUpload}
                onDelete={onDelete}
              />
            )}
          </div>
        </div>
      </div>

      {/* User Management Section */}
      {canManageUsers && (
        <div className="space-y-4">
          <h2 className="subsection-title">Organization Management</h2>
          <UserManagement
            users={users}
            onCreateUser={onCreateUser}
            loading={userSaving}
          />
        </div>
      )}
    </main>
  );
}
