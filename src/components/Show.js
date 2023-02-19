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

const Show = () => {
  //1- configuramos los hooks

  const [products, setProducts] = useState([]);
  //2- referenciamos a la DB de Firestore

  const productsCollection = collection(db, "products");
  //3- funcion para mostrar TODOS los Docs

  const getProducts = async () => {
    const data = await getDocs(productsCollection);

    setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    console.log(products);
  };
  //4- funcion para eliminar un doc

  const deleteProduct = async (id) => {
    const productDoc = doc(db, "products", id);
    await deleteDoc(productDoc);
    getProducts();
  };

  //5- funcion de confirmacion para sweet alert 2

  const confirmDelete = (id) => {
    MySwal.fire({
        title: '¿Borrar usuario?',
        text: 'Esta acción no se puede revertir',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: '¡Sí, borarlo!'
    }).then((result) => {
        if (result.isConfirmed) {
            deleteProduct(id);
            Swal.fire(
                'Borrado',
                'El usuario ha sido borrado.',
                'Realizado con éxito.'
            )
        }
    })
  }
  //6- usamos useEffect

  useEffect(() => {
    getProducts();
  }, []);

  //7- devolvemos vista de nuestro componente

  return (
  
  <>
  <div className="container">
    <div className="row">
        <div className="col">
            <div className="d-grid gap-2">
                <Link to="/create" className="btn btn-primary mt-2 mb-2">Create</Link>
            </div>
            <table className="table table-dark table-hover">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Contraseña</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.nombre}</td>
                            <td>{product.email}</td>
                            <td>{product.contraseña}</td>
                            <td>
                                <Link to={`/edit/${product.id}`} className="btn btn-light"><i className="fa-solid fa-pencil"></i></Link>
                                <button onClick={() => { confirmDelete(product.id) } } className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
                            </td>

                        </tr>
                    )
                    )}

                </tbody>

            </table>

        </div>
    </div>
  </div>
  </>
  
  );
};

export default Show;
