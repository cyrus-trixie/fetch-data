import fs from 'node:fs';
import path from 'node:path';

class CyrusDB {
    constructor(dbDir = './data') {
        this.dbDir = dbDir;
        if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir);
    }

    // 1. We now save the 'rules' (schema) when we create a table
    createTable(tableName, schema) {
        const filePath = path.join(this.dbDir, `${tableName}.json`);
        if (!fs.existsSync(filePath)) {
            const tableData = { 
                schema: schema, // e.g., { name: 'string', age: 'number' }
                rows: [] 
            };
            fs.writeFileSync(filePath, JSON.stringify(tableData, null, 2));
            console.log(`Table ${tableName} created with rules.`);
        }
    }

    // 2. The Gatekeeper: Checks if data follows the rules
    validate(data, schema) {
        for (const key in schema) {
            // Check if field is missing
            if (data[key] === undefined) {
                throw new Error(`Validation Error: Missing field '${key}'`);
            }
            // Check if data type is wrong (e.g., sending a number for a name)
            if (typeof data[key] !== schema[key]) {
                throw new Error(`Validation Error: '${key}' must be a ${schema[key]}`);
            }
        }
    }

    insert(tableName, data) {
        const filePath = path.join(this.dbDir, `${tableName}.json`);
        const table = JSON.parse(fs.readFileSync(filePath));
        
        // Run the validator before saving!
        this.validate(data, table.schema);

        const newId = table.rows.length > 0 ? table.rows[table.rows.length - 1].id + 1 : 1;
        const newRow = { id: newId, ...data };
        
        table.rows.push(newRow);
        fs.writeFileSync(filePath, JSON.stringify(table, null, 2));
        return newRow;
    }

    select(tableName) {
        const filePath = path.join(this.dbDir, `${tableName}.json`);
        return JSON.parse(fs.readFileSync(filePath)).rows;
    }
}

export default CyrusDB;