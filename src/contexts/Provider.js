import React, { createContext, useState, useContext, useReducer } from "react"
import { getFetch } from "../helperFunctions/Fetch"

export const UserContext = createContext()
export const DictContext = createContext()
export const UpdateContext = createContext()
export const ThemeContext = createContext()

export function useUser() {
    return useContext(UserContext)
}

export function useDict() {
    return useContext(DictContext)
}

export function useUpdate() {
    return useContext(UpdateContext)
}

export function useTheme() {
    return useContext(ThemeContext)
}

const editWord = async (value, update = false) => {
    if (value === "") {
        return { word: value, definition: "", modalOpen: true, update: update }
    }

    const res = await getFetch(
        "http://127.0.0.1:5000/find",
        { word: value, regex: "False" },
        true
    )

    if (res.length === 0)
        return { word: value, definition: "", modalOpen: true, update: update }
    else return { ...res[0], modalOpen: true, update: update }
}

function reducer(state, action) {
    switch (action.type) {
        case "setOpen":
            return { ...state, modalOpen: true }
        case "setClose":
            return { modalOpen: false, word: "", definition: "" }
        case "edit":
            return action.payload
        case "updateDefinition":
            return { ...state, definition: action.payload }
        default:
            return state
    }
}

export default function Provider({ children }) {
    const isLoggedIn = async () => {
        const res = await getFetch(
            "http://127.0.0.1:5000/check_login",
            {},
            true
        )
        if (res.loggedIn != null) setUser(res)
    }

    const [user, setUser] = useState(() => {
        isLoggedIn()
        return { loggedIn: false }
    })

    const [dictionary, setDictionary] = useState({ searchValue: "", dict: [] })

    const updateDict = (value) => {
        if (value == null) value = dictionary.searchValue
        getFetch(
            "http://127.0.0.1:5000/find",
            { word: value },
            true
        ).then((res) => setDictionary({ searchValue: value, dict: res }))
    }

    const initialState = {
        word: "",
        definition: "",
        modalOpen: false,
    }
    const [update, dispatchUpdate] = useReducer(reducer, initialState)

    const asyncWrapper = (dispatch) => {
        return (action) => {
            switch (action.type) {
                case "editWord":
                    editWord(action.payload).then((res) =>
                        dispatch({ type: "edit", payload: res })
                    )
                    break
                case "editWordExternal":
                    dispatch({ type: "setOpen" })
                    editWord(action.payload, true).then((res) =>
                        dispatch({ type: "edit", payload: res })
                    )
                    break
                default:
                    dispatch(action)
            }
        }
    }

    const asyncDispatchUpdate = asyncWrapper(dispatchUpdate)

    const [darkTheme, setDarkTheme] = useState(false)

    return (
        <UserContext.Provider value={[user, setUser]}>
            <DictContext.Provider value={[dictionary, updateDict]}>
                <UpdateContext.Provider value={[update, asyncDispatchUpdate]}>
                    <ThemeContext.Provider value={[darkTheme, setDarkTheme]}>
                        {children}
                    </ThemeContext.Provider>
                </UpdateContext.Provider>
            </DictContext.Provider>
        </UserContext.Provider>
    )
}
