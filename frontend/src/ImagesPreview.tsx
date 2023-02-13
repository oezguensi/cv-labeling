import { FC } from 'react'
import './ImagesPreview.scss'

const ImagesPreview: FC<{ imageFiles: any[], setSelectedImageFile: CallableFunction }> = ({ imageFiles, setSelectedImageFile }) => {
    return (
        <div id='images-preview'>
            {imageFiles.map(imageFile => <img src={URL.createObjectURL(imageFile)} onClick={() => setSelectedImageFile(imageFile)} />)}
        </div>
    )
}

export default ImagesPreview