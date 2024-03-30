import { useState } from "react";
import axios from "axios"; // Import Axios
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { IoMdCash } from "react-icons/io";
import { AiOutlineTag } from "react-icons/ai"; // Importing the tag icon

const ExpenseTrackerForm = () => {
  const [expense, setExpense] = useState({
    date: new Date(),
    category: "",
    description: "",
    amount: "",
    currency: "",
    paymentMethod: "",
  });

  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateChange = (date) => {
    setExpense({
      ...expense,
      date: date,
    });
    setShowCalendar(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense({
      ...expense,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make POST request to backend
      const response = await axios.post(
        "http://localhost:3000/expenses",
        expense
      );
      console.log(response.data); // Log response from the backend
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md md:ml-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Expense Tracker
      </h2>
      <div className="mb-4">
        <label htmlFor="date" className="block text-gray-700 mb-1">
          Date
        </label>
        <div className="relative">
          <input
            type="text"
            id="date"
            name="date"
            value={expense.date.toDateString()}
            onFocus={() => setShowCalendar(true)}
            readOnly
            className="w-full border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-400"
          />
          {showCalendar && (
            <div className="absolute top-full mt-1 w-full z-10">
              <Calendar
                onChange={handleDateChange}
                value={expense.date}
                className="border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-400"
              />
            </div>
          )}
        </div>
      </div>
      <div className="mb-4">
        {/* Using conditional rendering to display icon on small screens */}
        <label htmlFor="category" className="block text-gray-700 mb-1">
          {window.innerWidth <= 768 ? <AiOutlineTag /> : "Category"}
        </label>
        <input
          type="text"
          id="category"
          name="category"
          value={expense.category}
          onChange={handleChange}
          className="w-full border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-400"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 mb-1">
          Description
        </label>
        <input
          type="text"
          id="description"
          name="description"
          value={expense.description}
          onChange={handleChange}
          className="w-full border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-400"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="amount" className="block text-gray-700 mb-1">
          Amount
        </label>
        <div className="relative">
          <input
            type="text"
            id="amount"
            name="amount"
            value={expense.amount}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-400"
          />
          <span className="absolute right-3 top-2">
            <IoMdCash />
          </span>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="currency" className="block text-gray-700 mb-1">
          Currency
        </label>
        <input
          type="text"
          id="currency"
          name="currency"
          value={expense.currency}
          onChange={handleChange}
          className="w-full border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-400"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="paymentMethod" className="block text-gray-700 mb-1">
          Payment Method
        </label>
        <input
          type="text"
          id="paymentMethod"
          name="paymentMethod"
          value={expense.paymentMethod}
          onChange={handleChange}
          className="w-full border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-400"
        />
      </div>
      <button
        type="submit"
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default ExpenseTrackerForm;
