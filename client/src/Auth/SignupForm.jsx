import { useState } from "react";
import { Link } from "react-router-dom";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    userid: "",
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // You can replace this with your own logic for form submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        User ID:
        <input
          type="text"
          name="userid"
          value={formData.userid}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </label>
      <label>
        Confirm Password:
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Submit</button>
      <p>Already have an account? <Link to={"/login"}>Login</Link></p>
    </form>
  );
};

export default SignupForm;
