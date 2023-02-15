import { FC } from 'react'
import { Tile, IconButton } from '@carbon/react'
import { Edit, View, ViewOff } from '@carbon/react/icons'
import { Draggable } from 'react-beautiful-dnd'
import './OperationCard.scss'

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    userSelect: "none",
    boxShadow: isDragging ? "10px 10px 25px grey" : "none",
    ...draggableStyle
})

const OperationCard: FC<{ columnId: any, item: any, index: any, setColumns: CallableFunction }> = ({ columnId, item, index, setColumns }) => {
    return (
        <Draggable key={item.id} draggableId={item.id} index={index}>
            {(provided, snapshot) => {
                return (
                    columnId === 'operations' ?
                        <Tile className='operation-card' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={{ ...getItemStyle(snapshot.isDragging, provided.draggableProps.style) }}>
                            <h3>{item.name}</h3>
                            <p>{item.doc}</p>
                        </Tile>
                        :
                        <Tile className='active-operation-card' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                            <h4>{item.name}</h4>
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