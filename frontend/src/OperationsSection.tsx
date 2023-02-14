import { Column } from '@carbon/react'
import { useEffect, useMemo, useState } from 'react'
import ActiveOperationsList from "./ActiveOperationsList"
import OperationsList from "./OperationsList"

const OperationsSection = () => {
    const [operations, setOperations] = useState<any[]>([])
    const [activeOperationIDs, setActiveOperationIDs] = useState<string[]>([])

    const activeOperations = useMemo(() => operations.filter(operation => activeOperationIDs.includes(operation.id)), [operations, activeOperationIDs])

    useEffect(() => {
        setOperations([{ id: '1', title: 'test', description: 'testdesc' }, { id: '2', title: 'test2', description: 'testdesc2' }, { id: '3', title: 'test3', description: 'testdesc3' }, { id: '4', title: 'test4', description: 'testdesc4' }])

        return () => {
            // TODO abort fetch
        }
    }, [])

    return (
        <>
            <Column lg={5}><OperationsList operations={operations} setActiveOperationIDs={setActiveOperationIDs} /></Column>
            <Column lg={1}><ActiveOperationsList activeOperations={activeOperations} /></Column>
        </>
    )
}

export default OperationsSection