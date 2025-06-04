import { useRouter } from "next/router";
import React, { useState } from "react";
import { json } from "stream/consumers";

const CreatePost = () => {

    const [title, setTitle] = useState(undefined);
    const [body, setBody] = useState(undefined);
    const [tags, setTags] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();


    const handleSubmit = () => {
        async function submitPost() {
            try {
                let url = "http://localhost:8080/post"
                let requestBody = {
                    title: String(title),
                    content: String(body),
                    poster: "1",
                }
                await fetch(url, {
                    method: "POST",
                    body: JSON.stringify(requestBody),
                    headers: { 'Content-Type': 'application/json' }
                })
            } catch (error) {
                console.error(error)
            } finally {
                setIsLoading(false)
                router.push("/")
            }
        }
        setIsLoading(true)
        submitPost()
    }

    const handleUpdateTitle = (text: any) => {
        // console.log(text.target.value)
        setTitle(text.target.value)
    }

    const handleUpdateBody = (text: any) => {
        // console.log(text.target.value)
        setBody(text.target.value)
    }

    const handleUpdateTags = (text: any) => {
        setTags(text.target.value)
    }

    return (
        <>
            <div className="flex flex-col">
                <div className="font-bold text-xl pb-2">Create Post</div>
                Title*
                <input
                    type="text"
                    placeholder="Title"
                    onChange={(text) => handleUpdateTitle(text)}
                    className="w-full px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div>Body*</div>
                <textarea className="border border-gray-300 rounded-md px-2 py-2" rows={4} cols={50} placeholder="Body" onChange={(text) => handleUpdateBody(text)} />

                {/* TODO <div>Tags</div> */}
                <button className="px-4 py-2 my-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition" onClick={handleSubmit}>Post</button>
                <button className="px-4 py-2 mb-2 text-blue-600 font-semibold rounded hover:bg-blue-50 transition" onClick={() => { router.push("/") }}>Cancel</button>
            </div>
        </>
    )
}

export default CreatePost;