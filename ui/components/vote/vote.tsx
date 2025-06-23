import { IconArrowBigDownLine, IconArrowBigUpLine } from "@tabler/icons-react"


const Vote = ({ ...props }) => {
    const { addVoteHandler, removeVoteHandler, data } = props
    return (
        <>
            {/* <button className={clicked ? `flex text-green-500 text-base` : `flex items-center hover:text-green-500 text-base`} onClick={() => handler(data)}>
                <IconArrowBigUpLine stroke={1} /> <span className="ml-1">{data.upvotes}</span>
            </button>
            <button className={clicked ? `flex items-center text-red-500 text-base` : `flex items-center  hover:text-red-500 text-base`} onClick={() => handler(data)}>
                <IconArrowBigDownLine stroke={1} /><span className="ml-1">{data.downvotes}</span>
            </button> */}
            <div className="bg-gray-600 flex rounded-full p-1">
                <button className="flex items-center hover:text-green-500 text-base" onClick={() => addVoteHandler(data)}>
                    <IconArrowBigUpLine stroke={1} />
                </button>
                <span className="px-2 py-1 hover:cursor-text">{data.votes}</span>
                <button className="flex items-center  hover:text-red-500 text-base" onClick={() => removeVoteHandler(data)}>
                    <IconArrowBigDownLine stroke={1} />
                </button>
            </div>
        </>
    )
}

export default Vote;