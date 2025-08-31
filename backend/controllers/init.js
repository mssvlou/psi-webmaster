const asyncHandler = require('express-async-handler');
const initDB = require('../initdb')

exports.initDB = asyncHandler(async (req, res, next) => {
    await initDB.main().catch((err) => console.log(err));
    res.status(200).json({message: "Database initialized!"});
})