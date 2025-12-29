import Link from 'next/link';

const PublicNavbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm border-b border-gray-100">
      {/* Left Side: Logo */}
      <div className="flex items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600 tracking-tight">
          Local<span className="text-gray-800">Guide</span>
        </Link>
      </div>

      {/* Right Side: Navigation Links & Action Button */}
      <div className="flex items-center space-x-6">
        <Link 
          href="/find-tour" 
          className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
        >
          Find Tour
        </Link>
        <Link 
          href="/become-guide" 
          className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
        >
          Become a Guide
        </Link>
        
        <Link 
          href="/login" 
          className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all shadow-md active:scale-95"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default PublicNavbar;