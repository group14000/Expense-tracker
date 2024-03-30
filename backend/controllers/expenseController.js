const Expense = require("../modals/expense");

exports.createExpense = async (req, res) => {
  try {
    const { date, category, description, amount, currency, paymentMethod } =
      req.body;

    const expense = await Expense.create({
      date,
      category,
      description,
      amount,
      currency,
      paymentMethod,
    });

    res.status(201).json({ success: true, data: expense });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
