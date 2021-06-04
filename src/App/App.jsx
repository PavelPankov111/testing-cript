import "./App.css";
import React from "react";
import "../fonts/roboto/roboto.css";
import "../fonts/roboto-slab/robotoslab.css";
import "../fonts/source_sans_pro/source_sans_pro.css";
import { ExchangeForm } from "../ExchangeForm/ExchangeForm";
import Api from "../Api/Api";

const App = () => {
  const api = new Api(); // instance of the class Api
  const [cards, setCards] = React.useState([]); // array of currencies
  const [initialCurrencyRight, setInitialCurrencyRight] = React.useState(null); // currencies in the right input
  const [initialCurrencyLeft, setInitialCurrencyLeft] = React.useState(null); // currencies in the left input
  const [error, setError] = React.useState(false); // state error under the button
  const [allValues, setAllValues] = React.useState({
    leftValue: "",
    rightValue: "",
  }); // state inputs
  const [minAmount, setMinAmount] = React.useState(0);

  React.useEffect(() => {
    // get an array of currencies and set the initial values of the inputs
    api
      .getAllCurrencies("https://api.changenow.io/v1/currencies?active=true")
      .then((array) => {
        const arrPopularCurrencies = array.filter((item) => item.featured);
        setInitialCurrencyRight(arrPopularCurrencies[0]);
        setInitialCurrencyLeft(arrPopularCurrencies[0]);
        setCards(arrPopularCurrencies);
      })
      .catch((err) => new Error(err));
  }, []);

  const getCurrencyRight = (currency) => {
    // setting the icon and text for the right input
    setInitialCurrencyRight(currency);
  };

  const getCurrencyLeft = (currency) => {
    // setting the icon and text for the left input
    setInitialCurrencyLeft(currency);
  };

  React.useEffect(() => {
    // set the value minAmount to the right input
    if (
      initialCurrencyLeft &&
      initialCurrencyRight &&
      initialCurrencyLeft !== initialCurrencyRight
    ) {
      api
        .minimalExchangeAmount(
          initialCurrencyLeft.ticker,
          initialCurrencyRight.ticker
        )
        .then((amount) => {
          if (!amount) setError(true);
          else setError(false);
          setMinAmount(amount.minAmount);
          setAllValues({
            rightValue: amount.minAmount,
            leftValue: allValues.leftValue,
          });
        })
        .catch((err) => new Error(err));
    }
  }, [initialCurrencyLeft, initialCurrencyRight]);

  const valuesInputChange = React.useCallback(
    // onChange handler for two inputs
    (e) => {
      const { name, value } = e.target;
      setAllValues((prevState) => ({ ...prevState, [name]: value }));
    },
    [setAllValues]
  );

  const handlesubmit = () => {
    // counting the estimated value
    if (allValues.leftValue && allValues.rightValue) {
      if (Number(allValues.leftValue) > Number(minAmount)) {
        api
          .estimatedExchangeAmount(
            initialCurrencyLeft.ticker,
            initialCurrencyRight.ticker,
            Number(allValues.leftValue) + Number(allValues.rightValue)
          )
          .then((estimate) => {
            setError(false);
            setAllValues({
              rightValue: allValues.rightValue,
              leftValue: estimate.estimatedAmount,
            });
          })
          .catch((err) => {
            if (err) {
              setError(true);
            }
          });
      } else {
        setAllValues({
          rightValue: "-",
          leftValue: "",
        });
        setError(true);
      }
    } else {
      setError(true);
    }
  };

  return (
    <section className="app">
      <div className="app__content">
        <h1 className="app__title">Crypto Exchange</h1>
        <p className="app__subtitle">Exchange fast and easy</p>
        <ExchangeForm
          nameInputRight="rightValue"
          nameInputLeft="leftValue"
          rightValue={allValues.rightValue}
          rightChangeInput={valuesInputChange}
          leftChangeInput={valuesInputChange}
          leftValue={allValues.leftValue}
          arrayList={cards}
          getCurrencyRight={getCurrencyRight}
          getCurrencyLeft={getCurrencyLeft}
          initialCurrencyLeft={initialCurrencyLeft}
          error={error}
          handlesubmit={handlesubmit}
          initialCurrencyRight={initialCurrencyRight}
        />
      </div>
    </section>
  );
};

export default App;
