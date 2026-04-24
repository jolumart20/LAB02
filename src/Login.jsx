import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      });

      console.log("STATUS:", res.status);

      const text = await res.text();
      console.log("RESPUESTA RAW:", text);

      if (!res.ok) {
        throw new Error("Error en login");
      }

      const data = JSON.parse(text);
      console.log("DATA:", data);

      localStorage.setItem("token", data.token);

      //  REDIRECCIÓN
      navigate("/dashboard");

    } catch (error) {
      console.error("ERROR:", error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow" style={{ minWidth: 350 }}>
        <h2 className="mb-4 text-center">Login</h2>
        <div className="mb-3">
          <label className="form-label">Usuario</label>
          <input
            className="form-control"
            placeholder="usuario"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            placeholder="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-primary w-100" onClick={handleLogin}>
          Entrar
        </button>
      </div>
    </div>
  );
}

export default Login;