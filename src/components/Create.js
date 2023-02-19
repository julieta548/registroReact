import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";

const Create = () => {
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [nombre, setNombre] = useState("");

  const navigate = useNavigate();

  const productsCollection = collection(db, "products");

  const store = async (e) => {
    e.preventDefault();
    await addDoc(productsCollection, {
      nombre: nombre,
      email: email,
      contraseña: contraseña,
    });
    navigate("/");
  };

  return (
    <>
      <div>
        <form onSubmit={store}>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Email address
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              type="password"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Name
            </label>
            <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>

          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Create;
