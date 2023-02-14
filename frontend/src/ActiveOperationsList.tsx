import { FC, useEffect, useMemo, useState } from "react"
import { DragDropContext, Draggable, Droppable, DroppableProps } from "react-beautiful-dnd"


const StrictModeDroppable = ({ children, ...props }: DroppableProps) => {
    const [enabled, setEnabled] = useState(false)
    useEffect(() => {
        const animation = requestAnimationFrame(() => setEnabled(true))
        return () => {
            cancelAnimationFrame(animation)
            setEnabled(false)
        }
    }, [])
    if (!enabled) {
        return null
    }
    return <Droppable {...props}>{children}</Droppable>
}

// a little function to help us with reordering the result
const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
}

const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
})

const getItemStyle = (isDragging: any, draggableStyle: any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle
})

const ActiveOperationsList: FC<{ activeOperations: any[] }> = ({ activeOperations }) => {
    const [orderedOperationIDs, setOrderedOperationIDs] = useState<string[]>(() => activeOperations.map(operation => operation.id))

    const orderedActiveOperations = useMemo(() => activeOperations.sort((a, b) => orderedOperationIDs.indexOf(a.id) - orderedOperationIDs.indexOf(b.id)), [activeOperations, orderedOperationIDs])

    useEffect(() => {
        const activeOperationIDs = activeOperations.map(operation => operation.id)

        if (activeOperationIDs.length > orderedOperationIDs.length) {
            setOrderedOperationIDs((current) => [...current, ...activeOperationIDs.filter(id => !orderedOperationIDs.includes(id))])
        } else if (activeOperationIDs.length < orderedOperationIDs.length) {
            setOrderedOperationIDs((current) => current.filter(id => activeOperationIDs.includes(id)))
        }
    }, [activeOperations])

    const onDragEnd = (result: any) => {
        if (!result.destination) {
            return
        }
        setOrderedOperationIDs((current: string[]) => reorder(current, result.source.index, result.destination.index))
    }

    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <StrictModeDroppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                            {orderedActiveOperations.map((operation, index) => (
                                <Draggable key={operation.id} draggableId={operation.id} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}
                                        >
                                            {operation.title}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </StrictModeDroppable>
            </DragDropContext>
        </>
    )
}

export default ActiveOperationsList