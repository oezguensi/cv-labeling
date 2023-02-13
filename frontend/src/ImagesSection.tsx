import { FileUploaderDropContainer } from '@carbon/react'
import { useState } from 'react'
import ImagesPreview from "./ImagesPreview"
import MainImage from "./MainImage"


const ImagesSection = () => {
    const [imageFiles, setImageFiles] = useState<any[]>([])
    const [selectedImageFile, setSelectedImageFile] = useState(null)

    return (
        <>
            {selectedImageFile && <MainImage selectedImageFile={selectedImageFile} />}
            <ImagesPreview imageFiles={imageFiles} setSelectedImageFile={setSelectedImageFile} />

            <FileUploaderDropContainer
                onAddFiles={(event: any, data: any) => { setImageFiles((current: any[]) => [...current, ...data.addedFiles]) }}
                labelText="Drag and drop files here or click to upload"
                multiple={true}
                accept={['image/jpeg', 'image/png']}
                disabled={false}
                name=""
                tabIndex={0}
            />
        </>
    )
}

export default ImagesSection