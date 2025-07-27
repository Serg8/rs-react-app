import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="text-center mt-8">
      <h2 className="text-xl font-semibold mb-4">404 – Page Not Found</h2>
      <p className="mb-4">Sorry, the page you are looking for doesn’t exist.</p>
      <Link
        className="text-red-500 hover:text-red-700 hover:underline text-lg transition-colors"
        to="/"
      >
        Go back to the home page
      </Link>
    </div>
  );
}

export default NotFound;
