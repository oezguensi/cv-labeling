import { FC, useState } from 'react'
import { Column } from '@carbon/react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import OperationCard from './OperationCard'
import './OperationsSection.scss'
import { Operation, Operations } from './App'


const OperationsSection: FC<{ operations: Operations, setOperations: CallableFunction }> = ({ operations, setOperations }) => {
    const [draggingFromDroppableId, setDraggingFromDroppableId] = useState<string | null>(null)

    const onDragEnd = (result: any) => {
        if (!result.destination) return
        const { draggableId, source, destination } = result

        setOperations((current: Operations) => {
            const draggedOperation = current[source.droppableId].filter(operation => operation.id === draggableId)[0]
            if (source.droppableId !== destination.droppableId) {
                draggedOperation.active = destination.droppableId === 'active'
                const newSourceOperations = current[source.droppableId].filter(operation => operation.id !== draggableId)
                const newDestinationOperations = [...current[destination.droppableId].slice(0, destination.index), draggedOperation, ...current[destination.droppableId].slice(destination.index, current[destination.droppableId].length)]
                current[source.droppableId] = newSourceOperations
                current[destination.droppableId] = newDestinationOperations
            } else {
                current[source.droppableId].splice(destination.index, 0, current[source.droppableId].splice(source.index, 1)[0])
            }
            return current
        })


        setDraggingFromDroppableId(null)
    }

    return (
        <DragDropContext onDragEnd={onDragEnd} onDragStart={(result) => { setDraggingFromDroppableId(result.source.droppableId) }}>
            <Column className='operations-column' lg={5} style={{ background: draggingFromDroppableId === null || draggingFromDroppableId === 'inactive' ? 'none' : 'lightblue' }}>
                <Droppable droppableId='inactive'>
                    {(provided, snapshot) => {
                        return (
                            <div className='operations-section-column' ref={provided.innerRef} {...provided.droppableProps}>
                                <span>Operations</span>
                                {operations.inactive.map((operation: Operation, index: number) => <OperationCard key={operation.id} operation={operation} index={index} />)}
                                {provided.placeholder}
                            </div>
                        )
                    }}
                </Droppable>
            </Column>
            <Column className='operations-column' lg={2} style={{ background: draggingFromDroppableId === null || draggingFromDroppableId === 'active' ? 'none' : 'lightblue' }}>
                <Droppable droppableId='active'>
                    {(provided, snapshot) => {
                        return (
                            <div className='operations-section-column' ref={provided.innerRef} {...provided.droppableProps}>
                                <span>Active operations</span>
                                {operations.active.map((operation: Operation, index: number) => <OperationCard key={operation.id} operation={operation} index={index} />)}
                                {provided.placeholder}
                            </div>
                        )
                    }}
                </Droppable>
            </Column>
        </DragDropContext>
    )
}

export default OperationsSection
