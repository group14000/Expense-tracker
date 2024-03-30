import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupForm from "./Auth/SignupForm";
import LoginForm from "./Auth/LoginForm";
import ExpenseTrackerForm from "./expenses/ExpenseTrackerForm";
import ExpenseTracker from "./expenses/ExpenseTracker";
import Header from "./components/Header";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/sign-up" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/add-expense" element={<ExpenseTrackerForm />} />
        <Route path="/expense-list" element={<ExpenseTracker />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
