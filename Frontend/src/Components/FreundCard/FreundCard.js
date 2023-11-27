import { useEffect, useState } from "react";
import readTextFromServer from "../../readTextFromServer";
import classes from "./FreundCard.module.css";
import readJsonFromServer from "../../readJsonFromServer";

export default function FreundCard({ searchCard, info, id }) {
    const [userVorname, setVorname] = useState("");
    const [userNachname, setNachname] = useState("");
    const [userTelefon, setTelefon] = useState("");
    const [userEmail, setEmail] = useState("");

    function removeFreund() {
        readTextFromServer(`http://localhost:8801/freund/entf/${localStorage.getItem('uid')}/${id}`, (r) => console.log(r))
        info(true);
    }
    function addFreund() {
        if (localStorage.getItem('uid') === id) {
            alert("Du kannst nicht sich auf liste addieren");
        } else {
            readTextFromServer(`http://localhost:8801/freundschaft/${localStorage.getItem('uid')}/${id}`, (r) => console.log(r))
        }
    }

    useEffect(() => {
        readJsonFromServer(`http://localhost:8801/freunde/auflisten/${id}`, (r) => {
            r.forEach((i) => {
                setVorname(i.Vorname);
                setNachname(i.Nachname);
                setTelefon(i.Telefon);
                setEmail(i.Email);
            })
        });
    }, []);
    return (
        <div className={classes.freundCardDiv}>
            <div className={classes.freundProfileDiv}>
                <img className={classes.freundProfileImg} src="https://imgs.search.brave.com/JGWPxhauRj9RlTNGHnXPUmfJHNQ5ewNHdaMF8PuEB_g/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/aW1hZ2VzcG91cnRv/aS5jb20vbGVzaW1h/Z2VzL2x1a3ktbHVr/ZS9waG90b3MtbHVr/eS1sdWtlLTEyLmpw/Zw" alt="profile" />
            </div>
            <div className={classes.freundDetails}>
                <h3 className={classes.freundDetailsName}>{userVorname} {userNachname} <label>(ID: {id})</label></h3>
                <div className={classes.freundDetailsContactDiv}>
                    <img src="https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_local_phone_48px-256.png" alt={"telefon"} />
                    <p>{userTelefon}</p>
                </div>
                <div className={classes.freundDetailsContactDiv}>
                    <img src="https://cdn4.iconfinder.com/data/icons/aiga-symbol-signs/439/aiga_mail-256.png" alt="email" />
                    <p>{userEmail}</p>
                </div>
            </div>
            <div className={classes.freundCardRemove}>
                {searchCard === 0 ? <button onClick={removeFreund}>Remove</button> : <button onClick={addFreund}>Add</button>}
            </div>
        </div>
    )
}