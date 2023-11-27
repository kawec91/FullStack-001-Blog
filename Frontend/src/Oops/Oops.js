import { Link } from 'react-router-dom';
import classes from './Oops.module.css'

export default function Oops({ openErr, titel, text }) {
    function close() {
        openErr(false);
    }
    return <div className={classes.errDiv}>
        <div>
            <button onClick={close}>X</button>
            <h3>{titel}</h3>
            <p>{text}</p>
            <hr />
        </div>
    </div>
}