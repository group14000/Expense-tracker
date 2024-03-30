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

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="container mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Expense Tracker
      </h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">Expense List</h3>
            <ul>
              {expenses.map((expense) => (
                <li key={expense.id}>
                  <div>Date: {expense.date}</div>
                  <div>Category: {expense.category}</div>
                  <div>Description: {expense.description}</div>
                  <div>Amount: {expense.amount}</div>
                  <div>Currency: {expense.currency}</div>
                  <div>Payment Method: {expense.paymentMethod}</div>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">Expense Chart</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={expenses}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseTracker;
