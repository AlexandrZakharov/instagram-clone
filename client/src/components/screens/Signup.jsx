import { useState } from "react";
import { useHistory } from "react-router-dom";
import M from "materialize-css";

const Signup = (props) => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const onSignup = () => {
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#c628828 red darken-3" });
        } else {
          M.toast({ html: data.message, classes: "#43a047 green darken-1" });
          history.push("/signin");
        }
      })
      .catch(err => {
        console.log(err)
      })
  };

  return (
    <div className="mycard">
      <div className="card auth-card">
        <h2 className="logo">Instagram</h2>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
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
        <button className="btn waves-effect waves-light" onClick={onSignup}>
          Signup
        </button>
      </div>
    </div>
  );
};

export default Signup;
