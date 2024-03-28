import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import Axios

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

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to your backend endpoint
      const response = await axios.post(
        "http://localhost:3000/login",
        loginData
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error logging in:", error);
    }
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
