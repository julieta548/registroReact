import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import '../css/estilos.css'

const Mensajeria = () => {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [nombre, setNombre] = useState("");

  const navigate = useNavigate();

  const mensajesCollection = collection(db, "mensajes");

  const store = async (e) => {
    e.preventDefault();
    await addDoc(mensajesCollection, {
      nombre: nombre,
      email: email,
      mensaje: mensaje,
    });
    navigate("/");
  };

  return (
    <>
      <div className="container contenedor">
        <form onSubmit={store}>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              <h4>Nombre</h4>
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
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
            <h4>Email</h4>

            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
            <h4>Mensaje</h4>

            </label>
            <input
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
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

export default Mensajeria;
