export function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-600/20 border border-primary-600/50 animate-spin">
          <div className="w-12 h-12 rounded-full border-4 border-primary-600/30 border-t-primary-400" />
        </div>
        <p className="text-gray-400 font-medium">{message}</p>
      </div>
    </div>
  );
}
