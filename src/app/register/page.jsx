"use client";
import Link from "next/link";
import { useRouter } from "next/navigation.js";
import { useState } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  async function handleRegister(e) {
    e.preventDefault();
    const response = await fetch("/api/users/register", {
      method: "POST",

      body: JSON.stringify({ username, password }),
    });
    const info = await response.json();
    if (info.error) {
      return setError(info.error);
    }
    router.push("/");
    router.refresh();
  }

  return (
    <div>
      <div className="login-register-form">
        <form onSubmit={handleRegister}>
          <div className="log-reg-header">
            <h3>Sign Up</h3>
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

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}
