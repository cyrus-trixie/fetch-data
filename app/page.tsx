"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [view, setView] = useState("");
  const [users, setUsers] = useState([]); // 1. State to hold your data

  // 2. The function to get data from Express
  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:4000/users');
      const data = await res.json();
      setUsers(data); // Save the data into our state
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };

  // 3. Trigger fetch whenever the view changes to 'check'
  useEffect(() => {
    if (view === "check") {
      fetchData();
    }
  }, [view]);

  return (
    <div className="flex h-screen justify-center bg-gray-50 p-6">
      <div className="bg-gray-600 w-full max-w-6xl flex flex-col gap-6 p-6 rounded-lg shadow-lg">
        
        {/* BUTTONS (Same as yours) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
          <button onClick={() => setView("add")} className="bg-green-500 text-white w-52 p-4 rounded hover:scale-105 transition-all">Add Users</button>
          <button onClick={() => setView("check")} className="bg-amber-500 text-white w-52 p-4 rounded hover:scale-105 transition-all">Check Users</button>
          <button onClick={() => setView("delete")} className="bg-red-500 text-white w-52 p-4 rounded hover:scale-105 transition-all">Delete Users</button>
        </div>

        {/* THE TABLE AREA */}
        {view !== "" && (
          <div className="bg-white w-full h-[70%] rounded-md p-6 text-gray-800 overflow-y-auto">
            
            {view === "add" && (
              <div>
                <h2 className="text-xl font-bold">Add User Form</h2>
                <input className="border p-2 w-full mt-4" placeholder="Name" />
                <button className="bg-green-600 text-white p-2 mt-4">Save</button>
              </div>
            )}

            {/* DISPLAYING THE DATA HERE */}
            {view === "check" && (
              <div>
                <h2 className="text-xl font-bold mb-4">User List</h2>
                <div className="space-y-2">
                  {users.length > 0 ? (
                    users.map((user, index) => (
                      <div key={index} className="p-3 bg-gray-100 rounded border border-gray-200">
                        <span className="font-mono text-blue-600 mr-4">#{index + 1}</span>
                        {user.name}
                      </div>
                    ))
                  ) : (
                    <p>Loading users...</p>
                  )}
                </div>
              </div>
            )}

            {view === "delete" && (
              <div>
                <h2 className="text-xl font-bold text-red-600">Delete Users</h2>
                <p>Select a user to remove.</p>
              </div>
            )}

            <button onClick={() => setView("")} className="mt-10 text-xs text-gray-400 underline">Close this</button>
          </div>
        )}
      </div>
    </div>
  );
}