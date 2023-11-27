import { useState } from "react"
import readJsonFromServer from "../../readJsonFromServer";
import FreundCard from "../FreundCard/FreundCard";
import classes from "./Finden.module.css";

export default function Finden() {
    const [searchResults, updateResults] = useState();
    const [searchValue, updateValue] = useState();

    function freundSearch() {
        console.log(searchValue);
        let myList = [];
        readJsonFromServer(`http://localhost:8801/freunde/auflisten/${searchValue}`, (r) => {
            if (r) {
                r.forEach(element => {
                    console.log("e: ", element);
                    myList.push(<FreundCard id={element.KontoNr} key={`fr-${element.KontoNr}`} searchCard={1} />)
                    updateResults(myList);
                });
            }
        })
    }
    return (
        <div>
            <div className={classes.formDiv}>
                <input type="text" placeholder="Freund ID" onKeyUp={(e) => updateValue(e.target.value)} />
                <button onClick={freundSearch}>Suchen</button>
            </div>
            <hr />
            <ul className={classes.findenResultListe}>
                {searchResults}
            </ul>
        </div>
    )
}