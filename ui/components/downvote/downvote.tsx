import { IconArrowBigDownLine } from "@tabler/icons-react"


const Downvote = ({ ...props }) => {
    const { handler, data, clicked } = props
    return (
        <>
            <button className={clicked ? `flex items-center hover:text-red-500 text-base` : `flex items-center text-gray-600 hover:text-red-500 text-base`} onClick={() => handler(data)}>
                <IconArrowBigDownLine /><span className="ml-1">{data.downvotes}</span>
            </button>
        </>
    )
}

export default Downvote;