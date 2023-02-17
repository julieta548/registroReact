import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [email, emailchange] = useState("");
  const [password, passwordchange] = useState("");
  const [username, usernamechange] = useState("");

  const isValidate = () => {
    let isProceed = true;
    if (username === null || username === "") {
      isProceed = false;
    }

    if (!isProceed) {
      alert("Ingresá un nombre de usuario");
    }
    return isProceed;
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let regobj = { username, email, password };
    ///console.log(regobj);

    if (isValidate()) {
      fetch("http://localhost:8000/user", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(regobj),
      })
        .then((res) => {
          alert("Registro exitoso!");
          navigate("/");
        })
        .catch((err) => {
          alert("Registro falló.");
        });
    }
  };

  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetch("https://heartfelt-starship-f7154b.netlify.app/user")
      .then((response) => response.json())
      .then((data) => setRecords(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <div>
        {records.map((record) => (
          <div key={record.id}>
            <h2>{record.username}</h2>
            <p>{record.password}</p>
            <p>{record.email}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            User name
          </label>
          <input
            required
            value={username}
            onChange={(e) => usernamechange(e.target.value)}
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
            required
            value={email}
            onChange={(e) => emailchange(e.target.value)}
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Password
          </label>
          <input
            required
            value={password}
            onChange={(e) => passwordchange(e.target.value)}
            type="password"
            class="form-control"
            id="exampleInputPassword1"
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Register
        </button>
        <a className="btn btn-danger">Back</a>
      </form>
    </div>
  );
};
