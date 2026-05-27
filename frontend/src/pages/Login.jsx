import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      console.log(response.data);

      localStorage.setItem(
        "token",
        response.data.token
      );

      const tokenData = JSON.parse(
        atob(response.data.token.split(".")[1])
        );

        if (tokenData.role === "doctor") {
        navigate("/doctor-dashboard");
        } else {
        navigate("/patient-dashboard");
        }
    } catch (error) {
      console.log(error);

      alert("Login Failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <br />
        <br />

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;