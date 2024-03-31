import { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Cell } from "recharts";

const ExpenseChart = () => {
  const [expenses, setExpenses] = useState([]);
  const [selectedOption, setSelectedOption] = useState("monthly");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchExpenses(selectedOption);
  }, [selectedOption]);

  const fetchExpenses = async (option) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/expense-list?option=${option}`
      );
      setExpenses(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching expenses:", error);
      setError("Error fetching expenses. Please try again later.");
    }
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="expense-chart">
      <div className="period-selector">
        <label htmlFor="period">Select Period:</label>
        <select
          id="period"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="pie-chart-container">
          <PieChart width={400} height={400}>
            <Pie
              data={expenses}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              label
            >
              {expenses.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </div>
      )}
    </div>
  );
};

export default ExpenseChart;
