import { useState } from "react";
import { Link } from "react-router-dom";
import { FaChartBar, FaPlus, FaList, FaUser } from "react-icons/fa";
import { IoReorderThreeOutline } from "react-icons/io5";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <div className="bg-gray-800 text-white h-16 fixed left-0 top-0 w-full flex justify-between items-center">
        <div className="flex items-center ml-8">
          <span className="text-lg font-bold">BudgetBoss</span>
        </div>
        <div className="flex items-center mr-8 lg:hidden">
          <button onClick={toggleMenu}>
            <IoReorderThreeOutline className="text-white text-2xl" />
          </button>
        </div>
        <div className="hidden lg:flex lg:items-center lg:ml-8">
          <MenuLinks />
        </div>
      </div>
      {isMenuOpen && (
        <div className="lg:hidden absolute top-16 w-full bg-gray-800 text-white z-10">
          <MenuLinksMobile toggleMenu={toggleMenu} />
        </div>
      )}
    </div>
  );
};

const MenuLinks = () => (
  <div className="flex">
    <MenuLink to="#" icon={<FaChartBar />} text="Dashboard" />
    <MenuLink to="/add-expense" icon={<FaPlus />} text="Add" />
    <MenuLink to="/expense-list" icon={<FaList />} text="Expense List" />
    <MenuLink to="#" icon={<FaUser />} text="User Profile" />
    <MenuLink to="/login" icon={<FaUser />} text="Register" />
  </div>
);

const MenuLinksMobile = ({ toggleMenu }) => (
  <div className="flex flex-col">
    <MenuLink to="#" icon={<FaChartBar />} text="Dashboard" />
    <MenuLink to="/add-expense" icon={<FaPlus />} text="Add" />
    <MenuLink to="/expense-list" icon={<FaList />} text="Expense List" />
    <MenuLink to="#" icon={<FaUser />} text="User Profile" />
    <MenuLink to="/login" icon={<FaUser />} text="Register" />
    <button onClick={toggleMenu} className="mt-auto px-4 py-2 text-white">
      Close
    </button>
  </div>
);

const MenuLink = ({ to, icon, text }) => (
  <Link to={to} className="flex items-center p-4 text-center menu-link">
    {icon}
    <span className="ml-2 text-xs">{text}</span>
  </Link>
);

export default Header;
