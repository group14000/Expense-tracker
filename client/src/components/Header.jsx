import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <Link to={"/sign-up"}>Sign Up</Link>
    </div>
  );
};

export default Header;
