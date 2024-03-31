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
  const [editId, setEditId] = useState(null); // Track the expense id being edited
  const [editData, setEditData] = useState({
    date: "",
    category: "",
    description: "",
    amount: "",
    currency: "",
    paymentMethod: "",
  });

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
      fetchExpenses();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (id) => {
    setEditId(id);
    const expenseToEdit = expenses.find((expense) => expense.id === id);
    setEditData({ ...expenseToEdit });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/expenses/${editId}`, editData);
      setEditId(null);
      fetchExpenses();
    } catch (error) {
      console.error(error);
      setError("Error updating expense");
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
                  {editId === expense.id ? (
                    <form onSubmit={handleEditSubmit} className="mt-2">
                      <div>
                        <label className="block mb-1">Date:</label>
                        <input
                          type="text"
                          name="date"
                          value={editData.date}
                          onChange={handleEditChange}
                          className="w-full border rounded-md px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block mb-1">Category:</label>
                        <input
                          type="text"
                          name="category"
                          value={editData.category}
                          onChange={handleEditChange}
                          className="w-full border rounded-md px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block mb-1">Description:</label>
                        <input
                          type="text"
                          name="description"
                          value={editData.description}
                          onChange={handleEditChange}
                          className="w-full border rounded-md px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block mb-1">Amount:</label>
                        <input
                          type="number"
                          name="amount"
                          value={editData.amount}
                          onChange={handleEditChange}
                          className="w-full border rounded-md px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block mb-1">Currency:</label>
                        <input
                          type="text"
                          name="currency"
                          value={editData.currency}
                          onChange={handleEditChange}
                          className="w-full border rounded-md px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block mb-1">Payment Method:</label>
                        <input
                          type="text"
                          name="paymentMethod"
                          value={editData.paymentMethod}
                          onChange={handleEditChange}
                          className="w-full border rounded-md px-3 py-2"
                        />
                      </div>
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                      >
                        Update Expense
                      </button>
                    </form>
                  ) : (
                    <div className="flex mt-2">
                      <button
                        onClick={() => handleEdit(expense.id)}
                        className="bg-blue-500 text-white px-4 py-1 rounded-md mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteExpense(expense.id)}
                        className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  )}
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
