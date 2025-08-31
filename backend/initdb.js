const mongoose = require('mongoose');

const WebsiteModel = require('./models/website');
const PageModel = require('./models/page');
const QWAssertionModel = require('./models/qwAssertion').qwAssertionModel
const ElementResultsModel = require('./models/elementResults')

let websites = []
let pages = []
let qwAssertions = []

async function main() {
    await deleteElementResults()
    await deleteQWAssertions();
    await deletePages();
    await deleteWebsites();
    // await createQWAssertions();
    await createWebsites();
    await createPages();
}

async function createWebsites() {
    await Promise.all([
        createWebsite("https://en.wikipedia.org"),
    ]);
}

async function createWebsite(url) {
    const website = new WebsiteModel({ websiteURL: url });
    await website.save();
    websites.push(website);
}

async function createPages() {
    await Promise.all([
        createPage("https://en.wikipedia.org/wiki/Lorem_ipsum", websites[0]),
        createPage("https://en.wikipedia.org/wiki/Julius_Caesar", websites[0]),
        createPage("https://n.wikipedia.org/wiki/Julius_Caesar", websites[0])
    ]);
}

async function createPage(url, websiteDocument) {
    const page = new PageModel({
        pageURL: url,
        website: websiteDocument._id
    });
    await page.save();
    pages.push(page);
}

async function deleteElementResults() {
    await ElementResultsModel.deleteMany({});
}

async function deleteQWAssertions() {
    await QWAssertionModel.deleteMany({});
    qwAssertions = []
}

async function deletePages() {
    await PageModel.deleteMany({});
    pets = [];
}

async function deleteWebsites() {
    await WebsiteModel.deleteMany({});
    heroes = [];
}

module.exports.main = main;
