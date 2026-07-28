const citizenService = require("../services/citizen.service");

const getCitizenByVoterId = async (req, res) => {

    try {

        const voterId = req.params.voterId;

        const rows = await citizenService.getCitizenByVoterId(voterId);

        if (rows.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Citizen not found.",
            });

        }

        return res.status(200).json({
            success: true,
            data: rows,
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

module.exports = {
    getCitizenByVoterId,
};