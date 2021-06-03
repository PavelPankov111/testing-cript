import './ExchangeField.css'
import React from 'react';
import arrowDown from '../images/arrowDown.svg'
import closeIcon from '../images/close.svg'

export function ExchangeField({ data, initialCurrency, getCurrency, value, changeInput, nameInput }) {
    const [isClick, setIsClick] = React.useState(false)

    const openSelect = () => {
        if (!isClick) {
            setIsClick(true)
        } else {
            setIsClick(false)
        }
    }

    const setCurrency = (currency) => {
        getCurrency(currency)
        setIsClick(false)
    }

    return (
        <div className={isClick ? 'exchangeField__click' : 'exchangeField'} >
            {isClick ?
                <>
                    <div  className="exchangeField__box">
                        <input className="exchangeField__input-search" placeholder="Search" type="text" />
                        <img onClick={openSelect} className="exchangeField__select-close" src={closeIcon} alt="крестик" />
                        <ul className="exchangeField__search-container">
                            {data.map((item, index) => {
                                return (
                                    <li onClick={() => setCurrency(item)} key={index} className="exchangeField__search-element">
                                        <img className="exchangeField__search-imgae" src={item.image} alt="лого криптовалюты" />
                                        <p className="exchangeField__search-text">{item.ticker.toUpperCase()}</p>
                                        <p className="exchangeField__search-paragraph">{item.name}</p>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </>
                :
                <>
                    {initialCurrency &&
                        <>
                            <input value={value} name={nameInput} onChange={changeInput} className="exchangeField__input" type="text" />
                            <span className="exchangeField__stick"></span>
                            <div onClick={openSelect} className="exchangeField__select">
                                <img className="exchangeField__select-vector" src={initialCurrency.image} alt="лого криптовалюты" />
                                <p className="exchangeField__select-text">{initialCurrency.ticker.toUpperCase()}</p>
                                <img className="exchangeField__select-logo" src={arrowDown} alt="вектор" />
                            </div>
                        </>

                    }
                </>
            }
        </div>
    )
}