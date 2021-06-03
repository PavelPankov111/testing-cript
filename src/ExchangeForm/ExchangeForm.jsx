import './ExchangeForm.css';
import React from 'react';
import { ExchangeField } from '../ExchangeField/ExchangeField'
import swapIcon from '../images/swap.svg'

export function ExchangeForm(props) {
    const { data, initialCurrencyRight, initialCurrencyLeft, getCurrencyRight,
        getCurrencyLeft, rightValue, rightChangeInput, leftChangeInput, leftValue,
        nameInputRight, nameInputLeft, error, handlesubmit,
        listRef
    } = props

    return (
        <section className="exchangeForm">
            <div className="exchangeForm__inputs">
                <ExchangeField listRef={listRef} nameInput={nameInputRight} changeInput={rightChangeInput} value={rightValue} data={data} initialCurrency={initialCurrencyRight} getCurrency={getCurrencyRight} />
                <img src={swapIcon} alt="два вектора" />
                <ExchangeField listRef={listRef} nameInput={nameInputLeft} changeInput={leftChangeInput} value={leftValue} data={data} initialCurrency={initialCurrencyLeft} getCurrency={getCurrencyLeft} />
            </div>
            <h3 className="exchangeForm__title">Your Ethereum address</h3>
            <div className="exchangeForm__submit">
                <input className="exchangeForm__submit-input" type="email" />
                <button onClick={handlesubmit} className="exchangeForm__submit-button">Exchange</button>
            </div>
            <span className={error ? 'exchangeForm__submit-error' : 'exchangeForm__submit-error_hiden'}>This pair is disabled now</span>
        </section>
    )
}