import { FC } from 'react'
import { Tile, IconButton } from '@carbon/react'
import { Edit, View, ViewOff } from '@carbon/react/icons'
import { Draggable } from 'react-beautiful-dnd'
import './OperationCard.scss'
import { Operation } from './App'

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    userSelect: "none",
    boxShadow: isDragging ? "10px 10px 25px grey" : "none",
    ...draggableStyle
})

const OperationCard: FC<{ operation: Operation, index: any }> = ({ operation, index }) => {
    return (
        <Draggable key={operation.id} draggableId={operation.id} index={index}>
            {(provided, snapshot) => {
                return (
                    !operation.active ?
                        <Tile className='operation-card' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={{ ...getItemStyle(snapshot.isDragging, provided.draggableProps.style) }}>
                            <h3>{operation.name}</h3>
                            <p>{operation.doc}</p>
                        </Tile>
                        :
                        <Tile className='active-operation-card' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                            <h4>{operation.name}</h4>
                            <IconButton label="(Un)hide operation" kind='ghost'>
                                {<View />}
                            </IconButton>
                            <IconButton label="Edit operation" kind='ghost'>
                                <Edit />
                            </IconButton>
                        </Tile>
                )
            }}
        </Draggable>
    )
}

export default OperationCard