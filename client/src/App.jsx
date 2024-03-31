import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";

const LazySignupForm = React.lazy(() => import("./Auth/SignupForm"));
const LazyLoginForm = React.lazy(() => import("./Auth/LoginForm"));
const LazyExpenseTrackerForm = React.lazy(() =>
  import("./expenses/ExpenseTrackerForm")
);
const LazyExpenseTracker = React.lazy(() =>
  import("./expenses/ExpenseTracker")
);

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/sign-up"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <LazySignupForm />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <LazyLoginForm />
            </Suspense>
          }
        />
        <Route
          path="/add-expense"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <LazyExpenseTrackerForm />
            </Suspense>
          }
        />
        <Route
          path="/expense-list"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <LazyExpenseTracker />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
