const { IEXCloudClient } = require("node-iex-cloud");
const fetch = require('node-fetch-commonjs')
let secrets = require('./secrets')

const iexSandboxKey = secrets.iexSandboxKey

const iex = new IEXCloudClient(fetch, {
    sandbox: true,
    publishable: iexSandboxKey,
    version: "stable"
});

async function tickerIsValid(ticker) {
    return iex.search(ticker).then(res => {
        // console.log(typeof res)
        return res
    })
}


module.exports.tickerIsValid = tickerIsValid