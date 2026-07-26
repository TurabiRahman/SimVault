const fs = require("fs");
const csv = require("csv-parser");

const pool = require("../config/db");

const readCSV = (filePath) => {
    return new Promise((resolve, reject) => {

        const rows = [];

        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", (row) => {
                rows.push(row);
            })
            .on("end", () => {
                resolve(rows);
            })
            .on("error", (error) => {
                reject(error);
            });
    });
};

const validateCSVColumns = (rows) => {

    const requiredColumns = [
        "voter_id",
        "first_name",
        "last_name",
        "sim_company",
        "sim_number",
        "registration_date",
        "expiry_date",
    ];
 
    if(rows.length === 0) {
        throw new Error("CSV file is empty.");
    }

    const uploadedColumns = Object.keys(rows[0]);

    for(const column of requiredColumns) 
    {
        if(!uploadedColumns.includes(column)) 
        {
            throw new Error(`Missing required column: ${column}`);
        }
    }

};





module.exports = {
    readCSV,
    validateCSVColumns
};