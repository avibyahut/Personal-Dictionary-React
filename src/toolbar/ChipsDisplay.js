import { Chip } from "@material-ui/core"
import React from "react"
import { useUpdate } from "../contexts/Provider"

export default function ChipsDisplay() {
    const [update, dispatchUpdate] = useUpdate()

    const handleDelete = (index) => {
        dispatchUpdate({
            type: "deleteDefinition",
            payload: index,
        })
    }
    return (
        <div>
            {update.definition.map((data, idx) => {
                return (
                    <Chip
                        label={data}
                        key={idx}
                        onDelete={() => handleDelete(idx)}
                    ></Chip>
                )
            })}
        </div>
    )
}
