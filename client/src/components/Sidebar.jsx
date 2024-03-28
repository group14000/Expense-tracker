import { useState } from "react";
import { Link } from "react-router-dom";
import { FaChartBar, FaPlus, FaList, FaUser, FaFilePdf } from "react-icons/fa";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div>
      <div
        className={`bg-gray-800 text-white h-screen w-16 fixed left-0 top-0 flex flex-col justify-between md:w-32 ${
          sidebarOpen ? "md:w-32" : "md:w-16"
        }`}
      >
        <div className="mt-8">
          <div className="flex justify-center items-center mb-4">
            <span className="text-lg font-bold">BudgetBoss</span>
          </div>
          <Link to="#" className="flex items-center p-4 text-center">
            <FaChartBar className="mr-2" />
            <span className="text-xs">Dashboard</span>
          </Link>
          <Link to="#" className="flex items-center p-4 text-center">
            <FaChartBar className="mr-2" />
            <span className="text-xs">Charts</span>
          </Link>
          <Link to="#" className="flex items-center p-4 text-center">
            <FaPlus className="mr-2" />
            <span className="text-xs">Add</span>
          </Link>
          <Link to="#" className="flex items-center p-4 text-center">
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
        </div>
        <div className="mb-8">
          <button
            className="flex items-center p-4 text-center"
            onClick={toggleSidebar}
          >
            {sidebarOpen ? (
              <MdOutlineKeyboardArrowLeft className="mr-2" />
            ) : (
              <MdOutlineKeyboardArrowRight className="mr-2" />
            )}
            <span className="text-xs">Toggle Sidebar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
