# 🚀 CyrusDB Engine & Explorer

A custom-built **Relational Database Management System (RDBMS)** and management dashboard. This project demonstrates the ability to engineer a storage engine from the ground up using Node.js file persistence, schema validation, and relational logic.

---

## 🏗️ System Architecture

CyrusDB is designed with a clear separation between the storage engine and the interface:

- **The Engine (`CyrusDB.js`)**: A custom JavaScript class that manages physical file I/O, auto-increments IDs, and enforces data integrity.
- **The API (`server.js`)**: An Express.js layer that handles HTTP requests and bridges the frontend to the database engine.
- **The Dashboard (`Next.js`)**: A professional, dark-themed UI built with Tailwind CSS for real-time data management.



---

## ✨ Key Engineering Features

### 🔐 Schema Validation (The Gatekeeper)
Unlike standard JSON storage, CyrusDB enforces strict data typing. If the schema expects a `string` and receives a `number`, the engine rejects the transaction to prevent data corruption.

### 🔗 Relational Mapping (Inner Join)
The engine includes a custom `innerJoin` algorithm that allows linking different tables (e.g., linking `Tasks` to `Users`) using Primary and Foreign keys.

### 💾 Persistence & CRUD
Data is stored in physical `.json` files within the `/data` directory.
- **Create**: Auto-generates unique IDs and validates against the schema.
- **Read**: Fast retrieval of table rows.
- **Delete**: Defensive filtering to remove records without affecting file structure.



---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | Next.js 15 (App Router), TypeScript, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Storage** | Custom File-System Engine (CyrusDB) |
| **Styling** | Geist Sans, Lucide React |

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have **Node.js** installed on your machine.

### 2. Setup the Backend
```bash
cd backend
npm install
node server.js
