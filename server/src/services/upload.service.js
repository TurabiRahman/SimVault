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

const findCitizenByVoterId = async (voterId) => {

    const query = `
        select *
        from citizen
        where voter_id = $1
    `;

    const result = await pool.query(query, [voterId]);
    return result.rows[0];
};

const createCitizen = async (citizenData) => {

    const query = `
        INSERT INTO citizen
        (voter_id, first_name, last_name)
        VALUES ($1, $2, $3)
        RETURNING id;
    `;

    const values = [
        citizenData.voter_id,
        citizenData.first_name,
        citizenData.last_name,
    ];

    const result = await pool.query(query, values);

    return result.rows[0].id;//////
};

const processCitizens = async (rows) => {

    const processedRows = [];

    for(const row of rows)
    {
        let citizen = await findCitizenByVoterId(row.voter_id);

        if(!citizen)
        {
            const citizenId = await createCitizen(row);
            citizen = { id: citizenId};
        }   

        processedRows.push(
            {
                ...row,
                citizen_id: citizen.id
            }
        );
    }

    return processedRows;
};


module.exports = {
    readCSV,
    validateCSVColumns,
    findCitizenByVoterId,
    createCitizen,
    processCitizens,
};