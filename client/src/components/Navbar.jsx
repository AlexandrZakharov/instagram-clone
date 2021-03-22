import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";

const Navbar = (props) => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  const onSignout = () => {
    localStorage.clear();
    dispatch({ type: "CLEAR" });
    history.push('/signin')
  };
  const renderList = () => {
    if (state) {
      return [
        <li>
          <Link to={`/profile/${state._id}`}>Profile</Link>
        </li>,
        <li>
          <Link to="/create">Add post</Link>
        </li>,
        <li>
          <button className="btn waves-effect waves-light" onClick={onSignout}>
            Logout
          </button>
        </li>,
      ];
    } else {
      return [
        <li>
          <Link to="/signin">Signin</Link>
        </li>,
        <li>
          <Link to="/signup">Signup</Link>
        </li>,
      ];
    }
  };
  return (
    <nav>
      <div className="nav-wrapper white">
        <Link to={state ? "/" : "/signin"} className="brand-logo left logo">
          Instagram
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {renderList()}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
