import fs from 'node:fs';
import path from 'node:path';

class CyrusDB {
    constructor(dbDir = './data') {
        this.dbDir = dbDir;
        // it Create the data folder if it doesn't exist
        if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir);
    }

    // CREATE TABLE: Creates a JSON file with a specific schema
    createTable(tableName, schema) {
        const filePath = path.join(this.dbDir, `${tableName}.json`);
        if (!fs.existsSync(filePath)) {
            const tableData = { 
                schema: schema, 
                rows: [] 
            };
            fs.writeFileSync(filePath, JSON.stringify(tableData, null, 2));
            console.log(`Table [${tableName}] created with schema.`);
        }
    }

    // VALIDATE: Ensuring data matches the schema types
    validate(data, schema) {
        for (const key in schema) {
            if (data[key] === undefined) {
                throw new Error(`Validation Error: Missing field '${key}'`);
            }
            if (typeof data[key] !== schema[key]) {
                throw new Error(`Validation Error: '${key}' must be a ${schema[key]}`);
            }
        }
    }

    
    insert(tableName, data) {
        const filePath = path.join(this.dbDir, `${tableName}.json`);
        const table = JSON.parse(fs.readFileSync(filePath));
        
    
        if (!table.rows) {
            table.rows = [];
        }

        this.validate(data, table.schema);

    
        const newId = table.rows.length > 0 
            ? Math.max(...table.rows.map(r => r.id)) + 1 
            : 1;
            
        const newRow = { id: newId, ...data };
        
        table.rows.push(newRow);
        fs.writeFileSync(filePath, JSON.stringify(table, null, 2));
        return newRow;
    }

    // SELECT: Get all rows from a table
    select(tableName) {
        const filePath = path.join(this.dbDir, `${tableName}.json`);
        if (!fs.existsSync(filePath)) return [];
        const table = JSON.parse(fs.readFileSync(filePath));
        return table.rows || [];
    }

    // DELETE: Remove a row by its ID
    delete(tableName, id) {
        const filePath = path.join(this.dbDir, `${tableName}.json`);
        const table = JSON.parse(fs.readFileSync(filePath));
        
        if (!table.rows) return { success: false };

        const initialCount = table.rows.length;
    
        table.rows = table.rows.filter(row => row.id !== parseInt(id));

        if (table.rows.length === initialCount) {
            throw new Error(`Record with ID ${id} not found.`);
        }

        fs.writeFileSync(filePath, JSON.stringify(table, null, 2));
        return { success: true };
    }

    // INNER JOIN: Links two tables (The Relational Part)
    innerJoin(tableA, tableB, keyA, keyB) {
        const rowsA = this.select(tableA);
        const rowsB = this.select(tableB);

        return rowsA.map(itemA => {
            const match = rowsB.find(itemB => itemB[keyB] === itemA[keyA]);
            return { ...itemA, ...(match || {}) };
        });
    }
}

export default CyrusDB;