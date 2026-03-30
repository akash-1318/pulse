export function AppHeader({ user, onLogout }) {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-800/50 backdrop-blur-xl bg-dark-900/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center shadow-lg">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                <path d="M8.5 8a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">
                StreamPro
              </h1>
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1 hidden md:flex items-center justify-center">
            <div className="text-center">
              <p className="text-sm text-primary-400 font-medium">
                {user.name}
              </p>
              <p className="text-xs text-gray-500">
                {user.email} •{" "}
                <span className="capitalize text-gray-400">{user.role}</span>
              </p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="btn btn-secondary flex items-center gap-2 px-4 py-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
