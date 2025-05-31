

import React, { useState, useEffect } from 'react';


const feedData = [
    {
        id: 1,
        title: "First Post",
        content: "This is the content of the first post.",
        upvotes: 12,
        downvotes: 2,
        comments: 3,
    },
    {
        id: 2,
        title: "Second Post",
        content: "Here's some more interesting content.",
        upvotes: 8,
        downvotes: 1,
        comments: 1,
    },
];

interface feedData {
    id: number,
    title: string,
    content: string,
    upvotes: number,
    downvotes: number,
    clickedUpvote: boolean,
    clickedDownvote: boolean,
}

const Feed = () => {

    const [feedData, setFeedData] = useState<feedData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
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

        fetchFeedData();
    }, []);

    async function removeUpvote(id: number) {
        try {
            let url = `http://localhost:8080/post/removeUpvote/${id}`
            await fetch(url, { method: "PATCH" })
            // setFeedData(feedData.map(item => item.id === id ? { ...item, upvotes: item.upvotes--, clickedUpvote: !item.clickedUpvote } : item))
        } catch (error) {
            console.error(`Error removing upvote to post with id "${id}"`)
        }
    }

    async function addUpvote(id: number) {
        try {
            let url = `http://localhost:8080/post/addUpvote/${id}`
            await fetch(url, { method: "PATCH" })
            // setFeedData(feedData.map(item => item.id === id ? { ...item, upvotes: item.upvotes++, clickedUpvote: !item.clickedUpvote } : item))
        } catch (error) {
            console.error(`Error adding upvote to post with id "${id}"`)
        }
    }



    const handleUpvoteClick = (post: feedData): void => {

        if (post.clickedUpvote) {
            // post.clickedUpvote = false
            // post.upvotes = post.upvotes - 1
            removeUpvote(post.id)
            setFeedData(feedData.map((item) => item.id === post.id ? { ...item, upvotes: item.upvotes - 1, clickedUpvote: !item.clickedUpvote } : item))
        } else {
            // post.clickedUpvote = true
            // post.upvotes = post.upvotes + 1
            addUpvote(post.id)
            setFeedData(feedData.map(item => item.id === post.id ? { ...item, upvotes: item.upvotes + 1, clickedUpvote: !item.clickedUpvote } : item))
        }
    }




    let content = (
        <div className="max-w-xl mx-auto">
            {feedData.map((item) => (
                <div
                    key={item.id}
                    className="border border-gray-200 rounded-lg p-4 mb-4 bg-white shadow-sm"
                >
                    <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
                    <p className="mb-4 text-gray-700">{item.content}</p>
                    <div className="flex items-center gap-4">
                        <button className="flex items-center text-gray-600 hover:text-blue-500 text-base" onClick={() => handleUpvoteClick(item)}>
                            ⬆️ <span className="ml-1">{item.upvotes}</span>
                        </button>
                        <button className="flex items-center text-gray-600 hover:text-red-500 text-base">
                            ⬇️ <span className="ml-1">{item.downvotes}</span>
                        </button>
                        <button className="flex items-center text-gray-600 hover:text-green-500 text-base">
                            💬 <span className="ml-1"></span>
                        </button>
                    </div>
                </div>
            ))}
        </div>
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
