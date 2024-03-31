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

exports.showExpense = async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    res.json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findByPk(id);

    if (!expense) {
      return res
        .status(404)
        .json({ success: false, error: "Expense not found" });
    }

    await expense.destroy();

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, category, description, amount, currency, paymentMethod } =
      req.body;

    const expense = await Expense.findByPk(id);

    if (!expense) {
      return res
        .status(404)
        .json({ success: false, error: "Expense not found" });
    }

    // Update the expense details
    await expense.update({
      date,
      category,
      description,
      amount,
      currency,
      paymentMethod,
    });

    res.status(200).json({ success: true, data: expense });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
