const { IEXCloudClient } = require("node-iex-cloud");
const fetch = require('node-fetch-commonjs')
let secrets = require('./secrets')

const iexSandboxKey = secrets.iexSandboxKey

const iex = new IEXCloudClient(fetch, {
    sandbox: true,
    publishable: iexSandboxKey,
    version: "stable"
});

// retrieves company news for last 5 days
function getQuote(ticker) {
    iex.symbol(ticker).quote('latestPrice').then(res => console.log(res))
}

// retrieves 3 of the company's recent headlines
function getCompanyNews(ticker) {
    iex.symbol(ticker).news(3).then(res => console.log(res))
}


module.exports.getQuote = getQuote
module.exports.getCompanyNews = getCompanyNews