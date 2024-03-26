import { useState } from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    userIdOrEmail: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log(loginData); // You can replace this with your own login logic
  };

  return (
    <form onSubmit={handleLoginSubmit}>
      <label>
        User ID or Email:
        <input
          type="text"
          name="userIdOrEmail"
          value={loginData.userIdOrEmail}
          onChange={handleLoginChange}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleLoginChange}
        />
      </label>
      <button type="submit">Login</button>
      <p>
        New User? <Link to={"/sign-up"}>Sign Up</Link>
      </p>
    </form>
  );
};

export default LoginForm;
