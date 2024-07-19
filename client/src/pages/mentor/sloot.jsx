import React from 'react';

export default function Component() {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 sm:p-8 md:p-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Add a New Slot</h1>
          <p className="text-gray-500">
            Fill out the form below to create a new availability slot for your mentees.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-md p-4">
          <div className="border-b pb-2 mb-4">
            <h2 className="text-xl font-semibold">New Slot</h2>
          </div>
          <div>
            <form className="grid gap-4">
              <div className="grid gap-2">
                <label htmlFor="date" className="block font-medium">
                  Date
                </label>
                <input type="date" id="date" className="w-full p-2 border rounded" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="time" className="block font-medium">
                  Time
                </label>
                <input type="time" id="time" className="w-full p-2 border rounded" />
              </div>
              <div className="grid gap-2">
                <label htmlFor="duration" className="block font-medium">
                  Duration (minutes)
                </label>
                <input type="number" id="duration" min="15" step="15" className="w-full p-2 border rounded" />
              </div>
              <button type="submit" className="self-end px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Save Slot
              </button>
            </form>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Existing Slots</h2>
          <div className="grid gap-4 mt-4">
            <SlotCard date="Monday, July 24th" time="10:00 AM - 10:45 AM" />
            <SlotCard date="Wednesday, July 26th" time="2:00 PM - 2:45 PM" />
            <SlotCard date="Friday, July 28th" time="4:00 PM - 4:45 PM" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SlotCard({ date, time }) {
  return (
    <div className="bg-white shadow-md rounded-md p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-medium">{date}</div>
          <div className="text-gray-500">{time}</div>
        </div>
        <div className="flex gap-2">
          <button className="p-2 border rounded hover:bg-gray-100">
            <FilePenIcon className="w-4 h-4" />
            <span className="sr-only">Edit</span>
          </button>
          <button className="p-2 border rounded text-red-500 hover:bg-red-500 hover:text-white">
            <TrashIcon className="w-4 h-4" />
            <span className="sr-only">Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function FilePenIcon(props) {
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
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
}

function TrashIcon(props) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
