import { useState } from 'react'
import { Theme, Grid, Column } from '@carbon/react'
import './App.scss'
import AppHeader from './AppHeader'
import OperationsList from './OperationsList'
import ActiveOperationsList from './ActiveOperationsList'
import ImagesSection from './ImagesSection'


const App = () => {
  const [theme, setTheme] = useState<'white' | "g10" | "g90" | 'g100'>('white')
  return (
    <Theme theme={theme}>
      <AppHeader setTheme={setTheme} />
      <Grid id='main'>
        <Column lg={4}><OperationsList /></Column>
        <Column lg={1}><ActiveOperationsList /></Column>
        <Column lg={11}>
          <ImagesSection />
        </Column>
      </Grid>
    </Theme>
  )
}

export default App
