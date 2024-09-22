import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

export default function NotFoundPage() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-9xl font-extrabold text-gray-800 mb-4">404</h1>
      <p className="text-2xl md:text-3xl text-gray-700 mb-8">Oops! Page Not Found</p>
      <p className="text-lg text-gray-600 mb-8 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link 
        to="/dashboard" 
        className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
      >
        <FaHome className="mr-2" />
        Go to Dashboard
      </Link>
    </div>
  );
}