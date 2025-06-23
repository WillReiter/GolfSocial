

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { IconMessageCircle } from '@tabler/icons-react';
import Vote from '../vote/vote';
import Share from '../share/share';

interface feedData {
    id: number,
    title: string,
    content: string,
    votes: number,
    commentCount: number,
    // The clicked logic is flawed. Should be a var of type string that is called 'Voted' with possible values [up, down, no] to stop from being able to upvote and downvote a post
    // clickedUpvote: boolean,
    // clickedDownvote: boolean,
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

    async function addVote(id: number) {
        try {
            let url = `http://localhost:8080/posts/addVote/${id}`
            await fetch(url, { method: "PATCH" })
        } catch (error) {
            console.error(`Error adding vote to post with id "${id}"`)
        }
    }

    async function removeVote(id: number) {
        try {
            let url = `http://localhost:8080/posts/removeVote/${id}`
            await fetch(url, { method: "PATCH" })
        } catch (error) {
            console.error(`Error removing vote to post with id "${id}"`)
        }
    }

    // const handleUpvoteClick = (post: feedData): void => {

    //     if (post.clickedUpvote) {
    //         removeVoteote(post.id)
    //         setFeedData(feedData.map((item) => item.id === post.id ? { ...item, upvotes: item.upvotes - 1, clickedUpvote: !item.clickedUpvote } : item))
    //     } else {
    //         addUpvote(post.id)
    //         setFeedData(feedData.map(item => item.id === post.id ? { ...item, upvotes: item.upvotes + 1, clickedUpvote: !item.clickedUpvote } : item))
    //     }
    // }

    // const handleDownvoteClick = (post: feedData): void => {

    //     if (post.clickedDownvote) {
    //         removeDownvote(post.id)
    //         setFeedData(feedData.map((item) => item.id === post.id ? { ...item, downvotes: item.downvotes - 1, clickedDownvote: !item.clickedDownvote } : item))
    //     } else {
    //         addDownvote(post.id)
    //         setFeedData(feedData.map(item => item.id === post.id ? { ...item, downvotes: item.downvotes + 1, clickedDownvote: !item.clickedDownvote } : item))
    //     }
    // }

    const handleAddVote = (post: feedData): void => {
        addVote(post.id)
        setFeedData(feedData.map(item => item.id === post.id ? { ...item, votes: item.votes + 1 } : item))
    }

    const handleRemoveVote = (post: feedData): void => {
        removeVote(post.id)
        setFeedData(feedData.map(item => item.id === post.id ? { ...item, votes: item.votes - 1 } : item))
    }

    useEffect(() => { console.log(feedData) }, [feedData])

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
                <button className="ml-auto mr-0 bg-gray-600 hover:bg-gray-500 rounded-full px-2" onClick={() => { router.push("/create") }}> Create Post </button>
            </div>
            {feedData && feedData.length > 0 && feedData.map((item) => (
                <div className="hover:cursor-pointer">
                    {/* <div className="hover:cursor-pointer" onClick={() => handlePostClick(item.id)}> */}
                    <div className='border-b' />
                    <div
                        key={item.id}
                        className="rounded-lg hover:bg-neutral-900 p-4 my-2 shadow-sm"
                    >
                        <a className="text-lg font-semibold mb-2 hover:cursor-pointer">{item.title}</a>
                        <p className="mb-4 ">{item.content}</p>
                        <div className="flex items-center gap-4">
                            <Vote addVoteHandler={handleAddVote} removeVoteHandler={handleRemoveVote} data={item}></Vote>
                            <div className='bg-gray-600 rounded-full p-2 hover:bg-gray-500'>
                                <button className="flex items-center text-base" onClick={() => handleCommentClick(item.id)}>
                                    <IconMessageCircle stroke={1} />  <span className="ml-1">{item.commentCount}</span>
                                </button>
                            </div>
                            <Share data={item} />
                        </div>
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
        <>
            <div className="flex pt-4 pb-4 items-center">
                <div>Sort by</div>
                <button className="ml-auto mr-0 bg-gray-600 hover:bg-gray-500 rounded-full px-2" onClick={() => { router.push("/create") }}> Create Post </button>
            </div>
            <div className="flex justify-center items-center h-screen">
                <div className="text-gray-500 text-lg">
                    No posts available.
                </div>
            </div>
        </>
    );
    if (isLoading) {
        content = loadingIndicator;
    } else if (feedData && feedData.length === 0 || !feedData) {
        content = noData;
    }

    return content;
};

export default Feed;
