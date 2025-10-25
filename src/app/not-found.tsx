import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-8">
        <div className="mb-8">
          <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m6 8.5A9 9 0 1112 3.5 9 9 0 0121 12z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-white">Page Not Found</h2>
          <p className="text-gray-300">
            The page you are looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
        <Link
          href="/"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-3 rounded-lg font-semibold transition-all duration-300 inline-block transform hover:scale-105"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}
