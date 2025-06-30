import { Link } from "react-router-dom";
import { useUserContext } from "./userContext";

const NavBar = () => {
  const { setUser, user } = useUserContext();

  return (
    <nav className="navbar">
      <h1>The Blog</h1>
      <div className="links">
        <Link to="/">Home</Link> {/* like a a and href but better for react */}
        <Link to="/create">New blog</Link>
        {user.id ? (
          <button
            className="logout-button"
            onClick={() => setUser({ username: "", id: 0 })}
          >
            Logout
          </button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
