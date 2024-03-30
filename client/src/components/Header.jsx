import { Link } from "react-router-dom";
import { FaChartBar, FaPlus, FaList, FaUser, FaFilePdf } from "react-icons/fa";

const Header = () => {
  return (
    <div>
      <div className="bg-gray-800 text-white h-16 fixed left-0 top-0 w-full flex justify-between items-center">
        <div className="flex items-center ml-8">
          <span className="text-lg font-bold">BudgetBoss</span>
        </div>
        <div className="flex">
          <Link to="#" className="flex items-center p-4 text-center">
            <FaChartBar className="mr-2" />
            <span className="text-xs">Dashboard</span>
          </Link>
          <Link to="#" className="flex items-center p-4 text-center">
            <FaChartBar className="mr-2" />
            <span className="text-xs">Charts</span>
          </Link>
          <Link to="/add-expense" className="flex items-center p-4 text-center">
            <FaPlus className="mr-2" />
            <span className="text-xs">Add</span>
          </Link>
          <Link
            to="/expense-list"
            className="flex items-center p-4 text-center"
          >
            <FaList className="mr-2" />
            <span className="text-xs">Expense List</span>
          </Link>
          <Link to="#" className="flex items-center p-4 text-center">
            <FaUser className="mr-2" />
            <span className="text-xs">User Profile</span>
          </Link>
          <Link to="#" className="flex items-center p-4 text-center">
            <FaFilePdf className="mr-2" />
            <span className="text-xs">Download PDF</span>
          </Link>
          <Link to="/login" className="flex items-center p-4 text-center">
            <FaUser className="mr-2" />
            <span className="text-xs">Register</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
