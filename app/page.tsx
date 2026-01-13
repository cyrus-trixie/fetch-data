"use client";

import { useState } from "react";

export default function Home() {
  // We keep track of which "page" is open using a simple string
  const [view, setView] = useState(""); // starts empty

  return (
    <div className="flex h-screen justify-center bg-gray-50 p-6">
      <div className="bg-gray-600 w-full max-w-6xl flex flex-col gap-6 p-6 rounded-lg shadow-lg">
        
        {/* BUTTONS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
          <button 
            onClick={() => setView("add")}
            className="bg-green-500 text-white w-52 p-4 rounded hover:scale-105 transition-all"
          >
            Add Users
          </button>

          <button 
            onClick={() => setView("check")}
            className="bg-amber-500 text-white w-52 p-4 rounded hover:scale-105 transition-all"
          >
            Check Users
          </button>

          <button 
            onClick={() => setView("delete")}
            className="bg-red-500 text-white w-52 p-4 rounded hover:scale-105 transition-all"
          >
            Delete Users
          </button>
        </div>

        {/* THE TABLE AREA (Only shows if 'view' is not empty) */}
        {view !== "" && (
          <div className="bg-white w-full h-[70%] rounded-md p-6 text-gray-800">
            
            {/* If view is 'add', show this */}
            {view === "add" && (
              <div>
                <h2 className="text-xl font-bold">Add User Form</h2>
                <input className="border p-2 w-full mt-4" placeholder="Name" />
                <button className="bg-green-600 text-white p-2 mt-4">Save</button>
              </div>
            )}

            {/* If view is 'check', show this */}
            {view === "check" && (
              <div>
                <h2 className="text-xl font-bold">User List</h2>
                <p>Table of users would go here...</p>
              </div>
            )}

            {/* If view is 'delete', show this */}
            {view === "delete" && (
              <div>
                <h2 className="text-xl font-bold text-red-600">Delete Users</h2>
                <p>Are you sure you want to delete someone?</p>
              </div>
            )}

            {/* A simple button to close the section */}
            <button 
              onClick={() => setView("")} 
              className="mt-10 text-xs text-gray-400 underline"
            >
              Close this
            </button>

          </div>
        )}

      </div>
    </div>
  );
}