


import React, { useState, useEffect } from "react";
import { IconDots } from "@tabler/icons-react";
import Vote from "../components/vote/vote";


interface feedData {
    id: number,
    title: string,
    content: string,
    upvotes: number,
    downvotes: number,
    commentCount: number,
    clickedUpvote: boolean,
    clickedDownvote: boolean,
}

interface commentData {
    id: number,
    postID: number,
    content: string,
    upvotes: number,
    downvotes: number,
    userID: number,

}

const Post = () => {

    const [id, setId] = useState<number>();
    const [postData, setPostData] = useState<feedData>();
    const [commentsData, setCommentsData] = useState<commentData[]>([]); //All
    const [commentsDataDisplayed, setCommentsDataDisplayed] = useState<commentData[]>([]); //Filtered
    const [isLoadingPost, setIsLoadingPost] = useState(true);
    const [isLoadingComments, setIsLoadingComments] = useState(true);
    const [newComment, setNewComment] = useState<string>();
    const [searchQuery, setSearchQuery] = useState<string>();

    async function getPosts() {
        try {
            let url = `http://localhost:8080/post/${id}`
            const response = await fetch(url, { method: "GET" });
            const data = await response.json();
            console.log("DATA: ", data); //DEBUG
            setPostData(data)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoadingPost(false)
        }

    }

    async function getComments() {
        try {
            let url = `http://localhost:8080/comments/${id}`
            const response = await fetch(url, { method: "GET" });
            const data = await response.json();
            console.log("DATA: ", data); //DEBUG
            setCommentsData(data)
            setCommentsDataDisplayed(data)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoadingComments(false)
        }
    }

    async function submitComment() {
        try {
            let url = "http://localhost:8080/comment"
            let requestBody = {
                content: String(newComment),
                postID: id,
                // TODO: UPDATE WITH REAL USERID
                userID: 999,
            }
            await fetch(url, {
                method: "POST",
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json' }
            })
        } catch (error) {
            console.error(error)
        } finally {
            setNewComment("")
            getComments()
        }
    }


    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        let idValue = searchParams.get("id"); // Should return "2" for ?id=2
        if (idValue) {
            setId(parseInt(idValue))
        }
    }, [])

    useEffect(() => {
        if (id) {
            getPosts()
        }
    }, [id])

    useEffect(() => {
        if (postData) {
            getComments()
        }
    }, [postData])

    const handleSubmitComment = () => {
        if (id && newComment && newComment.trim().length > 0) {
            submitComment()
        }
    }

    const handlerSearchComments = (query: string) => {
        const filteredItems = commentsData.filter((comment: commentData) =>
            comment.content.toLowerCase().includes(query.toLowerCase())
        );
        setCommentsDataDisplayed(filteredItems)
    }


    let loadingIndicator = (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
        </div>
    );

    let noCommentData = (
        <div className="flex justify-center items-center h-48">
            <div className="text-gray-500 text-lg">
                Be the first to comment!
            </div>
        </div>
    );

    let postContent = (
        postData &&
        <div>
            <div className=" py-4 text-2xl font-medium">{postData.title}</div>
            <div className="  py-4">{postData.content}</div>
            <div className="  py-4 flex">
                {/* <div className="pr-4 border-2 rounded-full bg-gray-500 mx-4">
                    <Upvote handler={() => { }} data={postData} />
                </div>
                <div className="pr-4 border-2 rounded-full bg-gray-500">
                    <Downvote className="px-2" handler={() => { }} data={postData} />
                </div> */}
                <Vote addVoteHandler={() => { }} removeVoteHandler={() => { }} data={postData}></Vote>
            </div>
        </div>
    )

    let commentContent = (
        <div>
            <div className="flex py-2">
                <input
                    className="rounded-full border border-black ml-0 mr-2 px-4 w-full h-8"
                    placeholder="Join the conversation"
                    value={newComment}
                    onChange={(text) => setNewComment(text.target.value)} />
                <button className="mr-0 ml-auto bg-gray-500 rounded-full px-4" onClick={handleSubmitComment}>Reply</button>
            </div>
            <div className="flex py-4">
                <div>
                    Sort by: Best
                </div>
                <div>
                    <input
                        className=" ml-6 rounded-full border border-gray-500 w-48 px-4 mr-4"
                        type="text"
                        placeholder="Search Comments"
                        value={searchQuery}
                        onChange={(text) => {
                            setSearchQuery(text.target.value)
                            handlerSearchComments(text.target.value)
                        }} />
                    <button className="bg-gray-200 rounded-full mr-2 ml-auto px-2" onClick={() => { setCommentsDataDisplayed(commentsData); setSearchQuery("") }}> Reset </button>
                </div>

            </div>
            {commentsDataDisplayed.length <= 0 ? noCommentData :
                (commentsDataDisplayed.map((comment) => {
                    return (
                        <div className=" py-4">
                            {comment.content}
                            <div className="flex pt-2">
                                <div className="ml-1 mr-2">
                                    {/* TODO UPDATE HANDLER */}
                                    <Vote></Vote>
                                </div>
                                <div className="ml-auto mr-1">
                                    <IconDots />
                                </div>

                            </div>
                        </div>
                    )
                }))
            }
        </div>

    )

    return (
        <>
            {isLoadingPost ? loadingIndicator : postContent}
            {isLoadingComments ? loadingIndicator : commentContent}
        </>
    )
}

export default Post;