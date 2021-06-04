import "./ExchangeField.css";
import React from "react";
import arrowDown from "../images/arrowDown.svg";
import closeIcon from "../images/close.svg";

export const ExchangeField = ({
  arrayList,
  initialCurrency,
  getCurrency,
  valueInput,
  changeInput,
  nameInput,
}) => {
  const [isClick, setIsClick] = React.useState(false); // states of the vector button

  const openSelect = () => {
    // click-to-click control of the vector button state
    if (!isClick) {
      setIsClick(true);
    } else {
      setIsClick(false);
    }
  };

  const setCurrency = (currency) => {
    // setting the desired currency by clicking
    getCurrency(currency);
    setIsClick(false);
  };

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return (
    <div className={isClick ? "exchangeField__click" : "exchangeField"}>
      {isClick ? (
        <>
          <div className="exchangeField__box">
            <input
              className="exchangeField__input-search"
              placeholder="Search"
              type="text"
            />
            <button
              onClick={openSelect}
              className="exchangeField__select-close"
              type="button"
            >
              <img src={closeIcon} alt="крестик" />
            </button>

            <ul className="exchangeField__search-container">
              {arrayList.map((item) => (
                <li
                  key={getRandomNumber(0, 100000000)}
                  className="exchangeField__search-element"
                >
                  <button
                    className="button exchangeField__search-element"
                    type="button"
                    onClick={() => setCurrency(item)}
                  >
                    <img
                      className="exchangeField__search-imgae"
                      src={item.image}
                      alt="лого криптовалюты"
                    />
                    <p className="exchangeField__search-text">
                      {item.ticker.toUpperCase()}
                    </p>
                    <p className="exchangeField__search-paragraph">
                      {item.name}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <>
          {initialCurrency && (
            <>
              <input
                value={valueInput}
                name={nameInput}
                onChange={changeInput}
                className="exchangeField__input"
                type="text"
              />
              <span className="exchangeField__stick" />
              <button
                type="button"
                onClick={openSelect}
                className="exchangeField__select"
              >
                <img
                  className="exchangeField__select-vector"
                  src={initialCurrency.image}
                  alt="лого криптовалюты"
                />
                <p className="exchangeField__select-text">
                  {initialCurrency.ticker.toUpperCase()}
                </p>
                <img
                  className="exchangeField__select-logo"
                  src={arrowDown}
                  alt="вектор"
                />
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};
