import { Link, Outlet } from 'react-router';

function Navbar() {
  return (
    <>
      <header className="sticky top-0 z-10 bg-[#111111] border-b border-[#333333]">
        <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            to="/"
            className="font-sans font-extrabold text-xl tracking-tight text-white"
          >
            RECIPE<span className="text-[#ef3333]">FINDER.</span>
          </Link>

          <Link
            to="/"
            className="text-gray-300 hover:text-[#ef3333] font-medium transition-colors"
          >
            Home
          </Link>
        </nav>
      </header>
      <Outlet />
    </>
  );
}

export default Navbar;