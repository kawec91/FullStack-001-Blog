import { useEffect, useState } from "react"
import readJsonFromServer from "../../readJsonFromServer";
import FreundCard from "../FreundCard/FreundCard";
import classes from './Freunde.module.css';
import Oops from "../../Oops/Oops";

export default function Freunde() {
    const [freundeListe, freundeListeUpdate] = useState([]);
    const [showInfo, setInfo] = useState(false)

    function loadFreundListe() {
        readJsonFromServer(`http://localhost:8801/freund/liste/${localStorage.getItem('uid')}`, (r) => {
            let myListe = [];
            r.forEach((i) => {
                myListe.push(<FreundCard id={i.FreundKontoNr} info={setInfo} key={`freund-${i.FreundKontoNr}`} searchCard={0} />);

            });
            freundeListeUpdate(myListe);
        });
    }

    useEffect(() => {
        loadFreundListe();
    }, []);
    return <div>
        <h3>Freund Liste</h3>
        <hr />
        <ul className={classes.freundListeStyle}>
            {freundeListe}
        </ul>
        {showInfo && <Oops openErr={setInfo} titel='Friend removed' text='You are not friends anymore.' />}
    </div>
}
