import React, { useReducer } from "react"
import Modal from "@material-ui/core/Modal"
import { useUser, useTheme } from "../contexts/Provider"
import handleLogin, { handleRegister } from "../helperFunctions/LoginHelper"
import lightStyles from "./Navbar.module.css"
import darkStyles from "./DarkNavbar.module.css"
import { Button, TextField, Card } from "@material-ui/core"

function reducer(state, action) {
    switch (action.type) {
        case "setOpen":
            return { open: action.payload, loginError: "", registerError: "" }
        case "setLoginError":
            return { ...state, loginError: action.payload }
        case "setRegisterError":
            return { ...state, registerError: action.payload }
        case "clearError":
            return { ...state, loginError: "", registerError: "" }
        default:
            return state
    }
}

export default function LoginModal() {
    const initialState = {
        open: 0,
        loginError: "",
        registerError: "",
    }

    const [modalState, dispatchModal] = useReducer(reducer, initialState)
    const [, setUser] = useUser()
    const [darkTheme] = useTheme()
    const styles = darkTheme ? darkStyles : lightStyles

    const loginBody = (
        <Card className={styles.modal}>
            <Card variant="outlined" className={styles.login}>
                <h2>Login</h2>
                <div className={styles.error}>
                    {modalState.loginError + " "}
                </div>
                <form
                    className={styles.form}
                    onSubmit={(e) => handleLogin(e, dispatchModal, setUser)}
                >
                    <TextField
                        className={styles.text}
                        label="E-Mail"
                        type="email"
                        name="email"
                        id="email"
                        required
                    />
                    <TextField
                        className={styles.text}
                        type="password"
                        label="Password"
                        name="password"
                        id="pass"
                        required
                    />
                    <Button
                        className={styles.login_button}
                        variant={darkTheme ? "contained" : "outlined"}
                        color="primary"
                        type="submit"
                    >
                        Login
                    </Button>
                </form>
            </Card>
            <div className={styles.footer}>
                Not a User?{" "}
                <button
                    className={styles.link}
                    onClick={() =>
                        dispatchModal({ type: "setOpen", payload: 2 })
                    }
                >
                    Regiter
                </button>
            </div>
        </Card>
    )

    const registerBody = (
        <Card className={styles.modal}>
            <Card variant="outlined" className={styles.login}>
                <h2>Register</h2>
                <div className={styles.error}>{modalState.registerError}</div>
                <form
                    className={styles.form}
                    onSubmit={(e) => handleRegister(e, dispatchModal)}
                >
                    <TextField
                        className={styles.text}
                        label="User Name"
                        type="text"
                        name="username"
                        id="username"
                        required
                    />
                    <TextField
                        className={styles.text}
                        label="E-Mail"
                        type="email"
                        name="email"
                        id="email"
                        required
                    />
                    <TextField
                        className={styles.text}
                        label="Password"
                        type="password"
                        name="password"
                        id="pass"
                    />
                    <TextField
                        className={styles.text}
                        label="Re-Enter Password"
                        type="password"
                        name="repassword"
                        id="repass"
                    />
                    <Button
                        className={styles.login_button}
                        variant={darkTheme ? "contained" : "outlined"}
                        color="primary"
                        type="submit"
                    >
                        Register
                    </Button>
                </form>
            </Card>
            <div className={styles.footer}>
                Already Registered?{" "}
                <button
                    className={styles.link}
                    onClick={() =>
                        dispatchModal({ type: "setOpen", payload: 1 })
                    }
                >
                    Login
                </button>
            </div>
        </Card>
    )

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                type="button"
                onClick={() => dispatchModal({ type: "setOpen", payload: 1 })}
            >
                Login
            </Button>
            <Modal
                open={modalState.open === 1}
                onClose={() => dispatchModal({ type: "setOpen", payload: 0 })}
            >
                {loginBody}
            </Modal>
            <Modal
                open={modalState.open === 2}
                onClose={() => dispatchModal({ type: "setOpen", payload: 0 })}
            >
                {registerBody}
            </Modal>
        </div>
    )
}
