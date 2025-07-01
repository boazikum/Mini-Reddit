import { FormEvent, useEffect, useState } from "react";
import CryptoJs from "crypto-js";
import usePost from "../hooks/usePost";
import { Redirect } from "react-router-dom";
import { useUserContext } from "./userContext";

interface id {
  id: number;
}

function RegisterPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { data, error, postData } = usePost<id>();
  const { setUser } = useUserContext();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const hashedPassword = CryptoJs.SHA256(password).toString();

    postData({
      url: "http://127.0.0.1:3000/api/user",
      body: {
        username: username,
        password: hashedPassword,
      },
    });
  };

  useEffect(() => {
    console.log(data);
    if (data.length) {
      setUser({ username: username, id: data[0].id });
    }
  }, [data]);

  return (
    <>
      <h2>register Form:</h2>
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
        <button className="login-button">create user</button>
      </form>
      {Boolean(data.length) && <Redirect to="/" />}
    </>
  );
}

export default RegisterPage;
