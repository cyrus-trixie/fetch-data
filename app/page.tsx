"use client";
import { useState, useEffect } from "react";


interface User {
  id: number;
  name: string;
}

export default function Home() {
  const [view, setView] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]); 
  const [name, setName] = useState<string>(""); 
  const [loading, setLoading] = useState<boolean>(false);

  // 1. Fetch users from our CyrusDB Express server
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:4000/users');
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching:", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Send new user (Create)
  const sendData = async () => {
    if (!name.trim()) return alert("Please enter a name");

    try {
      const res = await fetch('http://localhost:4000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name }) 
      });

      if (res.ok) {
        setName("");     
        await fetchData(); 
        setView("check");  
      } else {
        const err = await res.json();
        alert(err.error);
      }
    } catch (error) {
      console.error("Error sending:", error);
    }
  };

  const deleteUser = async (id: number) => {
    if (!confirm("Are you sure you want to delete this record?")) return;

    try {
      const res = await fetch(`http://localhost:4000/users/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchData(); 
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  
  useEffect(() => {
    if (view === "check" || view === "delete") {
      fetchData();
    }
  }, [view]);

  return (
    <div className="flex h-screen justify-center bg-slate-100 p-6 text-black">
      <div className="bg-slate-800 w-full max-w-6xl flex flex-col gap-6 p-8 rounded-2xl shadow-2xl">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-4">
          <h1 className="text-3xl font-black text-white tracking-tighter italic">CYRUS<span className="text-green-400">DB</span> ENGINE</h1>
          <p className="text-slate-400 text-sm">Custom Relational Database Management System</p>
        </div>

        {/* NAV BUTTONS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
          <button onClick={() => setView("add")} className="bg-green-500 hover:bg-green-400 text-white w-full max-w-xs p-4 rounded-xl shadow-lg hover:-translate-y-1 transition-all font-bold">Add Record</button>
          <button onClick={() => setView("check")} className="bg-amber-500 hover:bg-amber-400 text-white w-full max-w-xs p-4 rounded-xl shadow-lg hover:-translate-y-1 transition-all font-bold">View Tables</button>
          <button onClick={() => setView("delete")} className="bg-red-500 hover:bg-red-400 text-white w-full max-w-xs p-4 rounded-xl shadow-lg hover:-translate-y-1 transition-all font-bold">Prune Data</button>
        </div>

        {/* CONTENT AREA */}
        {view !== "" && (
          <div className="bg-white w-full h-[70%] rounded-xl p-8 overflow-y-auto shadow-inner border border-slate-700/10">
            
            {/* ADD VIEW */}
            {view === "add" && (
              <div className="flex flex-col gap-6 max-w-md mx-auto py-10">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-slate-800">Insert Metadata</h2>
                  <p className="text-slate-500 text-sm">Enter the values according to the schema.</p>
                </div>
                <input 
                  className="border-2 border-slate-200 p-4 rounded-lg w-full bg-slate-50 focus:border-green-500 outline-none transition-colors" 
                  placeholder="Full Name (String)" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <button 
                  onClick={sendData} 
                  className="bg-slate-900 text-white p-4 rounded-lg font-bold hover:bg-black transition-all shadow-md"
                >
                  Commit to Local JSON
                </button>
              </div>
            )}

            {/* CHECK VIEW */}
            {view === "check" && (
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-slate-800 border-b pb-4 flex justify-between items-center">
                  Database Directory
                  <span className="text-xs bg-slate-100 px-3 py-1 rounded-full text-slate-500">Table: users.json</span>
                </h2>
                <div className="space-y-3">
                  {loading ? (
                    <div className="flex items-center gap-2 text-slate-400 animate-pulse">Scanning clusters...</div>
                  ) : users.length > 0 ? (
                    users.map((user) => (
                      <div key={user.id} className="flex items-center p-5 bg-slate-50 rounded-xl border border-slate-200 group hover:bg-white hover:border-green-300 transition-all">
                        <span className="font-mono text-green-600 font-black w-12 text-sm">ID:{user.id}</span>
                        <span className="text-slate-800 font-semibold text-lg uppercase tracking-tight">{user.name}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-20 text-slate-400 italic">No records found in current node.</div>
                  )}
                </div>
              </div>
            )}

            {/* DELETE VIEW */}
            {view === "delete" && (
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold text-red-600 border-b pb-4 mb-6">Prune Records</h2>
                <div className="space-y-3">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 bg-red-50/50 rounded-xl border border-red-100 group">
                      <div className="flex items-center">
                        <span className="font-mono text-red-400 font-bold w-12">#{user.id}</span>
                        <span className="text-slate-700 font-medium">{user.name}</span>
                      </div>
                      <button 
                        onClick={() => deleteUser(user.id)}
                        className="bg-white border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-600 hover:text-white transition-all shadow-sm"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-center border-t mt-12 pt-6">
              <button onClick={() => setView("")} className="text-xs text-slate-400 hover:text-slate-900 font-black uppercase tracking-[0.2em] transition-colors">
                Termiate Session
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}