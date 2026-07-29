const citizenService = require("../services/citizen.service");

const { format } = require("@fast-csv/format");

const getCitizenByVoterId = async (req, res) => {

    try {

        const voterId = req.params.voterId;

        const rows = await citizenService.getCitizenByVoterId(voterId);

        const citizen = {
            voter_id: rows[0].voter_id,
            first_name: rows[0].first_name,
            last_name: rows[0].last_name,
        };

        const sims = rows.map(row => ({
            sim_company: row.sim_company,
            sim_number: row.sim_number,
            registration_date: row.registration_date,
            expiry_date: row.expiry_date,
        }));

        if (rows.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Citizen not found.",
            });

        }

        return res.status(200).json({
            success: true,
            citizen,
            sims,
        });

    }

    catch (error) 
    {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }

};

const exportCitizenCSV = async (req, res) => {

    // return res.status(200).json({
    //     success: true,
    //     message: "Export API is working.",
    // });

    const voterId = req.params.voterId;

    const rows = await citizenService.getCitizenByVoterId(voterId);

    if (rows.length === 0) {
        return res.status(404).json({
            success: false,
            message: "Citizen not found.",
        });
    }

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
        "Content-Disposition", 
        `attachment; filename=citizen_${voterId}.csv`
    );
};

module.exports = {
    getCitizenByVoterId,
    exportCitizenCSV,
};