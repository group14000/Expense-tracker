import { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

const ExpenseChart = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    fetchExpenses();
  }, []);

  const getTotalExpensesByCategory = () => {
    const categories = {};
    expenses.forEach((expense) => {
      if (categories[expense.category]) {
        categories[expense.category] += parseFloat(expense.amount);
      } else {
        categories[expense.category] = parseFloat(expense.amount);
      }
    });
    return categories;
  };

  const data = {
    labels: Object.keys(getTotalExpensesByCategory()),
    datasets: [
      {
        label: "Total Expenses",
        data: Object.values(getTotalExpensesByCategory()),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

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
            <h3 className="text-lg font-semibold mb-4">Expense Analysis</h3>
            <div className="rounded-md shadow-md p-4">
              <Bar data={data} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseChart;
