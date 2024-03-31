import { useState, useEffect } from "react";
import axios from "axios";

const EditExpenseForm = ({ expenseId, onClose }) => {
  const [expenseData, setExpenseData] = useState({
    date: "",
    category: "",
    description: "",
    amount: "",
    currency: "",
    paymentMethod: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/expenses/${expenseId}`
        );
        setExpenseData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchExpense();
  }, [expenseId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3000/expenses/${expenseId}`,
        expenseData
      );
      onClose(); // Close the edit form after updating the expense
    } catch (error) {
      console.error(error);
      setError("Error updating expense");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Edit Expense</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Date:</label>
          <input
            type="text"
            name="date"
            value={expenseData.date}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1">Category:</label>
          <input
            type="text"
            name="category"
            value={expenseData.category}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1">Description:</label>
          <input
            type="text"
            name="description"
            value={expenseData.description}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1">Amount:</label>
          <input
            type="number"
            name="amount"
            value={expenseData.amount}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1">Currency:</label>
          <input
            type="text"
            name="currency"
            value={expenseData.currency}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1">Payment Method:</label>
          <input
            type="text"
            name="paymentMethod"
            value={expenseData.paymentMethod}
            onChange={handleChange}
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
    </div>
  );
};

export default EditExpenseForm;
