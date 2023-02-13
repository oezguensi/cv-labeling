import { FC } from "react"
import './MainImage.scss'

const MainImage: FC<{ selectedImageFile: any }> = ({ selectedImageFile }) => {
    return (
        <img src={URL.createObjectURL(selectedImageFile)} />
    )
}

export default MainImage