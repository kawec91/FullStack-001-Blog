import { Link } from "react-router-dom";
import classes from './Menu.module.css'

export default function Menu() {
    function clearStorage() {
        localStorage.setItem('eingeloggt', 0);
        localStorage.removeItem('uid');
        localStorage.removeItem('user');
        localStorage.removeItem('userBlogs');
        setTimeout(window.location.reload(), 1);
    }
    return <div className={classes.menuDiv}>
        <ul className={classes.menuListe}>
            <li><Link to={'/willkomen'}>Willkomen</Link></li>
            <li><Link to={'/blog'}>Mein Blog</Link></li>
            <li><Link to={'/finden'}>Freunde Finden</Link></li>
            <li><Link to={'/freunde'}>Meine Freunde</Link></li>
        </ul>
        <div className={classes.textColor}>
            <button onClick={clearStorage}><Link to={'/logout'}>Logout</Link></button>
        </div>
    </div>
}