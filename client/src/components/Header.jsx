import { Link } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";

const Header = () => {
  return (
    <header className="bg-white shadow-lg">
      <nav className="container mx-auto flex justify-between items-center py-4 px-4 md:px-8">
        <div className="flex justify-end items-center w-full">
          <div className="flex items-center mr-4">
            <div className="flex items-center mr-4">
              <input
                type="text"
                placeholder="Search..."
                className="border border-gray-300 px-2 py-1 ml-2 focus:outline-none"
              />
            </div>

            <IoIosNotifications className="text-gray-600" />
          </div>

          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            Login / SignUp
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
