import React from 'react'
import { useSelector } from 'react-redux';

export default function UserList({ chats, setSelectedChatId, selectedChatId }) {
    const user = useSelector((state) => state.auth.user);
    return (
        <div className="bg-white p-6 border-r w-1/3">

            <h1 className='text-2xl font-inter font-extrabold mb-2' >messages</h1>


            <div className="bg-gray-200 rounded-md px-4 py-2 text-sm">
                <input type="text" placeholder="Search for a mentor..." className="w-full bg-transparent" />
            </div>
            <div className="mt-4 space-y-4">
                {chats && chats.map((chat, index) => {

                    const mentor = chat.users.find((u) => u._id !== user.id)
                    const isSelected = chat._id === selectedChatId;
                    return (
                        <div key={index} className={`flex items-center gap-4 cursor-pointer p-2 rounded-md ${isSelected ? 'bg-gray-200' : 'hover:bg-gray-100'}`} onClick={() => setSelectedChatId(chat._id)}>
                            <div className="w-8 h-8 border rounded-full overflow-hidden">
                                <img src="/placeholder-user.jpg" alt="User" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium">{mentor.userName}</p>
                                <p className="text-xs text-gray-500">

                                    {chat.latestMessage.content};
                                </p>
                            </div>
                        </div>
                    )

                })}
            </div>
        </div>
    )
}
