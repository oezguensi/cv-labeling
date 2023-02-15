import { FC, useState } from 'react'
import { Column } from '@carbon/react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import OperationCard from './OperationCard'
import './OperationsSection.scss'
import { Operation } from './App'


const OperationsSection: FC<{ columns: any, setColumns: CallableFunction }> = ({ columns, setColumns }) => {
    const [draggingFromDroppableId, setDraggingFromDroppableId] = useState<string | null>(null)


    const onDragEnd = (result: any, columns: any, setColumns: CallableFunction) => {
        if (!result.destination) return
        const { source, destination } = result
        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId]
            const destColumn = columns[destination.droppableId]
            const sourceItems = [...sourceColumn.items]
            const destItems = [...destColumn.items]
            const [removed] = sourceItems.splice(source.index, 1)
            destItems.splice(destination.index, 0, removed)
            setColumns((current: any) => ({ ...current, [source.droppableId]: { ...sourceColumn, items: sourceItems }, [destination.droppableId]: { ...destColumn, items: destItems } }))
        } else {
            const column = columns[source.droppableId]
            const copiedItems = [...column.items]
            const [removed] = copiedItems.splice(source.index, 1)
            copiedItems.splice(destination.index, 0, removed)
            setColumns((current: any) => ({ ...current, [source.droppableId]: { ...column, items: copiedItems } }))
        }
        setDraggingFromDroppableId(null)
    }
    return (
        <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)} onDragStart={(result) => { setDraggingFromDroppableId(result.source.droppableId) }}>
            {Object.entries(columns).map(([columnId, column]) => (
                <Column className='operations-column' key={columnId} lg={column.colSize} style={{ background: draggingFromDroppableId === null || draggingFromDroppableId !== Object.keys(columns).filter(key => key !== columnId)[0] ? 'none' : 'lightblue' }}>
                    <Droppable key={columnId} droppableId={columnId}>
                        {(provided, snapshot) => {
                            return (
                                <div className='operations-section-column' ref={provided.innerRef} {...provided.droppableProps}>
                                    <span>{column.title}</span>
                                    {column.items.map((item: Operation, index: number) => <OperationCard columnId={columnId} key={item.id} item={item} index={index} setColumns={setColumns} />)}
                                    {provided.placeholder}
                                </div>
                            )
                        }}
                    </Droppable>
                </Column>
            )
            )}
        </DragDropContext>
    )
}

export default OperationsSection
