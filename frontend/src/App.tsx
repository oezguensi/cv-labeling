import { useState } from 'react'
import { Theme, Grid, Column } from '@carbon/react'
import './App.scss'
import AppHeader from './AppHeader'
import ImagesSection from './ImagesSection'
import OperationsSection from './OperationsSection'


const App = () => {
  const [theme, setTheme] = useState<'white' | "g10" | "g90" | 'g100'>('white')
  return (
    <Theme theme={theme}>
      <AppHeader setTheme={setTheme} />
      <Grid id='main'>
        <OperationsSection />
        <Column lg={10}>
          <ImagesSection />
        </Column>
      </Grid>
    </Theme>
  )
}

export default App
