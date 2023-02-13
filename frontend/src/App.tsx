import { useState } from 'react'
import { Theme, Grid, Column, FileUploaderDropContainer } from '@carbon/react'
import './App.scss'
import AppHeader from './AppHeader'
import OperationsList from './OperationsList'
import ActiveOperationsList from './ActiveOperationsList'
import MainImage from './MainImage'
import ImagesPreview from './ImagesPreview'


const App = () => {
  const [theme, setTheme] = useState<'white' | "g10" | "g90" | 'g100'>('white')
  return (
    <Theme theme={theme}>
      <AppHeader setTheme={setTheme} />
      <Grid id='main'>
        <Column lg={4}><OperationsList /></Column>
        <Column lg={1}><ActiveOperationsList /></Column>
        <Column lg={11}>
          <MainImage imageURL='https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Bolt_Technology_Logo_2019.svg/2560px-Bolt_Technology_Logo_2019.svg.png' />
          <ImagesPreview />
          <FileUploaderDropContainer
            labelText="Drag and drop files here or click to upload"
            multiple={true}
            accept={['image/jpeg', 'image/png']}
            disabled={false}
            name=""
            tabIndex={0}
          />
        </Column>
      </Grid>
    </Theme>
  )
}

export default App
