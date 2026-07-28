const pool = require("../config/db");

const getCitizenByVoterId = async (voterId) => {

    const query = `
        SELECT
            c.voter_id,
            c.first_name,
            c.last_name,

            s.sim_company,
            s.sim_number,
            s.registration_date,
            s.expiry_date

        FROM citizen c

        JOIN sim s
        ON c.id = s.citizen_id

        WHERE c.voter_id = $1;
    `;

    const result = await pool.query(query, [voterId]);
    return result.rows; 
};

module.exports = {
    getCitizenByVoterId,
};