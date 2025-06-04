import { IconArrowBigUpLine } from "@tabler/icons-react"


const Upvote = ({ ...props }) => {
    const { handler, data, clicked } = props
    return (
        <>
            <button className={clicked ? `flex items-center text-blue-500 text-base` : `flex items-center text-gray-600 hover:text-blue-500 text-base`} onClick={() => handler(data)}>
                <IconArrowBigUpLine /> <span className="ml-1">{data.upvotes}</span>
            </button>
        </>
    )
}

export default Upvote;