import React from "react"
import { useUser, useTheme } from "../contexts/Provider"
import LoginModal from "./LoginModal"
import lightStyles from "./Navbar.module.css"
import darkStyles from "./DarkNavbar.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCloudMoon, faSun } from "@fortawesome/free-solid-svg-icons"

export default function Navbar() {
    const [user] = useUser()
    const [darkTheme, setDarkTheme] = useTheme()
    const styles = darkTheme ? darkStyles : lightStyles

    const login = <LoginModal></LoginModal>
    const username = <div>Hello, {user.username}</div>
    return (
        <div className={styles.navbar}>
            <div className={styles.head}>Personal Dictionary</div>
            <div className={styles.info}>
                {user.loggedIn ? username : login}
            </div>
            <FontAwesomeIcon
                icon={darkTheme ? faCloudMoon : faSun}
                size="2x"
                onClick={() => setDarkTheme(!darkTheme)}
            ></FontAwesomeIcon>
        </div>
    )
}
