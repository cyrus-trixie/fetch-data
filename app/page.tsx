"use client";
import { useState, useEffect } from "react";

// Define the shape of your data
interface User {
  id?: number;
  name: string;
}

export default function Home() {
  const [view, setView] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]); 
  const [name, setName] = useState<string>(""); 

  // Fetch users from Express
  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:4000/users');
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };

  // Send new user to Express
  const sendData = async () => {
    if (!name.trim()) return alert("Please enter a name");

    try {
      const res = await fetch('http://localhost:4000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name }) 
      });

      if (res.ok) {
        setName("");     // Reset input field
        setView("check"); // Take user to the list to see the update
      }
    } catch (error) {
      console.error("Error sending:", error);
    }
  };

  useEffect(() => {
    if (view === "check") {
      fetchData();
    }
  }, [view]);

  return (
    <div className="flex h-screen justify-center bg-gray-50 p-6 text-black">
      <div className="bg-gray-600 w-full max-w-6xl flex flex-col gap-6 p-6 rounded-lg shadow-lg">
        
        {/* NAV BUTTONS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
          <button onClick={() => setView("add")} className="bg-green-500 text-white w-52 p-4 rounded hover:scale-105 transition-all font-bold">Add Users</button>
          <button onClick={() => setView("check")} className="bg-amber-500 text-white w-52 p-4 rounded hover:scale-105 transition-all font-bold">Check Users</button>
          <button onClick={() => setView("delete")} className="bg-red-500 text-white w-52 p-4 rounded hover:scale-105 transition-all font-bold">Delete Users</button>
        </div>

        {/* CONTENT AREA */}
        {view !== "" && (
          <div className="bg-white w-full h-[70%] rounded-md p-6 overflow-y-auto">
            
            {/* ADD VIEW */}
            {view === "add" && (
              <div className="flex flex-col gap-4">
                <h2 className="text-xl font-bold border-b pb-2">Add New User</h2>
                <input 
                  className="border p-3 rounded w-full bg-gray-50 mt-2 focus:outline-green-500" 
                  placeholder="Enter full name..." 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <button 
                  onClick={sendData} 
                  className="bg-green-600 text-white p-3 rounded font-bold hover:bg-green-700 transition-colors"
                >
                  Save User to Database
                </button>
              </div>
            )}

            {/* CHECK VIEW */}
            {view === "check" && (
              <div>
                <h2 className="text-xl font-bold mb-4 border-b pb-2">User Directory</h2>
                <div className="space-y-3">
                  {users.length > 0 ? (
                    users.map((user, index) => (
                      <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
                        <span className="font-mono text-blue-600 font-bold w-10">#{index + 1}</span>
                        <span className="text-gray-800 font-medium">{user.name}</span>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center gap-2 text-gray-400 italic">
                       <div className="animate-spin h-4 w-4 border-2 border-gray-400 border-t-transparent rounded-full"></div>
                       Loading database records...
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* DELETE VIEW */}
            {view === "delete" && (
              <div>
                <h2 className="text-xl font-bold text-red-600 border-b pb-2">Manage Deletions</h2>
                <p className="mt-4 text-gray-500 italic">Select a user profile to remove from the local server.</p>
              </div>
            )}

            <button onClick={() => setView("")} className="mt-10 text-xs text-gray-400 hover:text-gray-600 underline uppercase tracking-widest">
              Close Panel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}