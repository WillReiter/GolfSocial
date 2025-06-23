import { IconSend } from "@tabler/icons-react";


const Share = ({ ...props }) => {
    const { data } = props

    const postUrl = `${window.location.host}/post?id=${data.id}`

    const handleShareClick = () => {
        navigator.clipboard.writeText(postUrl)
    }
    return (
        <div className="flex bg-gray-600 rounded-full py-2 px-2 hover:bg-gray-500 ">
            <button className="flex items-center text-base" onClick={() => { handleShareClick(); alert("Link copied to clipboard!") }}>
                <IconSend stroke={1} /> <span className="ml-2"> Share </span>
            </button>
        </div>
    )
}


export default Share;