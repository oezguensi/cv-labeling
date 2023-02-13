import { FC } from "react"

const MainImage: FC<{ imageURL: string }> = ({ imageURL }) => {
    return (
        <img src={imageURL} />
    )
}

export default MainImage