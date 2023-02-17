import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, emailupdate] = useState("");
  const [password, passwordupdate] = useState("");

  const usenavigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const ProceedLogin1 = (e) => {
    let regobj = { email, password };

    e.preventDefault();
    if (validate()) {
      fetch("http://localhost:8000/user/" + email, {
        method: "GET",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(regobj),
      })
        .then((res) => {
          return res.json();
        })
        .then((resp) => {
          console.log(resp);
        })
        .catch((err) => {
          alert("Login falló debido a: " + err.message);
        });
    }
  };

  const ProceedLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      ///implentation
      // console.log('proceed');
      fetch("http://localhost:8000/user/" + email)
        .then((res) => {
          return res.json();
        })
        .then((resp) => {
          //console.log(resp)
          if (Object.keys(resp).length === 0) {
            alert("Please Enter valid username");
          } else {
            if (resp.password === password) {
              alert("Success");
              sessionStorage.setItem("email", email);
              usenavigate("/");
            } else {
              alert("Please Enter valid credentials");
            }
          }
        })
        .catch((err) => {
          alert("Login Failed due to :" + err.message);
        });
    }
  };

  const ProceedLoginusingAPI = (e) => {
    e.preventDefault();
    if (validate()) {
      ///implentation
      // console.log('proceed');
      let inputobj = { email: email, password: password };
      fetch("https://localhost:44308/User/Authenticate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(inputobj),
      })
        .then((res) => {
          return res.json();
        })
        .then((resp) => {
          console.log(resp);
          if (Object.keys(resp).length === 0) {
            alert("Login failed, invalid credentials");
          } else {
            alert("Success");
            sessionStorage.setItem("email", email);
            sessionStorage.setItem("jwttoken", resp.jwtToken);
            usenavigate("/");
          }
        })
        .catch((err) => {
          alert("Login Failed due to :" + err.message);
        });
    }
  };

  const validate = () => {
    let result = true;
    if (email === "" || email === null) {
      result = false;
      alert("Por favor, ingrese un email");
    }

    if (password === "" || password === null) {
      result = false;
      alert("Por favor, ingrese una contraseña");
    }
    return result;
  };

  return (
    <div>
      <form onSubmit={ProceedLoginusingAPI}>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            User name
          </label>
          <input
            value={email}
            onChange={(e) => emailupdate(e.target.value)}
            type="text"
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
            value={password}
            onChange={(e) => passwordupdate(e.target.value)}
            type="password"
            class="form-control"
            id="exampleInputPassword1"
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Login
        </button>
        <Link className="btn btn-danger" to={"/register"}>
          Nuevo usuario
        </Link>
      </form>
    </div>
  );
};
