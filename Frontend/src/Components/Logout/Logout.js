import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Logout() {
    return (
        <div>
            <h3>Du bist ausgeloggt</h3>
            <p>Vielen Dank fur deinen Besuch. Bis dann. Back to <Link to={'/'}>HomePage</Link></p>
        </div>
    )
}