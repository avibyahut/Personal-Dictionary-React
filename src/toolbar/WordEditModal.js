import React, { useEffect, useRef, useState } from "react"
import { useDict, useUpdate, useTheme } from "../contexts/Provider"
import Modal from "@material-ui/core/Modal"
import postFetch from "../helperFunctions/Fetch"
import lightStyles from "./Toolbar.module.css"
import darkStyles from "./DarkToolbar.module.css"
import { Button, Card, TextField } from "@material-ui/core"

export default function WordEditModal() {
    const [update, dispatchUpdate] = useUpdate()
    const [, updateDict] = useDict()
    const [loading, setLoading] = useState(false)
    const [darkTheme] = useTheme()
    const styles = darkTheme ? darkStyles : lightStyles

    const define = useRef()
    const word = useRef()

    useEffect(() => {
        if (update.update) {
            if (word.current) word.current.value = update.word
        }

        if (define.current && word.current.value === update.word)
            define.current.value = update.definition
    }, [update])

    const handleUpdate = () => {
        setLoading(true)

        const data = { ...update }
        delete data.update
        delete data.modalOpen
        postFetch("http://127.0.0.1:5000/update", data, true).then((res) => {
            updateDict()
            setLoading(false)
            dispatchUpdate({ type: "setClose" })
        })
    }

    const body = (
        <Card className={styles.modal}>
            <Card variant="outlined" className={styles.inner_modal}>
                <h2>Add/Modify Words</h2>
                <TextField
                    label="Word"
                    className={styles.text}
                    type="text"
                    name="word"
                    id="word"
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) =>
                        dispatchUpdate({
                            type: "editWord",
                            payload: e.target.value,
                        })
                    }
                    inputRef={word}
                />
                <TextField
                    multiline
                    className={styles.text}
                    label="Definition"
                    name="definition"
                    id="definition"
                    inputRef={define}
                    rowsMax={6}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) =>
                        dispatchUpdate({
                            type: "updateDefinition",
                            payload: e.target.value,
                        })
                    }
                ></TextField>
                <Button
                    variant={darkTheme ? "contained" : "outlined"}
                    color="primary"
                    disabled={
                        loading ||
                        update.word === "" ||
                        update.definition === ""
                    }
                    onClick={handleUpdate}
                >
                    Update
                </Button>
            </Card>
        </Card>
    )
    return (
        <>
            <Button
                style={{ marginLeft: "auto" }}
                variant="contained"
                color="primary"
                type="button"
                onClick={() => dispatchUpdate({ type: "setOpen" })}
            >
                Add/Modify word
            </Button>
            <Modal
                open={update.modalOpen}
                onClose={() => dispatchUpdate({ type: "setClose" })}
            >
                {body}
            </Modal>
        </>
    )
}
