import { ClickableTile } from '@carbon/react'
import { FC } from 'react'

const OperationsList: FC<{ operations: any[], setActiveOperationIDs: CallableFunction }> = ({ operations, setActiveOperationIDs }) => {
    return (
        <>
            {operations.map((operation: any) => (
                <ClickableTile id={operation.id} name={operation.id}
                    onClick={(event: any) => {
                        setActiveOperationIDs((current: string[]) => current.includes(operation.id) ? current.filter(id => id !== operation.id) : [...current, operation.id])
                    }}
                >
                    {operation.title}
                </ClickableTile>))}
        </>
    )
}

export default OperationsList