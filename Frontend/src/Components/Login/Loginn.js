import React, { useState } from "react";
import classes from "./Loginn.module.css";
import { Link } from "react-router-dom";
import readJsonFromServer from "../../readJsonFromServer"
import Willkomen from "../Willkomen/Willkomen";
import Oops from "../../Oops/Oops";

export default function Loginn() {
    const [showErr, openErr] = useState(false);

    function login() {
        const userLogin = document.getElementsByTagName("input")[0].value;
        const userPassword = document.getElementsByTagName("input")[1].value;

        readJsonFromServer(`http://localhost:8801/login/${userLogin}/${userPassword}`, (r) => {
            if (r === 0) {
                openErr(true);
            }
            if (r[0].KontoNr !== undefined && r[0].KontoNr !== null && r[0].KontoNr !== "") {
                localStorage.setItem("eingeloggt", 1);
                localStorage.setItem("uid", r[0].KontoNr);
                localStorage.setItem("user", JSON.stringify(r[0]));

                setTimeout(window.location.reload(), 1);
            }

        });



        document.getElementsByTagName("input")[0].value = "";
        document.getElementsByTagName("input")[1].value = "";
    }

    return (
        localStorage.getItem("eingeloggt") === undefined || localStorage.getItem("eingeloggt") === null || localStorage.getItem("eingeloggt") === "0" ?
            <div className={classes.homeDiv}>
                <input type="text" placeholder="Login" />
                <input type="password" placeholder="Password" />
                <button onClick={login}>Login</button>
                <p>You don't have an account? <Link to={'/register'}>Register now!</Link></p>
                {showErr && <Oops openErr={openErr} titel='Oops, es ist was schiefgelaufen' text='Benutzername oder Kennwort ist falsch' />}
            </div> : <Willkomen />
    );
}