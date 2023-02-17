import React, {useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export const Home = () => {
  // const usenavigate = useNavigate();
  // const [customerlist, listupdate] = useState(null);
  // const [displayemail, displayemailupdate] = useState("");

  // useEffect(() => {
  //   let email = sessionStorage.getItem("email");
  //   if (email === "" || email === null) {
  //     usenavigate("/login");
  //   } else {
  //     displayemailupdate(email);
  //   }

  //   let jwttoken = sessionStorage.getItem("jwttoken");
  //   fetch("https://localhost:44308/Customer", {
  //     headers: {
  //       Authorization: "bearer " + jwttoken,
  //     },
  //   })
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((resp) => {
  //       listupdate(resp);
  //     })
  //     .catch((err) => {
  //       console.log(err.messsage);
  //     });
  // }, []);


 
  return (
    
    <div>
      <h1>Hola</h1>
    </div>
      )}
