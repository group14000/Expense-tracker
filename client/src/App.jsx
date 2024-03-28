import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupForm from "./Auth/SignupForm";
import LoginForm from "./Auth/LoginForm";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ExpenseTrackerForm from "./expenses/ExpenseTrackerForm";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Sidebar />
      <Routes>
        <Route path="/sign-up" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/add-expense" element={<ExpenseTrackerForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
