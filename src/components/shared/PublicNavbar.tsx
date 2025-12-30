import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';

const PublicNavbar = async () => {
  const navIterms = [
    { label: 'Find Tour', href: '/find-tour' },
    { label: 'Become a Guide', href: '/become-guide' },
  ];
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm border-b border-gray-100">
      {/* Left Side: Logo */}
      <div className="flex items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600 tracking-tight">
          Local<span className="text-gray-800">Guide</span>
        </Link>
      </div>

      {/* Right Side: Navigation Links & Action Button */}
      <nav className="hidden md:flex items-center space-x-6">
        {
          navIterms.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-lg font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              {item.label}
            </Link>
          ))}

      </nav>
      <div className='hidden md:flex'>
        <Link
          href="/login"
          className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all shadow-md active:scale-95"
        >
          Login
        </Link>
      </div>
      <div className='md:hidden'>
        <Sheet>
          <SheetTrigger asChild>
            <button className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col space-y-4 mt-4">
              {navIterms.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-lg font-medium text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4">
              <Link
                href="/login"
                className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all shadow-md active:scale-95"
              >
                Login
              </Link>
            </div>
          </SheetContent>
        </Sheet>

      </div>
    </header>
  );
};

export default PublicNavbar;