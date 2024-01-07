"use client";
import Link from "next/link";
import { useRouter } from "next/navigation.js";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  //login
  async function handleLogin(e) {
    e.preventDefault();

    //fetches the backend route
    const response = await fetch("/api/users/login", {
      method: "POST",

      body: JSON.stringify({ username, password }),
    });
    const info = await response.json();
    if (info.error) {
      return setError(info.error);
    }
    //refresh page and go to another page
    router.push("/");
    router.refresh();
  }

  return (
    <div>
      <div className="login-register-form">
        <form onSubmit={handleLogin}>
          <div className="log-reg-header">
            <h3>Log in</h3>
          </div>

          <div className="login-register-input-container">
            <input
              className="username-password-input"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              placeholder="Username.."
            />
            <input
              className="username-password-input"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="password.."
              type="password"
            />
          </div>
          <p>{error}</p>
          <p>
            Want to Register ?<Link href={"/register"}> Sign Up</Link>
          </p>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
