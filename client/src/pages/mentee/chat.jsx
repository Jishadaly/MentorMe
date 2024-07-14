import React, { useState } from 'react';

export default function Chat() {
    const [message , setMessage] = useState('');
    console.log(message);


    const handleSend = async()=>{
        try {
            const response = await sendMessge();
        } catch (error) {
            
        }
    }


    return (
        <div className="flex min-h-screen bg-gray-100 p-12 ml-3">
            <div className="flex min-h-screen w-full">
                <div className="bg-white p-6 border-r w-1/3">
                    <div className="bg-gray-200 rounded-md px-4 py-2 text-sm">
                        <input type="text" placeholder="Search for a mentor..." className="w-full bg-transparent" />
                    </div>
                    <div className="mt-4 space-y-4">
                        {['John Doe', 'Jane Smith', 'Michael Johnson'].map((name, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <div className="w-8 h-8 border rounded-full overflow-hidden">
                                    <img src="/placeholder-user.jpg" alt="User" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium">{name}</p>
                                    <p className="text-xs text-gray-500">
                                        {index === 0 && "Hey, let's discuss your goals!"}
                                        {index === 1 && "I'm available for a session this week."}
                                        {index === 2 && "Let me know if you have any questions."}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex-1 overflow-auto p-2 grid gap-2 mt-5">
                    <div className="flex items-start ">
                        <div className="w-8 h-8 border rounded-full overflow-hidden">
                            <img src="/placeholder-user.jpg" alt="User" className="w-full h-full object-cover" />
                        </div>
                        <div className="bg-white p-3 rounded-lg max-w-[75%]">
                            <p className="text-sm font-inter">Hi there! I'm excited to chat with you about your goals and how I can help.</p>
                            <div className="flex items-center gap-2 mt-1">
                                <p className="text-xs text-gray-500">10:30 AM</p>
                                <button className="text-gray-500 hover:text-gray-700 p-1">
                                    <SmileIcon className="w-4 h-4" />
                                    <span className="sr-only">Add Emoji</span>
                                </button>
                                <button className="text-gray-500 hover:text-gray-700 p-1">
                                    <ReplyIcon className="w-4 h-4" />
                                    <span className="sr-only">Reply</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-start justify-end ">
                        <div className="bg-indigo-500 text-white p-3 rounded-lg max-w-[75%]">
                            <p className="text-smv font-inter">Great, I'm really looking forward to our session. I have a few questions to start with...</p>
                            <div className="flex items-center gap-2 mt-1">
                                <p className="text-xs text-white">10:32 AM</p>
                                <button className="text-blue-200 hover:text-blue-400 p-1">
                                    <SmileIcon className="w-4 h-4 text-white" />
                                    <span className="sr-only">Add Emoji</span>
                                </button>
                                <button className="text-blue-200 hover:text-blue-400 p-1">
                                    <ReplyIcon className="w-4 h-4 text-white" />
                                    <span className="sr-only">Reply</span>
                                </button>
                            </div>
                        </div>
                        <div className="w-8 h-8 border rounded-full overflow-hidden">
                            <img src="/placeholder-user.jpg" alt="User" className="w-full h-full object-cover" />
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="w-8 h-8 border rounded-full overflow-hidden">
                            <img src="/placeholder-user.jpg" alt="User" className="w-full h-full object-cover" />
                        </div>
                        <div className="bg-white p-3 rounded-lg max-w-[75%]">
                            <p className="text-sm">Sure, go ahead and ask. I'm here to help in any way I can.</p>
                            <div className="flex items-center gap-2 mt-1">
                                <p className="text-xs text-gray-500">10:33 AM</p>
                                <button className="text-gray-500 hover:text-gray-700 p-1">
                                    <SmileIcon className="w-4 h-4" />
                                    <span className="sr-only">Add Emoji</span>
                                </button>
                                <button className="text-gray-500 hover:text-gray-700 p-1">
                                    <ReplyIcon className="w-4 h-4" />
                                    <span className="sr-only">Reply</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 bg-white p-3 rounded-lg">
                        <input type="text" placeholder="Type your message..." onChange={(e)=> setMessage(e.target.value) } className="flex-1 bg-transparent" />
                        <button className="text-gray-500 hover:text-gray-700 p-1">
                            <SmileIcon className="w-4 h-4" />
                            <span className="sr-only">Add Emoji</span>
                        </button>
                        <button className="text-gray-500 hover:text-gray-700 p-1">
                            <SendIcon className="w-4 h-4 text-indigo-500" />
                            <span className="sr-only">Send</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ReplyIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="9 17 4 12 9 7" />
            <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
        </svg>
    );
}

function SendIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m22 2-7 20-4-9-9-4Z" />
            <path d="M22 2 11 13" />
        </svg>
    );
}

function SmileIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
            <line x1="9" x2="9.01" y1="9" y2="9" />
            <line x1="15" x2="15.01" y1="9" y2="9" />
        </svg>
    );
}
