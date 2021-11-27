// get the quote (last price) for a stock
function getQuote(ticker) {
    alpaca.lastQuote(ticker).then((resp) => {
        console.log(resp)
    });
}

function getQuote(ticker) {
    fetch(alpacaDataBaseURL + `/v2/stocks/${ticker}/quotes`).then(resp => {
        if (!resp.ok) {
            throw new Error(`Request failed with status ${reponse.status}`)
        }
        return resp.json()
    });
}

function getQuote(ticker) {
    finnhubClient.quote(ticker, (error, data, resp) => {
        if (error) {
            console.error(error)
            throw error
        }
        console.log(data)
        return data
    });
} 

// test func to see if alpaca conn works
function getAccount() {
    alpaca.getAccount().then((account) => {
        console.log('Current Account:', account)
    });
}


// var alpacaBaseURL = secrets.alpacaBaseURL
// var alpacaDataBaseURL = secrets.alpacaDataBaseURL
// var alpaca = secrets.alpaca

// const finnhub = require('finnhub');
// const api_key = finnhub.ApiClient.instance.authentications["api_key"];
// api_key.apiKey = secrets.finnhubAPIKey // Replace this
// const finnhubClient = new finnhub.DefaultApi()

