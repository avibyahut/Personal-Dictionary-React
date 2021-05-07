import { Chip } from "@material-ui/core"
import React, { useState } from "react"
import { useUpdate } from "../contexts/Provider"

export default function ChipsDisplay() {
    const [update, dispatchUpdate] = useUpdate()
    const [dragIndex, setDragIndex] = useState(-1)

    const handleDelete = (index) => {
        dispatchUpdate({
            type: "deleteDefinition",
            payload: index,
        })
    }

    const handleDrag = (idx) => {
        dispatchUpdate({
            type: "shuffleDefinition",
            payload: {
                dragIndex: dragIndex,
                insertIndex: idx,
            },
        })
    }

    return (
        <div>
            {update.definition.map((data, idx) => {
                return (
                    <Chip
                        draggable
                        onDragStart={() => setDragIndex(idx)}
                        onDrop={() => handleDrag(idx)}
                        onDragEnter={(e) => e.preventDefault()}
                        onDragOver={(e) => e.preventDefault()}
                        label={data}
                        key={idx}
                        onDelete={() => handleDelete(idx)}
                    ></Chip>
                )
            })}
        </div>
    )
}
