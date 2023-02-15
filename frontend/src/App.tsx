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

export type Operations = {
  inactive: Operation[]
  active: Operation[]
}

const App = () => {
  const [theme, setTheme] = useState<'white' | "g10" | "g90" | 'g100'>('white')
  const [operations, setOperations] = useState<Operations>({ inactive: [], active: [] })
  const [fetching, setFetching] = useState<boolean>(true)
  const [selectedImageFile, setSelectedImageFile] = useState(null)

  const fetchOperations = async () => {
    setFetching(true)
    try {
      const response = await fetch(encodeURI(`http://0.0.0.0:8080/api/v1/operations`))
      setOperations({ inactive: (await response.json() as Operation[]), active: [] })
    } catch (error) {
      console.error(error)
    } finally {
      setFetching(false)
    }
  }

  const applyOperations = async () => {
    setFetching(true)
    try {
      const response = await fetch(encodeURI(`http://0.0.0.0:8080/api/v1/operations`), { method: 'POST' })
      console.log(await response.json())
    } catch (error) {
      console.error(error)
    } finally {
      setFetching(false)
    }
  }

  useEffect(() => {
    fetchOperations()
  }, [])


  useEffect(() => {
    console.log('here')
    applyOperations()
  }, [selectedImageFile, operations])


  return (
    <Theme theme={theme}>
      <AppHeader setTheme={setTheme} />
      <Grid id='main'>
        {!fetching && <OperationsSection operations={operations} setOperations={setOperations} />}
        <Column lg={9}>
          <ImagesSection selectedImageFile={selectedImageFile} setSelectedImageFile={setSelectedImageFile} />
        </Column>
      </Grid>
    </Theme>
  )
}

export default App
