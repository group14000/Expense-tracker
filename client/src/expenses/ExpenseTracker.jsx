import { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("http://localhost:3000/expense-list");
      setExpenses(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/expenses/${id}`);
      fetchExpenses(); // Fetch updated expense list after deletion
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-8 text-center">
        Expense Tracker
      </h2>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : (
        <div>
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Expense List</h3>
            <ul>
              {expenses.map((expense) => (
                <li key={expense.id} className="mb-4 border rounded-md p-4">
                  <div className="mb-2">Date: {expense.date}</div>
                  <div className="mb-2">Category: {expense.category}</div>
                  <div className="mb-2">Description: {expense.description}</div>
                  <div className="mb-2">Amount: {expense.amount}</div>
                  <div className="mb-2">Currency: {expense.currency}</div>
                  <div>Payment Method: {expense.paymentMethod}</div>
                  <button
                    onClick={() => deleteExpense(expense.id)}
                    className="mt-2 bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Expense Chart</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={expenses}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#82ca9d" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseTracker;
