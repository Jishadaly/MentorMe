
import { useState, useMemo, useEffect } from "react";
import { fetchSlotes } from "@/Api/services/adminServices";

function SlotManage() {
  const [slots, setSlots] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchSlotes('admin/ferchMentoSlots');
        setSlots(response.slots);
        console.log(response);
      } catch (error) {
        console.error("Error fetching mentor slots:", error);
      }
    }

    fetchData();
  }, []);

  const filteredSlots = useMemo(() => {
    return slots
      .filter((slot) => slot.mentorId.userName.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
        if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
  }, [slots, searchTerm, sortBy, sortOrder]);

  const handleSort = (key) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
  };

  const handleSlotDelete = async (id) => {
    try {
      // Implement delete API call here
      // For now, we will just update the state
      setSlots((prevSlots) => prevSlots.filter((slot) => slot._id !== id));
    } catch (error) {
      console.error("Error deleting slot:", error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <header className="bg-primary text-primary-foreground px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold font-inter">Mentor Slots</h1>
        <div className="flex items-center gap-4">
          <input
            type="search"
            placeholder="Search by mentor username..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-primary-foreground text-primary rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-foreground focus:ring-opacity-50"
          />
          {/* <div className="relative">
            <button className="flex items-center gap-2 px-3 py-2 bg-gray-200 rounded-md" onClick={() => handleSort(sortBy)}>
              <ListOrderedIcon className="w-5 h-5" />
              <span>Sort by</span>
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
              <div className="py-1">
                {["date", "startTime", "endTime"].map((key) => (
                  <button
                    key={key}
                    className={`block px-4 py-2 text-sm text-gray-700 ${sortBy === key ? "bg-gray-100" : ""}`}
                    onClick={() => handleSort(key)}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div> */}
        </div>
      </header>
      <main className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSlots.map((slot) => (
            <div key={slot._id} className="bg-white shadow-md rounded-md p-4">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h3 className="text-lg font-bold">{slot.mentorId.userName}</h3>
                  <p className="text-gray-600">
                    {new Date(slot.date).toLocaleDateString()} - {slot.startTime} to {slot.endTime}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="p-2 rounded-md border"
                    onClick={() => handleSlotDelete(slot._id)}
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

function ListOrderedIcon(props) {
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
      <line x1="10" x2="21" y1="6" y2="6" />
      <line x1="10" x2="21" y1="12" y2="12" />
      <line x1="10" x2="21" y1="18" y2="18" />
      <polyline points="5 6 4 7 3 6" />
      <polyline points="5 12 4 13 3 12" />
      <polyline points="5 18 4 19 3 18" />
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
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M10 11v6M14 11v6" />
    </svg>
  );
}

export default SlotManage;
