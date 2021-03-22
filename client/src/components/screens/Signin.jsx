import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import M from "materialize-css";

const Signin = (props) => {
  const { state, dispatch } = useContext(UserContext);

  const history = useHistory();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSignin = () => {
    fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#c628828 red darken-3" });
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({ type: "USER", payload: data.user });
          M.toast({
            html: "Signed In Success",
            classes: "#43a047 green darken-1",
          });
          history.push("/profile");
        }
      });
  };

  return (
    <div className="mycard">
      <div className="card auth-card">
        <h2 className="logo">Instagram</h2>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button className="btn waves-effect waves-light" onClick={onSignin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Signin;
