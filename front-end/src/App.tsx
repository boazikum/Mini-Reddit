import NavBar from "./componetns/NavBar";
import Home from "./componetns/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Create from "./componetns/Create";
import BlogDetails from "./componetns/BlogDetails";
import NotFound from "./componetns/NotFound";
import LoginPage from "./componetns/LoginPage";
import { UserProvider } from "./componetns/userContext";
import RegisterPage from "./componetns/register";

function App() {
  return (
    <Router>
      <UserProvider>
        <div className="App">
          <NavBar />
          <div className="content">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/create">
                <Create />
              </Route>
              <Route path="/blogs/:id">
                <BlogDetails />
              </Route>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/register">
                <RegisterPage />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </div>
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;
