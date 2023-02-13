import { FC } from "react"
import './MainImage.scss'

const MainImage: FC<{ imageURL: string }> = ({ imageURL }) => {
    return (
        <img src={imageURL} />
    )
}

export default MainImage