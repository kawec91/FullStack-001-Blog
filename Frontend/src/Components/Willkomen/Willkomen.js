import { useEffect, useState } from "react"
import readTextFromServer from "../../readTextFromServer";
import readJsonFromServer from "../../readJsonFromServer";
import BlogCard from "../BlogCard/BlogCard";
import classes from './Willkomen.module.css';

export default function Willkomen() {
    const [userData, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [btnState, changeBtnState] = useState(0);
    const [blogsData, setBlogs] = useState([]);
    const [blogList, setBlogList] = useState([]);

    function andern() {
        for (let i of document.getElementsByTagName("input")) {
            i.disabled = false;
        }
        changeBtnState(1);
    }
    function speichern() {

        const changes = {
            KontoNr: localStorage.getItem("uid"),
            Benutzer: document.getElementsByTagName("input")[0].value,
            Kennwort: document.getElementsByTagName("input")[1].value,
            Vorname: document.getElementsByTagName("input")[2].value,
            Nachname: document.getElementsByTagName("input")[3].value,
            Telefon: document.getElementsByTagName("input")[4].value,
            Email: document.getElementsByTagName("input")[5].value,
            Adresse: document.getElementsByTagName("input")[6].value,
            PLZ: document.getElementsByTagName("input")[7].value,
            Ort: document.getElementsByTagName("input")[8].value,
        }
        for (let i of document.getElementsByTagName("input")) {
            i.disabled = true
        }

        if (changes.Benutzer === "") {
            console.log("Benutzer feld ist empty");
        }
        if (changes.Kennwort === "") {
            console.log("Type your actuell Kennwort wenn du willst anderung speichern");
        }

        setUser(changes);
        localStorage.setItem("user", JSON.stringify(changes));

        //SQL
        readTextFromServer(`http://localhost:8801/datenSchreiben/${JSON.stringify(changes)}`, (r) => {
            console.log(r);
        })

        changeBtnState(0);
        console.log("New Item: ", changes);
        console.log(blogsData);
    }

    useEffect(() => {
        //Set Values
        document.getElementsByTagName("input")[0].value = userData.Benutzer;
        document.getElementsByTagName("input")[1].value = userData.Kennwort;
        document.getElementsByTagName("input")[2].value = userData.Vorname;
        document.getElementsByTagName("input")[3].value = userData.Nachname;
        document.getElementsByTagName("input")[4].value = userData.Telefon;
        document.getElementsByTagName("input")[5].value = userData.Email;
        document.getElementsByTagName("input")[6].value = userData.Adresse;
        document.getElementsByTagName("input")[7].value = userData.PLZ;
        document.getElementsByTagName("input")[8].value = userData.Ort;
        //BlogData
        readJsonFromServer(`http://localhost:8801/blog/leatest/${localStorage.getItem('uid')}`, (r) => {
            setBlogs(r);
            let ergListe = [];
            blogsData.forEach((blog) => {
                ergListe.push(<BlogCard titel={blog.Titel} text={blog.Text} id={blog.id} key={`blog-id-${blog.id}`} />);
                setBlogList(ergListe);
            });
        })
    }, [blogsData, userData.Adresse, userData.Benutzer, userData.Email, userData.Kennwort, userData.Nachname, userData.Ort, userData.PLZ, userData.Telefon, userData.Vorname]);
    return <div className={classes.willkomen}>
        <h3>Deine Daten</h3>
        <div className={classes.formDiv}>
            <input type="text" disabled />
            <input type="password" placeholder="Password" disabled />
            <input type="text" disabled />
            <input type="text" disabled />
            <input type="text" disabled />
            <input type="text" disabled />
            <input type="text" disabled />
            <input type="text" disabled />
            <input type="text" disabled />
            {btnState === 0 ? <button onClick={andern}>Andern</button> : <button onClick={speichern}>Speichern</button>}
        </div>
        <hr />
        {blogList}
    </div>
}