import { useEffect, useState } from 'react'
import { Theme, Grid, Column } from '@carbon/react'
import './App.scss'
import AppHeader from './AppHeader'
import ImagesSection from './ImagesSection'
import OperationsSection from './OperationsSection'


export type Operation = {
  id: string
  name: string
  params: any
  doc: string
  active: boolean
  hidden: boolean | null
}

const App = () => {
  const [theme, setTheme] = useState<'white' | "g10" | "g90" | 'g100'>('white')
  const [columns, setColumns] = useState({ 'operations': { title: 'Operations', items: [], colSize: 5 }, 'active-operations': { title: 'Active operations', items: [], colSize: 2 } })
  const [fetching, setFetching] = useState<boolean>(true)

  const fetchOperations = async () => {
    setFetching(true)
    try {
      const response = await fetch(encodeURI(`http://0.0.0.0:8080/api/v1/operations`))
      const data = (await response.json()).map((operation: Operation) => ({ ...operation, active: false, hidden: null })) as Operation[]
      setColumns((current: any) => ({ ...current, 'operations': { ...current['operations'], items: data } }))
    } catch (error) {
      console.error(error)
    } finally {
      setFetching(false)
    }
  }

  useEffect(() => {
    fetchOperations()
  }, [])

  return (
    <Theme theme={theme}>
      <AppHeader setTheme={setTheme} />
      <Grid id='main'>
        <OperationsSection columns={columns} setColumns={setColumns} />
        <Column lg={9}>
          <ImagesSection />
        </Column>
      </Grid>
    </Theme>
  )
}

export default App
