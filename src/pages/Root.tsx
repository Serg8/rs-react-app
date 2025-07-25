import { Link, Outlet } from 'react-router-dom';

function Root() {
  return (
    <main className="">
      <header className="p-4 bg-gray-100">
        <nav className="container mx-auto px-4">
          <Link to="/" className="mr-4 text-blue-600">
            Home
          </Link>
          <Link to="/about" className="text-blue-600">
            About
          </Link>
        </nav>
      </header>
      <div className="container mx-auto px-4">
        <Outlet />
      </div>
    </main>
  );
}

export default Root;
