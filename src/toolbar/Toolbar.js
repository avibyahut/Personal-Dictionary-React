import React, { useEffect, useState } from "react"
import { useDict, useUser, useTheme } from "../contexts/Provider"
import WordEditModal from "./WordEditModal"
import lightStyles from "./Toolbar.module.css"
import darkStyles from "./DarkToolbar.module.css"
import { Button, TextField } from "@material-ui/core"

export default function Toolbar() {
    const [user, setUser] = useUser()
    const updateDict = useDict()[1]
    const [searchValue, setSearchValue] = useState("")
    const [darkTheme] = useTheme()
    const styles = darkTheme ? darkStyles : lightStyles

    useEffect(() => {
        if (user.loggedIn) {
            updateDict(searchValue)
        }
    }, [user, searchValue])

    const handleLogout = () => {
        localStorage.removeItem("TOKEN")
        setUser({ loggedIn: false })
    }

    return user.loggedIn ? (
        <div className={styles.toolbar}>
            <TextField
                label="Search Word"
                type="text"
                className={styles.search}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <WordEditModal></WordEditModal>
            <Button
                style={{ marginLeft: "1%" }}
                variant="contained"
                color="secondary"
                onClick={handleLogout}
            >
                Logout
            </Button>
        </div>
    ) : (
        <></>
    )
}
