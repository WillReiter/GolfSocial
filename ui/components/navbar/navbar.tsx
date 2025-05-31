import React from "react";

const tags = ["Tag1", "Tag2", "Tag3", "Tag4", "Tag5"];

export default function Navbar() {
    return (
        <nav className="w-[220px] min-h-screen flex flex-col items-start p-6 bg-gray-50 border-r border-gray-200">
            <button className="w-full py-2 mb-2 bg-none border-none text-left text-base cursor-pointer">
                Home
            </button>
            <button className="w-full py-2 mb-6 bg-none border-none text-left text-base cursor-pointer">
                Popular
            </button>
            <div className="w-full">
                <div className="font-bold mb-2 text-[1.1rem]">
                    Tags
                </div>
                <div className="flex flex-col gap-2">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="bg-blue-100 rounded-xl px-3 py-1 text-[0.95rem] text-gray-800 w-fit"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </nav>
    );
}
