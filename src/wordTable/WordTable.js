import React from "react"
import { useDict, useTheme, useUpdate, useUser } from "../contexts/Provider"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { getFetch } from "../helperFunctions/Fetch"
import lightStyles from "./WordTable.module.css"
import darkStyles from "./DarkWordTable.module.css"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@material-ui/core"

export default function WordTable() {
    const [dict, updateDict] = useDict()
    const [user] = useUser()
    const dispatchUpdate = useUpdate()[1]
    const [darkTheme] = useTheme()
    const styles = darkTheme ? darkStyles : lightStyles

    const deleteWord = (value) => {
        getFetch(
            "http://127.0.0.1:5000/delete",
            { word: value },
            true
        ).then((res) => updateDict())
    }

    return user.loggedIn ? (
        <Table className={styles.table}>
            <TableHead>
                <TableRow>
                    <TableCell className={styles.cell_head}>Word</TableCell>
                    <TableCell className={styles.cell_head}>
                        Definition
                    </TableCell>
                    <TableCell className={styles.cell_head} align="center">
                        Action
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {dict.dict.map((word) => {
                    return (
                        <TableRow className={styles.row_body} key={word.word}>
                            <TableCell className={styles.word_cell}>
                                {word.word}
                            </TableCell>
                            <TableCell className={styles.definition_cell}>
                                <ul>
                                    {word.definition.map((def, idx) => {
                                        return <li key={idx}>{def}</li>
                                    })}
                                </ul>
                            </TableCell>
                            <TableCell className={styles.action_cell}>
                                <div className={styles.action}>
                                    <FontAwesomeIcon
                                        icon={faEdit}
                                        onClick={() =>
                                            dispatchUpdate({
                                                type: "editWordExternal",
                                                payload: word.word,
                                            })
                                        }
                                    ></FontAwesomeIcon>
                                    <FontAwesomeIcon
                                        icon={faTrashAlt}
                                        onClick={() => deleteWord(word.word)}
                                    ></FontAwesomeIcon>
                                </div>
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    ) : (
        <></>
    )
}
