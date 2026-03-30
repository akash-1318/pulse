import { AuthForm } from "./AuthForm.jsx";

export function AuthLanding({
  authMode,
  onAuthModeChange,
  onSubmit,
  loading,
  error,
  message,
}) {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left side - Hero content */}
          <div className="space-y-8 py-8">
            <div className="space-y-4">
              <p className="eyebrow">Welcome to</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-primary-500 to-blue-400">
                Video Stream Pro
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed">
                A modern platform for uploading, processing, and streaming
                videos with AI-powered sensitivity detection and multi-tenant
                access control.
              </p>
            </div>

            {/* Features list */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary-600/30 border border-primary-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg
                    className="w-4 h-4 text-primary-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-100">
                    Real-time Processing
                  </p>
                  <p className="text-sm text-gray-400">
                    Live progress tracking for video processing and sensitivity
                    analysis
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary-600/30 border border-primary-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg
                    className="w-4 h-4 text-primary-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-100">
                    Secure Access Control
                  </p>
                  <p className="text-sm text-gray-400">
                    Multi-tenant organization structure with role-based
                    permissions
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary-600/30 border border-primary-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg
                    className="w-4 h-4 text-primary-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-100">
                    Advanced Filtering
                  </p>
                  <p className="text-sm text-gray-400">
                    Search and filter by status, sensitivity, category, and more
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Auth Form */}
          <div className="space-y-6">
            {/* Auth Mode Tabs */}
            <div className="flex gap-3 bg-dark-800/30 p-2 rounded-lg border border-gray-700">
              <button
                onClick={() => onAuthModeChange("login")}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                  authMode === "login"
                    ? "bg-primary-600 text-white shadow-lg shadow-primary-500/20"
                    : "text-gray-300 hover:text-gray-100"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => onAuthModeChange("register")}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                  authMode === "register"
                    ? "bg-primary-600 text-white shadow-lg shadow-primary-500/20"
                    : "text-gray-300 hover:text-gray-100"
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Messages */}
            {error && (
              <div className="p-4 rounded-lg border border-red-900/30 bg-red-950/20 text-red-300 flex items-start gap-3">
                <svg
                  className="w-5 h-5 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm">{error}</span>
              </div>
            )}
            {message && (
              <div className="p-4 rounded-lg border border-green-900/30 bg-green-950/20 text-green-300 flex items-start gap-3">
                <svg
                  className="w-5 h-5 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm">{message}</span>
              </div>
            )}

            {/* Auth Form */}
            <AuthForm mode={authMode} onSubmit={onSubmit} loading={loading} />
          </div>
        </div>
      </div>
    </main>
  );
}
