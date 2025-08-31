const asyncHandler = require('express-async-handler');
const Website = require('../models/website');

exports.getWebsites = asyncHandler(async (req, res, next) => {
    const dbWebsites = await Website.find({}).exec();

    const resWebsites = [];
    for (const dbWebsite of dbWebsites) {
        const resWebsite = {};
        resWebsite._id = dbWebsite._id;
        resWebsite.websiteURL = dbWebsite.websiteURL;
        resWebsite.addedDate = dbWebsite.addedDate;
        if (dbWebsite.lastRated != null) {
            resWebsite.lastRated = dbWebsite.lastRated;
        }
        resWebsite.ratingStatus = dbWebsite.ratingStatus;
        
        resWebsites.push(resWebsite);
    }

    res.status(200).json(resWebsites);
})

exports.addWebsite = asyncHandler(async (req, res, next) => {
    const websiteURL = req.body.websiteURL;
    const website = new Website({ websiteURL: websiteURL })

    await website.save();

    const resWebsite = {};
    resWebsite._id = website._id;
    resWebsite.websiteURL = website.websiteURL;
    resWebsite.addedDate = website.addedDate;
    resWebsite.ratingStatus = website.ratingStatus;
    res.status(201).json(resWebsite);
})
