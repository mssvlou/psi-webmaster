const asyncHandler = require('express-async-handler');
const Page = require('../models/page');
const QWAssertion = require('../models/qwAssertion').qwAssertionModel
const ElementResults = require('../models/elementResults')

exports.getPage = asyncHandler(async (req, res, next) => {
    const dbPage = await Page.findOne({ _id: req.params.id }).exec();
    const dbQWAssertions = await QWAssertion.find({page: req.params.id}).exec()

    const resQWAssertions = []
    for (const dbQWAssertion of dbQWAssertions) {
        const resQWAssertion = {}
        resQWAssertion.code = dbQWAssertion.code
        resQWAssertion.outcome = dbQWAssertion.outcome
        resQWAssertion.module = dbQWAssertion.module
        resQWAssertion.levels = dbQWAssertion.levels
        resQWAssertion.description = dbQWAssertion.description
        
        const dbElementResults = await ElementResults
            .find({assertion: dbQWAssertion._id})
        
        resQWAssertion.elementsAffected = dbElementResults

        resQWAssertions.push(resQWAssertion)
    }

    const resPage = {}
    resPage.pageURL = dbPage.pageURL
    resPage.totalTests = dbPage.totalTests
    resPage.totalPassed = dbPage.totalPassed
    resPage.totalWarning = dbPage.totalWarning
    resPage.totalFailed = dbPage.totalFailed
    resPage.totalNotApplicable = dbPage.totalNotApplicable
    resPage.assertions = resQWAssertions
    // console.log(resPage);
    res.status(200).json(resPage);
});