class Api {
    constructor() {
        this.key = 'c9155859d90d239f909d2906233816b26cd8cf5ede44702d422667672b58b0cd'
    }

    _handleResponse(response) {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response.statusText)
        }
    }

    getAllCurrencies(url) {
        return fetch(url, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then(this._handleResponse)
            .catch(err => console.log(err))
    }

    minimalExchangeAmount(firstCurrency, lastCurrency) {
        return fetch(`https://api.changenow.io/v1/min-amount/${firstCurrency}_${lastCurrency}?api_key=${this.key}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then(this._handleResponse)
            .catch(err => console.log(err))
    }

    estimatedExchangeAmount(firstCurrency, lastCurrency, amout) {
        console.log(amout)
        return fetch(`https://api.changenow.io/v1/exchange-amount/${amout}/${firstCurrency}_${lastCurrency}?api_key=${this.key}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then(this._handleResponse)
            .catch(err => console.log(err))
    }

}

export default Api;