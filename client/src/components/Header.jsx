import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-purple-700 text-white">
      <div className="flex items-center">
        <Link to={"*"} className="text-2xl font-bold">
          BudgetBoss
        </Link>
      </div>
      <div className="flex">
        <Link to="/login" className="mr-4">
          <div className="bg-yellow-400 rounded-full px-4 py-2 hover:bg-yellow-500 transition duration-300 ease-in-out">
            <span className="font-semibold">Login / SignUp</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
