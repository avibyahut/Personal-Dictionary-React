import postFetch from "./Fetch"

export default async function handleLogin(e, dispatch, setUser) {
    e.preventDefault()
    dispatch({ type: "clearError" })

    const data = new FormData(e.target)
    const values = Object.fromEntries(data.entries())

    const login = await postFetch("http://127.0.0.1:5000/login", values)
    if (login.error) {
        dispatch({ type: "setLoginError", payload: login.error })
        console.log(login)
    } else if (login.loggedIn) {
        localStorage.setItem("TOKEN", login.token)
        setUser(login)
    } else console.log(login)
}

export async function handleRegister(e, dispatch) {
    e.preventDefault()
    dispatch({ type: "clearError" })

    const data = new FormData(e.target)
    const values = Object.fromEntries(data.entries())

    if (values.password !== values.repassword) {
        dispatch({
            type: "setRegisterError",
            payload: "Passwords do not match",
        })
        return
    } else if (values.password.length < 8) {
        dispatch({ type: "setRegisterError", payload: "Passwords too short" })
        return
    }
    const res = await postFetch("http://127.0.0.1:5000/register", values)
    if (res.success) {
        dispatch({ type: "setOpen", payload: 1 })
        alert(res.success)
    } else if (res.error) {
        dispatch({ type: "setRegisterError", payload: res.error })
    } else console.log(res)
}
