import { useState } from 'react'
import { Theme } from '@carbon/react'
import './App.scss'
import AppHeader from './AppHeader'

const App = () => {
  const [theme, setTheme] = useState<'white' | "g10" | "g90" | 'g100'>('white')
  return (
    <Theme theme={theme}>
      <AppHeader setTheme={setTheme} />
    </Theme>
  )
}

export default App
