const uploadService = require("../services/upload.service");

const uploadCSV = async (req, res) => {

    try {

        const rows = await uploadService.readCSV(req.file.path);

        uploadService.validateCSVColumns(rows);

        const processedRows = await uploadService.processCitizens(rows);

        const summary = await uploadService.processSIMs(processedRows);

        res.status(200).json({
            success: true,
            message: "CSV uploaded successfully.",  // given by co-pilot
            summary,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

module.exports = {
    uploadCSV,
};
