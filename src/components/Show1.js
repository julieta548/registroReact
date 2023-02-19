import React, { useState, useEffect } from "react";
import { Link, useAsyncError } from "react-router-dom";
import {
  collection,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { async } from "@firebase/util";

const MySwal = withReactContent(Swal);

const Show1 = () => {
  //1- configuramos los hooks

  const [mensajes, setMensajes] = useState([]);
  //2- referenciamos a la DB de Firestore

  const mensajesCollection = collection(db, "mensajes");
  //3- funcion para mostrar TODOS los Docs

  const getMensajes = async () => {
    const data = await getDocs(mensajesCollection);

    setMensajes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    console.log(mensajes);
  };
  //4- funcion para eliminar un doc

  const deleteMensaje = async (id) => {
    const mensajeDoc = doc(db, "mensajes", id);
    await deleteDoc(mensajeDoc);
    getMensajes();
  };

  //5- funcion de confirmacion para sweet alert 2

  const confirmDelete = (id) => {
    MySwal.fire({
      title: "¿Borrar mensaje?",
      text: "Esta acción no se puede revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "¡Sí, borarlo!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMensaje(id);
        Swal.fire(
          "Borrado",
          "El mensaje ha sido borrado.",
          "Realizado con éxito."
        );
      }
    });
  };
  //6- usamos useEffect

  useEffect(() => {
    getMensajes();
  }, []);

  //7- devolvemos vista de nuestro componente

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="d-grid gap-2">
              <Link to="/create" className="btn btn-primary mt-2 mb-2">
                Crear
              </Link>
            </div>
            <table className="table table-dark table-hover">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Mensaje</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {mensajes.map((mensaje) => (
                  <tr key={mensaje.id}>
                    <td>{mensaje.nombre}</td>
                    <td>{mensaje.email}</td>
                    <td>{mensaje.mensaje}</td>
                    <td>
                      <Link
                        to={`/edit/${mensaje.id}`}
                        className="btn btn-light"
                      >
                        <i className="fa-solid fa-pencil"></i>
                      </Link>
                      <button
                        onClick={() => {
                          confirmDelete(mensaje.id);
                        }}
                        className="btn btn-danger"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Show1;
