import "./App.css";
import { useEffect, createContext, useReducer, useContext } from "react";
import NavBar from "./components/Navbar";
import { Route, useHistory } from "react-router-dom";
import Home from "./components/screens/Home";
import Signin from "./components/screens/Signin";
// import Profile from "./components/screens/Profile";
import Signup from "./components/screens/Signup";
import CreatePost from "./components/screens/CreatePost";
import UserProfile from "./components/screens/UserProfile";
import { reducer, initialState } from "./reducers/user";

export const UserContext = createContext();

function App() {
  const history = useHistory();
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch({ type: "USER", payload: user });
    } else {
      history.push("/signin");
    }
  }, []);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <NavBar />
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/signin">
          <Signin />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        {/* <Route exact path="/profile">
          <Profile />
        </Route> */}
        <Route path="/create">
          <CreatePost />
        </Route>
        <Route path="/profile/:userId">
          <UserProfile />
        </Route>
      </div>
    </UserContext.Provider>
  );
}

export default App;
