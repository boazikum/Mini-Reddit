import { FormEvent, useEffect, useState } from "react";
import CryptoJs from "crypto-js";
import usePost from "../hooks/usePost";
import { Redirect } from "react-router-dom";
import { useUserContext } from "./userContext";

interface id {
  id: number;
}

function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { data, error, postData } = usePost<id>();
  const { setUser } = useUserContext();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // not using a useState cause state updates are async
    const hashedPassword = CryptoJs.SHA256(password).toString();
    // console.log({ username, password, hashedPassword });

    postData({
      url: "http://127.0.0.1:3000/api/user/login",
      body: {
        username: username,
        password: hashedPassword,
      },
    });
  };

  useEffect(() => {
    if (data.length) {
      setUser({ username: username, id: data[0].id });
    }
  }, [data]);

  return (
    <>
      <h2>Login Form:</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>username:</label>
        <input
          type="text"
          required
          value={username}
          className="loginInput"
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label>password:</label>
        <input
          type="password"
          required
          value={password}
          className="loginInput"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        {error && <p className="error">{error}</p>}
        <button className="login-button">Login</button>
      </form>
      {Boolean(data.length) && <Redirect to="/" />}
    </>
  );
}

export default LoginPage;
