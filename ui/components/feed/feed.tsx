

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { IconMessageCircle } from '@tabler/icons-react';
import Upvote from '../upvote/upvote';
import Downvote from '../downvote/downvote';

interface feedData {
    id: number,
    title: string,
    content: string,
    upvotes: number,
    downvotes: number,
    commentCount: number,
    // The clicked logic is flawed. Should be a var of type string that is called 'Voted' with possible values [up, down, no] to stop from being able to upvote and downvote a post
    clickedUpvote: boolean,
    clickedDownvote: boolean,
}

const Feed = () => {

    const [feedData, setFeedData] = useState<feedData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true); //SET TO TRUE
    const router = useRouter();

    useEffect(() => {
        fetchFeedData();
    }, []);

    async function fetchFeedData() {
        try {
            let url = "http://localhost:8080/posts"
            const response = await fetch(url, { method: "GET" });
            const data = await response.json();
            console.log("DATA: ", data)
            setFeedData(data);
        } catch (error) {
            console.error("Error fetching feed data:", error);
        } finally {
            setIsLoading(false);
        }
    }

    async function removeUpvote(id: number) {
        try {
            let url = `http://localhost:8080/posts/removeUpvote/${id}`
            await fetch(url, { method: "PATCH" })
        } catch (error) {
            console.error(`Error removing upvote to post with id "${id}"`)
        }
    }

    async function addUpvote(id: number) {
        try {
            let url = `http://localhost:8080/posts/addUpvote/${id}`
            await fetch(url, { method: "PATCH" })
        } catch (error) {
            console.error(`Error adding upvote to post with id "${id}"`)
        }
    }

    async function removeDownvote(id: number) {
        try {
            let url = `http://localhost:8080/posts/removeDownvote/${id}`
            await fetch(url, { method: "PATCH" })
        } catch (error) {
            console.error(`Error removing upvote to post with id "${id}"`)
        }
    }

    async function addDownvote(id: number) {
        try {
            let url = `http://localhost:8080/posts/addDownvote/${id}`
            await fetch(url, { method: "PATCH" })
        } catch (error) {
            console.error(`Error adding upvote to post with id "${id}"`)
        }
    }

    const handleUpvoteClick = (post: feedData): void => {

        if (post.clickedUpvote) {
            removeUpvote(post.id)
            setFeedData(feedData.map((item) => item.id === post.id ? { ...item, upvotes: item.upvotes - 1, clickedUpvote: !item.clickedUpvote } : item))
        } else {
            addUpvote(post.id)
            setFeedData(feedData.map(item => item.id === post.id ? { ...item, upvotes: item.upvotes + 1, clickedUpvote: !item.clickedUpvote } : item))
        }
    }

    const handleDownvoteClick = (post: feedData): void => {

        if (post.clickedDownvote) {
            removeDownvote(post.id)
            setFeedData(feedData.map((item) => item.id === post.id ? { ...item, downvotes: item.downvotes - 1, clickedDownvote: !item.clickedDownvote } : item))
        } else {
            addDownvote(post.id)
            setFeedData(feedData.map(item => item.id === post.id ? { ...item, downvotes: item.downvotes + 1, clickedDownvote: !item.clickedDownvote } : item))
        }
    }

    const handlePostClick = (id: number): void => {
        if (id) {
            router.push(`/post?id=${id}`)
        }
    }

    const handleCommentClick = (id: number): void => {
        if (id) {
            router.push(`/post?id=${id}#comments`)
        }
    }

    let content = (

        <>
            <div className="flex pt-4 pb-4 items-center">
                <div>Sort by</div>
                <button className="ml-auto mr-0 border-2 border-blue-400 hover:bg-gray-200 rounded-full px-2" onClick={() => { router.push("/create") }}> Create Post </button>
            </div>
            {feedData.map((item) => (
                <div
                    key={item.id}
                    className="border border-gray-200 rounded-lg p-4 mb-4 bg-white shadow-sm"
                >
                    <a className="text-lg font-semibold mb-2 hover:cursor-pointer hover:text-blue-600 " onClick={() => handlePostClick(item.id)}>{item.title}</a>
                    <p className="mb-4 text-gray-700">{item.content}</p>
                    <div className="flex items-center gap-4">
                        <Upvote handler={handleUpvoteClick} data={item} clicked={item.clickedUpvote} />
                        <Downvote handler={handleDownvoteClick} data={item} clicked={item.clickedDownvote} />
                        <button className="flex items-center text-gray-600 hover:text-green-500 text-base" onClick={() => handleCommentClick(item.id)}>
                            <IconMessageCircle /> {item.commentCount} <span className="ml-1"></span>
                        </button>
                    </div>
                </div>
            ))}
        </>
    );

    let loadingIndicator = (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
        </div>
    );
    let noData = (
        <div className="flex justify-center items-center h-screen">
            <div className="text-gray-500 text-lg">
                No posts available.
            </div>
        </div>
    );
    if (isLoading) {
        content = loadingIndicator;
    } else if (feedData.length === 0) {
        content = (
            <div className="flex justify-center items-center h-screen">
                <div className="text-gray-500 text-lg">
                    No posts available.
                </div>
            </div>
        );
    }
    if (feedData.length === 0 && !isLoading) {
        content = noData;
    }

    return content;
};

export default Feed;
