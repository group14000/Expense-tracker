import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupForm from "./Auth/SignupForm";
import LoginForm from "./Auth/LoginForm";
import Header from "./components/Header";
const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/sign-up" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
