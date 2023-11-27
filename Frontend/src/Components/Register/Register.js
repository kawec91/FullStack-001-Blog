import React, { useState } from "react";
import classes from "./register.module.css"
import { Link } from "react-router-dom";
import readTextFromServer from "../../readTextFromServer";
import Willkomen from "../Willkomen/Willkomen";
import Loginn from "../Login/Loginn";

export default function Register() {
    const [component, updateComponent] = useState(undefined);
    function register() {
        console.log("REGISTER BTN");
        const userEmail = document.getElementsByTagName("input")[0].value;
        const userLogin = document.getElementsByTagName("input")[1].value;
        const userVorname = document.getElementsByTagName("input")[2].value;
        const userNachname = document.getElementsByTagName("input")[3].value;
        const userPassword = document.getElementsByTagName("input")[4].value;
        const userPassword2 = document.getElementsByTagName("input")[5].value;

        let myObj = {
            benutzer: userLogin,
            kennwort: userPassword,
            vorname: userVorname,
            nachname: userNachname,
            email: userEmail
        }

        let txtObj = JSON.stringify(myObj);

        if (userPassword !== userPassword2) {
            console.log('Passwords are not the same.');
        } else {
            readTextFromServer(`http://localhost:8801/registrieren/${txtObj}`, (r) => {
                console.log(r);
                if (r === "Success") window.location.href = 'http://localhost:3000';
            })
        }

        //Clear formular
        document.getElementsByTagName("input")[0].value = "";
        document.getElementsByTagName("input")[1].value = "";
        document.getElementsByTagName("input")[2].value = "";
        document.getElementsByTagName("input")[3].value = "";
        document.getElementsByTagName("input")[4].value = "";
        document.getElementsByTagName("input")[5].value = "";
    }
    return (
        <div className={classes.registerDiv}>
            <input type="text" placeholder="Email" />
            <input type="text" placeholder="Login" />
            <input type="text" placeholder="Vorname" />
            <input type="text" placeholder="Nachname" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Confirm password" />
            <button onClick={register}>Register</button>
            <p>Do you have already an account? Just <Link to={'/'}>login</Link></p>
        </div>
    )
}