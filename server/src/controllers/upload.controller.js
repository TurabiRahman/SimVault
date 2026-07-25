const uploadCSV = (req, res) => {
    res.status(200).json({
        success: true, 
        file: req.file,
        message: "CSV file uploaded successfully."
    });
};

module.exports = { 
    uploadCSV 
};