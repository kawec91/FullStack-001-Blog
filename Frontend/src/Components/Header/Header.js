import { Outlet } from "react-router-dom";
import Menu from "../Menu/Menu";
import { useEffect, useState } from "react";


export default function Header() {
    const [needLogin, setLoginState] = useState();

    useEffect(() => {
        localStorage.getItem("eingeloggt") === undefined || localStorage.getItem("eingeloggt") === null || localStorage.getItem("eingeloggt") === "0" ? setLoginState(<></>)
            : setLoginState(<Menu />);
    }, []);
    return (
        <>
            <header>{needLogin}</header>
            <hr />
            <Outlet />
        </>
    );
}