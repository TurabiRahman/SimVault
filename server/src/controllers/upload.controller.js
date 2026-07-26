// const uploadCSV = (req, res) => {
//     res.status(200).json({
//         success: true, 
//         file: req.file,
//         message: "CSV file uploaded successfully."
//     });
// };

// module.exports = { 
//     uploadCSV 
// };

const uploadService = require("../services/upload.service");

const uploadCSV = async (req, res) => {

    try {

        const rows = await uploadService.readCSV(req.file.path);

        uploadService.validateCSVColumns(rows);

        res.status(200).json({
            success: true,
            rows,
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
