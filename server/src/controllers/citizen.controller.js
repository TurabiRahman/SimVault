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

    const fileName =
    `${rows[0].first_name}_${rows[0].last_name}_SIM_Records.csv`;

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
        "Content-Disposition", 
        `attachment; filename="${fileName}"`
    );

    const csvstream = format({ headers: true });

    csvstream.pipe(res);

    rows.forEach((row) => {

        csvstream.write({

            "Voter ID": row.voter_id,

            "First Name": row.first_name,

            "Last Name": row.last_name,

            "SIM Company": row.sim_company,

            "SIM Number": row.sim_number,

            "Registration Date": row.registration_date
                .toLocaleDateString("en-CA"),

            "Expiry Date": row.expiry_date
                .toLocaleDateString("en-CA"),

        });

    });

    csvstream.end();
};

module.exports = {
    getCitizenByVoterId,
    exportCitizenCSV,
};